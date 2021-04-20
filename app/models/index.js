// SoC : le rôle de ce fichier est de définir les associations entre les modèles

// 1. d'abord on require tous les modèles
const Post = require('./post');
const Category = require('./category');

// 2. ensuite, on définit les associations
// "une catégorie a plusieurs posts"
Category.hasMany(Post, {
    // pour définir cette relation, on doit donner 2 choses
    // - le nom de la clef étrangère
    foreignKey: "category_id",
    // - le nom qu'on décide de donner à l'association elle même
    // lorsque l'on demandera "tel categorie, avec tous ses posts",
    // les catégories seront accrochées dans une propriété qui portera ce nom
    as: "posts"
});

// la réciproque de cette association : "les posts appartiennent à une catégorie"
Post.belongsTo(Category, {
    foreignKey: "category_id",
    as: "categories"
});

// 3. on réexporte tous les modèles (mais maintenant ils ont des associations !)
// -> pour ça on les met tous dans le même objet
module.exports = {
    Category,
    Post
};