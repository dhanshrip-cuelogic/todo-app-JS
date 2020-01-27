var regData=(function()
{
    // if(sessionStorage.getItem("values")==null)
    // {
    //     window.location.href="regIndex.html";
       
    // }

    /* 
     If Local Sorage is no present in the browser then it will show an alert that browser does not have Local Storage.
    */
    if(!localStorage)
    {
        alert("Browser is not having local storage!!!!");
    }

    return{

        /*
        * getRegisteredData()- Function will take input values from the input boxes, and it will check validations on them.

        * Input values are:- Username, Firstname, Lastname, Address, Password, Confirm Password, Gender, Profile Image.

        * todoObj[]- It is an empty array which will store task details dynamically for this registered user.

        * flag- It will set to true if all the input values are valid, and then only it will store the data into localstorage.

        */
       getRegisteredData: function (){

            let username= document.getElementById("username").value;
            let firstname= document.getElementById("fname").value;
            let lastname= document.getElementById("lname").value;    
            let address= document.getElementById("address").value;
            let password= document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirmPass").value;
            
            let gender;

            let genderValue= document.querySelectorAll('input[name="gender"]');
            for(var i=0;i<genderValue.length;i++)
            {
                if(genderValue[i].checked==true)
                {
                    gender=genderValue[i].value;
                }
            }

            let validatePassword= /([A-Z]+)([a-z]?.*)([!@#\$%\^&\*\.].*)([0-9].*)/;

            let todoObj= [];
            let temp=true;
            let validGender=true;
            let flag = false;

            temp=this.checkUsername(username);
            
            validGender= this.checkGender();

            let profile = sessionStorage.getItem("displayPicture");

            if(password!=confirmPassword)
            {
                alert("Please type same password in both fields.");
                
            }

            else if(username=="" || firstname==""|| lastname==""|| password=="")
            {

                alert("Please fill all the required details.");
            }

            else if(validGender==false)
            {
                alert("Please select any one gender.");
            }
            else if(password.length<8)
            {
                alert("length of password should be greater than 8.")    
                
            }
            else if(!(validatePassword.test(password)))
            {
                alert("Invalid Password");
            }
            else if(temp==false)
            {
                alert("Username already exist!!");
            }
            else
            {
                flag=true;
            }
            
            if(flag==true)
            {
                let dataObj= {
                    username:username,
                    firstname:firstname,
                    lastname:lastname,
                    gender:gender,
                    address:address,
                    password:password,
                    profileimg:profile,
                    todoObj: []
                };
            
                let allUser=JSON.parse(localStorage.getItem('values')) || [];
                allUser.push(dataObj);
                localStorage.setItem("values",JSON.stringify(allUser));
                document.getElementById("myform").reset();
                alert("Registered Successfully");
                this.redirect();
            
            }
        },


        /*
        * redirect()- Function will redirect to user to login page after successful registration of user.
        
        */
        redirect: function ()
        {
            window.location.href="../index.html";
        },

        /*
        * checkUsername()- Function will check whether the username entered by the user is unique or not 
                              i.e., username already exist in the registered data or not.
        
        */
        checkUsername: function (username)
        {
            let localData = JSON.parse(localStorage.getItem("values")) || [];

            for(let i of localData)
            {
                if(i.username==username)
                {
                    return (false);
                    break;
                }
            } 
        },

        /*
        * checkGender()- Function will check whether user has selected any gender value or not.
                         If not then it will show an alert to select any one gender value.
        
        */
        checkGender: function ()
        {
            let genderValue= document.querySelectorAll('input[name="gender"]');
            let count=0;
            for( let i=0; i<genderValue.length;i++)
            {
                if(genderValue[i].checked==true)
                {
                    count++;
                }
            }
            if(count!=1)
            {
                return (false);
            }

        },

        /*
        * uploadImg()- Function will take the selected image url and it will convert the image into base64 encoding format,
                        to store the image into the local storage and to display the image.
        
        */
        uploadImg: function ()
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

    };

})();