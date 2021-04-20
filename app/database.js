// on require la bonne classe
const {Sequelize} = require('sequelize');

// on instancie cette classe, avec des options
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    define: {
        underscored: true, // pour passer en snake_case par défaut
        // pour changer le nom des timestamps dans les models :
        createAt: "created_at",
        updateAt: "updated_at",
        // penser à mettre timestamps: false si on en met pas dans nos tables
    }
});

// On oublie pas d'exporter la connexion
module.exports = sequelize;