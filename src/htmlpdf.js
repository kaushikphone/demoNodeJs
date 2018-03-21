var urlx_progress ="http://localhost:3000/api/employeeList";
var checkedEvent,dataSelectorEvent,dataUnChecked;
        $(document).ready(function () {
            EmployeeListBinding();
        });
        function firstNameSelector($this){
            if($($this).is(':checked')){
                checkedEvent=$this.attributes[1].nodeValue;
                dataSelectorEvent=$this.attributes[3].nodeValue;
                dataUnChecked=$this.attributes[2].nodeValue;
                injectSelectionEvent(checkedEvent,dataSelectorEvent);
            }
            else{
                  injectSelectionEvent(dataUnChecked,dataSelectorEvent);
            }
        }
        function injectSelectionEvent(checkedEvent,dataSelectorEvent){
                try{
                    $('#TableAppendBar > tr').each(function() {
                        let firstName=$(this).find('td:eq(0)').text();
                        if(dataSelectorEvent=="firstName"){
                            if(checkedEvent=="checked"){      
                                $(this).find('td:eq(0)').find('.progress-bar').css("width","100%").css("color","#fff");
                            }   
                            else{
                                $(this).find('td:eq(0)').find('.progress-bar').css("width","0%").css("color","#000");
                            }
                        }
                        
                        if(dataSelectorEvent=="lastName"){
                            if(checkedEvent=="checked"){
                                $(this).find('td:eq(1)').find('.progress-bar').css("width","100%").css("color","#fff");
                            }
                            else{
                                $(this).find('td:eq(1)').find('.progress-bar').css("width","0%").css("color","#000");
                            }
                        }
                    });
                }
                catch(e){
                    console.log("Console Error"+e);
                }
        }
        function EmployeeListBinding() {
            $.ajax({
                url: urlx_progress,
                type: "GET",
                async: true,
                success: function (data) {
                    console.log(data);
                    $("#TableAppendBar").empty();
                    for(var i=0; i<data[1].data.recordset.length; i++){
                        var FirstName=data[1].data.recordset[i].firstname;
                        var LastName=data[1].data.recordset[i].lastname;
                        var designation=data[1].data.recordset[i].designation;
                        var email=data[1].data.recordset[i].email;
                        var phonenumber=data[1].data.recordset[i].phonenumber;
                        $("#TableAppendBar").append("<tr><td><div class='progress'><div class='progress-bar' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100'>"+FirstName+"</div></div></td><td><div class='progress'><div class='progress-bar'>"+LastName+"</div></div></td><td>"+email+"</td><td>"+designation+"</td><td>"+phonenumber+"</td></tr>");
                    }
                },
                Error: function (xhr, status, error) {
                    console.log(xhr);
                }
            });
        };