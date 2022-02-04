const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const port=8000;

app.use(cors({ origin: "*" }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

const connection=mysql.createConnection({
    host:'sql6.freesqldatabase.com',
    user:'sql6469944',
    password:'2lQmeUJjVf',
    database:'sql6469944',
    port:3306
});

try
{
    console.log("Database connected");
    var q = "SHOW TABLES LIKE 'taskmanagement'";
    connection.query(q, function (error, result) {
        if(result.length === 0)
        {
            var q = "CREATE TABLE taskmanagement (taskId VARCHAR(50) NOT NULL, taskHolderName VARCHAR(50) NOT NULL, taskDate VARCHAR(50),  taskName VARCHAR(50),  taskStatus VARCHAR(50),  PRIMARY KEY (taskId,taskHolderName))";
            connection.query(q, function (error, result) {
                console.log("Table is created successfully");
            });
        }
        else{
            console.log("Table is already created");
        }
    });
}
catch(error)
{
    console.log(error);
}

const showData=(req,res)=>{
    var q = "SELECT * from taskmanagement";
    connection.query(q, function (error, result) {
        if (error)
        {
            res.json({response: error});
        }
        else
        {
           res.json(result);
        }
    });
}

app.post('/saveTask',(req,res)=>{
    if(req.body.taskId!=="" && req.body.taskStatus!==""){
        var q = "INSERT INTO taskmanagement (taskId, taskHolderName, taskDate, taskName, taskStatus) VALUES ("+"'"+ req.body.taskId+"'" +", "+"'"+req.body.taskHolderName+"'"+", "+"'"+req.body.taskDate+"'"+", "+"'"+req.body.taskName+"'"+", "+"'"+req.body.taskStatus+"'"+")";
        connection.query(q, function (error, result) {
            if (error)
            {
                res.json({response: error});
            }
            else
            {
                showData(req,res);
            }
        });
    }
    else{
        res.json({response: "Task Id and Task Holder Name should not be an empty field"});
    }
})

app.get('/deleteTask',(req,res)=>{
    if(req.body.taskId!==""){
        var q = "DELETE FROM taskmanagement"+" WHERE taskId="+"'"+req.query.id+"'";
        connection.query(q, function (error, result) {
            if (error)
            {
                res.json({response: error});
            }
            else
            {
                showData(req,res);
            }
        });
    }
    else{
        res.json({response: "Id should not be an empty field"});
    }
})

app.get('/alltasks',(req,res)=>{
    showData(req,res);
})

app.get('/getTask',(req,res)=>{
    var q = "SELECT * from taskmanagement WHERE taskHolderName="+"'"+req.query.name+"'";
    connection.query(q, function (error, result) {
        if (error)
        {
            res.json({response: error});
        }
        else
        {
            res.json(result);
        }
    });
})

app.get('/changeStatus',(req,res)=>{
    if(req.query.id!=="" && req.query.status!==""){
        var q = "UPDATE taskmanagement SET taskStatus="+"'"+req.query.status+"'"+" WHERE taskId="+"'"+req.query.id+"'";
        connection.query(q, function (error, result) {
            if (error)
            {
                res.json({response: error});
            }
            else
            {
                showData(req,res);
            }
        });
    }
    else{
        res.json({response: "Task Id and Task Status should not be an empty field"});
    }
})

app.listen(port,()=>console.log(`server is listening in port ${port}`));