var loginData=(function()
{
    // if(sessionStorage.getItem("values")==null)
    // {
    //     window.location.href="index.html";
       
    // }
    /* 
     If Local Sorage is no present in the browser then it will show an alert that browser does not have Local Storage.
    */
    if(!localStorage)
    {
        alert("Browser is not having local storage!!!!");
    }



    let loginName, loginPassword;
    let localStorageData= JSON.parse(localStorage.getItem("values")) || [];
    let flag=false;

    
    
    return{

        /*
        * getLoginData()- Function will take login details entered into fields.

        * matchData()- Function will check whether the login details are already registered or not.
        */
        getLoginData:function()
        { 
            loginName = document.getElementById("username").value;
            loginPassword = document.getElementById("password").value;
            localStorageData = JSON.parse(localStorage.getItem("values")) || [];
        
            if(loginName=="" || loginPassword=="")
            {
        
                alert("Please fill all the details.");
            }
            else
            {
                this.matchData();
            }
        
        },

        /*
        * redirect()- Function will redirect to user to todo page after successful login of user.
        
        */
        redirect:function ()
        {
            alert("Login Successful");
            window.location.href="./html/todoPage.html";
        },

        /*
        * matchData()- Function will check whether the login details are already registered or not.

        * flag- It will set to true if login name is found registered and it will then check the password of that user,
               if password matches with the registered password then only it will create a session for that user,
               and it will redirect to the todo Page.

        */
        matchData:function()
        {
            flag=false;

            for(let i in localStorageData)
            {
                let registeredName= localStorageData[i].uname;

                if(registeredName==loginName)
                {    
                    let registeredPass=localStorageData[i].pass;  
                    flag=true;

                    if(registeredPass==loginPassword)
                    {
                        sessionStorage.setItem('values',loginName);
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