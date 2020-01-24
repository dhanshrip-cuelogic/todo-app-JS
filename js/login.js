let logname, logpass;
let regData = JSON.parse(localStorage.getItem("values")) || [];
let flag=false;

function getLogData()
{
  
    logname = document.getElementById("username").value;
    logpass = document.getElementById("password").value;
    regData = JSON.parse(localStorage.getItem("values")) || [];


    if(logname=="" || logpass==""){

        alert("Please fill all the details.");
    }
    else{
        validateData();
    }

}

function redirect(){
    alert("Login Successful");
    window.location.href="./page/todoPage.html";
 }
 
 function validateData(){
    flag=false;
    for(let i in regData)
    {
        let regName= regData[i].uname;

        if(regName==logname)
        {   
            flag=true;
            let regPass=regData[i].pass;     
            if(regPass==logpass)
            {
                sessionStorage.setItem('values',logname);
                redirect();  
                // break;
            }
            else{
                alert("Invalid Password");   
            }
            
        }
        
    }

    if(flag==false){
        alert("Username does not exist");
    }
        
}