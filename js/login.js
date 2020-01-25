var loginData=(function()
{
    // if(sessionStorage.getItem("values")==null)
    // {
    //     window.location.href="loginIndex.html";
       
    // }
    if(!localStorage)
    {
        alert("Browser is not having local storage!!!!");
    }

    let logname, logpass;
    let regData= JSON.parse(localStorage.getItem("values")) || [];
    let flag=false;

    
    
    return{

        
        getLogData:function()
        { 
            logname = document.getElementById("username").value;
            logpass = document.getElementById("password").value;
            regData = JSON.parse(localStorage.getItem("values")) || [];
        
            if(logname=="" || logpass=="")
            {
        
                alert("Please fill all the details.");
            }
            else
            {
                this.validateData();
            }
        
        },

        redirect:function ()
        {
            alert("Login Successful");
            window.location.href="./page/todoPage.html";
        },

        validateData:function()
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
                        this.redirect();
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
    };
   
    
})();