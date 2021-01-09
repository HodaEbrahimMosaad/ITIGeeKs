var board=document.querySelector(".board")
var player=document.querySelector(".player")
var playAgain=document.querySelector(".playAgain")
var restart=document.querySelector(".restart")
var box=0
var winningArray = [
    [0, 1, 2, 3], [41, 40, 39, 38],[7, 8, 9, 10],
    [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24],
    [21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 30, 31],
    [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3],
    [0, 7, 14, 21], [41, 34, 27, 20], [1, 8, 15, 22],
    [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18],
    [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],
    [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15],
    [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24],
    [41, 33, 25, 17], [7, 15, 23, 31], [34, 26, 18, 10],
    [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17],
    [6, 12, 18, 24], [28, 22, 16, 10], [13, 19, 25, 31],
    [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18],
    [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
    [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25],
    [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32],
    [11, 7, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4],
    [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9],
    [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25],
    [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30],
    [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],
    [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31],
    [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
];
var currentPlayer=1
document.addEventListener("DOMContentLoaded", loadDOM)
//load dom function

function loadDOM(){
    createBoard()
    player.innerHTML=currentPlayer
    playAgain.addEventListener("click",reset)
    var squares =document.querySelectorAll(".board div")
    Array.from(squares).forEach(square=>{
        square.addEventListener("click",clickBox)

    })
}
// createBoard function

function createBoard(){
    for(var i=0;i<49;i++){
        var div =document.createElement("div")
        div.setAttribute("id",i)
        div.className = "square"
        if (i>=42){
            div.className="taken non";
        }
        board.appendChild(div)
    }
}
//clickBoard function

function clickBox(){
    var squares =document.querySelectorAll(".board div")
    var click =parseInt(this.id)
    if( squares[click+7].classList.contains("taken") && !squares[click].classList.contains("taken")){
        if(currentPlayer===1){
            currentPlayer=2
            player.innerHTML=currentPlayer
            this.className="player-one taken"
            checkWon()
        }else if(currentPlayer===2){
            currentPlayer=1
            player.innerHTML=currentPlayer
            this.className="player-two taken"
            checkWon()
        }
        if(box===42){
            setTimeout(()=>alert("boxes filled"),300)
            setTimeout(()=>restart.style.display="block",500)
        }
    }else{
        //alert("You cannot build on an empty space or on a space that has been built on")
    }
}
//the checkWon function

function checkWon(){
    var squares =document.querySelectorAll(".board div")
    for (var y=0;y<winningArray.length;y++){
        var flagR = true, flagB = true;
        var square =winningArray[y] //(1,2,3,4)
        for(var j =0 ;j<4;j++){
            if(!squares[square[j]].classList.contains("player-one")){
                flagR=false;
                break;
            }
        }
        for(var j =0 ;j<4;j++){
            if(!squares[square[j]].classList.contains("player-two")){
                flagB=false;
                break;
            }
        }
        if(flagR){
            setTimeout(function(){
                document.querySelector('.winner').innerHTML= '<h3>player one(Red) wins</h3>';
            },200)
            //setTimeout(() =>alert("player one(Red) wins "), 200)
            setTimeout(() =>restart.style.display="block", 500)

        }else if(flagB){
            setTimeout(function(){
                document.querySelector('.winner').innerHTML= '<h3>player two(Blue) wins</h3>';
            },200)
            //setTimeout(() =>alert("player two(Blue) wins"), 200)
            setTimeout(() =>restart.style.display="block", 500)
        }
    }
}
function reset(){
    console.log('reset')
    board.innerHTML=""
    loadDOM()
    restart.style.display="none"
}