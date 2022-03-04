//declare the questions array, which holds each question and answer
var questions = [{
    title: "Question 1",
    question: "If we declare variable 'x = 4', which of these statements is NOT 'true'",
    answers: ["x <= x++",
              "!( (x + 4) * x  === 'sixteen'",
              "x >= x--",
              "!(x === 4) || x = 30"],
    correctAnswer: 1
},
{
    title: "Question 2",
    question: 'If we have: 5 === "5", which of these is true for the result',
    answers: ["true",
              "false",
              "null",
              "undefined"],
    correctAnswer: 1
},
{
    title: "Question 3",
    question: "If we declare 'var x=5' within a function, can we use 'x' in another function and why",
    answers: ["yes, because it is a global variable", 
              "yes, because it is a local variable",
              "no, because it is a local variable",
              "no, because it is a global variable"],
    correctAnswer: 2
},
{
    title: "Question 4",
    question: "Assuming we have array 'myArray', how may we obtain the length of the array",
    answers: ["length().myArray;",
              "myArray.length;",
              "length.myArray;",
              "myArray.length();"],
    correctAnswer: 3
},
{
    title: "Question 5",
    question: "What does '14 % 5' equate to",
    answers: ["4",
              "6",
              "2.4",
              "2.8"],
    correctAnswer: 0
},
{
    title: "Question 6",
    question: "How can you refer to a specific index of array 'myArray'",
    answers: ["myArray.indexOf(4);",
              "myArray[4];",
              "indexOf(myArray);",
              "myArray.[4];"],
    correctAnswer: 1
},
{
    title: "Question 7",
    question: 'A while-loop with condition (a <= b) will run until',
    answers: ["a > b",
              "a = b",
              "a <= b",
              "a != b"],
    correctAnswer: 0
},
{
    title: "Question 8",
    question: "Using the DOM method, if we have 'var mainEl', how may we obtain the class value",
    answers: ["mainEl.setAttribute('class');",
              "mainEl.getAttribute();",
              "mainEl.getAttribute('class');",
              "mainEl.getClass('class');"],
    correctAnswer: 2
},
{
    title: "Question 9",
    question: "Assuming we have 'var formBoxEl = document.querySelector('input[class='form-box']').value', which of these is true",
    answers: ["formBoxEl has a class of 'form-box'",
              "formBoxEl is an element", 
              "formBoxEl.getAttribute('class') == 'form-box'", 
              "formBoxEl is ewual to whatever value was entered in the element box"],
    correctAnswer: 3
},
{
    title: "Question 10",
    question: "myEl.addEventListener('click', function(){}); does what?",
    answers: ["runs the funtion until myEl is clicked",
              "looks for an event listener with the class 'click', and wil run the function when it finds it",
              "looks for a click in myEl, and will run the function when clicked",
              "adds an id called 'click' to myEl"],
    correctAnswer: 2
}];


//set the html element variables
var toScoreEl = document.querySelector("#highscore");
var timeLeftEl = document.querySelector("#time-left");
var timeEl = document.querySelector("#time");
var mainEl = document.querySelector("#main");
var titleEl = document.querySelector("#title");
var descriptionEl = document.querySelector("#description");
var changeEl = document.querySelector("#initial-id");
var changedAttributeEl = changeEl.getAttribute("id");
//allows functions to cancel the timer if called
var stopTimer;
//set the time that users have to complete the quiz
var time = 100;
var timer = time;
//set the high score array that holds the user's highscores
var highScore = [];
//sets the step for the quiz builder
var step = 0;
//initializes the user's score
var userScore = 0;


//used when the quiz timer msut start
var startCountdown = function(){
    var counter = setInterval(function(){
        timeLeftEl.textContent = timer;
        timer--;
        
        if (timer <= 0) {
            clearInterval(counter);
            timeLeftEl.textContent = "Times Up!";
            timer = time;
            //bring the user to the setScore screen
            setScore(userScore);
            return;
        };    
    }, 1000);
    //allows other functions to end the countdown outside of the function
    stopTimer = counter;
};

//loads the scores from localStorage when called upon
var loadScores = function(){
    //retireve the highScore array
    highScore = localStorage.getItem("High Score");
    highScore = JSON.parse(highScore);
    //if highScore returns as null, reset the array so that it can be filled later on without error
    if(highScore == null){
        highScore = [];
    };
};

