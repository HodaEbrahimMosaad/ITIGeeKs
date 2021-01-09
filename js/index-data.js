var start=1;
var count=5;
var usersss;
var count2=count;

var id = getCookie("id");
console.log(id);
var followersId = [];

var request1 = $.ajax({
    url: "http://localhost:3000/following",
    method: "GET",
    data: {},
    dataType: "json"
});
var _follower = 0;
var _followed = 0;
request1.done(function( following ) {
    for (var i=0; i < following.length; i++){
        if (following[i].follower == id){
            followersId.push(following[i].followed)
            _follower += 1
        }
        if (following[i].followed == id){
            _followed += 1
        }
    }
    $('#Following').text(_follower)
    $('#Followers').text(_followed)
});
request1.fail(function( jqXHR, textStatus ) {
    errorAlert("Request failed: " + textStatus );
});
var request = $.ajax({
    url: "http://localhost:3000/posts",
    method: "GET",
    data: {},
    dataType: "json"
});
var all_posts = [];
var postsId = [];
request.done(function( posts ) {
    for (var i=0; i < posts.length; i++){
        if (posts[i].userid == id){
            postsId.push(posts[i].id);
            all_posts.push(posts[i]);
        } else if (followersId.includes(posts[i].userid)){
            postsId.push(posts[i].id);
            all_posts.push(posts[i]);
        }
    }
    var request2 = $.ajax({
        url: "http://localhost:3000/comments",
        method: "GET",
        data: {},
        dataType: "json"
    });
    request2.done(function(comments) {
        console.log(all_posts)
        console.log(comments)
        console.log("/////////////////");
        for (var i=0; i < comments.length; i++){
            for (var j=0; j<all_posts.length; j++){
                if (comments[i].postid == all_posts[j].id){
                    all_posts[j].comments.push(comments[i])
                }
            }
        }
        all_posts.sort(function (a, b) {
            if (a.created_at > b.created_at) return 1;
            if (a.created_at < b.created_at) return -1;
            return 0;
        });
        console.log(all_posts);
        setupPosts(all_posts)
    });
    request2.fail(function( jqXHR, textStatus ) {
        errorAlert("Request failed: " + textStatus );
    });
});

