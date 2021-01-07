 function hasCookie(name) {
    if(getCookie(name))
        return true;
    else return false;
}

 function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
}

 function deleteCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 30 Jan 1970 00:00:00 UTC; ";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
}


 function allCookieList() {
    var cookieArr = []
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split("=");
        cookieArr[parts[0].trim()] = decodeURIComponent(parts[1].trim());
    }
    return cookieArr;
}



