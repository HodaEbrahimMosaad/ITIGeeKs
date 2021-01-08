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
        var li =
        `<div class="post line-div">
            <div class="head">
                <div class="img"><img src="img/profile.jpg"></div>
                <div class="info">
                    <div class="name">${posts[i].username}</div>
                    <div class="time">${posts[i].created_at}</div>
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="body">
                <p class="postP1">${posts[i].body}</p>
                <div><a class="see more">Read more..</a></div>
            </div>
            <div style="color:cornflowerblue;"><span id="likeCounter">${posts[i].likes}</span> Likes</div>
            <div class="react">
                <div><i class="fa fa-thumbs-o-up"></i> Like</div>
                <div><i class="fa fa-comments-o"></i> Comment</div>
            </div>
            <div class="comments">`
        posts[i].comments.sort(function (a, b) {
            if (a.created_at > b.created_at) return 1;
            if (a.created_at < b.created_at) return -1;
            return 0;
        });
        for (var j=0; j< posts[i].comments.length; j++){
            // var userId = posts[i].comments[j].userid;
            // var userName = "Hoda";
            // var request4 = $.ajax({
            //     url: "http://localhost:3000/users/"+userId,
            //     method: "GET",
            //     data: {},
            //     dataType: "json"
            // });
            // request4.done(function(user) {
            //     userName = user.Fname + " " + user.Lname;
            // });
            // request4.fail(function( jqXHR, textStatus ) {
            //     errorAlert("Request failed: " + textStatus );
            // });
            li += `<div class="ccmnt">
                    <div class="img"><img src="img/profile.jpg"></div>
                    <div class="post-text">
                        <p><b>${posts[i].comments[j].username}</b></p>
                        <p>${posts[i].comments[j].content}</p>
                    </div>
                    <div class="clearfix"></div>
                </div>`
        }
        li +=`<div class="ccmnt">
                    <div class="img"><img src="img/profile.jpg"></div>
                    <textarea onkeypress="onTestChange(this);" id="comment" class="post-text commentPost" onkeyup="txtautoheight(this)"></textarea>
                    <!-- <div class="post-text" contenteditable="true" data-placeholder="Write a comment.."></div> -->
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>`
        html += li;
    }
    postsList.innerHTML += html
};
$(document).on("click",".see", function () {
    if ($(this).hasClass("more")){
        console.log('more');
        var p =$(this).parent().prev();
        p.css({"-webkit-line-clamp":"150"})
        $(this).text("See less..");
        $(this).addClass("less");
        $(this).removeClass("more");
    }else {
        console.log('less');
        var p =$(this).parent().prev();
        p.css({"-webkit-line-clamp":"3"})
        $(this).text("Read more..");
        $(this).addClass("more");
        $(this).removeClass("less");
    }
});
var fullname = getCookie("Fname") + " " + getCookie("Lname")
$('#FLname').text(fullname)
$('#ttle').text(getCookie("track"))


function onTestChange(me) {
    var key = window.event.keyCode;
    if (key === 13) {
        console.log(me.value)

        var comContent =  me.value
        var comm = `<div class="ccmnt">
                        <div class="img"><img src="img/profile.jpg"></div>
                        <div class="post-text">
                            <p><b>${getCookie("Fname")} ${getCookie("Lname")}</b></p>
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

