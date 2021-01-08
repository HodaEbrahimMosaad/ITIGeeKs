function logout() {
    deleteCookie("id");
    deleteCookie("Fname");
    deleteCookie("Lname");
    deleteCookie("email");
    deleteCookie("bio");
    deleteCookie("track");
    deleteCookie("role");
    window.location = 'login.html';
}

function likeFun(LikeDiv){
    var count = Number.parseInt($(LikeDiv).parent().prev().children("span").text())
    if ($(LikeDiv).hasClass("likeClass")){
        $(LikeDiv).parent().prev().children("span").text(--count)
    } else {
        $(LikeDiv).parent().prev().children("span").text(++count)
    }
    $(LikeDiv ).toggleClass("likeClass")
}

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


