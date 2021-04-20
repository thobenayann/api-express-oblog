module.exports = {
    // Middleware pour gérer les erreurs 404
    async error404(request, response, next) {
        response.status(404).json({
            error: {
                code: 404,
                type: "not found",
                message: `${response.locals.notFound} not found`
            }
        });
    },

    // En réalité, dans express, il existe deux chaines de middleware
    // La classique et celle d'erreur.
    // On peut passer de la classique à l'erreur mais pas l'inverse
    // La chaîne d'erreur est là pour renvoyer les erreurs 50X+
    // les MW de gestion d'erreur prennent EXACTEMENT 4 paramètres
    // Pour passer de la chaine classique à la chaine d'erreur, on appel next
    // Mais en lui donnant un paramètre qui sera notre erreur.
    async error500(error, _, response, _) {
        response.status(500).json({
            error: {
                code: 500,
                type: "fatal error",
                details: error
            }
        });
    },
};