
function getData() {

    let uname= document.getElementById("username").value;
    let fname= document.getElementById("fname").value;
    let lname= document.getElementById("lname").value;
    // let gender= document.querySelector('input[name="gender"]:checked').value;
    let add= document.getElementById("address").value;
    let pass= document.getElementById("password").value;
    let confirmPass = document.getElementById("confirmPass").value;
    // let profileimg=document.getElementById("profileimg").value;
    let gender;

    let regexPass= /([A-Z]+)([a-z]?.*)([!@#\$%\^&\*\.].*)([0-9].*)/;

    let todoObj= [];
    let temp=true;
    let genderValue=true;
    let flag = false;

    temp=checkuname(uname);
    
    genderValue= checkGender();

    let profile = sessionStorage.getItem("displayPicture");

    if(pass!=confirmPass){
        alert("Please type same password in both fields.");
        
    }

    else if(temp==false){
        alert("Username already exist!!");
    }

    else if(genderValue==false){
        alert("Please select any one gender.");
    }

    else if(uname=="" || fname==""|| lname==""|| add==""|| pass==""){

        alert("Please fill all the details.");
    }
    else if(pass.length<8){
        alert("length of password should be greater than 8.")    
        
    }
    else if(!(regexPass.test(pass))){
        alert("Invalid Password");
    }
    else{
        flag=true;
    }
    if(flag==true)
    {
        let dataObj= {
            uname:uname,
            fname:fname,
            lname:lname,
            gender:gender,
            add:add,
            pass:pass,
            profileimg:profile,
            todoObj: []
        };
    
        let allUser=JSON.parse(localStorage.getItem('values')) || [];
        allUser.push(dataObj);
        localStorage.setItem("values",JSON.stringify(allUser));
        document.getElementById("myform").reset();
        redirect();
    
    }
}
function redirect(){
   window.location.href="./loginIndex.html";
}

function checkuname(uname){
    let localData = JSON.parse(localStorage.getItem("values"));

    for(let i of localData)
    {
        if(i.uname==uname)
        {
            return (false);
            break;

        }
    } 
}

function checkGender(){
    let a= document.getElementsByName("gender");
    let count=0;
    for( let i=0; i<a.length;i++)
    {
        if(a[i].checked==true)
        {
            count++;
        }
    }
    if(count!=1)
    {
        return (false);
    }

}
function uploadImg()
{
    let Image = document.getElementById("profileimg").files[0];

    let imagereader = new FileReader();
    imagereader.readAsDataURL(Image);

    imagereader.onload = function ()
    {
        let imgdata = imagereader.result;
        sessionStorage.setItem("displayPicture", imgdata);
        document.getElementById("profilePic").src = imgdata;
    };
}