//lets the user view the list of highscores
var viewScores = function(){
    //disable the toScoreEl button
    toScoreEl.setAttribute("id", "turn-off");
    //remove the start button, if there
    var startButtonEl = document.getElementById("start-button");
    if(startButtonEl !== null){
        startButtonEl.remove();
    };
    
    //remove the form, if there
    var formEl = document.getElementById("form");
    if(formEl !== null){
        formEl.remove();
    };

    //change the title and description
    titleEl.textContent = "Highscores";
    descriptionEl.textContent = "Here is a list of your highscores:";

    //remove any text content
    changeEl.textContent = "";

    //generate the highscore list, if there are highscores saved in the array
    if(highScore[0] != undefined){
        loadScores();
        //generate a ordered list
        var unorderedEl = document.createElement("ol");
        changeEl.appendChild(unorderedEl);
        //generate an array based on the length of the highscore list
        var highScoreList = new Array(highScore.length);
        //using a loop, create a list item for each index in the array
        for(var i=0; i<highScoreList.length; i++){
            highScoreList[i] = document.createElement("li");
            highScoreList[i].setAttribute("class", "score-list");
            highScoreList[i].textContent = highScore[i].name + " - " + highScore[i].score;
            unorderedEl.appendChild(highScoreList[i]);
        };
    } else {
        //if there are no scores saved, let the user know that there is no score to show
        var noScoreList = document.createElement("div");
        noScoreList.setAttribute("class", "no-list");
        noScoreList.textContent = "No scores set! Play a round to set a score"
        changeEl.appendChild(noScoreList);
    }

    //change the id of changeEl
    changeEl.setAttribute("id", "highscore-list");
    changedAttributeEl = changeEl.getAttribute("id");

    //generate a button that will bring the user back to the home screen
    var backButtonEl = document.createElement("button");
    backButtonEl.setAttribute("class", "button");
    backButtonEl.setAttribute("id", "back-button");
    backButtonEl.textContent = "Back";
    mainEl.appendChild(backButtonEl);
    backButtonEl.addEventListener("click", homePage);

};

//sets the score to be added to the list of leaderboards
var setScore = function(score){
    //stop the timer
    clearInterval(stopTimer);

    //set the title and description
    titleEl.textContent = "All Done";
    descriptionEl.textContent = "Your score is: " + score;

    //delete the buttons from the div
    for(var i=0; i<4; i++){
    changeEl.querySelector("button").remove();
    };

    //change the value of changEl so it no longer calls the quiz functions
    changeEl.removeAttribute("id");
    changedAttributeEl = changeEl.getAttribute("id");
    changeEl.setAttribute("id", "highscore-list")
    changeEl.textContent = "Enter Initials:";

    //append a form box into the div with a submit button
    var formEl = document.createElement("form");
    formEl.setAttribute("id", "form");
    formEl.className = "form";

    //using a form box, ask the user for a username
    var formBoxEl = document.createElement("input");
    formBoxEl.setAttribute("input", "text");
    formBoxEl.setAttribute("class", "form-box")

    var formSubmitEl = document.createElement("button");
    formSubmitEl.setAttribute("type", "submit");
    formSubmitEl.setAttribute("class", "button");
    formSubmitEl.textContent = "Add";

    changeEl.appendChild(formEl);
    formEl.appendChild(formBoxEl);
    formEl.appendChild(formSubmitEl);

    //bring the user to the viewScores screen
    formEl.addEventListener("submit", function(){
        // retrieve the username and score
        var username = document.querySelector("input[class = 'form-box']").value;
        //save the data into an object
        var myScoreObject = {
            name: username,
            score: userScore
        };

        //save the unsername and score
        saveScore(myScoreObject);

        viewScores();
    });
};

var saveScore = function(myScoreObject){
    //save the username and score in the highScore array
    window.event.preventDefault();
    //add the new object to the highScore array
    highScore.push(myScoreObject);
    
    //sort the array in decending order
    highScore.sort((a, b) => {
        return b.score - a.score;
    });
    console.log(highScore);
    //then save it to localStorage
    localStorage.setItem("High Score", JSON.stringify(highScore));
};

