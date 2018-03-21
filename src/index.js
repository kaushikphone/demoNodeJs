var employee_records_get_url ="http://localhost:3000/api/employeeList";
var employee_records_post_url="http://IN5CD7495V3X:3000/insertEmployeeList";
        $(document).ready(function () {
            EmployeeListBinding();
        });
        function EmployeeListBinding() {
            $.ajax({
                url: employee_records_get_url,
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
                        $("#TableAppendBar").append("<tr><td>"+FirstName+"</td><td>"+LastName+"</td><td>"+email+"</td><td>"+designation+"</td><td>"+phonenumber+"</td><td class='text-center'><a href='javascript:void(0)' class='btn btn-danger btn-sm' title='Edit' style='margin-right: 10px' onclick='editBtn()'>Edit</a><a href='javascript:void(0)' class='btn btn-danger btn-sm' title='Delete' onclick='DeleteBtn()'>Delete</a></td></td></tr>");
                    }
                },
                Error: function (xhr, status, error) {
                    console.log(xhr);
                }
            });
        };
        function EmployeeRecords(){
            //alert("Employee records");
            $("#InsertRecords").modal("show");
        }
        function InsertBarRecords(){
            var fName=$("#fName").val();
            var lName=$("#lName").val();
            var lblEmail=$("#lblEmail").val();
            var lblDesig=$("#lblDesig").val();
            var lblPhn=$("#lblPhn").val();
            $.ajax({
                url: employee_records_post_url,
                type: "POST",
                data: "{firstname:'" + fName + "',lastname:'" + lName + "',email:'" + lblEmail + "',designation:'" + lblDesig + "',phonenumber:'" + lblPhn + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                processData: false,
                timeout: 0,
                success: function (result) {
                    console.log(result);
                },
                Error: function (xhr, status, error) {
                    alert('Error in Under process Count', 'GST Compliance Portal', 'error');
                }
            });
            return false;
        }