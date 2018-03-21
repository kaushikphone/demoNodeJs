$(document).ready(function() {

    $('#uploadForm').submit(function() {
        $("#status").empty().text("File is uploading...");
        $(this).ajaxSubmit({

            error: function(xhr) {
                status('Error: ' + xhr.status);
            },

            success: function(response) {
                $("#status").empty().text(response);
                console.log(response);
                $("#FileDataInserted").empty();
                for(var i=0; i<response.length;i++) {
                    let ID=i+1;
                    let mimeType=response[i].mimetype;
                    let Destination=response[i].destination;
                    let Encoding =response[i].encoding;
                    let FieldName=response[i].fieldname;
                    let removeSpaceFileName=response[i].filename.replace(/\s/g, "");
                    let MimeType=response[i].mimetype;
                    let OriginalName=response[i].originalname;
                    let pathd=response[i].path;
                    let size=response[i].size;
                    $("#FileDataInserted").append("<tr><td>" + response[i].originalname + "</td><td>" + response[i].mimetype + "</td><td><a href=/download/"+removeSpaceFileName+" title='"+response[i].filename+"'>" + response[i].path + "</a><a href='javascript:void(0)' class='btn btn-danger' style='clear:left;float:right' onclick=executeFile('"+removeSpaceFileName+"')>ReadFile</button></td></tr>");
                    InsertUploadedData(ID,Destination,Encoding,FieldName,removeSpaceFileName,MimeType,OriginalName,pathd,size);
                }
                
            }
        });
        //Very important line, it disable the page refresh.
        return false;
    });
});

function downloadFile(){
    $.getJSON( '/api/download/', function( data ) {
        console.log(data);
    });
}

function executeFile(fileNamed){
    $.ajax({
        url: "/readFile/"+fileNamed,
        type: "GET",
        //data: JSON.stringify(fileNamed),
        //contentType: 'text/plain',
        //dataType: "json",
        async: true,
        success: function(data,status,xhr){
            console.log('Success:'+data);
            $("#responseBinding").html(data);
        }
});
    $("#myModal").modal("show");
}
function InsertUploadedData(ID,Destination,Encoding,FieldName,removeSpaceFileName,MimeType,OriginalName,pathd,size){
    //console.log("id:"+ID,"Destination:"+Destination,"Encoding:"+Encoding,"FieldName:"+FieldName,"FiledName:"+removeSpaceFileName,"MimeType:"+MimeType,"OriginalName:"+OriginalName,"pathd:"+pathd,"size:"+size);
    var data = {};
		data.id = ID;
        data.destination = Destination;
        data.encoding=Encoding;
        data.fieldname=FieldName;
        data.fileNamed=removeSpaceFileName;
        data.mimetype=MimeType;
        data.originalname=OriginalName;
        data.pathd=pathd;
        data.size=size;
    $.ajax({
        url:"/api/InsertMasterData",
        type:"POST",
        data:JSON.stringify(data),
        //data: JSON.parse("{id:'" + ID + "',destination:'" + Destination + "',encoding:'" + Encoding + "',fieldname:'" + FieldName + "',filedname:'" + removeSpaceFileName + "',mimetype:'" + MimeType + "',originalname:'" + OriginalName + "',pathd:'" + pathd + "'size:'" + size + "'}"),
        contentType: "application/json",
        dataType: "json",
        async: true,
        success: function(data,status,xhr){
            console.log(data);
        },
        error:function(xhr){
            console.log(xhr);
        }
    })
}