const postsDataMapper = require('../dataMappers/postsDataMapper');
const categoriesDataMapper = require('../dataMappers/categoriesDataMapper');

module.exports = {
    async getAllPosts(_,response) {
        const posts = await postsDataMapper.getAllPosts();

        // C'est souvent une bonne idée d'englober les données de la réponse
        // dans une propriété data
        // car si la structure de ma réponse évolue (par ex je rajoute des propriétés
        // pour la pagination), je ne casserais pas la structure et donc les fronts
        // qui utilisent mon API

        response.json({ data: posts });
    },

    async getPostById(request, response, next) {
        // j'extrait en décomposition la propriété postId dans mes params
        const { postId } = request.params;

        const post = await postsDataMapper.getPostById(postId);

        if(! post) {
            // en appelant next(), je vais chercher le prochain MW qui répond à ma route
            // Le dernier MW qui répond à toutes les routes est donc le MW 404
            next();
            return;
        }
        response.json({ data: post });
    },

    async getPostsByCategoryId(request, response, next) {
        const { categoryId } = request.params;

        // /!\ petit piège
        // Ici getPostsByCategoryId peut nous renvoyer une liste vide
        // pour deux raisons différentes:
        // 1. l'utilisateur demande un categoryId qui n'existe pas
        // 2. l'utilisateur demande un categoryId mais il n'y a pas de post dans cette catégorie

        // choix 1 => 404
        // choix 2 => liste vide

        const category = await categoriesDataMapper.getAllCategories(categoryId);

        if(! category) {
            next();
            return;
        }

        const postsList = await postsDataMapper.getPostByCategoryId(categoryId);

        response.json({ data: postsList });
    }
}