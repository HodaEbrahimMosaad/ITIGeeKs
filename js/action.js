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