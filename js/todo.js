todoData=(function () {
    // if (sessionStorage.getItem("values") == null) {
    //     window.location.href = "../loginIndex.html";

    // }

    let sessionData = sessionStorage.getItem("values");
    let localData = JSON.parse(localStorage.getItem("values"));
    let data;

    let t = 0;

    for (let i of localData) {
        if (i.uname == sessionData) {
            data = i;
            break;

        }
    }

    document.getElementById("name").value = data.fname + " " + data.lname;

    let sort = document.getElementById("filter").value;

    function createRow(todoItems,i,list){

        row = document.createElement('tr');
    
        row.innerHTML = "<td>" + '<input type="checkbox" id="markDone" value="Yes">' + "</td>" +
        "<td>" + todoItems[i].task + "</td>" +
        "<td>" + todoItems[i].category + "</td>" +
        "<td>" + todoItems[i].startdate + "</td>" +
        "<td>" + todoItems[i].duedate + "</td>" +
        "<td>" + todoItems[i].status + "</td>" +
        "<td>" + '<button id="edit' + i + '" style="display: inline-block;" onclick="editData(' + i + ');">Edit</button>' +
        '<a><button id="del' + i + '" style="display: none;" onclick="deleteSingle(' + i + ')">Delete</button></a>' + "</td>";
    
        list.appendChild(row);
    
        if (todoItems[i].status == "Done") {
            document.getElementById("edit" + i).style.display = "none";
            document.getElementById("del" + i).style.display = "inline-block";
    
        }
    }

    function getCategory() {
        let a = document.querySelectorAll("input[name=category]");
        let category;
        for (var i = 0; i < a.length; i++) {
            if (a[i].checked == true) {
                category = a[i].value;
            }
        }
        return category;
    }

    function clearList() {
        document.getElementById("table").innerHTML = "";
    }
    
    function clearChecks() {
        let a = document.querySelectorAll("input[name=category]");
    
        for (var i = 0; i < a.length; i++) {
            document.getElementsByName("category")[i].checked = false;
        }
    
    }

    function validateAdd(task, startdate, duedate, category) {
        if (task == "" || startdate == "" || duedate == "") {
            alert("Please fill all details");
            return false;
        }
    
        else if (category == undefined) {
            alert("Please select category");
        }
    
        else if (startdate > duedate) {
            alert("Please enter correct Due Date");
        }
    
        else {
    
            return true;
        }
    
    }

    
    
    return{

        editData: function (i) {
            let editItem = data.todoObj[i];
            let task = editItem.task;
            let startdate = editItem.startdate;
            let duedate = editItem.duedate;
            let category = editItem.category;
        
            clearChecks();
        
            document.getElementById("task").value = task;
            document.getElementById("startdate").value = startdate;
            document.getElementById("duedate").value = duedate;
            if (category == "Home") {
                document.getElementsByName("category")[0].checked = true;
            }
            else if (category == "Work") {
                document.getElementsByName("category")[1].checked = true;
            }
            else {
                document.getElementsByName("category")[2].checked = true;
            }
        
            document.getElementById("save").style.display = "inline-block";
            document.getElementById("add").style.display = "none";
        
            t = i;
        },
        

        showData: function() {

            document.getElementById("filter").value = "All";
        
            let todoItems = [];
            let row;
            let list = document.getElementById("table");
        
            document.getElementById("profilePic").src = data.profileimg;
        
            todoItems = data.todoObj;
        
            for (let i = 0; i < todoItems.length; i++) {
                
                createRow(todoItems,i,list);
            }
            if (todoItems.length == 0) {
                document.getElementById("head1").style.visibility = "hidden";
        
            }
            else {
                document.getElementById("head1").style.visibility = "visible";
            }
        },

        insertRow: function() {

            let task = document.getElementById("task").value;
            let startdate = document.getElementById("startdate").value;
            let duedate = document.getElementById("duedate").value;
            let category = getCategory();
        
            let status = "Not Done";
            let values = validateAdd(task, startdate, duedate, category);
        
            if (values == true) {
                let newData = {
                    task: task,
                    startdate: startdate,
                    duedate: duedate,
                    category: category,
                    status: status
                };
        
                data.todoObj.push(newData);
                localStorage.setItem("values", JSON.stringify(localData));
                document.getElementById("newrow").reset();
                clearList();
                this.sortBy();
            }
        },

        saveChanges: function() {

            let editItem = data.todoObj[t];
        
            let task = document.getElementById("task").value;
            let startdate = document.getElementById("startdate").value;
            let duedate = document.getElementById("duedate").value;
            
            let values = validateAdd(task, startdate, duedate, category);
        
            if (values == true) {
        
                editItem.task = document.getElementById("task").value;
                editItem.startdate = document.getElementById("startdate").value;
                editItem.duedate = document.getElementById("duedate").value;
                editItem.category=getCategory();
                
                document.getElementById("save").style.display = "none";
                document.getElementById("add").style.display = "inline-block";
        
                localStorage.setItem("values", JSON.stringify(localData));
                document.getElementById("newrow").reset();
                clearList();
                this.sortBy();
            }
        
        },

        redirect: function () {
            window.location.href = "./profileIndex.html";
        },
        
        backToLogin: function () {
            sessionStorage.clear();
            window.location.href = "../loginIndex.html";
        },

        deleteTask: function () {
            let tableData = document.getElementById("table")
            let allCheckedData = tableData.getElementsByTagName("input");
            for (let i = allCheckedData.length - 1; i >= 0; i--) {
                if (allCheckedData[i].checked) {
                    document.getElementById("table").deleteRow(i);
                    data.todoObj.splice(i, 1);
                }
        
            }
        
            if (data.todoObj.length == 0) {
                document.getElementById("head1").style.visibility = "hidden";
        
            }
            else {
                document.getElementById("head1").style.visibility = "visible";
            }
        
            localStorage.setItem("values", JSON.stringify(localData));
        
        },

        setStatus:function(){

            let tableData = document.getElementById("table")
            let allCheckedData = tableData.getElementsByTagName("input");
            console.log(allCheckedData);
            for (let i = allCheckedData.length - 1; i >= 0; i--) {
                if (allCheckedData[i].checked) {
                    data.todoObj[i].status = "Done";
        
                }
            }
            localStorage.setItem("values", JSON.stringify(localData));
            clearList();
            this.sortBy();
        
        },

        sortBy: function ()
        {
            clearList();

            sort = document.getElementById("filter").value;

            if (sort != "All")
            {
                let todoItems = [];
                let row;
                let flag = 0;
                let list = document.getElementById("table");

                document.getElementById("profilePic").src = data.profileimg;


                todoItems = data.todoObj;


                for (let i = 0; i < todoItems.length; i++)
                {
                    if (todoItems[i].category == sort)
                    {
                        flag = 1;
                        createRow(todoItems,i,list);
                    }

                }
                if (todoItems.length == 0) {
                    document.getElementById("head1").style.visibility = "hidden";
            
                }
                else {
                    document.getElementById("head1").style.visibility = "visible";
                }  
            }
            else{
                clearList();
                this.showData();
            }
        },  
        
        
        
    };

})();

todoData.showData();

// function deleteSingle(i)
// {
//     let editItem=data.todoObj[i];

// }

