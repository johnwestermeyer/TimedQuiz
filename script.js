let quizContents = [];
let quiz = document.querySelector(".quiz");
let startButton = document.querySelector(".button");
let start = document.querySelector("#start");
let countdown = document.querySelector("#countdown");
let status = document.querySelector("#status");
let highscore = localStorage.getItem("highscore");
let closebtn = document.querySelector("#close");
var scoreDiv = document.querySelector("#scores");
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
//recursive quiz function
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
//fail function when timer runs out
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
//90 second countdown timer for quiz
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
    var scoreArr = [];
    if(initials === null){
        initials = "";
    }
    if (highscore === null){
        scoreArr = [[score, 90 - timer, initials]];
        localStorage.setItem("highscore",JSON.stringify(scoreArr));
    } else{
        scoreArr = JSON.parse(highscore);
        scoreArr.push([score, 90 - timer, initials]);
        localStorage.setItem("highscore",JSON.stringify(scoreArr));
    }
    clearQuiz();
    var submitted = document.createElement("h1");
    submitted.textContent = "Highscore Submitted";
    quiz.appendChild(submitted);
}
//highscore list generation 
function viewScores(){
    var scorelist = document.querySelector("#scorelist");
    scorelist.innerHTML = "";
    if(highscore !== null){
        var title = document.createElement("h2");
        var list = document.createElement("ol");
        title.textContent = "Highscores:";
        var scoreArr = JSON.parse(highscore);
        scorelist.appendChild(title);
        scorelist.appendChild(list);
        scoreArr.sort((a,b) => b[0] - a[0]);
        scoreArr.forEach(element => {
            var line = document.createElement("li");
            line.textContent = `${element[0]} Points with ${element[1]} Second(s) Remaining by ${element[2]}`;
            list.appendChild(line);
        });
    }else{
        scorelist.textContent = "No Highscores";
    }
    scoreDiv.setAttribute("style", "display:block")
}
//close function for highscore list
function close(){
    scoreDiv.setAttribute("style", "display:none")
}

closebtn.addEventListener("click", close);