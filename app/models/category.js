const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database');

class Category extends Model {

};

Category.init({
    label: {
        type: DataTypes.TEXT,
        // Ici, je définie une propriété validate donnée par Sequelize
        // Pour empêcher un utilisateur de saisir un nom vide
        allowNull: false,
        validate: {
            // Sequelize nous permet de créer notre propre message d'erreur avec la propriété "msg"
            notEmpty: {
                msg : "le nom ne peut pas être vide"
            }
        } 
    }
}, {
    // le nom de la table
    tableName: "category",
    // l'instance de connexion
    sequelize
});

module.exports = Category;