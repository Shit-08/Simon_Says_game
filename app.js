let gameSeq=[];
let userSeq=[];

let btns=["red", "blue", "green", "yellow"];
let started=false;
let level=0;

document.addEventListener("keydown", function() {
    if(!started) {
        console.log("Key pressed");
        started = true;
        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}

function levelUp() {
    level++;
    userSeq=[];
    document.querySelector("h2").textContent = `Level ${level}`;
    let randomNum = Math.floor(Math.random() * 4);
    let randomColor = btns[randomNum];
    let randomBtn=document.querySelector(`#${randomColor}`);
    gameSeq.push(randomColor);
    console.log("game seq",gameSeq);
    btnFlash(randomBtn);
}

let allBtns=document.querySelectorAll(".box");
for(let btn of allBtns){
    btn.addEventListener("click", function() {
        userSeq.push(btn.id);
        console.log("user seq", userSeq);
        btnFlash(btn);
        checkAnswer(userSeq.length-1);
    });
}

function checkAnswer(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        console.log("Correct!");
        if(userSeq.length === gameSeq.length) {
            setTimeout(levelUp,1000);
        }
    }
    else{
        console.log("Wrong!");
        document.querySelector("h2").innerHTML = `Game Over, Your score is <b> ${level} </b> <br> Press Any Key to Restart`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },400);
        reset();
    }
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}