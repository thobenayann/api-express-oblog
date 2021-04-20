// Script d'import autonome vers notre base de données
// Pour le lancer il faut utiliser "npm run import"

require('dotenv').config();
const { Client } = require('pg');

const posts = require('../data/posts.json');
const categories = require('../data/categories.json');

// Instant Invoke function execution
// Cela nous pemettra d'utiliser await directement dans notre fichier
(async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    await client.connect();

    // Pour pouvoir refaire tourner mon script sans risque de doublon ou
    // d'erreur sur des "UNIQUE" il vaut "vider" mes table avec de le faire tourner
    // TRUNCATE TABLE vide les tables données
    // et RESTART IDENTITY réinitialise les id à 1
    await client.query('TRUNCATE TABLE post, category RESTART IDENTITY');

    // Je vais stocker dans cet objet les id de mes catégories
    const categoryIdMap = {};

    for (let category of categories) {
        // Avec le mot clé RETURNING je vais pouvoir récupérer l'id de la ligne enregistrée
        const result = await client.query(
            'INSERT INTO category(label, route) VALUES ($1, $2) RETURNING id',
            [category.label, category.route]);
        // Je peux stocker cet id "en face" du label de category pour le retrouver plus facilement
        categoryIdMap[category.label] = result.rows[0].id;
        console.log(`Category "${category.label}" inserted`);
    }

    console.log('Category id map :', categoryIdMap);

    for (let post of posts) {
        await client.query(
            `INSERT INTO post(title, slug, excerpt, content, category_id)
                      VALUES ($1, $2, $3, $4, $5)`,
            [
                post.title,
                post.slug,
                post.excerpt,
                post.content,
                categoryIdMap[post.category]
            ]);

            console.log(`Post "${post.title}" inserted`);
    }

    await client.end();
})();