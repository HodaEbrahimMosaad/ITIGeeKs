document.getElementById('Fname').focus();
function nameChecking(inputValue,messageFor,obj) {
    var Fname = document.getElementById(inputValue).value;
    var demo = document.getElementById(messageFor);
    if (Fname.length == 0){
        demo.innerHTML = inputValue + " can't be empty!";
        demo.style.color = "red";
        obj.flag = false;
    } else if (Fname.length < 4){
        demo.innerHTML = inputValue + " should be at least 4 chars!";
        demo.style.color = "red";
        console.log("Error");
        obj.flag = false;
    } else if (!Fname.match(/^[A-Za-z]+$/)){
        demo.innerHTML = inputValue + " should have only chars!";
        demo.style.color = "red";
        obj.flag = false;
    }else if (Fname.length > 7){
        demo.innerHTML = inputValue + " should't be more than 7 chars!";
        demo.style.color = "red";
        obj.flag = false;
    } else {
        demo.innerHTML = inputValue + " Is Valid!";
        demo.style.color = "green";
        obj.flag = true;
    }
}
var FnameInput = 'Fname';
var FnameMess = 'FnameMess';
var FnameFlag = { flag: false };
document.getElementById("Fname").onkeyup = function(){
    nameChecking(FnameInput,FnameMess,FnameFlag)
};
document.getElementById("Fname").onblur = function(){
    console.log(FnameFlag.flag)
};
var LnameInput = 'Lname';
var LnameMess = 'LnameMess';
var LnameFlag = { flag: false };

document.getElementById("Lname").onkeyup = function(){
    nameChecking(LnameInput,LnameMess,LnameFlag)
};

document.getElementById("Lname").onblur = function(){
    console.log(LnameFlag.flag)
};

var emailFlag = false;
function emailChecking(){
    var email = document.getElementById("email").value;
    var EmailMess = document.getElementById('EmailMess');
    if ( email.length == 0){
        EmailMess.innerHTML = "Email can't Be empty!";
        EmailMess.style.color = 'red';
        emailFlag = false;
    } /*else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
                EmailMess.innerHTML = 'Invalid Email Format!';
                EmailMess.style.color = 'red';
                emailFlag = false;
            }*/ else {
        EmailMess.innerHTML = 'Valid Email Format!';
        EmailMess.style.color = 'green';
        emailFlag = true;
    }
}
var passwordFlag = false;
function passwordChecking(){
    var password = document.getElementById("password-signin").value;
    var passwordMess = document.getElementById('passwordMess');
    if ( password.length == 0){
        passwordMess.innerHTML = "Password can't Be empty!";
        passwordMess.style.color = 'red';
        passwordFlag = false;
    } else if (password.length < 7){
        passwordMess.innerHTML = "Password can't Be less than 7 chars!";
        passwordMess.style.color = 'red';
        passwordFlag = false;
    } else {
        passwordMess.innerHTML = 'Valid Password!';
        passwordMess.style.color = 'green';
        passwordFlag = true;
    }
}

var selectFlag = false;
function selectChecking() {
    var trackMesss = document.querySelector('#trackMessage');
    var track = document.getElementById('track').value;

    if(track == ""){
        selectFlag = false;
        trackMesss = 'You Should Select A Track';
        trackMesss.style.color = 'red';
    } else {
        selectFlag = true;
        trackMesss = 'You Selected a Track';
        trackMesss.style.color = 'green';
    }
}

var passwordRepFlag = false;
function passwordRepChecking(){
    var passwordRep = document.getElementById("RepeatPassword").value;
    var passworRepdMess = document.getElementById('passwordRepMess');
    if ( passwordRep.length == 0){
        passworRepdMess.innerHTML = "Rep Password can't Be empty!";
        passworRepdMess.style.color = 'red';
        passwordRepFlag = false;
    } else if (document.getElementById("password-signin").value != passwordRep){
        passworRepdMess.innerHTML = "Password and confirm password don't match";
        passworRepdMess.style.color = 'red';
        passwordRepFlag = false;
    } else if (passwordRep.length < 7){
        passworRepdMess.innerHTML = "Rep Password can't Be less than 7 chars!";
        passworRepdMess.style.color = 'red';
        passwordRepFlag = false;
    } else {
        passworRepdMess.innerHTML = 'Valid Password!';
        passworRepdMess.style.color = 'green';
        passwordRepFlag = true;
    }
}

