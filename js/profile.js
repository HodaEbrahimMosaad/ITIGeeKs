var href = window.top.location.href;
var usersss;
try{
    var id = Number.parseInt(href.split("?")[1].split("=")[1])
    var flag = true;
} catch (e){
    var flag = false;
}
if (flag && id != getCookie("id")) {
    var request5 = $.ajax({
        url: "mydb.json",
        method: "GET",
        data: {},
        dataType: "json"
    });
    request5.done(function (data) {
        var users = data.users;
        var user;
        console.log(users);
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                user = users[i];
                break;
            }
        }
        console.log(user);
        //var user = users.
        $('#ProfileImg').attr("src", "img/" + user.profilepic);
        console.log(user.profilepic);
        $('#UserFullName').text(user.Fname + " " + user.Lname);
        $('#UserTrack').html(user.track);
        if (user.bio.trim() == "") {
            $('#bio').html("There is no bio yet.")
        } else {
            $('#bio').html(user.bio);
        }

        $("#edit-profile").css({"display": "none"});
        $("#coverModal").css({"display": "none"});

        $('#facebook').text(user.socialmedia.facebook);
        $('#facebook').attr("href", user.socialmedia.facebook);

        $('#github').text(user.socialmedia.github);
        $('#github').attr("href", user.socialmedia.github);

        $('#linkedin').text(user.socialmedia.linkedin);
        $('#linkedin').attr("href", user.socialmedia.linkedin);
    });
    request5.fail(function (jqXHR, textStatus) {
        errorAlert("Request failed: " + textStatus);
    });
}
else {
    if (!id ){
        var id = getCookie('id')
    }
    var firstname =getCookie("Fname");
    var lastName=getCookie("Lname");
    var Track=getCookie("track");

    $('#UserFullName,.UserName').html(firstname +" "+lastName)
    if (getCookie('bio').trim() == ""){
        $('#bio').html("There is no bio yet.")
    } else {
        $('#bio').html(getCookie('bio'))
    }
    $('#UserTrack').html(Track);
    $('#ProfileImg').attr("src","img/"+getCookie('profilepic'))
    $('#facebook').text(getCookie('facebook'))
    $('#facebook').attr("href",getCookie('facebook'))

    $('#github').text(getCookie('github'))
    $('#github').attr("href",getCookie('github'))

    $('#linkedin').text(getCookie('linkedin'))
    $('#linkedin').attr("href",getCookie('linkedin'))
}
var request1 = $.ajax({
    url: "mydb.json",
    method: "GET",
    data: {},
    dataType: "json"
});
var __follower = 0;
var __followed = 0;
request1.done(function( data ) {
    var following = data.following
    for (var i=0; i < following.length; i++){
        console.log(following[i])
        if (following[i].follower == id){
            __follower += 1
        }
        if (following[i].followed == id){
            __followed += 1
        }
    }
    $('#profileFolowing').text(__follower)
    $('#profileFollowers').text(__followed)
});
request1.fail(function( jqXHR, textStatus ) {
    errorAlert("Request failed: " + textStatus );
});
var all_posts = [];
var postsId = [];
var request = $.ajax({
    url: "mydb.json",
    method: "GET",
    data: {},
    dataType: "json"
});
request.done(function( data ) {
    var posts = data.posts
    for (var i=0; i < posts.length; i++){
        if (posts[i].userid == id){
            postsId.push(posts[i].id);
            all_posts.push(posts[i]);
        }
    }
    var request2 = $.ajax({
        url: "mydb.json",
        method: "GET",
        data: {},
        dataType: "json"
    });
    request2.done(function(data) {
        var comments = data.comments;
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
        setupPosts(all_posts)
    });
    request2.fail(function( jqXHR, textStatus ) {
        errorAlert("Request failed: " + textStatus );
    });
});
var postsList = document.querySelector('#myposts');
// setup guides
var setupPosts = function(posts){
    if (posts.length == 0){
        var html = "<div class = 'post line-div' style='text-align: center;font-weight: 700;'>No Posts Yet.</div>";
    } else {
        var html = '';
        for (var i=0; i< posts.length; i++){
            var href = 'profile.html';
            if (posts[i].userid != id) {
                href = href + "?id=" + posts[i].userid
            }
            var li =
                `<div class="post line-div">
            <div class="head">
                 <div class="img"><a href="${href}" id="prfLink" target="_self"><img src="img/${posts[i].userprofilepic}"></a></div>
                <div class="info">
                    <div class="name"><a style="text-decoration: none;" href="${href}" id="prfLink" target="_self">${posts[i].username}</a></div>
                    <div class="time"><i class="fa fa-history"></i> ${posts[i].created_at}</div>
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="body">
                <p class="postP1">${posts[i].body}</p>
                <div><a class="see more">Read more..</a></div>
            </div>
            <div style="color:cornflowerblue;"><span id="likeCounter">${posts[i].likes} </span> Likes <div style="color:cornflowerblue;"></div>
         </div>
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
                li += `<div class="ccmnt">
                    <div class="img"><a href="profile.html?id=${posts[i].comments[j].userid}" id="prfLink" target="_self"><img src="img/${posts[i].comments[j].userprofilepic}"></a></div>
                    <div class="post-text">
                        <p><b><a href="profile.html?id=${posts[i].comments[j].userid}" id="prfLink" target="_self">${posts[i].comments[j].username}</a></b></p>
                        <p>${posts[i].comments[j].content}</p>
                    </div>
                    <div class="clearfix"></div>
                </div>`
            }
            li +=`<div class="ccmnt">
                    <div class="img"><img src="img/${getCookie('profilepic')}"></div>
                    <textarea onkeypress="onTestChange(this);" id="comment" class="post-text commentPost" placeholder="Write a comment.." onkeyup="txtautoheight(this)"></textarea>
                    <!-- <div class="post-text" contenteditable="true" data-placeholder="Write a comment.."></div> -->
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>`
            html += li;
        }
    }
    postsList.innerHTML += html
    $('.postP1').each(function(i, obj) {
        if (Number.parseInt($(obj).text().length) <= 355){
            console.log(Number.parseInt($(obj).css('-webkit-line-clamp')) + "---")
            $(obj).next().css({"display": "none"})
        }
    });
};
var modal = document.getElementById("myModal");
var btn = document.getElementById("coverModal");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
};
span.onclick = function() {
  modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
// edit profile modal
var modal2 = document.getElementById("editModal");
var btn2 = document.getElementById("edit-profile");
var span2 = document.getElementsByClassName("close")[1];
btn2.onclick = function() {
  modal2.style.display = "block";
    var _fname =getCookie("Fname");
    var _lName=getCookie("Lname")
    var _Track=getCookie("track");
    var _Email=getCookie("email");
    var _bio=getCookie("bio");
    $('#UserFullName').html(_fname +" "+_lName);
    $('#UserTrack').html(_Track);
    //========================display user info===========//
        $('#FnameEdite').val(_fname);
        console.log(_fname,"jj")
        $('#LnameEdite').val(_lName);
        $('#emailEdite').val(_Email);
        $('#bioEdite').val(_bio);
    //==============get & set  new data=================//
    $("#editProfileBtn").click(function(){
        _fname=$('#FnameEdite').val();
        _lName=$('#LnameEdite').val();
        _Email=$('#emailEdite').val();
        _bio=$('#bioEdite').val();
        var newProfileImg=$(".EditProfileImg").val();
        setCookie("email", _Email);
        setCookie("bio", _bio);
        console.log(newProfileImg,"profile img")
        setCookie("Fname", _fname);
        setCookie("Lname", _lName);
        var _newProfileImg=newProfileImg.replace(/^.*[\\\/]/, '');
        if (_newProfileImg != ""){
            setCookie("profilepic", _newProfileImg);
        }
        var path="/img/"+_newProfileImg;
        $('#ProfileImg').attr("src",path);

         $('#_bio').html(getCookie("bio"));
        location.reload(true);
    });
};
span2.onclick = function() {
  modal2.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
};
//   select cover
  if(hasCookie('coverImg'))
    {
      document.getElementById("mycover").src = getCookie("coverImg");
      console.log("has ");
    }
  else
    document.getElementById("mycover").src = "img/c1.jpg";
  function selectCover(){
      var radio = document.getElementsByName('cvr'); 
      for(i = 0; i < radio.length; i++) { 
          if(radio[i].checked) 
          var mysrc = radio[i].value; 
      } 
      console.log(mysrc);
      document.getElementById("mycover").src = mysrc;
      setCookie('coverImg',mysrc,365);
      modal.style.display = "none";
  }
// jquery
$( function() {
  // $("#tabs .ui-tabs-active a").css("color","green");
  $('#myposts').css("display","block");
  $( "#tabs" ).tabs();
  // edit modal

  $('#editProfileBtn').click(function(){
    setCookie("email", $('#email').val());
    setCookie("bio", $('#bio').val());
    setCookie("Fname", $('#Fname').val());
    setCookie("Lname", $('#Lname').val());
    modal2.style.display = "none";
  })

} );
function onTestChange(me) {
    var key = window.event.keyCode;
    if (key === 13) {
        console.log(me.value)
        var comContent =  me.value
        var comm = `<div class="ccmnt">
                        <div class="img"><a style="text-decoration: none;" href="profile.html" id="prfLink" target="_self"><img src="img/${getCookie("profilepic")}"></a></div>
                        <div class="post-text">
                            <p><b><a style="text-decoration: none;" href="profile.html" id="prfLink" target="_self">${getCookie("Fname")} ${getCookie("Lname")}</a></b></p>
                            <p>${comContent}</p>
                        </div>
                        <div class="clearfix"></div>
                    </div>`
        $(me).parent().parent().prepend(comm);
        me.value = "";
        return false;
    }
    else {
        return true;
    }
}