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

