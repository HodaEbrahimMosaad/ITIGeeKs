// Get the modal
var modal = document.getElementById("myModal");
  
// Get the button that opens the modal
var btn = document.getElementById("coverModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//   select cover
  document.getElementById("mycover").src = getCookie("coverImg");
  function selectCover(){
      var radio = document.getElementsByName('cvr'); 
      for(i = 0; i < radio.length; i++) { 
          if(radio[i].checked) 
          var mysrc = radio[i].value; 
      } 
      console.log(mysrc);
      document.getElementById("mycover").src = mysrc;
      document.cookie = "coverImg="+mysrc+"; expires=Thu, 18 Dec 2022 12:00:00 UTC;";
      modal.style.display = "none";
  }
  //get cookie
  function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
          c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
          }
      }
      return "";
  }