//variables for reference elements
var highScoreEl = document.getElementById("high-scores")
var vewHighcoreEl = document.getElementById("vewHighScores")
var welcomeEl = document.getElementById("welcome");
var startQuiz = document.getElementById("start-quiz");
var timerEl = document.getElementById("timer-count");
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
var homeBtn = document.getElementById("go-back-btn");
var leaderBoardEl = document.getElementById("board");
var highScoreList = document.getElementById("highScoresList");
var clearHighScores = document.getElementById("clear-high-scores-btn");
var goBack = document.getElementById("go-back-btn");


// script variables
 var qIndex = 0;
 var userScore = 0;
 var gameCompleted = false;

//Set countdown timer to 90 seconds, start countdown function
var timeLeft = 90;
function updateTimer() {
     time = setInterval(function () {
//when timer reaches zero, clear interval function and display game over
        timeLeft--;
        timerEl.textContent = timeLeft + " seconds left";
        if (timeLeft === 0 || gameCompleted) {
               clearInterval(time);
               displayFinalScore()
          }
     }, 1000);
}


// using constant to define the questions to keep it persistent throughout the script
const questions = [
    
    {
        question: "Which of the following functions of String object returns the character at the specified index?",
        choices: ["substri()","indexOf()","charAt()","forEach()"],
        answer: 2 //"charAt()"
    },
    {
        question: "What is the HTML tag under which one can write the JavaScript code?",
        choices: ["<javascript>","<scripted>","<script>","<js>"],
        answer: 2 //<script>
    },
    {
        question: "How do you write a ‘logical or’ in Javascript code?",
        choices: ["//","$$","%","||",],
        answer: 3 //"||" 
    },
    {
        question: "Which of the following is not a reserved word in JavaScript?",
        choices: ["interface","throws","program","short"],
        answer: 2 //program
    },
    {
        question: "What is the original name of JavaScript?",
        choices: ["LiveScript","EScript","Mocha","JavaScript"],
        answer: 2 //Mocha
    },
    {
        question: "What are the types of Pop up boxes available in JavaScript?",
        choices: ["Alert","Prompt","Confirm","All of the above"],
        answer: 3 //All of the above
    },
    {
        question: "The _______ method of an Array object adds and/or removes elements from an array.",
        choices: ["Reverse","Shift","Slice","Splice"],
        answer: 3 //Splice
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

goBack.addEventListener("click",welcome);
clearHighScores.addEventListener("click", function(){
    window.localStorage.removeItem("storedScores");
    highScoreList.innerHTML = "";
})
homeBtn.addEventListener("click", function(){
    window.location.reload()
})

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
    if (highScoreEl.style.display === "none"){
        highScoreEl.style.display = "block";

    };

    var t = document.getElementById("welcome-title");
    var tx = document.getElementById("welcome-text");
    t.textContent = "Coding-Quiz-Game";
    tx.textContent = "Get Ready";
    startQuiz.textContent = "Start Quiz";
    timerEl.textContent = 90;
}

function initiateQuiz(){
    welcomeEl.style.display = "none";
    questionEl.style.display = "block";
    scoreEl.style.display = "none";
    leaderBoardEl.style.display = "none";

    lineBreak.style.display = "none";
    resultCheck.style.display = "none";
    startquestions();
    updateTimer();
    qIndex =0;
    userScore = 0;
    gameCompleted = false;
    startTimer();
}

function startquestions(){
    questionTitle.textContent = questions[qIndex].question;
    choice1.textContent = questions[qIndex].choices[0];
    choice2.textContent = questions[qIndex].choices[1];
    choice3.textContent = questions[qIndex].choices[2];
    choice4.textContent = questions[qIndex].choices[3];
}

// check answer function here
function checkAnswer(pick){
    lineBreak.style.display = "block";
    resultCheck.style.display = "block";
    if (pick === questions[qIndex].answer){
        resultCheck.textContent = "Correct!";         
        userScore++;
    } else {
        resultCheck.textContent = "Wrong!";
        timeLeft -= 15;

        if(timeLeft <= 0){
            timeLeft = 0;
        }  
    }
    qIndex++;
    //console.log(qIndex);
    if (qIndex < questions.length){
        startquestions();
    } else {
        gameCompleted = true;
        clearInterval(time)
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
    if (playerInitials.value === ""){
       alert("Please enter your initials in order to make it to the leader board");
    }
    console.log(playerInitials.value);
    console.log(userScore);
    //var addScores = function (playerInitials, userScore) {
        //retrieve it (Or create a blank array if there isn't any info saved yet),
        var savedScores = JSON.parse(localStorage.getItem('storedScores')) || [];
        // add to it,
        savedScores.push({playerInitals: playerInitials.value, userScore: userScore});
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
    highScoreEl.style.display = "none";
    var savedScores = localStorage.getItem("storeScores");

    if (savedScores != null){
        var savedScoresToList = [];
        highScoreList.innerHTML = "";
        savedScoresToList = JSON.parse(savedScores);
        for (i=0; i< savedScoresToList.length; i++){
            var listResults = document.createElement("li");
            listResults.textContent = savedScoresToList[i].playerInitals+ ":  "+savedScoresToList[i].userScore;
            highScoreList.appendChild(listResults);
        }   

    }
}