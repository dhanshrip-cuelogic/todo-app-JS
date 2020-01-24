let sessionData = sessionStorage.getItem("values");
// alert(sessionData);
let localData = JSON.parse(localStorage.getItem("values"));
// alert(localData);
let data;

for(let i of localData)
{
    if(i.uname==sessionData)
    {
        data=i;

    }
}   

document.getElementById("profilePic").src = data.profileimg;
            

showProfile();


function showProfile()
{

    let uname=data.uname;
    let pass=data.pass;
    let add=data.add;
    let fname=data.fname;
    let lname=data.lname;
    let gender=data.gender;

    document.getElementById("uname").value=uname;
    document.getElementById("pass").value=pass;
    document.getElementById("fname").value=fname;
    document.getElementById("lname").value=lname;
    document.getElementById("add").value=add;

    if (gender == "Male"){
        document.getElementsByName("gender")[0].checked=true;
    }
    else if (gender == "Female"){
        document.getElementsByName("gender")[1].checked=true;
    }
    else{
        document.getElementsByName("gender")[2].checked=true;
    }
    
}



function editProfile(){


    document.getElementById("save").style.display="inline-block";
    document.getElementById("addbtn").style.display="none";


    document.getElementById("pass").disabled=false;
    document.getElementById("fname").disabled=false;
    document.getElementById("lname").disabled=false;
    // document.getElementsByName("gender").disabled=false;
    document.querySelectorAll('input[name="gender"]').disabled=false;
    // for(var i=0;i<a.length;i++)
    //  {
    //     (a[i].disabled==false);
    
    //  } 


    document.getElementById("add").disabled=false;

}

function saveProfileInfo()
{

    document.getElementById("save").style.display="none";
    document.getElementById("addbtn").style.display="inline-block";

    document.getElementById("pass").disabled=true;
    document.getElementById("fname").disabled=true;
    document.getElementById("lname").disabled=true;
    // document.getElementsByName("gender").disabled=true;
    document.querySelectorAll('input[name="gender"]').disabled=true;

    // for(var i=0;i<a.length;i++)
    //  {
    //     (a[i].disabled==true);
    
    //  } 

    document.getElementById("add").disabled=true;

    data.pass=document.getElementById("pass").value;
    data.add=document.getElementById("add").value;
    data.fname=document.getElementById("fname").value;
    data.lname=document.getElementById("lname").value;
    data.gender= document.querySelectorAll('input[name="gender"]');

    var a =document.querySelectorAll('input[name="gender"]');

   for(var i=0;i<a.length;i++)
    {   
    
        if(a[i].checked==true)
        {
            data.gender=a[i].value;
        }
    } 
  

    localStorage.setItem("values",JSON.stringify(localData));

    showProfile();

}

function validateProfile(){

    let fname= document.getElementById("fname").value;
    let lname= document.getElementById("lname").value;
    // let gender= document.querySelector('input[name="gender"]:checked').value;
    let add= document.getElementById("add").value;
    let pass= document.getElementById("pass").value;

    let regexPass= /([A-Z]+)([a-z]?.*)([!@#\$%\^&\*\.].*)([0-9].*)/;

    let genderValue=true;
    let flag = false;
    
    genderValue= checkGender();

    let profile = sessionStorage.getItem("displayPicture");


    if(fname==""|| lname==""|| pass==""){

        alert("Please fill all the required details.");
    }
    else if(pass.length<8){
        alert("length of password should be greater than 8.")    
        
    }
    else if(!(regexPass.test(pass))){
        alert("Invalid Password");
    }
    else if(genderValue==false){
        alert("Please select any one gender.");
    }

    else{
        flag=true;
    }
    if(flag==true)
    {
        saveProfileInfo();
    }

}

function checkGender(){
    let a= document.querySelectorAll('input[name="gender"]');
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