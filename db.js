const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',         
    host: 'localhost',           
    database: 'escola',          
    password: 'hahehi',       
    port: 5432,
});


module.exports = pool;
