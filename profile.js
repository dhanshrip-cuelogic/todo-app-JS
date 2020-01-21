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
    document.getElementById("gender").value=gender;
    document.getElementById("add").value=add;
}



function editProfile(){

    document.getElementById("pass").disabled=false;
    document.getElementById("fname").disabled=false;
    document.getElementById("lname").disabled=false;
    document.getElementById("gender").disabled=false;
    document.getElementById("add").disabled=false;

    document.getElementById("save").style.display="inline-block";
    document.getElementById("addbtn").style.display="none";

}

function saveProfileInfo()
{

    document.getElementById("pass").disabled=true;
    document.getElementById("fname").disabled=true;
    document.getElementById("lname").disabled=true;
    document.getElementById("gender").disabled=true;
    document.getElementById("add").disabled=true;

    data.pass=document.getElementById("pass").value;
    data.add=document.getElementById("add").value;
    data.fname=document.getElementById("fname").value;
    data.lname=document.getElementById("lname").value;
    data.gender=document.getElementById("gender").value;

    localStorage.setItem("values",JSON.stringify(localData));

    // let dataObj= {
    //     uname:uname,
    //     fname:fname,
    //     lname:lname,
    //     gender:gender,
    //     add:add,
    //     pass:pass,
    // };

    // let allUser=JSON.parse(localStorage.getItem('values')) || [];
    // allUser.push(dataObj);
    // localStorage.setItem("values",JSON.stringify(allUser));
    showProfile();

}