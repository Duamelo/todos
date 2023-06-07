const { Pool } = require('pg');
require('dotenv/config');

const pool = new Pool({
user: process.env.user,
database: process.env.db,
password: process.env.pwd,
port: process.env.port,
host: process.env.host
});
module.exports = {pool};