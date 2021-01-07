$('#cont').click(function () {
    $('#myApp').fadeToggle()
});
$('.chat-input input').keyup(function(e) {
    if ($(this).val() == '')
        $(this).removeAttr('good');
    else
        $(this).attr('good', '');
});
var trigger=[];
var reply=[];
var jsObj = [];
$( document ).ready(function() {
    var xhr = new XMLHttpRequest();
    //2)OPen conn
    xhr.open("GET", "data.json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4)
            if (xhr.status >= 200 && xhr.status < 300) {
                jsObj = JSON.parse(xhr.responseText);

                for (var i =0 ; i< jsObj.length; i++){
                    trigger.push(jsObj[i].value)
                    reply.push(jsObj[i].message)
                }
            }
            else {
                console.log("PAGENOTFOUND");
            }
    };
    //3) send req data-->POST
    xhr.send("");
});
var alternative = ["What?...", "Eh?...", "I can't understand you!"];
function test2(key) {
    if(key === 13){ //Enter button
        var input = document.getElementById("input").value;
        process(input)
        output(input);
    }
}
function test(){
    var input = document.getElementById("input").value;
    process(input)
    output(input);
}
function process(input) {
    var now = new Date()
    var inp = `
                        <article class="msg-container msg-remote" id="msg-0">
                            <div class="msg-box">
                                <img class="user-img" id="user-0" src="img/profile.jpg" />
                                <div class="flr">
                                    <div class="messages">
                                        <p class="msg" id="msg-0">
                                            ${input}
                                        </p>
                                    </div>
                                    <span class="timestamp"><span class="username">${getCookie("Fname")}</span>&bull;<span class="posttime">${now.getHours() + ":" + now.getMinutes()}</span></span>
                                </div>
                            </div>
                        </article>`
    document.getElementById('app').innerHTML += inp;
}
function output(input){
    var text = (input.toLowerCase()).replace(/[^\w\s\d]/gi, ""); //remove all chars except words, space and
    text = text.replace(/ a /g, " ").replace(/i feel /g, "").replace(/whats/g, "what is").replace(/please /g, "").replace(/ please/g, "");
    if(compare(trigger, reply, text)){
        var product = compare(trigger, reply, text);
    } else {
        var product = alternative[Math.floor(Math.random()*alternative.length)];
    }
    function callback() {
        var now = new Date();
        var out = `<article class="msg-container msg-self" id="msg-0">
                <div class="msg-box">
                    <div class="flr">
                        <div class="messages">
                            <p class="msg" id="msg-1">
                                ${product}
                            </p>
                        </div>
                        <span class="timestamp"><span class="username">Sami</span>&bull;<span class="posttime">${now.getHours() + ":" + now.getMinutes()}</span></span>
                    </div>
                    <img class="user-img" id="user-0" src="img/cartoon-robot-toy-object-for-small-children-to-vector-32859441.jpg" />
                </div>
            </article>`
        document.getElementById("app").innerHTML += out;
        speak(product);
    }
    document.getElementById("input").value = ""; //clear input value

        i = 0;
        var back = setInterval(function() {
            i = ++i % 4;
            $("#con").css({display: 'block'})
            $("#loading").html("Typing"+Array(i+1).join("."));
        }, 500);

    setTimeout(function() {
        clearInterval(back)
        $("#con").css({display: 'none'})
        callback()
    }, 2000)
}
function compare(arr, array, string){
    var item;
    for(var x=0; x<jsObj.length; x++){
        for(var y=0; y<jsObj[x].value.length; y++){
            if(jsObj[x].value[y] == string){
                items = jsObj[x].message;
                item =  items[Math.floor(Math.random()*items.length)];
            }
        }
    }
    return item;
}
function speak(string){
    var utterance = new SpeechSynthesisUtterance();
    utterance.voice = speechSynthesis.getVoices().filter(function(voice){return voice.name == "Agnes";})[0];
    utterance.text = string;
    utterance.lang = "en-US";
    utterance.volume = 1; //0-1 interval
    utterance.rate = 1;
    utterance.pitch = 2; //0-2 interval
    speechSynthesis.speak(utterance);
}