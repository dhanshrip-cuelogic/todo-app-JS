(function()
{
    if(sessionStorage.getItem("values")==null)
    {
        window.location.href="loginIndex.html";
       
    }
    if(!localStorage)
    {
        alert("Browser is not having local storage!!!!");
    }
})();


let logname, logpass;
let regData= parseLocalStorage();
let flag=false;


function getLogData()
{ 
    logname = document.getElementById("username").value;
    logpass = document.getElementById("password").value;
    regData = parseLocalStorage();

    if(logname=="" || logpass=="")
    {

        alert("Please fill all the details.");
    }
    else
    {
        validateData();
    }

}


function redirect()
{
    alert("Login Successful");
    window.location.href="./page/todoPage.html";
}


function validateData()
{
    flag=false;

    for(let i in regData)
    {
        let regName= regData[i].uname;

        if(regName==logname)
        {    
            let regPass=regData[i].pass;  
            flag=true;

            if(regPass==logpass)
            {
                sessionStorage.setItem('values',logname);
                redirect();  
            }
            else
            {
                alert("Invalid Password");   
            }
            
        }
        
    }

    if(flag==false)
    {
        alert("Username does not exist");
    }
        
}

function parseLocalStorage()
{
    return (JSON.parse(localStorage.getItem("values")) || []);
}
