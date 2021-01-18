$('#myApp').css({"display":"none"});
$('#cont').click(function () {
    $('#myApp').fadeToggle()
});
$('.chat-input input').keyup(function(e) {
    if ($(this).val() == '')
        $(this).removeAttr('good');
    else
        $(this).attr('good', '');
});
$(".user-img").draggable({
    drag: function () {
        var xPos = Number.parseInt($(this).css("right"))+63
        var yPos = Number.parseInt($(this).css("bottom"))+63
        console.log($(this).css("left") + "-----" + yPos)
        $('#myApp').css({
            //"position": "fixed",
            "right": xPos+"px",
            "bottom": yPos+"px",
        })
    }
});
var trigger=[];
var reply=[];
var jsObj = [];
$( document ).ready(function() {
    var xhr = new XMLHttpRequest();
    //2)OPen conn
    xhr.open("GET", "data.json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4)
            if (xhr.status >= 200 && xhr.status < 300) {
                jsObj = JSON.parse(xhr.responseText);
                for (var i =0 ; i< jsObj.length; i++){
                    trigger.push(jsObj[i].value)
                    reply.push(jsObj[i].message)
                }
            }
            else {
                console.log("PAGE NOT FOUND");
            }
    };
    //3) send req data-->POST
    xhr.send("");
});
var alternative = ["What?...", "Eh?...", "I can't understand you!"];
function test2(key) {
    if(key === 13){ //Enter button
        var input = document.getElementById("input").value;
        process(input);
        output(input);
    }
}
function test(){
    var input = document.getElementById("input").value;
    process(input)
    output(input);
}
function process(input) {
    var now = new Date();
    var inp = `<div class="msg-container msg-remote" id="msg-0">
                    <div class="msg-box">
                        <img class="user-img" id="user-0" src="img/profile.jpg" />
                        <div class="flr">
                            <div class="messages">
                                <p class="msg" id="msg-0">
                                    ${input}
                                </p>
                            </div>
                            <span class="timestamp"><span class="username">${getCookie("Fname")}</span>&bull;<span class="posttime">${now.getHours() + ":" + now.getMinutes()}</span></span>
                        </div>
                    </div>
                </div>`
    document.getElementById('app').innerHTML += inp;
}
function output(input){
    var text = (input.toLowerCase()).replace(/[^\w\s\d]/gi, ""); //remove all chars except words, space and
    text = text.replace(/ a /g, " ").replace(/i feel /g, "").replace(/whats/g, "what is").replace(/please /g, "").replace(/ please/g, "");
    if(compare(trigger, reply, text)){
        var product = compare(trigger, reply, text);
    } else {
        var product = alternative[Math.floor(Math.random()*alternative.length)];
    }
    function callback() {
        var now = new Date();
        var out = `<div class="msg-container msg-self" id="msg-0">
                <div class="msg-box">
                    <div class="flr">
                        <div class="messages">
                            <p class="msg" id="msg-1">
                                ${product}
                            </p>
                        </div>
                        <span class="timestamp"><span class="username">Sami</span>&bull;<span class="posttime">${now.getHours() + ":" + now.getMinutes()}</span></span>
                    </div>
                    <img class="user-img" id="user-0" src="img/cartoon-robot-toy-object-for-small-children-to-vector-32859441.jpg" />
                </div>
            </div>`
        if (product == "Choose any topic"){
            if (input == "help"){
                var html = ``;
                var request1 = $.ajax({
                    url: "mydb.json",
                    method: "GET",
                    data: {},
                    dataType: "json"
                });
                request1.done(function( data ) {
                    var tags = data.tags
                    html += `<div style="color:#FFF;" id="options">`
                    for (var i=0; i < tags.length; i++){
                        html += `<button onclick="getTagPsts(event)" class="option">${tags[i]}</button>`
                    }
                    html+= `</div>`
                    $('#app').append(out);
                    $('#app').append(html);
                    
                    speak(product);
                    return;
                });
                request1.fail(function( jqXHR, textStatus ) {
                    errorAlert("Request failed: " + textStatus );
                });
            }
            return;
        } else{
            document.getElementById("app").innerHTML += out;
            speak(product);
        }
    }
    document.getElementById("input").value = ""; //clear input value
        i = 0;
        var back = setInterval(function() {
            i = ++i % 4;
            $("#con").css({display: 'block'})
            $("#loading").html("Typing"+Array(i+1).join("."));
        }, 500);
    setTimeout(function() {
        clearInterval(back)
        $("#con").css({display: 'none'})
        callback()
    }, 2000)
    var div = document.getElementById("app");
   $('#app').animate({
      scrollTop: div.scrollHeight+100
   }, 2000);
}
function compare(arr, array, string){
    if (string == "help"){
        return "Choose any topic";
        return;
    }
    var item;
    for(var x=0; x<jsObj.length; x++){
        for(var y=0; y<jsObj[x].value.length; y++){
            if(jsObj[x].value[y] == string){
                items = jsObj[x].message;
                item =  items[Math.floor(Math.random()*items.length)];
            }
        }
    }
    return item;
}
function speak(string){
    var utterance = new SpeechSynthesisUtterance();
    utterance.voice = speechSynthesis.getVoices().filter(function(voice){return voice.name == "Agnes";})[0];
    utterance.text = string;
    utterance.lang = "en-US";
    utterance.volume = 1; //0-1 interval
    utterance.rate = 1;
    utterance.pitch = 2; //0-2 interval
    speechSynthesis.speak(utterance);
}
function getTagPsts(e) {
    var target = e.target;
    var tag = target.textContent || target.innerText;
    console.log(tag);
    var tagPosts = [];
    var request = $.ajax({
        url: "mydb.json",
        method: "GET",
        data: {},
        dataType: "json"
    });
    request.done(function (data) {
        var posts = data.posts;
        for (var i = 0; i < posts.length; i++) {
            if (posts[i].tags.includes(tag)) {
                tagPosts.push(posts[i])
            }
        }
        var request2 = $.ajax({
            url: "mydb.json",
            method: "GET",
            data: {},
            dataType: "json"
        });
        request2.done(function (data) {
            var comments = data.comments;
            for (var i = 0; i < comments.length; i++) {
                for (var j = 0; j < tagPosts.length; j++) {
                    if (comments[i].postid == tagPosts[j].id) {
                        tagPosts[j].comments.push(comments[i])
                    }
                }
            }
            tagPosts.sort(function (a, b) {
                if (a.created_at > b.created_at) return 1;
                if (a.created_at < b.created_at) return -1;
                return 0;
            });
            setupTagPosts(tagPosts)
        });
        request2.fail(function (jqXHR, textStatus) {
            errorAlert("Request failed: " + textStatus);
        });
    });
}
function setupTagPosts(tagPosts) {
    var myWindow;
    myWindow = window.open("tagposts.html", "", "width=1000, height=1000");
    myWindow.onload = function () {
        var postsList = myWindow.document.querySelector('.timeline');
        var html;
        console.log(tagPosts.length)
        if (tagPosts.length == 0){
            html = `<div class="post line-div">
                            <div class="clearfix"></div>
                            <div class="body">
                                <p class="postP1" style="text-align: center;font-size: larger;color: darkblue;">There Is No Posts For This Topic!</p>
                            </div>
                        </div>`;
            postsList.innerHTML += html
        } else {
            for (var i = 0; i < tagPosts.length; i++) {
                var li =
                    `<div class="post line-div">
                        <div class="head">
                            <div class="img"><img src="img/${tagPosts[i].userprofilepic}"></div>
                            <div class="info">
                                <div class="name">${tagPosts[i].username}</div>
                                <div class="time">${tagPosts[i].created_at}</div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="body">
                            <p class="postP1">${tagPosts[i].body}</p>
                            <div><a class="see more">Read more..</a></div>
                        </div>
                        <div style="color:cornflowerblue;"><span id="likeCounter">${tagPosts[i].likes} </span> Likes <div style="color:cornflowerblue;"></div></div>
                        <div class="react">
                            <div onclick="likeFun(this)"><i class="fa fa-thumbs-o-up"></i> Like</div>
                            <div><i class="fa fa-comments-o"></i> Comment</div>
                        </div>
                        <div class="comments">`
                tagPosts[i].comments.sort(function (a, b) {
                    if (a.created_at > b.created_at) return 1;
                    if (a.created_at < b.created_at) return -1;
                    return 0;
                });
                for (var j = 0; j < tagPosts[i].comments.length; j++) {
                    li += `<div class="ccmnt">
                                <div class="img"><a style="text-decoration: none;" href="profile.html?id=${tagPosts[i].comments[j].userid}" id="prfLink" target="_self"><img src="img/${tagPosts[i].comments[j].userprofilepic}"></a></div>
                                <div class="post-text">
                                    <p><b><a style="text-decoration: none;" href="profile.html?id=${tagPosts[i].comments[j].userid}" id="prfLink" target="_self">${tagPosts[i].comments[j].username}</a></b></p>
                                    <p>${tagPosts[i].comments[j].content}</p>
                                </div>
                                <div class="clearfix"></div>
                            </div>`
                }
                li +=`<div class="ccmnt">
                                <div class="img"><img src="img/${getCookie('profilepic')}"></div>
                                <textarea onkeypress="onTestChange(this);" class="post-text" placeholder="Write a comment.." onkeyup="txtautoheight(this)"></textarea>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>`;
                html += li;
            }
            postsList.innerHTML += html;
        }
    }
}