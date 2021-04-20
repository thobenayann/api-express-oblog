/* On crée une transaction
* une transaction, c'est un bloc d'instructions, qui commence par BEGIN
* et qui finit soit par COMMIT (pour valider) soit par ROLLBACK (pour annuler)
* Si une erreur se produit (ou qu'on appelle ROLLBACK), alors c'est tout le bloc qui est annulé. 
* Les instructions ne sont validées QUE si on arrive au COMMIT sans aucune erreur.
*/

BEGIN TRANSACTION;

/* commencer par supprimer toutes les tables si elles existent */
DROP TABLE IF EXISTS "post";
DROP TABLE IF EXISTS "category";

/* Table category */
CREATE TABLE IF NOT EXISTS "category" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL,
    "route" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    /* petit débat ici, doit on donner une valeur par défaut à updated_at?
    on va faire en fonction de la doc Sequelize et dire que oui */
);

/* Table post */
CREATE TABLE IF NOT EXISTS "post" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT,
    "category_id" INT NOT NULL REFERENCES "category(id)",
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

COMMIT TRANSACTION;