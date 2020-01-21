let sessionData = sessionStorage.getItem("values");
let localData = JSON.parse(localStorage.getItem("values"));
let data;

let t=0;

for(let i of localData)
{
    if(i.uname==sessionData)
    {
        data=i;
        break;

    }
} 

document.getElementById("name").value= data.fname + " " +data.lname;

showData();

function redirect(){
    window.location.href="./profileIndex.html";
}

function backToLogin(){
    sessionStorage.clear();
    window.location.href="./loginIndex.html";
}

function insertRow(){

    
    let task= document.getElementById("task").value;
    let date= document.getElementById("date").value;
    let category= document.getElementById("category").value;
    
    let status="Not Done";

    let newData={
        task:task,
        date:date,
        category:category,
        status:status
    };


    data.todoObj.push(newData);
    localStorage.setItem("values",JSON.stringify(localData));
    document.getElementById("newrow").reset();
    clearList();
    showData();
    

}

function showData(){
    
    let todoItems=[];
    let row;
    let list = document.getElementById("table");

    todoItems = data.todoObj;

    for(let i=0;i<todoItems.length;i++)
    {
        row = document.createElement('tr');

        row.innerHTML ="<td>" + '<input type="checkbox" id="markDone" value="Yes">'+ "</td>" +
       "<td>" + todoItems[i].task + "</td>" +
       "<td>" + todoItems[i].category + "</td>" +
        "<td>"+ todoItems[i].date + "</td>" +
        "<td>"+ todoItems[i].status + "</td>" +
        "<td>"+'<a href="#newrow"><button onclick="editData('+i+')">Edit</button></a>' +"</td>";
        list.appendChild(row);

    }      
    
    document.getElementById("profilePic").src = data.profileimg;
            
}

function clearList(){
    document.getElementById("table").innerHTML="";
}
function deleteTask()
{
    let tableData=document.getElementById("table")
    let allCheckedData=tableData.getElementsByTagName("input");
    for(let i=allCheckedData.length-1; i >= 0; i--)
    {
        if(allCheckedData[i].checked)
        {
            document.getElementById("table").deleteRow(i);
            data.todoObj.splice(i,1);
        }

    }
    localStorage.setItem("values",JSON.stringify(localData));

}

function setStatus()
{
    let tableData=document.getElementById("table")
    let allCheckedData=tableData.getElementsByTagName("input");
    console.log(allCheckedData);
    for(let i=allCheckedData.length-1; i >= 0; i--)
    {
        if(allCheckedData[i].checked)
        {
            data.todoObj[i].status="Done";
        }
    }
    localStorage.setItem("values",JSON.stringify(localData));
    clearList();
    showData();
}

function editData(i)
{
    let editItem=data.todoObj[i];
    let task=editItem.task;
    let date=editItem.date;
    let category=editItem.category;

    document.getElementById("task").value=task;
    document.getElementById("date").value=date;
    document.getElementById("category").value=category;
    document.getElementById("save").style.display="inline-block";
    document.getElementById("add").style.display="none";

    t=i;
    

    // saveChanges(i);
}

function saveChanges()
{
    

    let editItem=data.todoObj[t];

    editItem.task=document.getElementById("task").value;
    editItem.date=document.getElementById("date").value;
    editItem.category=document.getElementById("category").value;

    localStorage.setItem("values",JSON.stringify(localData));
    document.getElementById("newrow").reset();
    clearList();
    showData();
    
}


