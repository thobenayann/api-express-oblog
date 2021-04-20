const client = require('./client');
const { getPostByCategoryId } = require('./postsDataMapper');

module.exports = {
    async getAllCategories() {
        const result = await client.query('SELECT * FROM category ORDER BY label');
        return result.rows;
    },

    async getCategoryById(categoryId) {
        const result = await client.query('SELECT * FROM category WHERE id = $1', [categoryId]);

        // Au vu du nom, l'utilisateur de ma méthode va s'attendre à recevoir 1 category
        // (et pas une liste contenant 1 category)

        // En revanche il existe un cas d'erreur
        // Si l'id donné ne correspond à aucune category nous ne pourront pas revoyer de données

        if (result.rowCount == 0) {
            // Si je n'ai pas de category, je renvoi null à la place de mon objet
            // Ce sera facile à tester pour l'utilisateur de mon dataMapper
            return null;
        }

        return result.rows[0];
    }
};