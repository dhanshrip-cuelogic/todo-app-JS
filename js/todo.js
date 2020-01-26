todoData=(function () {
    // if (sessionStorage.getItem("values") == null) {
    //     window.location.href = "../loginIndex.html";

    // }


    /*
     * sessionData- It is used to store session data values.

     * LocalData- It is used to store details of Local Data.

     * data- It is used to store all the details of that particular user.
     
     * sort- It is used to get the only category value which user wants to see from the whole todo list.
     */
    let sessionData = sessionStorage.getItem("values");
    let localData = JSON.parse(localStorage.getItem("values"));
    let data;

    let t = 0;

    for (let i of localData) 
    {
        if (i.uname == sessionData) {
            data = i;
            break;

        }
    }

    document.getElementById("name").value = data.fname + " " + data.lname;

    let sort = document.getElementById("filter").value;

    /*
    *getCategory()- Function is used to get the value of selected category.
    */
    function getCategory() {
        let categoryValue = document.querySelectorAll("input[name=category]");
        let category;
        for (var i = 0; i < categoryValue.length; i++) {
            if (categoryValue[i].checked == true) {
                category = categoryValue[i].value;
            }
        }
        return category;
    }

    /*
    *editData()- Function is used to display the data of that row into the editting table,
                    so that user can change the details and save it into local storage.

    *editItem- It will take all the details of particular task which user wants to edit.

    * "t" - It is a variable which will take the value of that particular task which will be passed to saveChanges(),
            to change the details of that task.
    */
    function editData(i) {

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
    }
    
    /**
     * clearList()- Function is used to clear the whole task table before displaying any newly added, updated or deleted task. 
     */
    function clearList() {
        document.getElementById("table").innerHTML = "";
    }
    
    /**
     * clearChecks()- Function is used to clear the checkbox value before showing selected checked value. 
     */
    function clearChecks() {
        let checkedValue = document.querySelectorAll("input[name=category]");
    
        for (var i = 0; i < checkedValue.length; i++) {
            document.getElementsByName("category")[i].checked = false;
        }
    
    }

    /**
     * validateAdd()- Function is used to check validations on newly added task.
                      This will return true if all the validations conditions are correct else it will return false.

     * Input values:- Task, Start Date, Due Date, Category. 
     */
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

        /**
         * showData()- Function is used to clear the checkbox value before showing selected checked value.
         
         * todoItems- It is used to fetch all the tasks of that user.

         * list- It is used to get the table element which we need to display task with the added, deleted or edited task.

         * createRow()- Function will create a new row for each task stored in the local storage. 
         */
        showData: function() {

            document.getElementById("filter").value = "All";
        
            let todoItems = [];
            let row;
            let list = document.getElementById("table");
        
            document.getElementById("profilePic").src = data.profileimg;
        
            todoItems = data.todoObj;
        
            for (let i = 0; i < todoItems.length; i++) {
                
                this.createRow(todoItems,i,list);
            }
            if (todoItems.length == 0) {
                document.getElementById("head1").style.visibility = "hidden";
        
            }
            else {
                document.getElementById("head1").style.visibility = "visible";
            }
        },

        /**
         * insertRow()- Function is used to create new task.
         
         * Input values:- Task, Start Date, Due Date, Category.
        
         * validateAdd()- Function is used to check validations on newly added task.
                           This will return true if all the validations conditions are correct else it will return false.
         
         * values- This will take the true or false value from validateAdd().
                    If it is true, then only the data will be added into local storage.  
         */
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
                this.filterBy();
            }
        },

        /**
         * saveChanges()- Function is used to save task details after adding a new task or editing the existing task.
          
         * validateAdd()- Function is used to check validations on newly added task.
                           This will return true if all the validations conditions are correct else it will return false.
         
         * values- This will take the true or false value from validateAdd().
                    If it is true, then only the data will be added into local storage.   
         */
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
                this.filterBy();
            }
        
        },

        /*
        * redirect()- Function will redirect user to profile page if user clicks on profile button.
        */
        redirect: function () {
            window.location.href = "./profileIndex.html";
        },
        
        /*
        * backToLogin()- Function will redirect user to login index page and clears the session if he clicks on logout button.
        */
        backToLogin: function () {
            sessionStorage.clear();
            window.location.href = "../loginIndex.html";
        },

        /*
        * deleteTask()- Function will delete multiple task.
                        It will check the tasks in reverse whether the task is selected or not.
                        If it is selected the that task will be deleted.
                        And with the use of splice the rest of the index will get shifted one by one. 
        */
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

        /**
         * setStatus()- Function is used to mark the status of task as done.
                        i.e.,to change the status of selected task as done.
         */
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
            this.filterBy();
        
        },

        /**
         * filterBy()- Function is used to filter and display the tasks list as per the selected category from local storage.
         
         * sort- It is having the value of category according to which list will be displayed.
                 If its value is "All" then it will display whole list of task with all categories.
         */
        filterBy: function ()
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
                        this.createRow(todoItems,i,list);
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
        
        /**
         * createRow()- It is used to create new row in the table with the details of tasks.
         * @param todoItems - It contains the array of all the task of that particular user.
         * @param i -It contains the task at i th index from the todoItems array.
         * @param list - It is used to get the table element which we need to display task with the added, deleted or edited task.
         */
        createRow: function (todoItems,i,list){

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
    
        
    };

})();

todoData.showData();

// function deleteSingle(i)
// {
//     let editItem=data.todoObj[i];

// }

