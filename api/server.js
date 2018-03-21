var http = require('http');
var express = require('express');
var app = express();
var cors = require('cors');
var parser= require('body-parser');
var sql = require("mssql");
//app.use(cors());
var config = {
    user: 'sa',
    password: 'pass@123',
    server: 'IN5CD7495V3X',
    database: 'kaushikDB',
    dialect: "mssql",
    dialectOptions: {
        instanceName: "MSSQLSERVER"
    }
};
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);

//create home view and show only html here
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//get api from node js
app.get('/api/employeeList',cors(), function (req,res) {
    try {
        sql.close();
        sql.connect(config, function (err) {
            if (err) console.log(err);

            var request = new sql.Request();
            request.query('select * from employeeList', function (err, rows, fields) {
                if (!err) {
                    var response = [];
                    response.push({'result': 'success'});
                    if (rows.length != 0) {
                        response.push({'data': rows});
                    } else {
                        response.push({'msg': 'No Result Found'});
                    }
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send(JSON.stringify(response));
                } else {
                    res.status(400).send(err);
                }

            });
        });
    }
    catch (e){
        console.log('Database Connetion failed:' + e);
    }
});
//insert product api in json format and show with custom urlencoded
http://IN5CD7495V3X:3000/insertEmployeeList
app.post('/insertEmployeeList',function(req,res){
    try {
        var id = req.params.id, response = [];
        if (
            typeof req.body.firstname !== 'undefined' &&
            typeof req.body.lastname !== 'undefined' &&
            typeof req.body.designation !== 'undefined' &&
            typeof req.body.email !== 'undefined' &&
            typeof req.body.phonenumber !== 'undefined'
        ) {
            var firstname = req.body.firstname;
            var lastname = req.body.lastname;
            var designation = req.body.designation;
            var email = req.body.email;
            var phonenumber = req.body.phonenumber;
            var records = [[firstname, lastname, designation, email, phonenumber]];
            console.log(records[0]);
            sql.close();
            sql.connect(config, function (err) {
                if (err) console.log(err);
                var request = new sql.Request();
                var sqlQueryText="INSERT INTO employeeList (firstname,lastname,email,designation,phonenumber) VALUES ('"+firstname+"\'\,\'"+lastname+"\'\,\'"+email+"'\,\'"+designation+"\'\,\'"+phonenumber+"')";

                request.query(sqlQueryText)
                    .then(function (err, result) {
                        if (!err) {

                            if (result.affectedRows != 0) {
                                response.push({'result': 'inserted Employee data successfully'});
                            } else {
                                response.push({'msg': 'No Result Found'});
                            }
                            res.setHeader('Content-Type', 'application/json');
                            res.status(200).send(JSON.stringify(response));
                        } else {
                            res.status(400).send(err);
                        }
                    });
            });
        } else {
            response.push({'result': 'error', 'msg': 'Please fill required details'});
            res.setHeader('Content-Type', 'application/json');
            res.send(200, JSON.stringify(response));
        }
    }
    catch (e){
        console.log('Database Connetion failed:' + e);
    }
});








//update product api in json format and show with custom urlencoded
http://IN5CD7495V3X:3000/employeeList/edit/2[its a dynamic]
    app.post('/employeeList/edit/:id', function (req,res) {
        var ID = req.params.id, response = [];


        if (
            typeof req.body.firstname !== 'undefined' &&
            typeof req.body.lastname !== 'undefined' &&
            typeof req.body.designation !== 'undefined' &&
            typeof req.body.email !== 'undefined' &&
            typeof req.body.phonenumber !== 'undefined'
        ) {
            var firstname = req.body.firstname;
            var lastname = req.body.lastname;
            var designation = req.body.designation;
            var email = req.body.email;
            var phonenumber = req.body.phonenumber;


            sql.query('UPDATE employeeList SET firstname = ?, lastname = ?, designation = ?, email = ?, phonenumber = ? WHERE id = ?',
                [firstname, lastname, designation,email,phonenumber, ID],
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


//api for one by one data storage
//http://IN5CD7495V3X:3000/api/employeeList/?id=4[number is dynamic and show into table]
app.get('api/employeeList/:id',cors(), function (req,res) {
    try {
        sql.close();
        sql.connect(config, function (err) {
            if (err) console.log(err);
            var id = req.params.id;
            console.log(id);
            sql.query('SELECT * from employeeList where id = ?', [id], function (err, rows, fields) {
                if (!err) {
                    var response = [];
                    if (rows.length != 0) {
                        response.push({'result': 'your employeeList entry is displayed one by one', 'data': rows});
                    } else {
                        response.push({'result': 'error', 'msg': 'No Results Found'});
                    }
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send(JSON.stringify(response));
                } else {
                    res.status(400).send(err);
                }
            });
        });
    }
    catch (e){
        console.log('Database Connetion failed:' + e);
    }
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Server listening on port ' + app.get('port'));
});