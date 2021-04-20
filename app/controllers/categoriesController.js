const categoriesDataMapper = require('../dataMappers/categoriesDataMapper');

module.exports = {
    async allCategories(_, response, next) {
        try {
            const categories = await categoriesDataMapper.getAllCategories();

            response.json({data: categories});
        } catch(error) {
            next(error);
        }
    },
}