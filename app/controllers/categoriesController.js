const categoriesDataMapper = require('../dataMappers/categoriesDataMapper');

module.exports = {
    async getAllCategories(_, response) {
        const categories = await categoriesDataMapper.getAllCategories();

        response.json({data: categories});
    }
}