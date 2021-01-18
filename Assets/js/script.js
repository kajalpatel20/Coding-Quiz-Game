//variables for reference elements
var highScoreEl = document.getElementById("high-scores")
var welcomeEl = document.getElementById("welcome");
var startQuiz = document.getElementById("start-quiz");

var timer = document.getElementById("timer-count");

var questionEl = document.getElementById("questions")
var questionTitle = document.getElementById("question-title");
var choice1 = document.getElementById("choice1");
var choice2 = document.getElementById("choice2");
var choice3 = document.getElementById("choice3");
var choice4 = document.getElementById("choice4");
var lineBreak = document.getElementById("lineBreak");
var resultCheck = document.getElementById("resultCheck");

var scoreEl = document.getElementById("scores");
var finalScore = document.getElementById("final-score");
var playerInitials = document.getElementById("player-initials");
var saveScoreBtn = document.getElementById("submit-score");

var leaderBoardEl = document.getElementById("board");
var gameOverScreen = document.getElementById(".gameOver");


// script variables
qIndex = 0;
userScore = 0;


//Set countdown timer to 30 seconds, start countdown function
var timeLeft = 30;
function updateTimer() {
     timerInterval = setInterval(function () {
//when timer reaches zero, clear interval function and display game over
        if (timeLeft === 0) {
               clearInterval(timerInterval);
               gameOver();
          } else {
          timeLeft--;
          timerDisplay.textContent = timeLeft + " seconds left";
          }
     }, 1000);
}

//quiz questions

// using constant to define the questions to keep it persistent throughout the script
const questions = [
    
    {
        q: "Which of the following functions of String object returns the character at the specified index?",
        c: ["substri()","indexOf()","charAt()","forEach()"],
        a: 2 //"charAt()"
    },
    {
        q: "What is the HTML tag under which one can write the JavaScript code?",
        c: ["<javascript>","<scripted>","<script>","<js>"],
        a: 2 //<script>
    },
    {
        q: "How do you write a ‘logical or’ in Javascript code?",
        c: ["//","$$","%","||",],
        a: 3 //"||" 
    },
    {
        q: "Which of the following is not a reserved word in JavaScript?",
        c: ["interface","throws","program","short"],
        a: 2 //program
    },
    {
        q: "What is the original name of JavaScript?",
        c: ["LiveScript","EScript","Mocha","JavaScript"],
        a: 2 //Mocha
    },
    {
        q: "What are the types of Pop up boxes available in JavaScript?",
        c: ["Alert","Prompt","Confirm","All of the above"],
        a: 3 //All of the above
    },
    {
        q: "The _______ method of an Array object adds and/or removes elements from an array.",
        c: ["Reverse","Shift","Slice","Splice"],
        a: 3 //Splice
    }
]

// event listeners
startQuiz.addEventListener("click",initiateQuiz);
scoreEl.addEventListener("submit",function(event){
    event.preventDefault();
    leaderBoard();
});
highScoreEl.addEventListener("click",leaderBoard);

choice1.addEventListener("click", function(){
    checkAnswer(0);
});
choice2.addEventListener("click", function(){
    checkAnswer(1);
});
choice3.addEventListener("click", function(){
    checkAnswer(2);
});
choice4.addEventListener("click", function(){
    checkAnswer(3);
});
saveScoreBtn.addEventListener("click",saveScoretoStorage);



// main functions

init();

function init(){
    welcome();
}

function welcome(){
    welcomeEl.style.display = "block";
    questionEl.style.display = "none";
    scoreEl.style.display = "none";
    leaderBoardEl.style.display = "none";

    var t = document.getElementById("welcome-title");
    var tx = document.getElementById("welcome-text");
    t.textContent = "Javascript Coding Challenge 2";
    tx.textContent = "get ready";
    startQuiz.textContent = "Start Quiz";
}

function initiateQuiz(){
    welcomeEl.style.display = "none";
    questionEl.style.display = "block";
    scoreEl.style.display = "none";
    leaderBoardEl.style.display = "none";

    lineBreak.style.display = "none";
    resultCheck.style.display = "none";
    startquestions();
}

function startquestions(){
    questionTitle.textContent = questions[qIndex].q;
    choice1.textContent = questions[qIndex].c[0];
    choice2.textContent = questions[qIndex].c[1];
    choice3.textContent = questions[qIndex].c[2];
    choice4.textContent = questions[qIndex].c[3];
}

// check answer function here
function checkAnswer(pick){
    lineBreak.style.display = "block";
    resultCheck.style.display = "block";
    if (pick === questions[qIndex].a){
        resultCheck.textContent = "Correct!";         
        userScore++;
    } else {
    resultCheck.textContent = "Wrong!";    
    }
    qIndex++;
    //console.log(qIndex);
    if (qIndex < questions.length){
        startquestions();
    } else {
        displayFinalScore();
    }
}

// function for final score & option to save
function displayFinalScore(){
    welcomeEl.style.display = "none";
    questionEl.style.display = "none";
    scoreEl.style.display = "block";
    leaderBoardEl.style.display = "none";
    finalScore.textContent = userScore;

}

function saveScoretoStorage(){
    //if (playerInitials === ""){
    //    alert("Please enter your initials in order to make it to the leader board");
    //}
    console.log(playerInitials.value);
    console.log(userScore);
    //var addScores = function (playerInitials, userScore) {
        // retrieve it (Or create a blank array if there isn't any info saved yet),
        var savedScores = JSON.parse(localStorage.getItem('storedScores')) || [];
        // add to it,
        savedScores.push({playerInitals: playerInitials, userScore: userScore});
        // then put it back.
        localStorage.setItem('storedScores', JSON.stringify(savedScores));
    //}
    console.log(localStorage);
    //leaderBoard();

}

function leaderBoard(){
    welcomeEl.style.display = "none";
    questionEl.style.display = "none";
    scoreEl.style.display = "none";
    leaderBoardEl.style.display = "block";
}