let quizContents = [];
let quiz = document.querySelector(".quiz");
let startButton = document.querySelector(".button");
let start = document.querySelector("#start");
let countdown = document.querySelector("#countdown");
let status = document.querySelector("#status");
let timer = 90;
let score = 0;
let i = 0;  
let complete = false;

quizContents[0] = {
    question: "Commonly used data types DO NOT include:",
    op: ["string", "booleans", "alerts", "numbers"],
    correct: 3
};

quizContents[1] = {
    question: "The condition in an if/else statement is enclosed within _______.",
    op: ["quotes", "curly brackets", "paratheses","square brackets"],
    correct: 3
}

quizContents[2] = {
    question: "Arrays in JavaScript can be used to store ________.",
    op: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    correct: 4
}

quizContents[3] = {
    question: "String values must be enclosed within ______ when being assigned to variables.",
    op: ["commas", "curly brackets", "quotes", "parantheses"],
    correct: 3
}

quizContents[4] = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    op: ["JavaScript", "terminal/bash", "for loops", "console log"],
    correct: 4
}

function startQuiz(){
    clearQuiz();
    var ques = document.createElement("p");
    var choices = document.createElement("div");
    choices.setAttribute("id", "choices");
    var opt = [];
    for(let j = 0; j < 4; j++){
        opt[j] = document.createElement("button");
    }  

    if(i < quizContents.length){
        ques.textContent = quizContents[i].question;
        quiz.append(ques);
        quiz.append(choices);
        for(let j = 0; j < 4; j++){
            opt[j].textContent = quizContents[i].op[j];
            opt[j].setAttribute("data-index", j+1);
            choices.appendChild(opt[j]);
        }
         choices.addEventListener("click", function(event){
            event.preventDefault();
            let ans = parseInt(event.target.getAttribute("data-index"));
            if(ans === quizContents[i].correct){
                score++;
                status.textContent = "Correct";
                i++;
                startQuiz();
            }else {
                status.textContent = "Wrong";
                i++;
                timer -= 10;
                startQuiz();
            }
        })
    } else{
        complete = true;
        var done = document.createElement("h1");
        var result = document.createElement("p");
        var submit = document.createElement("button");      
        countdown.textContent = timer;
        done.textContent = "You finished the quiz!";
        result.textContent = `You got ${score} correct in ${90 - timer} seconds.`
        submit.textContent = "Add to Highscore List";
        submit.setAttribute("onclick", "saveHighscore();");
        quiz.appendChild(done);
        quiz.appendChild(result);
        quiz.appendChild(submit);
        }
}

function fail(){
    clearQuiz();
    var fail = document.createElement("h1");
    var restart = document.createElement("button");
    fail.textContent = "You ran out of time";
    restart.textContent = "Restart Quiz";
    restart.setAttribute("class", "button");
    i = 0;
    restart.setAttribute("onclick","startQuiz();startTimer();");
    quiz.appendChild(fail);
    quiz.appendChild(restart);
}

function startTimer(){
    timer = 90;
    complete = false;
    countdown.textContent = timer;
    clearInterval(clock);
    var clock = setInterval(function(){
        if(!complete){
            timer--;
            countdown.textContent = timer;
            if(timer === 0){
                clearInterval(clock);
                fail();
            }
        } else{
            clearInterval(clock);
        }
    }, 1000)
}

startButton.addEventListener("click", function(event){
    event.preventDefault();
    startQuiz();
    startTimer();
})

function clearQuiz()
{
    quiz.innerHTML = "";
}

function saveHighscore(){
    var initials = prompt("Enter Intials");
    var highscore = localStorage.getItem("highscore");
    var scoreArr = [];
    if (highscore === null){
        scoreArr = [[score, 90 - timer, initials]];
        localStorage.setItem(JSON.stringify(scoreArr));
    } else{
        scoreArr = JSON.parse(highscore);
        scoreArr.push([score, 90 - timer, initials]);
        scoreArr.sort(function(a,b){return a[0] < b[0]});
        localStorage.setItem(JSON.stringify(scoreArr));
    }
}