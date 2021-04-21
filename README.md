# Projet Expreess - API de blog

## Démarrage

```bash
- import des données Json : "import": "node import/import.js",
- "start": "node app.js",
- "dev": "nodemon app.js"
```

## Routes

- `GET /posts` qui affiche la liste des posts dans notre base de données
- `GET /categories` qui fait la même chose pour les catégories
- `GET /posts/:id` pour afficher un unique article à partir de son _id_
- `GET /posts/category/:id` idem mais pour n'afficher que les posts d'une catégorie précise
