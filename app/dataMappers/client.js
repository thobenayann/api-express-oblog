// Il vaut mieux utiliser un système de pool pour traiter plusieurs requête en même temps
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Pas besoin de connect car c'est le Pool qui va se charger d'établir les connexions

module.exports = pool;