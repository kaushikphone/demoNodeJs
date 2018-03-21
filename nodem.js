//Declare your module at first in node js
var http = require('http');
var express = require('express');
var router = express();
var mysql = require('mysql');
var parser= require('body-parser');
var path    = require("path");
var engine = require('ejs-locals');
//create database connection with mysql
var con = mysql.createConnection({host: "localhost",user: "root",password: "",database: "product_shop"});
try{
    con.connect();
}
catch(e){
    console.log('Database Connetion failed:' + e);
}
//create your routing part and set to our port
router.use(express.static(__dirname + '/styles'));//add your stylesheet and javascript file using express static js
router.engine('ejs', engine);
router.set('view engine', 'ejs');
router.use(parser.json());
router.use(parser.urlencoded({ extended: true }));
router.set('port', process.env.PORT || 3000);


//create home view and show only html here
router.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


router.get('/', function (req, res) {
    //set access control origin in node js
//res.send('<p>Welcome to our shopping product url hosting</p>');
    res.sendFile(path.join(__dirname+'/frontEnd/index.html'));
});


//create get api in json format and show with custom routing
//url for get: http://127.0.0.1:3000/api/products
router.get('/api/products', function (req,res) {
    con.query('SELECT * from nd_products', function(err, rows, fields) {
        if (!err){
            var response = [];
            response.push({'result' : 'success'});
            if (rows.length != 0) {
                response.push({'data' : rows});
            } else {
                response.push({'msg' : 'No Result Found'});
            }


            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        } else {
            res.status(400).send(err);
        }
    });
});


//insert product api in json format and show with custom urlencoded
http://127.0.0.1:3000/insertproduct
    router.post('/insertproduct',function(req,res){
        var id = req.params.id, response = [];
        if (
            typeof req.body.name !== 'undefined' &&
            typeof req.body.price !== 'undefined' &&
            typeof req.body.imageUrl !== 'undefined'
        ) {
            var name = req.body.name;
            var price = req.body.price;
            var imageUrl = req.body.imageUrl;
            var records = [[name,price,imageUrl]];
            con.query("INSERT INTO nd_products (product_name, product_price,product_image) VALUES ?",[records],
                function(err, result) {
                    if (!err){


                        if (result.affectedRows != 0) {
                            response.push({'result' : 'inserted data successfully'});
                        } else {
                            response.push({'msg' : 'No Result Found'});
                        }
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).send(JSON.stringify(response));
                    } else {
                        res.status(400).send(err);
                    }
                });


        } else {
            response.push({'result' : 'error', 'msg' : 'Please fill required details'});
            res.setHeader('Content-Type', 'application/json');
            res.send(200, JSON.stringify(response));
        }
    });


//update product api in json format and show with custom urlencoded
http://127.0.0.1:3000/product/edit/2[its a dynamic]
    router.post('/product/edit/:id', function (req,res) {
        var id = req.params.id, response = [];


        if (
            typeof req.body.name !== 'undefined' &&
            typeof req.body.price !== 'undefined' &&
            typeof req.body.imageUrl !== 'undefined'
        ) {
            var name = req.body.name;
            var price = req.body.price;
            var imageUrl = req.body.imageUrl;


            con.query('UPDATE nd_products SET product_name = ?, product_price = ?, product_image = ? WHERE id = ?',
                [name, price, imageUrl, id],
                function(err, result) {
                    if (!err){


                        if (result.affectedRows != 0) {
                            response.push({'result' : 'success'});
                        } else {
                            response.push({'msg' : 'No Result Found'});
                        }


                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).send(JSON.stringify(response));
                    } else {
                        res.status(400).send(err);
                    }
                });


        } else {
            response.push({'result' : 'error', 'msg' : 'Please fill required details'});
            res.setHeader('Content-Type', 'application/json');
            res.send(200, JSON.stringify(response));
        }
    });
//delete product id from node js and show in custom data urlencoded
http://127.0.0.1:3000/product/delete/2
    router.delete('/product/delete/:id', function (req,res) {
        var id = req.params.id;
        con.query('DELETE FROM nd_products WHERE id = ?', [id], function(err, result) {
            if (!err){
                var response = [];


                if (result.affectedRows != 0) {
                    response.push({'result' : 'data deleted successfully'});
                } else {
                    response.push({'msg' : 'No Result Found'});
                }


                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(response));
            } else {
                res.status(400).send(err);
            }
        });
    });
// one by one entry show and get into custom url set
http://127.0.0.1:3000/product/4[number is dynamic and show into table]
    router.get('/product/:id', function (req,res) {
        var id = req.params.id;
        con.query('SELECT * from nd_products where id = ?', [id], function(err, rows, fields) {
            if (!err){
                var response = [];
                if (rows.length != 0) {
                    response.push({'result' : 'your product entry is displayed one by one', 'data' : rows});
                } else {
                    response.push({'result' : 'error', 'msg' : 'No Results Found'});
                }


                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(response));
            } else {
                res.status(400).send(err);
            }
        });
    });


//create your http server where port is by default running
http.createServer(router).listen(router.get('port'), function(){
    console.log('Server listening on port ' + router.get('port'));
});