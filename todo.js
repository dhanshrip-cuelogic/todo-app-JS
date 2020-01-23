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
    let startdate= document.getElementById("startdate").value;
    let duedate= document.getElementById("duedate").value;
    let category= document.querySelector("input[name=category]:checked").value;
    
    let status="Not Done";

    let newData={
        task:task,
        startdate:startdate,
        duedate:duedate,
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

    document.getElementById("profilePic").src = data.profileimg;

    todoItems = data.todoObj;
    
    for(let i=0;i<todoItems.length;i++)
    {
        row = document.createElement('tr');

        row.innerHTML ="<td>" + '<input type="checkbox" id="markDone" value="Yes">'+ "</td>" +
       "<td>" + todoItems[i].task + "</td>" +
       "<td>" + todoItems[i].category + "</td>" +
       "<td>"+ todoItems[i].startdate + "</td>" +
        "<td>"+ todoItems[i].duedate + "</td>" +
        "<td>"+ todoItems[i].status + "</td>" +
        "<td>"+'<a href="#newrow"><button onclick="checkEdit('+i+')">Edit</button></a>' +"</td>";
        list.appendChild(row);

    }      
    if(todoItems.length==0)
    {
        document.getElementById("head1").style.visibility="hidden";

    }
    else{
        document.getElementById("head1").style.visibility="visible";
    }

    
            
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

    if(data.todoObj.length==0)
    {
        document.getElementById("head1").style.visibility="hidden";

    }
    else{
        document.getElementById("head1").style.visibility="visible";
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

function checkEdit(i){
    if(data.todoObj[i].status=="Done")
    {
        alert("Cannot edit completed task.");
    }
    else{
        editData(i);
    }
}

function editData(i)
{
    let editItem=data.todoObj[i];
    let task=editItem.task;
    let startdate=editItem.startdate;
    let duedate=editItem.duedate;
    let category=editItem.category;

    document.getElementById("task").value=task;
    document.getElementById("startdate").value=startdate;
    document.getElementById("duedate").value=duedate;
    document.getElementsByName("category").value=category;
    document.getElementById("save").style.display="inline-block";
    document.getElementById("add").style.display="none";

    t=i;
}

function saveChanges()
{
    

    let editItem=data.todoObj[t];

    editItem.task=document.getElementById("task").value;
    editItem.startdate=document.getElementById("startdate").value;
    editItem.duedate=document.getElementById("duedate").value;
    editItem.category=document.querySelector("input[type=checkbox]:checked").value;

    document.getElementById("save").style.display="none";
    document.getElementById("add").style.display="inline-block";

    localStorage.setItem("values",JSON.stringify(localData));
    document.getElementById("newrow").reset();
    clearList();
    showData();
    
}


