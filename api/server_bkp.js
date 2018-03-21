var http = require('http');
var express = require('express');
var app = express();
//const mysql = require('mysql');
var sql = require("mssql");
var config = {
    user: 'IN\\kaushikd839',
    password: '',
    server: '127.0.0.1',
    database: 'kaushikDB'
};
app.set('port', process.env.PORT || 3000);

//connection configuration settings in node js
// connect to your database

app.get('/api/employeeList', function (req,res) {
    try {
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




http.createServer(app).listen(app.get('port'), function(){
    console.log('Server listening on port ' + app.get('port'));
});