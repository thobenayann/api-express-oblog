const postsDataMapper = require('../dataMappers/postsDataMapper');
const categoriesDataMapper = require('../dataMappers/categoriesDataMapper');

module.exports = {
    async allPosts(_,response) {
        try {
            const posts = await postsDataMapper.getAllPosts();

            // C'est souvent une bonne idée d'englober les données de la réponse
            // dans une propriété data
            // car si la structure de ma réponse évolue (par ex je rajoute des propriétés
            // pour la pagination), je ne casserais pas la structure et donc les fronts
            // qui utilisent mon API

            response.json({ data: posts });
        } catch (error) {
            // Les middlewares pour la gestion d'erreur sont dans une file à part
            // pour partir dans cette file, on appele next en donnant en paramètre
            // l'erreur produite
            next(error);
        }
    },

    async postById(request, response, next) {
        try {
            // j'extrait en décomposition la propriété postId dans mes params
            const { postId } = request.params;

            const post = await postsDataMapper.getPostById(postId);

            if(! post) {
                // en appelant next(), je vais chercher le prochain MW qui répond à ma route
                // Le dernier MW qui répond à toutes les routes est donc le MW 404
                response.locals.notFound = "post";
                next();
                return;
            }
            response.json({ data: post });
        } catch(error) {
            next(error);
        }
    },

    async postsByCategoryId(request, response, next) {
        try {
            const { categoryId } = request.params;

            // Ici getPostsByCategoryId peut nous renvoyer une liste vide
            // pour deux raisons différentes:
            // 1. l'utilisateur demande un categoryId qui n'existe pas
            // 2. l'utilisateur demande un categoryId mais il n'y a pas de post dans cette catégorie

            // choix 1 => 404
            // choix 2 => liste vide

            const category = await categoriesDataMapper.getCategoryById(categoryId);

            if (! category) {
                response.locals.notFound = "category";
                next();
                return;
            }

            const postsList = await postsDataMapper.getPostsByCategoryId(categoryId);

            response.json({ data: postsList })
        } catch(error) {
            next(error);
        }
    },

    async createPost(request, response) {
        const post = request.body;

        const post = await postsDataMapper.createPost(post);
        response.json({ data: post })
    }
}