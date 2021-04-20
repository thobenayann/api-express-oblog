# Structure "idéale" d'une application express

## /

A la racine j'ai :

- un fichier `app.js`
- un dossier `app` ou `api`...
- Les fichiers de configuration / outils (`packages.json,` `.gitignore`, `sqitch.conf`, ...)

## Mon fichier `app.js`

Dans mon fichier `app.js` je vais :

- activer dotenv
- require express
- créer mon app
- met en place les middlewares globaux dont on a besoin (`express.json()`, `cors('*')`, ...)
- `require` et `use` le dossier `app/routers`

### Quel middleware pour quel type de body ?

Si mes requêtes sont en `JSON` je vais utiliser le middleware : `express.json`.

```javascript
app.use(express.json());
```

Si mes données sont de type Form URL Encoded (des formulaires HTML envoyés sans traitement particulier) c'est le middleware `express.urlencoded`.

```javascript
app.use( express.urlencoded({extended: true}) );
```

Si mes données sont de type Form Multi Part (des formulaires HTML avec l'attribut `enctype="multipart/form-data"`, notament pour l'upload d'image) c'est le middleware `multer` (à installer via `npm`).

## Le dossiers `app/routers`

On va retrouver ici tout ce qui a trait aux routing de mon applications

On a d'abord un fichier `index.js` qui sera require par `app.js` et qui sert de point d'entrée.

On créé ensuite un router par "theme" d'url (ex: "posts", "categories")

Et on charge ces routers en les préfixants :

```javascript
router.use('/categories',  categoryRouter);
router.use('/posts', postRouter);
```

Ensutie dans chaque sous fichier de router on décris nos routes / middlewares au besoin.

On charge des controllers qui seront dans le dossier `app/controller`.


## Le dossier `app/controllers`

On créé des controller pour nos routes. A segmenter au besoin, un par fichier de routes est un bon point de départ (+ 1 pour les erreurs).