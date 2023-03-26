const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const mysql = require('mysql2');



// parse application/json
app.use(bodyparser.json());

// database connection
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'node_restapi'
});

//Show Mysql Connect
conn.connect((err)=>{
    if(err) throw err;
    console.log("My Connected with app...");
});

app.get('/api/items', (req,res)=>{
    let sqlQuery = "SELECT * FROM items";

    let query = conn.query(sqlQuery,(err,results)=>{
        if(err) throw err;
        res.send(apiResponse(results));
    });
});


// get single items
app.get('/api/items/:id',(req,res)=>{
    let sqlQuery = "SELECT * FROM items WHERE id=" + req.params.id;
    let query = conn.query(sqlQuery,(err,results)=>{
        if(err) throw err;
        res.send(apiResponse(results));
    });
});

//create New Items
app.post('api/items',(req,res)=>{
    let data = {title: req.body.title, body: req.body.body};

    let sqlQuery = "INSERT INTO items SET ?";
    let query = conn.query(sqlQuery,data,(err,results)=>{
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

// delete Items 

app.delete('/api/items/:id',(req,res)=>{
    let sqlQuery = "Delete FROM items WHERE id="+req.params.id+"";
    let query = conn.query(sqlQuery, (err,results)=>{
        if(err) throw err;
        res.send(apiResponse(results));
    });
});

// update items
app.put('/api/items/:id',(req, res) => {
    let sqlQuery = "UPDATE items SET title='"+req.body.title+"', body='"+req.body.body+"' WHERE id="+req.params.id;
    
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });

  function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});

  };

  app.listen(3000, ()=>{
    console.log("Listening to port 3000: ")
  })