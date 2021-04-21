const client = require('./client');

module.exports = {
    async getAllPosts() {
        const result = await client.query('SELECT * FROM post ORDER BY id DESC');
        return result.rows;
    },

    async getPostById(postId) {
        const result = await client.query('SELECT * FROM post WHERE id = $1', [postId]);

        // Au vu du nom, l'utilisateur de ma méthode va s'attendre à recevoir un post
        // (et pas une liste contenant un post)

        // En revanche il existe un cas d'erreur
        // Si l'id donné ne correspond à aucun post, nous ne pourrons pas renvoyer de donnée

        if (result.rowCount == 0) {
            // si je n'ai pas de post, je renvoie null à la place de mon objet
            // ce sera facile à tester pour l'utilisateur de mon dataMapper
            return null;
        }

        return result.rows[0];
    },

    async getPostsByCategoryId(categoryId) {
        const result = await client.query('SELECT * FROM post WHERE category_id = $1', [categoryId]);
        return result.rows;
    },

    async createPost(post) {
        const result = await client.query(`INSERT INTO post(title, slug, excerpt, content, category_id)
                                           VALUES($1, $2, $3, $4, $5) RETURNING *`,
                                           // RETURNING * va me renvoyer toute l'entité créée, (id compris)
                                           [
                                               post.title,
                                               post.slug,
                                               post.excerpt,
                                               post.content,
                                               post.category_id
                                           ])
        return result.rows[0];
    }
};