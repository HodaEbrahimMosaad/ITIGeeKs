function logoute() {
    deleteCookie("id");
    deleteCookie("Fname");
    deleteCookie("Lname");
    deleteCookie("email");
    auth.signOut().then(() => {
        console.log('user signed out');
    });
    window.location = '/project/jsProject-master/jsProject-master/login.html';
}