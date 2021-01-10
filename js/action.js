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

//dropdown navbar
$('#games .dropbtn').click(function() {
    var el = $('.dropdown-content');
    curHeight = el.height();
    if(curHeight==0){
        autoHeight = el.css('height', 'auto').height();
        el.height(curHeight).animate({height: autoHeight}, 1000);
    }
    else{
        curHeight = el.height();
        zeroHeight = el.css('height', '0').height();
        el.height(curHeight).animate({height: zeroHeight}, 500);
    }
    
});

function errorAlert(errorMessage) {
    var aler = document.createElement('div')
    aler.append(errorMessage);
    aler.setAttribute('class', 'alertt')
    aler.setAttribute('id', 'alert')
    aler.style.width = "975px"
    aler.style.textAlign = "center"
    aler.style.margin = "45px auto 20px"
    aler.style.backgroundColor = "darksalmon"
    aler.style.padding = "20px"
    aler.style.borderRadius = "10px"
    document.body.prepend(aler);
    setTimeout(function () {
        $("#alert").slideUp(500);
    },3000)
}

