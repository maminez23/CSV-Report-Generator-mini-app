const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const helpers = require('./helpers');
const fs = require('fs');


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
var set = false;
app.post('/', function(req,res){

    if(!set){
        set = true
        helpers.setHeaders(JSON.parse(JSON.stringify(req.body)));

    }
    helpers.setBody(JSON.parse(JSON.stringify(req.body)))
    fs.readFile('csv-data', (err, txt) => {
        if(err){
            throw new Error('there was an error while reading data')
        }
        else{
            res.status(200);
            res.send(txt);

        }
    })
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('server listening on port 3000');