//where the user is initially brought to. user can either start a new quiz or view the highscore
var homePage = function(){
    //clear & reset the timer
    timeLeftEl.textContent = "";
    timer = time;
    //enable the toScoreEl button
    toScoreEl.setAttribute("id", "highscore");
    //set the title and description
    titleEl.textContent = "Rules";
    descriptionEl.textContent = "Each correct answer will award 50 ponts. For every incorrect answer, 10 seconds will be deducted from the timer. Finishing before the timer ends will award bonus points, but once the timer hits 0 the game end and award no extra points. This will be a test of knowledge and speed. Good luck and have fun.";
    //change the value of changEl so it doesnt call the quiz functions
    changeEl.removeAttribute("id");
    changedAttributeEl = changeEl.getAttribute("id");
    changeEl.setAttribute("id", "initial-id")
    changeEl.textContent = "";
    //remove the back button, if it is there
    var backButtonEl = document.getElementById("back-button");
    if(backButtonEl !== null){
        backButtonEl.remove();
    }

    //display a button that starts the quiz function and starts the timer
    var startButtonEl = document.createElement("button");
    startButtonEl.textContent = "Start";
    startButtonEl.setAttribute("id", "start-button");
    startButtonEl.setAttribute("class", "button");

    mainEl.appendChild(startButtonEl);

    //starts the quiz
    startButtonEl.addEventListener("click", initializeQuiz);
    

    //bring user to highscore page, if they are not already there
    toScoreEl.addEventListener("click", function(){
        if(toScoreEl.getAttribute("id") == "highscore"){
            viewScores();
        };
    });

    //grab the event of clicking the startbutton to start the timer
    var startButtonEl = document.getElementById("start-button");
    startButtonEl.addEventListener("click", function(){
        
        startCountdown();
    }); 
};

//initially sets up the first set of answers & appends them
var initializeQuizAnswers = function(step){
    //set the title
    titleEl.textContent = questions[step].title;
    //set the question
    descriptionEl.textContent = questions[step].question;
    var qArray = new Array(4);

    //use for loop to create all 4 answers
    for(var i=0; i<qArray.length; i++){
        qArray[i] = document.createElement("button");
        qArray[i].setAttribute("class", "answer-button");
        qArray[i].setAttribute("data-answer", i);
        qArray[i].textContent = questions[step].answers[i];
        //add to the list
        changeEl.appendChild(qArray[i]);
    };
};

//used to initially generate the quiz
var initializeQuiz = function(){
    //disable the toScoreEl button
    toScoreEl.setAttribute("id", "turn-off");
    //initialize user score & step
    userScore = 0;
    step = 0;
    //remove the button element and replace it with the answers
    var startButtonEl = document.querySelector("#start-button");
    startButtonEl.remove();    
    //initially generate the answers
    initializeQuizAnswers(step);

    //change the value of changEl so it can run thorugh a seperate function on click
    changeEl.setAttribute("id", "answer-list");
    changedAttributeEl = changeEl.getAttribute("id");
};

//used to fill in new quiz data
var reSetQuiz = function(step){
    //reset the title
    titleEl.textContent = questions[step].title;
    //reset the question
    descriptionEl.textContent = questions[step].question;
    //use for loop to recreate all 4 answers
    for(var i=0; i<=3; i++){
        var answerEl = document.querySelector("button[data-answer='" + i + "']");
        answerEl.textContent = questions[step].answers[i];
    };
}

//deletes the response after a set time
var deleteResponse = function(){
    var responseEl = document.querySelector("div[class='response']")
    responseEl.remove();
};

// //checks the answer for right or wrong
var quizResponse = function(){
    var targetEl = window.event.target;
    var responseEl = document.createElement("div");
    responseEl.setAttribute("class", "response");
    mainEl.appendChild(responseEl);
    
    //delete the response after a few seconds
    var timedResponse = setTimeout(deleteResponse, 2000);
    timedResponse;

    //generates a resonse based on the input
    if(targetEl.dataset.answer == questions[step].correctAnswer){
        responseEl.textContent = "Correct";
        responseEl.setAttribute("id", "correct-response");
        //add points
        userScore+= 50;

    } else if(targetEl.dataset.answer != questions[step].correctAnswer !== targetEl.matches("#answer-list")){
        responseEl.textContent = "Incorrect, Time Deducted";
        responseEl.setAttribute("id", "incorrect-response");
        //deduct time
        timer -= 10;
    }; 
    //check to see if we have hit the end of the questions
    step++;
    if(step === questions.length){
        //add the timer to the score
        console.log(userScore + " + " + timer);
        timeLeftEl.textContent = timer;
        userScore = userScore + timer;
        console.log(userScore);
        //send them to the setScore page to put in their final score
        setScore(userScore);
    } else {
        // move to the next question
        reSetQuiz(step);
    };
}

///set up the home page
homePage();

//pre-load the highscores
loadScores();

//look for a click in the changeEl element. depending on the id value, it will perform different functions
changeEl.addEventListener("click", function(){
    if(changedAttributeEl == "initial-id"){
    //initialize the quiz format
    initializeQuiz();
    } else if(changedAttributeEl == "answer-list"){
        //check if a button was clicked
        var targetEl = window.event.target;
        if(targetEl.className == "answer-button"){
            //check the quiz response
            quizResponse();
        };
    };
});