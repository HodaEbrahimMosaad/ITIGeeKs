
var files ;
window.onload=function(){
   
            
              if (window.File && window.FileList && window.FileReader) {
                var filesInput = document.getElementById("postImgs");
                filesInput.addEventListener("change", function(event) {
                  files = event.target.files; //FileList object
                  var output = document.getElementById("result");
                  for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                      console.log(files[i]['name'],i);
                    //Only pics
                    if (!file.type.match('image'))
                      continue;
                    var picReader = new FileReader();
                    picReader.addEventListener("load", function(event) {
                      var picFile = event.target;
                      var div = document.createElement("div");
                      div.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" +
                        "title='" + picFile.name + "'/>";
                      output.insertBefore(div, null);
                        let fileUpload =files[i];
                        console.log(files);
                      
                      
                    });
                      
                    //Read the image
                    picReader.readAsDataURL(file);
                    
                  }
                });
              } else {
                console.log("Your browser does not support File API");
              } 
}

function CreatePost(){
    
    $("#_form").submit(function(e) {
    e.preventDefault();
});
    console.log(files,"files from create post")
     var PostBody=$('#postBody').val();
    if(files!=undefined){
        
            var postDiv=`
            <div class="post line-div">
                <div class="head">
                    <div class="img"><img src="img/profile.jpg"></div>
                    <div class="info">
                        <div class="name">Ahmed Atef</div>
                        <div class="time"><i class="fa fa-history"></i> 3 min ago</div>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="body">
                    <span></span>
                    <p class="postP1" id="newPostBody"></p>
                    <div><a class="more">Read more..</a></div>
                    <div class="galary">
                        <div class="imgsContainer">
                            <i id="prevv" onclick="prevv(this)" class="fa fa-angle-left"></i>
                            <div id="newPostImgs">
                                
                            </div>
                            <i id="nextt" onclick="nextt(this)" class="fa fa-angle-right"></i>
                        </div>
                    </div>
                </div>
                <div class="react">
                    <div onclick="likeFun(this)" ><i class="fa fa-thumbs-o-up"> Like</i></div>
                    <div><i class="fa fa-comments-o"></i> Comment</div>
                </div>
                <div class="comments">
                    <div class="ccmnt">
                        <div class="img"><img src="img/profile.jpg"></div>
                        <div class="post-text">
                            <p><b>Mostafa Ali</b></p>
                            <p>agmd comment fel 3allam</p>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="ccmnt">
                        <div class="img"><img src="img/profile.jpg"></div>
                        <textarea class="post-text" placeholder="Write a comment.." onkeyup="txtautoheight(this)"></textarea>
                        <!-- <div class="post-text" contenteditable="true" data-placeholder="Write a comment.."></div> -->
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>`;

        
        var c=1;
        $('#_form').after(postDiv);
        $('#newPostBody').append( PostBody);
        console.log(PostBody)
         for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                      console.log(files[i]['name'],i);
                    //Only pics
                    if (!file.type.match('image'))
                      continue;
                    var picReader = new FileReader();
                    picReader.addEventListener("load", function(event) {
                      var picFile = event.target;
                       if(c==1){
                            $('#newPostImgs').append("<img id='img"+c+"' class='left0' src='" + picFile.result + "'" +"title='" + picFile.name + "'/>");
                           c++;
                       }
                        else{
                              $('#newPostImgs').append("<img id='img"+c+"' class='left1' src='" + picFile.result + "'" +"title='" + picFile.name + "'/>");
                            c++;
                        }
                     
                      
                        let fileUpload =files[i];
                        console.log(files);
                      
                      
                    });
                      
                    //Read the image
                    picReader.readAsDataURL(file);
                    
                  }
    }
    
}

//text area auto height
function txtautoheight(x) {
    x.style.height = "5px";
    x.style.height = (15+x.scrollHeight)+"px";
}

$(function(){
    //fixed profile section in home
    var stickyHeaderTop = $('.sticky').offset().top;

    $(window).scroll(function(){
        if( $(window).scrollTop() > stickyHeaderTop ) {
            $('.sticky').css({position: 'fixed', top: '0px', margin:'30px 0'});
            $('#sticky').css('display', 'block');
        } else {
            $('.sticky').css({position: 'static', top: '0px', margin:'0'});
            $('#sticky').css('display', 'none');
        }
    });

    //
    $('.line-div').on('click', '.more', function(){
        console.log('more');
        var p =this.parentNode.previousElementSibling;
        p.style['-webkit-line-clamp']=150;
        this.text="See less";
        this.className="less";
    }).on('click', '.less', function(){
        console.log("less clicked")
        var p =this.parentNode.previousElementSibling;
        p.style['-webkit-line-clamp']=3;
        this.text="See More";
        this.className="more";
    });
    //galary
    var count = 1;

    var imgArr = $('.galary>div').find('img');
    $('#next').click(function(){
        prevFlag = 0;
        $(`.galary>div #img${count}`).animate({left: '700px'});
        $('.galary img').css('left','-700px');
        if(count>=imgArr.length){
            count =0;
        }
        if(count!=imgArr.length)
            $(`.galary>div #img${++count}`).animate({left: '0px'});
    });
    //
    var prevFlag = 0;
    $('#prev').click(function(){
        if(prevFlag == 0){
            $('.galary img').removeClass('left1');
            $('.galary img').removeAttr('style');
            $('.galary #img1').removeClass('left0');
            $('.galary img').css('right','-700px');
            $(`.galary>div #img${count}`).css('right','0px');
            prevFlag = 1;
        }
        //$('.galary img').removeAttr('style');
        $(`.galary>div #img${count}`).animate({right: '700px'});
        $('.galary img').css('right','-700px');
        if(count>=imgArr.length){
            count =0;
        }
        if(count!=imgArr.length)
            $(`.galary>div #img${++count}`).animate({right: '0px'});
    });
    //
})
    var i=1;
    function nextt(thiss){
        
        prevFlag = 0;
        $(`.galary>div #img${i}`).animate({left: '700px'});
        $('.galary img').css('left','-700px');
        if(i>=files.length){
            i =0;
        }
        if(i!=files.length)
            $(`.galary>div #img${++i}`).animate({left: '0px'});
    
    }
function prevv(thiss){
        var prevFlag = 0;
   
        if(prevFlag == 0){
            $('.galary img').removeClass('left1');
            $('.galary img').removeAttr('style');
            $('.galary #img1').removeClass('left0');
            $('.galary img').css('right','-700px');
            $(`.galary>div #img${i}`).css('right','0px');
            prevFlag = 1;
        }
        //$('.galary img').removeAttr('style');
        $(`.galary>div #img${i}`).animate({right: '700px'});
        $('.galary img').css('right','-700px');
        if(i>=files.length){
            i =0;
        }
        if(i!=files.length)
            $(`.galary>div #img${++i}`).animate({right: '0px'});
    
}
