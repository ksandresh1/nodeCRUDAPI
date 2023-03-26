const mysql = require('mysql2');

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'mydb'
})

var sql = "create table StudentName(id int, name varchar(50))";

conn.connect(function(err){
    if (err) throw err;
    console.log("[ + ] Connected to database.");
    conn.query(sql,function(err,result){
        if (err) throw err;
        console.log("[ + ] Created table ")
    })
})