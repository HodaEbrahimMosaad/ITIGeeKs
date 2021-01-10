$('.profile').attr('src', 'img/'+getCookie('profilepic'))

var request11 = $.ajax({
    url: "http://localhost:3000/tags",
    method: "GET",
    data: {},
    dataType: "json"
});
request11.done(function( tags ) {
    var html = ``
    for (var i=0; i < tags.length; i++){
        html += `<span style="margin-right: 5px;"><a onclick="addtag(event)">${tags[i]}</a></span>`
    }
    document.getElementById('post-tags').innerHTML += html
});
request11.fail(function( jqXHR, textStatus ) {
    errorAlert("Request failed: " + textStatus );
});



var files ;
var selectedTags = [];
function addtag(e){
    var targett = e.target;
    var text = targett.innerText||targett.textContent;
    if ($(targett).parent().hasClass('selected-tag')){
        $(targett).parent().removeClass("selected-tag");
        var index = selectedTags.indexOf(text);
        if (index > -1) {
            selectedTags.splice(index, 1);
        }
    } else {
        $(targett).parent().addClass("selected-tag");
        selectedTags.push(text)
    }
}
window.onload=function(){
    setTimeout(function () {
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
                        //var div = document.createElement("div");
                        output.innerHTML += "<img class='thumbnail' src='" + picFile.result + "'" +
                            "title='" + picFile.name + "'/>";
                        //output.insertBefore(div, null);
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
    },300)
};
var myNewPostImgLen=0;

