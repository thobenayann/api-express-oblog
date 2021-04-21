module.exports = {

    validateBody(schema) {
        return async (request, response, next) => {
            try {
                const validation = await schema.validateAsync(request.body);

                // validation contient un propriété error si qqc s'est mal passé
                if (validation.error) {
                    // Réponse d'erreur
                    response.status(400).json({error: validation.error});
                    return;
                }
                next();

            } catch (error) {
                if (error.message == 'category.invalid (category_id)') {
                    response.status(400).json({error: {
                        details: error.message,
                        message: "Le category id n'existe pas"
                    }});
                    return;
                }
                next(error);
            }
        };
    },
};