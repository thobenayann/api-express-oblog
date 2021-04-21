const Joi = require('joi');
const categoriesDataMapper = require('../../dataMappers/categoriesDataMapper');

const postSchema = Joi.object({
    title: Joi.string().required(),
    slug: Joi.string().required(),
    excerpt: Joi.string(),
    content: Joi.string(),
    category_id: Joi.number().integer().min(1).required()
                    .external(async (value) => {
                        // Vérifier que value correspond à un id existant
                        const category = await categoriesDataMapper.getCategoryById(value);

                        if (! category) {
                            // remonter l'erreur
                            throw new Error('category.invalid');
                        }

                        return value;
                    }, "Le category_id doit exister"),
});

module.exports = postSchema;