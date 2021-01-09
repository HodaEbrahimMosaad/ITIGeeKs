var _follower = 0;
var followersId=[]
var id = Number.parseInt(getCookie('id'))
var request1 = $.ajax({
    url: "http://localhost:3000/following",
    method: "GET",
    data: {},
    dataType: "json"
});
request1.done(function( following ) {
    for (var i=0; i < following.length; i++){
        if (following[i].follower == id){
            followersId.push(following[i].followed)
            _follower++;
        }

        console.log(followersId)
    }
    var _users = []
    var request5 = $.ajax({
        url: "http://localhost:3000/users",
        method: "GET",
        data: {},
        dataType: "json"
    });
    request5.done(function(users) {
        for (var i=0; i< users.length; i++){
            if (followersId.includes(users[i].id)){
                _users.push(users[i])
            }
        }
        console.log(_users)
        var html = ``
        for (var i =0; i< _users.length;i++){
            var li = `<div class="person line-div" id="innerDiv1">
                        <div class="img"><a style="text-decoration: none;" href="profile.html?id=${_users[i].id}" id="prfLink" target="_blank"><img src="img/${_users[i].profilepic}"></a></div>
                        <div class="name"><b><a style="text-decoration: none;" href="profile.html?id=${_users[i].id}" id="prfLink" target="_blank">${_users[i].Fname} ${_users[i].Lname}</a></b></div>
                        <div class="title" style="color: #00000085;">${_users[i].track}</div>
                        <div><button onclick="toggleFollow(this)" class="btn follow">Unfollow</button></div>
                     </div>`
            html += li
        }
        $('#profCont').append(html)
    });
    request5.fail(function( jqXHR, textStatus ) {
        errorAlert("Request failed: " + textStatus );
    });
});
request1.fail(function( jqXHR, textStatus ) {
    errorAlert("Request failed: " + textStatus );
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
