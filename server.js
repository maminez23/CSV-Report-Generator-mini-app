const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/client'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/', function(req,res){
console.log(req.body);
    res.status(200)
    res.send('hello')
});

app.get('/', function (req, res){


});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('server listening on port 3000');
