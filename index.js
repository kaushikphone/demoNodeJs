var express=require("express");
var path=require("path");
var bodyParser = require("body-parser");
//var mime = require('mime');
var sql = require('mssql');
var fs = require('fs');
var util= require('util');
var multer  = require('multer');
var router = module.exports = express();
const https = require("https");
var url = require('url');
var engine = require('ejs-locals');
//const request = require("request");
url ="https://maps.googleapis.com/maps/api/geocode/json?address=Florence";
var msgArray=[];

//configuration in mssql package
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


//var fs = require('fs');
//eval(fs.readFileSync('tool.js')+'');
//module.exports.FetchEmployList();

//get request api in node js console
/*request.get(url, (error, response, body) => {
    let json = JSON.parse(body);
    let message=
    console.log(
        `City: ${json.results[0].formatted_address} -`,
        `Latitude: ${json.results[0].geometry.location.lat} -`,
        `Longitude: ${json.results[0].geometry.location.lng}`
    );
});*/



//get https request in node js
https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    let message="";
    res.on("data", data => {
        body += data;
    });
    res.on("end", () => {
        body = JSON.parse(body);
        //console.log(body.results[0]);
        /*msgArray.push({
            'City': body.results[0].city,
            'Latitude': body.results[0].lat,
            'Longitude': body.results[0].lang
        });*/
        /*console.log(
            `City: ${body.results[0].formatted_address} -`,
            `Latitude: ${body.results[0].geometry.location.lat} -`,
            `Longitude: ${body.results[0].geometry.location.lng}`
        );*/
        //console.log(msgArray);
    });
});


router.engine('.html', require('ejs').__express);
router.set('view engine', 'ejs');

//Template file stored here
//router.use(express.static(path.join(__dirname + '/myApp')+ '/angular.min.js'));
//router.use(express.static(path.join(__dirname + '/myApp')));
router.use("/src", express.static(__dirname + "/src"));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
//router.use(express.static(__dirname + '/myApp')+ '/myApp.js');
router.set('views', __dirname + '/front');
//router.set('views',__dirname + '/myApp');
router.set('view engine', 'html');

//looping ul and li inside node module
var messages = [
    { name: 'Nathan Explosion', message: 'Dethklok rules' },
    { name: 'William Murderface', message: 'Bass is the heart of the band' },
    { name: 'Dr. Rockso', message: 'Where is my friend Toki?' },
    { name: 'kaushik', message: 'FFF' }
];

/*index html file rendered here
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/front'+'/index.html'));
});

//about html file rendered here
router.get('/about',function (req,res) {
    res.sendfile(path.join(__dirname+'/front'+'/about.html'));
});

router.get('/sitemap',function(req,res){
    res.sendFile(path.join(__dirname+'/front'+'/sitemap.html'));
});

var server = router.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
router.listen(3000);
console.log("Running at Port 3000");*/
//file upload using multer
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname.replace(/\s/g, ""));
        
    }
});
var upload = multer({ storage : storage }).any();




router.get('/', function(req, res){
    res.render('index', {
        pageTitle: 'index',
        messages: msgArray
    });
});
router.get('/about', function(req, res){
    res.render('about', {
        pageTitle: 'about us',
        messages: msgArray
    });
});
router.get('/htmlpdf', function(req, res){
    res.render('htmlpdf', {
        pageTitle: 'htmlpdf',
        messages: msgArray
    });
});

//file upload using node js and express js
router.post('/api/fileUpload',function(req,res,next){
    upload(req,res,function(err) {
        //console.log(req.files);
        if(err) {
            return res.end("Error uploading file.");
        }
        res.send(req.files);
    });
});
//file download using node js and express js
router.get('/download/:file(*)', function(req, res, next){
    var path=require('path');
    var file = req.params.file;
    var path = path.resolve(".")+'/uploads/'+file;
    res.setHeader('Content-disposition', 'attachment; filename=' + file);
    //res.setHeader('Content-type', file.mimetype);
    res.download(path);
  });

//Read file using node and express js framework
router.get('/readFile/:file(*)',function(req, res, next){
    let extractBodyValue = Object.keys(req.body);
    let file=req.params.file;
    //console.log("kaushik:"+util.inspect(extractBodyValue[0],{showHidden: false, depth: null}));
    fs.readFile("uploads/"+file, function(err, data) {
        if (err) throw err;
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(data);
        return res.end(data);
    });
});
//calling store procedure and store into database
function executeStoreProcedure(req,res){
    debugger
    let ID = req.body.id;
    let Destination=req.body.destination;
    let Encoding=req.body.encoding;
    let Fieldname=req.body.fieldname;
    let Filedname=req.body.fileNamed;
    let MimeType=req.body.mimetype;
    let Originalname=req.body.originalname;
    let Pathd=req.body.pathd;
    let Sized=req.body.size;
    console.log("ID:"+ID);
    console.log("Destination:"+Destination);
    var dbConn = new sql.ConnectionPool(config);
    //console.log(dbConn);
    //console.log("id:"+id);
    //console.log("id:"+util.inspect(id,{showHidden: false, depth: null}));
    let response={};
    dbConn.connect().then(function (dbConn) {
        var request = new sql.Request(dbConn);
        console.log(request);
        //request.input('id', sql.Int, ID);
        request.input('destination', sql.VarChar(20), Destination);
        request.input('encoding',sql.VarChar(20),Encoding);
        request.input('fieldname',sql.VarChar(15),Fieldname);
        request.input('filedname',sql.VarChar(50),Filedname);
        request.input('mimetype',sql.VarChar(20),MimeType);
        request.input('originalname',sql.VarChar(15),Originalname);
        request.input('pathd',sql.VarChar(100),Pathd);
        request.input('size',sql.Int,Sized);
        request.input('StatementType',sql.NVarChar(20),"Insert");
        request.input('SuccessMessage',sql.VarChar(50));
        request.execute("MasterInsertData").then(function(err, recordsets, returnValue, affected){
            console.log(recordsets);
            response=recordsets;
            //res.send(response);
            //res.send({ message: recordsets});
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.send({ message: JSON.stringify(recordsets) });
            dbConn.close();
        }).catch(function(err){
            console.log(err);
            dbConn.close();
        })
    })
    
}
router.post('/api/InsertMasterData',function(req,res,next){
    console.log("Got response code: " + res.statusCode);
    console.log("Request body:"+JSON.stringify(req.body));
    executeStoreProcedure(req,res);
    //res.send("Data Inserted Successfully");
    //res.send(req.body);
    
});

if (!module.parent) {
    router.listen(8080);
    console.log('Running at Port 8080');
}