var postsList = document.querySelector('.timeline');
// setup guides
var setupPosts = function(posts){
    let html = '';
    for (var i=0; i< posts.length; i++){
        var href = 'profile.html';
        if (posts[i].userid != id) {
            href = href + "?id=" + posts[i].userid
        }
        var li =
        `<div class="post line-div">
            <div class="head">
                 <div class="img"><a href="${href}" id="prfLink" target="_blank"><img src="img/${posts[i].userprofilepic}"></a></div>
                <div class="info">
                    <div class="name"><a style="text-decoration: none;" href="${href}" id="prfLink" target="_blank">${posts[i].username}</a></div>
                    <div class="time"><i class="fa fa-history"></i> ${(posts[i].created_at)}</div>
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="body">
                <p class="postP1">${posts[i].body}</p>
                <div><a class="see more">Read more..</a></div>
            </div>
            <div style="color:cornflowerblue;"><span id="likeCounter">${posts[i].likes} </span> Likes <div style="color:cornflowerblue;"></div></div>
            <div class="react">
                <div onclick="likeFun(this)"><i class="fa fa-thumbs-o-up"></i> Like</div>
                <div><i class="fa fa-comments-o"></i> Comment</div>
            </div>
            <div class="comments">`
        posts[i].comments.sort(function (a, b) {
            if (a.created_at > b.created_at) return 1;
            if (a.created_at < b.created_at) return -1;
            return 0;
        });
        for (var j=0; j< posts[i].comments.length; j++){
            var hrefpro = 'profile.html';
            if (posts[i].comments[j].userid != id) {
                hrefpro = hrefpro + "?id=" + posts[i].comments[j].userid
            }
            li += `<div class="ccmnt">
                    <div class="img"><a style="text-decoration: none;" href="${hrefpro}" id="prfLink" target="_blank"><img src="img/${posts[i].comments[j].userprofilepic}"></a></div>
                    <div class="post-text">
                        <p><b><a style="text-decoration: none;" href="${hrefpro}" id="prfLink" target="_blank">${posts[i].comments[j].username}</a></b></p>
                        <p>${posts[i].comments[j].content}</p>
                    </div>
                    <div class="clearfix"></div>
                </div>`
        }
        li +=`<div class="ccmnt">
                    <div class="img"><img src="img/${getCookie("profilepic")}"></div>
                    <textarea onkeypress="onTestChange(this);" id="comment" class="post-text commentPost" placeholder="Write a comment.." onkeyup="txtautoheight(this)"></textarea>
                    <!-- <div class="post-text" contenteditable="true" data-placeholder="Write a comment.."></div> -->
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>`
        html += li;
    }
    postsList.innerHTML += html


    $('.postP1').each(function(i, obj) {
        if (Number.parseInt($(obj).text().length) <= 355){
            $(obj).next().css({"display": "none"})
        }
    });
};
var fullname = getCookie("Fname") + " " + getCookie("Lname")
$('#FLname').text(fullname)
$('#ttle').text(getCookie("track"))
$('#profilepic').attr("src","img/"+getCookie("profilepic"))
function onTestChange(me) {
    var key = window.event.keyCode;
    if (key === 13) {
        console.log(me.value)

        var comContent =  me.value
        var comm = `<div class="ccmnt">
                        <div class="img"><a style="text-decoration: none;" href="profile.html" id="prfLink" target="_blank"><img src="img/${getCookie("profilepic")}"></a></div>
                        <div class="post-text">
                            <p><b><a style="text-decoration: none;" href="profile.html" id="prfLink" target="_blank">${getCookie("Fname")} ${getCookie("Lname")}</a></b></p>
                            <p>${comContent}</p>
                        </div>
                        <div class="clearfix"></div>
                    </div>`
        $(me).parent().parent().prepend(comm)
        me.value = ""
        return false;
    }
    else {
        return true;
    }
}
var request5 = $.ajax({
    url: "http://localhost:3000/users",
    method: "GET",
    data: {},
    dataType: "json"
});

request5.done(function(users) {
    usersss=users;

    
});
request5.fail(function( jqXHR, textStatus ) {
    errorAlert("Request failed: " + textStatus );
});

var start=1;
var flagToOutSlid=0;
var timerId = 0;
var maxLen=30;

var nextFlag=0;


function funNext(){
    /*if(count!=15){*/
    console.log("start"+start,"coun 2",count2,"cputn",count)
    console.log(usersss,"userss");
    debugger
    
    if(usersss.length>=4&&nextFlag==0){
        for(var iz=1;iz<=4;iz++){
                $('.profilesContainer').append("<div class='person line-div' id='innerDiv"+iz+"'"+">\
                    <div class='img'><img src='"+usersss[iz-1].profilepic+"'></div>\
                    <div class='name'><b>"+usersss[iz-1].Fname +"  "+ usersss[iz-1].Lname +"</b></div>\
                    <div class='title' style='color: #00000085;'>"+ usersss[iz-1].track+"</div>\
                    <div><button class='btn'>Follow</button></div>\
                </div>");
           
        }
        nextFlag=1;
        
 
    }
    else{
    
            $("#innerDiv"+start).hide();
    if(count==count2 &&count<=usersss.length){
        console.log(count,"count")
    $('.profilesContainer').append("<div class='person line-div' id='innerDiv"+count+"'"+">\
                    <div class='img'><img src='img/"+usersss[count-1].profilepic+"'></div>\
                    <div class='name'><b>"+usersss[count-1].Fname +"  "+ usersss[count-1].Lname +"</b></div>\
                    <div class='title' style='color: #00000085;'>"+ usersss[count-1].track+"</div>\
                    <div><button class='btn'>Follow</button></div>\
                </div>");
count++;
          //$(this).show("slide", { direction: "left" }, 1000);
    }
    $("#innerDiv"+count2).show();
    if(start<count && count2<count)
        {
            start++;
            count2++;
        }
    if(count2==usersss.length){
        flagToOutSlid=0;
    }
    }

}
function funPrev(){

   if(start!=1){
        start--;
       count2--;
       $("#innerDiv"+count2).hide();

       $("#innerDiv"+start).show(); 
       console.log(usersss,"usess")
   }
    else{
        flagToOutSlid=1;
    }
}
function slider(){
    timerId = setInterval(function () {
        if(flagToOutSlid==0&&start>=1){
            funPrev();
        }
        else {
            if(flagToOutSlid==1){
                funNext();
            }
        }
    }, 700);
};
function stop(){
    clearInterval(timerId);
}




