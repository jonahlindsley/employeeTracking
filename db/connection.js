


const mysql = require('mysql2')

const connection = mysql.createPool({
    host: 'localhost',
    database: 'the_foxy_knowledge_seekers',
    user: 'root',
    password: 'pass'
  })




  module.exports = connection