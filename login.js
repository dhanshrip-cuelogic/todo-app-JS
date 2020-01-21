function getLogData()
{
    let logname = document.getElementById("username").value;
    let logpass = document.getElementById("password").value;

    let regData = JSON.parse(localStorage.getItem("values"));

    for(let i in regData)
    {
        let regName= regData[i].uname;
        if(regName==logname)
        {      
            let regPass=regData[i].pass;     
            if(regPass==logpass)
            {
                sessionStorage.setItem('values',logname);
                redirect();  
            }
        }
    }

}

function redirect(){
   window.location.href="./todoPage.html";
}