function CreatePost(){

    var fontfamilys = "system-ui";
    var fontcolors = "#000";
    var aligns = 'left'
    if($('#_align').hasClass('fa-align-right'))
        aligns = 'right';
    else if($('#_align').hasClass('fa-align-center'))
        aligns = 'center';
    //
    //if($('#_Color').style.color)
    fontcolors = $('#_Color').css("color");
    fontfamilys = $("#postBody").css('font-family');
    console.log(fontfamilys);
    //
    $("#_form").submit(function(e) {
        e.preventDefault();
    });
    console.log(files,"files from create post")
    var PostBody=$('#postBody').val();
    if(PostBody!=""||files)
    {
        if(files!=undefined){
            var n ='', p='';
            if(files.length>1)
            {
                p = `<i id="prevv" onclick="prevv(this)" class="fa fa-angle-left"></i>`;
                n = `<i id="nextt" onclick="nextt(this)" class="fa fa-angle-right"></i>`;
            }
            var postDiv=`
                <div class="post line-div">
                    <div class="head">
                        <div class="img"><img src="img/${getCookie('profilepic')}"></div>
                        <div class="info">
                            <div class="name">${getCookie('Fname')} ${getCookie('Lname')}</div>
                            <div class="time"><i class="fa fa-history"></i> ${(new Date).toDateString()}</div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="body">
                        <span></span>
                        <p class="postP1" id="newPostBody" style = "text-align:${aligns}; color:${fontcolors}; font-family:${fontfamilys};"></p>
                        <div><a c[lass="more">Read more..</a></div>
                        <div class="galary">
                            <div class="imgsContainer">
                                
                                ${p}
                                <div id="newPostImgs">
                                    
                                </div>
                                ${n}
                            </div>
                        </div>
                    </div>
                    <div class="post-tags" style="text-align: initial;" id="post-tags">`
                        for (var h=0; h< selectedTags.length; h++){

                            postDiv += `<span style="margin-right: 10px;"> <a> ${selectedTags[h]} </a> </span>`
                        }
                    postDiv += `</div>
                    <div style="color:cornflowerblue;"><span id="likeCounter">0 </span> Likes <div style="color:cornflowerblue;"></div></div>
                    <div class="react">
                        <div onclick="likeFun(this)" ><i class="fa fa-thumbs-o-up"> Like</i></div>
                        <div><i class="fa fa-comments-o"></i> Comment</div>
                    </div>
                    <div class="comments">
                       
                        <div class="ccmnt">
                            <div class="img"><img src="img/${getCookie('profilepic')}"></div>
                            <textarea class="post-text" placeholder="Write a comment.." onkeyup="txtautoheight(this)"></textarea>
                            <!-- <div class="post-text" contenteditable="true" data-placeholder="Write a comment.."></div> -->
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>`
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
                    //var fileUpload =files[i];
                    console.log(files);
                });
    
                //Read the image
                picReader.readAsDataURL(file);
            }
        }
        else{
            var postDiv=`
                <div class="post line-div">
                    <div class="head">
                        <div class="img"><img src="img/${getCookie('profilepic')}"></div>
                        <div class="info">
                            <div class="name">${getCookie('Fname')} ${getCookie('Lname')}</div>
                            <div class="time"><i class="fa fa-history"></i> ${(new Date).toDateString()}</div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="body">
                        <span></span>
                        <p class="postP1" id="newPostBody" style = "text-align:${aligns}; color:${fontcolors}; font-family:${fontfamilys};"></p>
                        <div><a class="see more">Read more..</a></div>
                        <div class="post-tags" style="text-align: initial;" id="post-tags">`
                        for (var h=0; h< selectedTags.length; h++){

                            postDiv += `<span style="margin-right: 10px;"> <a> ${selectedTags[h]} </a> </span>`
                        }
                    postDiv += `</div>
                        
                    </div>
                    <div style="color:cornflowerblue;"><span id="likeCounter">0 </span> Likes <div style="color:cornflowerblue;"></div></div>
                    <div class="react">
                        <div onclick="likeFun(this)" ><i class="fa fa-thumbs-o-up"> Like</i></div>
                        <div><i class="fa fa-comments-o"></i> Comment</div>
                    </div>
                    <div class="comments">
                        <div class="ccmnt">
                            <div class="img"><img src="img/${getCookie('profilepic')}"></div>
                            <textarea onkeypress="onTestChange(this);" class="post-text" placeholder="Write a comment.." onkeyup="txtautoheight(this)"></textarea>
                            <!-- <div class="post-text" contenteditable="true" data-placeholder="Write a comment.."></div> -->
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>`;
            $('#_form').after(postDiv);
            $('#newPostBody').append( PostBody);
        }
        $('.postP1').each(function(i, obj) {
            if (Number.parseInt($(obj).text().length) <= 355){
                $(obj).next().css({"display": "none"})
            }
        });
        if (files){
            myNewPostImgLen = files.length;
        }
        files = undefined;
        $('.create-post .post-text').val("");
        $('.create-post .post-text').removeAttr("style");
        $('#result').html("");
    }
    selectedTags = [];
    $('.selected-tag').removeClass('selected-tag')
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
var prevFlag = 0;
function nextt(thiss){
    if (!files){
        console.log($(thiss).siblings('div').children('img').length)
        myNewPostImgLen = $(thiss).siblings('div').children('img').length
    }
    prevFlag = 0;
    $(`.galary>div #img${i}`).animate({left: '700px'});
    $('.galary img').css('left','-700px');
    if(i>=myNewPostImgLen){
        i =0;
    }
    if(i!=myNewPostImgLen)
        $(`.galary>div #img${++i}`).animate({left: '0px'});

}
function prevv(thiss){
    if (!files){
        console.log($(thiss).next('div').children('img').length)
        myNewPostImgLen = $(thiss).next('div').children('img').length
    }
    prevFlag = 0;

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
    if(i>=myNewPostImgLen){
        i =0;
    }
    if(i!=myNewPostImgLen)
        $(`.galary>div #img${++i}`).animate({right: '0px'});
}
function onTestChange(me) {
    var key = window.event.keyCode;
    if (key === 13) {
        console.log(me.value)

        var comContent =  me.value
        var comm = `<div class="ccmnt">
                        <div class="img"><a style="text-decoration: none;" href="profile.html" id="prfLink" target="_blank"><img src="img/${getCookie("profilepic")}"></a></div>
                        <div class="post-text">
                            <p><b><a style="text-decoration: none;" href="profile.html" id="prfLink" target="_blank">${getCookie("Fname")} ${getCookie("Lname")}</a></b></p>
                            <p>${comContent}</p>
                        </div>
                        <div class="clearfix"></div>
                    </div>`
        $(me).parent().parent().prepend(comm)
        me.value = ""
        return false;
    }
    else {
        return true;
    }
}