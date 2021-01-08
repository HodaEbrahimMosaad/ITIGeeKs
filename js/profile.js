var modal = document.getElementById("myModal");
var btn = document.getElementById("coverModal");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
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
    $('#UserFullName').html(_fname +" "+_lName)
    $('#UserTrack').html(_Track);

    //========================display user info=================================//


   
        $('#FnameEdite').val(_fname);
        console.log(_fname,"jj")
        $('#LnameEdite').val(_lName);
        $('#emailEdite').val(_Email);
        $('#bioEdite').value=_bio;
     
    //===============get & set  new data=================//
    $("#editProfileBtn").click(function(){
         /*deleteCookie("Fname");
        deleteCookie("Lname");
        deleteCookie("email");
        deleteCookie("bio");*/
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
        //var _newProfileImg=newProfileImg.replace(/^.*[\\\/]/, '');
        debugger
        //location.reload(true);

    });

    
    
}
span2.onclick = function() {
  modal2.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}
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
      setCookie('coverImg',mysrc,365)
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

window.onload=function(){
    var firstname =getCookie("Fname");
    var lastName=getCookie("Lname")
    var Track=getCookie("track");
    
    $('#UserFullName,.UserName').html(firstname +" "+lastName)
    $('#UserTrack').html(Track);
}

