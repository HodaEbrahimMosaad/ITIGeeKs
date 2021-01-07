function logoute() {
    deleteCookie("id");
    deleteCookie("Fname");
    deleteCookie("Lname");
    deleteCookie("email");
    deleteCookie("bio");
    deleteCookie("track");
    deleteCookie("role");
    window.location = 'login.html';
}