const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: "root",
    database: "nodedb",
}

const mysql = require("mysql");
const connection = mysql.createConnection(config);

const dropTable = `drop table IF EXISTS people`;
connection.query(dropTable);

const createTable = `create table people(id int not null auto_increment, name varchar(255), primary key(id))`;
connection.query(createTable);

const insert = `insert into people(name) values('Bat Simpson, o Pirata Amarelo'),('Homer Simpson, Pai Exemplar'),('Marge Simpson, a Santa'),('Lisa Simpson, the saxophone girl')`;
connection.query(insert);

let nomes = [];
const select = `select * from people`;
connection.query(select, function (error, data, fields) {
    if (error) throw error;
    data.map(registro => {
        nomes.push(registro.name);
    });
});

app.get('/', (rq,res) => {
    let resultado = `
    <h1>Full Cycle Rocks!</h1>
    <h2>Full Pança Chata Amarela!</h2>
    <h3>Lista de atores:</h3>
    <ol>
    `;

    nomes.map(nome => {
        resultado += "\n" + "<li>" + nome + "</li>";
    });

    resultado = resultado + "</ol>";

    res.send(resultado);
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
})