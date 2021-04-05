const manager = require('./DatabaseManager'); //Has get_password, update_password, add_password, remove_password
var express = require('express');
var cors = require("cors");

var app = express(); 
app.use(express.json()); 
app.use(cors());

const port_id = 8080; 

app.post('/', (req, res) => {
    var user_id = req.body.user; var label = req.body.label;
    manager.get_password(user_id, label, (result) => {
        res.send({message: result});
    });
 });

app.put('/', (req, res) => { 
    var user_id = req.body.user; 
    var label = req.body.label; 
    var login = req.body.login; 
    var password = req.body.pass;
    manager.add_password(user_id, label, login, password, (result) => {
        res.send({message: result});
    });
});

app.patch('/', (req, res) => {
    var user_id = req.body.user;
    var label = req.body.label; 
    var login = req.body.login; 
    var password = req.body.pass;
    manager.update_password(user_id, label, login, password, (result) => { 
        res.send({message: result}); 
    });
});

app.delete('/', (req, res) => { 
    var user_id = req.body.user; 
    var label = req.body.label; 
    manager.remove_password(user_id, label, (result) => {
        res.send({message: result}); 
    });
});

var server = app.listen(port_id, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('running at http://' + host + ':' + port);
 })