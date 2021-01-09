const express = require('express');
const port = 3000
const app = express();

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql');
const connection = mysql.createConnection(config);

connection.query("CREATE TABLE IF NOT EXISTS " +
"people (id int AUTO_INCREMENT PRIMARY KEY, name varchar(255) NOT NULL)");

connection.query("INSERT INTO people (name) VALUES ('Antonio Silva')");

connection.end();

app.get('/', (req, res) => {
    const connection = mysql.createConnection(config);
    
    let html = `<h1>Full Cycle Rocks!</h1><ul>`;

    connection.query("SELECT name FROM people", function (error, results, fields) {
        if (error) throw error;
        results.forEach(result => {
            html += `<li>${result.name}</li>`;
        });
        html += '</ul>';
        res.send(html);
    });
    connection.end();
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
})