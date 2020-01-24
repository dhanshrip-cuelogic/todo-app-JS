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

let sort=document.getElementById("filter").value;

showData();

function redirect(){
    window.location.href="./profileIndex.html";
}

function backToLogin(){
    sessionStorage.clear();
    window.location.href="../loginIndex.html";
}

function insertRow(){

    
    let task= document.getElementById("task").value;
    let startdate= document.getElementById("startdate").value;
    let duedate= document.getElementById("duedate").value;
    let a= document.querySelectorAll("input[name=category]");
    let category;

    for(var i=0;i<a.length;i++)
    {
        if(a[i].checked==true)
        {
            category=a[i].value;
        }
    }
    let status="Not Done";
    let values=validateAdd(task,startdate,duedate,category);

    if(values==true)
    {
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
        sortBy();
    }
    
}


function saveChanges()
{

    let editItem=data.todoObj[t];

    let task= document.getElementById("task").value;
    let startdate= document.getElementById("startdate").value;
    let duedate= document.getElementById("duedate").value;
    let b= document.querySelectorAll("input[name=category]");
    let category;

    for(var i=0;i<b.length;i++)
    {
        if(b[i].checked==true)
        {
            category=b[i].value;
        }
    }
    let values=validateAdd(task,startdate,duedate,category);

    if(values==true)
    {

        editItem.task=document.getElementById("task").value;
        editItem.startdate=document.getElementById("startdate").value;
        editItem.duedate=document.getElementById("duedate").value;
        var a =document.querySelectorAll("input[type=checkbox]");

        for(var i=0;i<a.length;i++)
        {
            if(a[i].checked==true)
            {
                editItem.category=a[i].value;
            }
        }

        document.getElementById("save").style.display="none";
        document.getElementById("add").style.display="inline-block";

        localStorage.setItem("values",JSON.stringify(localData));
        document.getElementById("newrow").reset();
        clearList();
       sortBy();
    }

}


function showData()
{

    document.getElementById("filter").value="All";

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
        "<td>"+ todoItems[i].status + "</td>"+
        "<td>"+'<a href="#newrow"><button id="edit'+i+'" style="display: inline-block;" onclick="editData('+i+')">Edit</button></a>'+
        '<a><button id="del'+i+'" style="display: none;" onclick="deleteSingle('+i+')">Delete</button></a>'+"</td>";
 
        list.appendChild(row);

        if(data.todoObj[i].status=="Done")
        {
            document.getElementById("edit"+i).style.display="none";
            document.getElementById("del"+i).style.display="inline-block";

        }

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


function clearChecks(){
    let a= document.querySelectorAll("input[name=category]");

    for(var i=0;i<a.length;i++)
    {
        document.getElementsByName("category")[i].checked=false;
    }

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
    sortBy();

}


function editData(i)
{
    let editItem=data.todoObj[i];
    let task=editItem.task;
    let startdate=editItem.startdate;
    let duedate=editItem.duedate;
    let category=editItem.category;

    clearChecks();

    document.getElementById("task").value=task;
    document.getElementById("startdate").value=startdate;
    document.getElementById("duedate").value=duedate;
    if (category == "Home"){
        document.getElementsByName("category")[0].checked=true;
    }
    else if (category == "Work"){
        document.getElementsByName("category")[1].checked=true;
    }
    else{
        document.getElementsByName("category")[2].checked=true;
    }
    
    document.getElementById("save").style.display="inline-block";
    document.getElementById("add").style.display="none";

    t=i;
}

function validateAdd(task,startdate,duedate,category){
    if(task==""||startdate==""||duedate=="")
    {
        alert("Please fill all details");
        return false;
    }

    else if(category==undefined){
        alert("Please select category");
    }

    else if(startdate>duedate)
    {
        alert("Please enter correct Due Date");
    }

    else{

        return true;
    }

}

function sortBy(){
    clearList();
    
    let sort=document.getElementById("filter").value;
    if(sort!="All")
    {   
        let todoItems=[];
        let row;
        let temp=0,flag=0;
        let list = document.getElementById("table");
    
        document.getElementById("profilePic").src = data.profileimg;
    
    
        todoItems = data.todoObj;
    
        
        for(let i=0;i<todoItems.length;i++)
        {
            if(todoItems[i].category==sort)
            {
                flag=1;
                row = document.createElement('tr');
    
                row.innerHTML ="<td>" + '<input type="checkbox" id="markDone" value="Yes">'+ "</td>" +
                "<td>" + todoItems[i].task + "</td>" +
                "<td>" + todoItems[i].category + "</td>" +
                "<td>"+ todoItems[i].startdate + "</td>" +
                "<td>"+ todoItems[i].duedate + "</td>" +
                "<td>"+ todoItems[i].status + "</td>"+
                "<td>"+'<a href="#newrow"><button id="edit'+i+'" style="display: inline-block;" onclick="editData('+i+')">Edit</button></a>'+
                '<a><button id="del'+i+'" style="display: none;" onclick="deleteSingle('+i+')">Delete</button></a>'+"</td>";
         
                list.appendChild(row);
    
                if(data.todoObj[i].status=="Done")
                {
                    document.getElementById("edit"+i).style.display="none";
                    document.getElementById("del"+i).style.display="inline-block";
    
                }
                temp++;
    
            }
            
    
        }    
        
        if(temp==0)
        {
            document.getElementById("head1").style.visibility="hidden";
    
        }
        else{
            document.getElementById("head1").style.visibility="visible";
        }
    

    }

    else{
        clearList();
        showData();
    }

}

// function deleteSingle(i)
// {
//     let editItem=data.todoObj[i];

// }