$(window).on('load', function() {
    setTimeout(function(){
       
        if(usersss.length>=4&&nextFlag==0){
        for(var iz=1;iz<=4;iz++){
                $('.profilesContainer').append("<div class='person line-div' id='innerDiv"+iz+"'"+">\
                    <div class='img'><img src='img/"+usersss[iz-1].profilepic+"'></div>\
                    <div class='name'><b>"+usersss[iz-1].Fname +"  "+ usersss[iz-1].Lname +"</b></div>\
                    <div class='title' style='color: #00000085;'>"+ usersss[iz-1].track+"</div>\
                    <div><button class='btn'>Follow</button></div>\
                </div>");
           
        } 
        nextFlag=1;
        
 
    }
    console.log(usersss,"ussssssssssssssss") 
    },100)
});



var request5 = $.ajax({
    url: "http://localhost:3000/users",
    method: "GET",
    data: {},
    dataType: "json"
});


request5.done(function(users) {
    var html = "";
   
    usersss=users;
  
    $('#profCont').append(html)
});
  console.log(usersss,"\sers")
request5.fail(function( jqXHR, textStatus ) {
    errorAlert("Request failed: " + textStatus );
});




// data.forEach(doc => {
//
//     var post = doc.data();
//     var time = doc.data().created_at;
//     var date = time.toDate();
//     var shortDate = date.toDateString();
//     var shortTime = date.toLocaleTimeString();
//
// });
/*
db.collection("blogs").where("userid", "==", id)
    .onSnapshot(function(querySnapshot) {
        console.log(querySnapshot)
    }, function (err) {
        console.log(err.message)
    });
auth.onAuthStateChanged(function(user){
    if (user) {
        db.collection('users').doc(user.uid).get().then(function (doc) {
            console.log(doc);
            document.getElementById('FLname').innerHTML = doc.data().Fname + " " + doc.data().Lname
            document.getElementById('ttle').innerHTML = doc.data().track;
            if (getCookie("Role") == "admin"){
                var li = document.createElement('li');
                var a = document.createElement('a');
                var text = document.createTextNode('Manage Users');
                li.append(a);
                a.append(text);
                a.setAttribute('href', 'adminpanel.html');
                document.getElementById('navbar').append(li)
            }
            db.collection("blogs").where("userid", "==", user.uid).orderBy('created_at','desc')
                .onSnapshot(function(querySnapshot) {
                    setupPosts(querySnapshot);

                }, function (err) {
                    console.log(err.message)
                });

        })
    } else {
        setupPosts([]);
    }
});


var postForm = document.querySelector('#createPost');
postForm.addEventListener('submit', function(e){
    e.preventDefault();
    // get post info
    //var title = postForm['title'].value;
    var body = postForm['body'].value;
    db.collection('blogs').add({
        body: body,
        title: "test",
        userid: auth.currentUser.uid,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function () {
        console.log("Done");
        postForm.reset();
        location.reload(true)
    }).catch(function (error) {
        var errorMessage = error.message;
        console.log(errorMessage)
    })
});

*/