$(function(){
    $('.register').hide();
    $('.login-btn').click(function(){
        console.log("clicked")
        $('.register').hide();
        $('.login').show();
    });
    $('.register-btn').click(function(){

        $('.login').hide();
        $('.register').show();
    });
});


// log the user in
var loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // get user info
    var _email = loginForm['email-login'].value;
    var password = loginForm['password-login'].value;

    var request = $.ajax({
        url: "http://localhost:3000/users",
        method: "GET",
        data: {},
        dataType: "json"
    });
    var emailFounded = false;
    var passwordFounded = false;

    request.done(function( users ) {
        console.log(users)
        for (var i=0; i < users.length; i++){
            console.log(users[i].email+"++")
            if (users[i].email == _email){
                emailFounded = true;
                if (users[i].password == password){
                    passwordFounded = true;
                    setCookie("id", users[i].id);
                    setCookie("email", users[i].email);
                    setCookie("bio", users[i].bio);
                    setCookie("track", users[i].track);
                    setCookie("role", users[i].role);
                    setCookie("Fname", users[i].Fname);
                    setCookie("Lname", users[i].Lname);
                    window.location = 'index.html';
                    return;
                }
            }
        }
        if (emailFounded == false && passwordFounded == false){
            console.log("Wrong Email And Password")
        }else if (emailFounded == false){
            console.log("No User Founded with this email")
        } else if (passwordFounded == false){
            console.log("Wrong Password")
        }

    });

    request.fail(function( jqXHR, textStatus ) {
        console.log("Request failed: " + textStatus );
    });

});

function errorAlert(errorMessage) {
    var aler = document.createElement('div')
    aler.append(errorMessage);
    aler.setAttribute('class', 'alert')
    aler.setAttribute('id', 'alert')
    document.body.prepend(aler);
    setTimeout(function () {
        $("#alert").slideUp(500);
    },3000)
}

function successMess(errorMessage) {
    var aler = document.createElement('div')
    aler.append(errorMessage);
    aler.setAttribute('class', 'succ')
    aler.setAttribute('id', 'succ')
    document.body.prepend(aler);
    setTimeout(function () {
        $("#succ").slideUp(500);
    },3000)
}
// signup
var signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', function(e){
    if (!FnameFlag.flag || !LnameFlag.flag || !emailFlag || !passwordFlag || !passwordRepFlag){
        console.log('invalid data');
        errorAlert("Invalid Data Entered!")
        e.preventDefault();
        return;
    }
    e.preventDefault();
    // get user info
    var _email = signupForm['email'].value;
    var password = signupForm['password-signin'].value;

    var request1 = $.ajax({
        url: "http://localhost:3000/users",
        method: "GET",
        data: {},
        dataType: "html"
    });
    request1.done(function( mess ) {
        var users = JSON.parse(mess);
        for (var i=0; i < users.length; i++){
            if (users[i].email == _email){
                errorAlert("This Email Used Before.");
                return;
            }
        }
        var request2 = $.ajax({
            url: "http://localhost:3000/users",
            method: "POST",
            data: {
                "email": _email,
                "password": password,
                "role": "user",
                profile: [
                    {
                        "Fname": signupForm['Fname'].value,
                        "Lname": signupForm['Lname'].value,
                        "track": signupForm['track'].value,
                        "bio": signupForm['bio'].value
                    }
                ]

            },
            dataType: "json"
        });
        request2.done(function(msg) {
            successMess("User Signed Up")
            setCookie("id", users[i].id);
            setCookie("email", _email);
            setCookie("bio", signupForm['bio'].value);
            setCookie("Fname", signupForm['Fname'].value);
            setCookie("Lname",  signupForm['Lname'].value);
            setCookie("track", signupForm['track'].value,);
            setCookie("role", "user");
            window.location = '/project/jsProject-master/jsProject-master/index.html';
        });
        request2.fail(function( jqXHR, textStatus ) {
            alert( "Request failed: " + textStatus );
        });
    });
    request1.fail(function( jqXHR, textStatus ) {
        errorAlert( "Request failed: " + textStatus );
    });
});