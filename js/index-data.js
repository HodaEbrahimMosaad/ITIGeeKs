var start=1;
var count=5;
var usersss;
var count2=count;

var id = getCookie("id");
console.log(id);
var followersId = [];
var followedId = []

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
            followedId.push(following[i].follower)
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
var postsList = document.querySelector('.timeline');
// setup guides
var setupPosts = function(posts){
    var html = '';
    for (var i=0; i< posts.length; i++){
        var href = 'profile.html';
        if (posts[i].userid != id) {
            href = href + "?id=" + posts[i].userid
        }
        var li =
        `<div class="post line-div">
            <div class="head">
                 <div class="img"><a href="${href}" class="prfLink" target="_blank"><img src="img/${posts[i].userprofilepic}"></a></div>
                <div class="info">
                    <div class="name"><a style="text-decoration: none;" href="${href}" id="prfLink" target="_blank">${posts[i].username}</a></div>
                    <div class="time"><i class="fa fa-history"></i> ${(posts[i].created_at)}</div>
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="body">
                <p class="postP1">${posts[i].body}</p>
                <div><a class="see more">Read more..</a></div>`
            if (posts[i].img_path.length != 0){
                li += `<div class="galary">
                            <div class="imgsContainer">
                                <i id="prevv" onclick="prevv(this)" class="fa fa-angle-left"></i>
                                <div id="newPostImgs">`
                for (var j=0; j< posts[i].img_path.length ; j++){
                    if(j==0){
                        li += `<img id="img${j+1}" class="left0" src="img/${posts[i].img_path[j]}">`
                    }else{
                        li += `<img id="img${j+1}" class="left1" src="img/${posts[i].img_path[j]}">`
                    } 
                }
                li += `</div>
                        <i id="nextt" onclick="nextt(this)" class="fa fa-angle-right"></i>
                    </div>
                </div>`
            }
            li += `

            <div class="post-tags" style="text-align: initial;" id="post-tags">`
                        for (var h=0; h< posts[i].tags.length; h++){
                            li += `<span style="margin-right: 10px;"> <a> ${posts[i].tags[h]} </a> </span>`
                        }
                    li += `</div>
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
var countFlat=0;
function funPrev(){
 console.log("start"+start,"coun 2",count2,"cputn",count)
   if(start>=1){
        
       $("#innerDiv"+count2).hide();

       $("#innerDiv"+start).show(); 
       if(start!=1){
            count2--;
            start--;
       }
   }
    else{
        flagToOutSlid=1;
    }
}
var xx=1;
var ff=0;
function slider(){
    timerId = setInterval(function () {
        if(xx<=usersss.length&&ff==0){
            funNext();
            xx++;
        }
        else {
            ff=1
            funPrev();
            xx--;
            if(xx==1){
                ff=0;
            }
        }
    }, 1000,xx);
};
function stop(){
    clearInterval(timerId);
}
$(window).on('load', function() {
    setTimeout(function(){

        if(usersss.length>=4&&nextFlag==0){
        for(var iz=1;iz<=4;iz++){

            if (followersId.includes(usersss[iz-1].id)){
                var bt = `<div><button onclick="toggleFollow(this)" class='btn follow'>Unfollow</button></div>`
            } else {
                var bt = `<div><button onclick="toggleFollow(this)" class='btn unfollow'>Follow</button></div>`
            }


                $('.profilesContainer').append("<div class='person line-div' id='innerDiv"+iz+"'"+">\
                            <div class='img'><a href='profile.html?id=" + usersss[iz-1].id + "' class='prfLink' target='_blank'><img src='img/"+usersss[iz-1].profilepic+"'></a></div>\
                            <div class='name'><b><a href='profile.html?id=" + usersss[iz-1].id + "' class='prfLink' target='_blank'>"+usersss[iz-1].Fname +"  "+ usersss[iz-1].Lname +"</a></b></div>\
                            <div class='title' style='color: #00000085;'>"+ usersss[iz-1].track+"</div>" +bt + "</div>")

        }
            nextFlag=1;
    }},500)
});

function toggleFollow(btn) {
    if($(btn).hasClass('follow')){
        $(btn).addClass('unfollow')
        $(btn).removeClass('follow')
        $(btn).text('Follow')
    } else {
        $(btn).addClass('follow')
        $(btn).removeClass('unfollow')
        $(btn).text('Unfollow')
    }
}

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
request5.fail(function( jqXHR, textStatus ) {
    errorAlert("Request failed: " + textStatus );
});
function funNext(){
    if(usersss.length>=4&&nextFlag==0){
        for(var iz=1;iz<=4;iz++){
            if (followersId.includes(usersss[iz-1].id)){
                var bt = `<div><button onclick="toggleFollow(this)" class='btn follow'>Unfollow</button></div>`
            } else {
                var bt = `<div><button onclick="toggleFollow(this)" class='btn unfollow'>Follow</button></div>`
            }


            $('.profilesContainer').append("<div class='person line-div' id='innerDiv"+iz+"'"+">\
                            <div class='img'><a href='profile.html?id=" + usersss[iz-1].id + "' class='prfLink' target='_blank'><img src='img/"+usersss[iz-1].profilepic+"'></a></div>\
                            <div class='name'><b><a href='profile.html?id=" + usersss[iz-1].id + "' class='prfLink' target='_blank'>"+usersss[iz-1].Fname +"  "+ usersss[iz-1].Lname +"</a></b></div>\
                            <div class='title' style='color: #00000085;'>"+ usersss[iz-1].track+"</div>" +bt + "</div>")
        }
        nextFlag=1;
    }
    else{
     $("#innerDiv"+start).hide(); 
       
             if(count==usersss.length&&$("#innerDiv"+count).length==0){

                 if (followersId.includes(usersss[count-1].id)){
                     var bt = `<div><button onclick="toggleFollow(this)" class='btn follow'>Unfollow</button></div>`
                 } else {
                     var bt = `<div><button onclick="toggleFollow(this)" class='btn unfollow'>Follow</button></div>`
                 }
                 $('.profilesContainer').append("<div class='person line-div' id='innerDiv"+count+"'"+">\
                            <div class='img'><a href='profile.html?id=" + usersss[count-1].id + "' class='prfLink' target='_blank'><img src='img/"+usersss[count-1].profilepic+"'></a></div>\
                            <div class='name'><b><a href='profile.html?id=" + usersss[count-1].id + "' class='prfLink' target='_blank'>"+usersss[count-1].Fname +"  "+ usersss[count-1].Lname +"</a></b></div>\
                            <div class='title' style='color: #00000085;'>"+ usersss[count-1].track+"</div>" +bt + "</div>")
          }
             console.log(followersId)
             console.log('------')
        if(count<usersss.length){
            if (followersId.includes(usersss[count-1].id)){
                var bt = `<div><button onclick="toggleFollow(this)" class='btn follow'>Unfollow</button></div>`
            } else {
                var bt = `<div><button onclick="toggleFollow(this)" class='btn unfollow'>Follow</button></div>`
            }
            $('.profilesContainer').append("<div class='person line-div' id='innerDiv"+count+"'"+">\
                            <div class='img'><a href='profile.html?id=" + usersss[count-1].id + "' class='prfLink' target='_blank'><img src='img/"+usersss[count-1].profilepic+"'></a></div>\
                            <div class='name'><b><a href='profile.html?id=" + usersss[count-1].id + "' class='prfLink' target='_blank'>"+usersss[count-1].Fname +"  "+ usersss[count-1].Lname +"</a></b></div>\
                            <div class='title' style='color: #00000085;'>"+ usersss[count-1].track+"</div>" +bt + "</div>")
            count++;
        }
         $("#innerDiv"+count2).show();
        if(count2<usersss.length){
            count2++;
            start++;      
        }
    if(count2==usersss.length){
        flagToOutSlid=0;
    }
    }
}
//lolo
var AlignCount=1;
function AlignFun(){
   debugger
    if(AlignCount==0){
        
        $('#postBody').css("text-align","left");
        $("#_align").removeClass("fa-align-right");
        $("#_align").addClass("fa-align-left");
        
        AlignCount++;
    }
     else if(AlignCount==1){
        
        $('#postBody').css("text-align","center");
        $("#_align").removeClass("fa-align-left");
        $("#_align").addClass("fa-align-center");

        AlignCount++;
    }
    else if(AlignCount==2){
        $('#postBody').css("text-align","right");
        $("#_align").removeClass("fa-align-center");
        $("#_align").addClass("fa-align-right");
        AlignCount=0;       
    }
 
}




var AlignCount=1;
function AlignFun(){

    if(AlignCount==0){

        $('#postBody').css("text-align","left");
        $("#_align").removeClass("fa-align-right");
        $("#_align").addClass("fa-align-left");
        
        AlignCount++;
    }
     else if(AlignCount==1){
        
        $('#postBody').css("text-align","center");
        $("#_align").removeClass("fa-align-left");
        $("#_align").addClass("fa-align-center");
        
        AlignCount++;
    }
    else if(AlignCount==2){
        $('#postBody').css("text-align","right");
        $("#_align").removeClass("fa-align-center");
        $("#_align").addClass("fa-align-right");
        AlignCount=0;       
    }
 
}



var FintFamilyCount=0;
function fontFamily(){

    if(FintFamilyCount==0){
        
        $('#postBody').css("font-family","Cursive");
        FintFamilyCount++;
    }
     else if(FintFamilyCount==1){
        
        $('#postBody').css("font-family","Sans-serif");
        FintFamilyCount++;
    }
    else if(FintFamilyCount==2){
        $('#postBody').css("font-family","Fantasy");
        FintFamilyCount=0;       
    }
 
}



var ColorCount=0;
function fontColor(){
    if(ColorCount==0){
        $('#postBody').css("color","#919397");
        $("#_Color").css("color","#919397");
        //$("#_Color").addClass("fa-align-left");*/
        
        ColorCount++;
    }
     else if(ColorCount==1){
        
        $('#postBody').css("color","#1e52a7");
        $("#_Color").css("color","#1e52a7");
       // $("#_Color").addClass("fa-align-center");*/
        
        ColorCount++;
    }
    else if(ColorCount==2){
        $('#postBody').css("color","#000");
        $("#_Color").css("color","#000");
       /* $("#_Color").addClass("fa-align-right");*/
        ColorCount=0;       
    }
    
 
}