//declare the questions array, which holds each question and answer
var questions = [{
    title: "Question 1",
    question: "this is question 1",
    answers: ["q1a1", "q1a2", "q1a3", "q1a4"],
    correctAnswer: 3
},
{
    title: "Question 2",
    question: "this is question 2",
    answers: ["q2a1", "q2a2", "q2a3", "q2a4"],
    correctAnswer: 0
},
{
    title: "Question 3",
    question: "this is question 3",
    answers: ["q3a1", "q3a2", "q3a3", "q3a4"],
    correctAnswer: 1
},
{
    title: "Question 4",
    question: "this is question 4",
    answers: ["q4a1", "q4a2", "q4a3", "q4a4"],
    correctAnswer: 2
},
{
    title: "Question 5",
    question: "this is question 5",
    answers: ["q5a1", "q5a2", "q5a3", "q5a4"],
    correctAnswer: 1
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
var time = 60
var timer = time;
//set the high score array that holds the user's highscores
var highScore = [];
//sets the step for the quiz builder
var step = 0;
//initializes the user's score
var userScore = 0;


//used when the quiz timer msut start
var startCountdown = function(stop){
    var counter = setInterval(function(){
        timeLeftEl.textContent = timer;
        timer--;
        
        if (timer === 0) {
            clearInterval(counter);
            timeLeftEl.textContent = "Times Up!";
            timer = time;
            return;
        };    
    }, 1000);
    //allows other functions to end the countdown
    stopTimer = counter;
};

//loads the scores from localStorage when called upon
var loadScores = function(){
    //retireve the highScore array
    highScore = localStorage.getItem("High Score");
    highScore = JSON.parse(highScore);
};

//lets the user view the list of highscores
var viewScores = function(){
    // //load the scores
    loadScores();

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
    
    //add the highscore list, if there are highscores saved
    if(!highScore){
        //let the user know that there is no score to save
        var noScoreList = document.createElement("div");
        noScoreList.setAttribute("class", "no-list");
        noScoreList.textContent = "Play a round to set your score"
        unorderedEl.appendChild(changeEl);
    } else {
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
    };

    //change the id of changeEl
    changeEl.setAttribute("id", "highscore-list");
    changedAttributeEl = changeEl.getAttribute("id");

    //generate a button that will bring the user back to the home screen
    var backButtonEl = document.createElement("button");
    backButtonEl.setAttribute("class", "submit-button");
    backButtonEl.setAttribute("id", "back-button");
    backButtonEl.textContent = "Back";
    mainEl.appendChild(backButtonEl);
    backButtonEl.addEventListener("click", homePage);

};

//sets the score to be added to the list of leaderboards
var setScore = function(score){
    window.event.preventDefault();
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
    //set the title and description
    titleEl.textContent = "Here are the rules";
    descriptionEl.textContent = "Each correct answer will award ponts. For every incorrect answer, no points will be added or deducted. Finishing faster will award more points, but finishing after the timer ends will award no extra points. This will be a true test of your skill. Good luck and have fun.";
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

    mainEl.appendChild(startButtonEl);

    //starts the quiz
    startButtonEl.addEventListener("click", initializeQuiz);
    

    //bring user to highscore page, if they are not already there
    toScoreEl.addEventListener("click", function(){
        if(changeEl.getAttribute("id") !== "highscore-list"){
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

//checks the answer for right or wrong
var quizResponse = function(){  
    var targetEl = window.event.target;
    //compare the input element vs the correct answer
    if(targetEl.dataset.answer == questions[step].correctAnswer){
        //generates a corect response
        var responseEl = document.createElement("div");
        responseEl.textContent = "correct";
        responseEl.setAttribute("class", "response");
        mainEl.appendChild(responseEl);
        //delete the response after a few seconds
        var timedResponse = setTimeout(deleteResponse, 2000);
        timedResponse;
        userScore++;
        //check to see if we have hit the end of the questions
        step++;
        if(step === questions.length){
            //add the timer to the score
            userScore = userScore + timer;
            //send them to the setScore page to put in their final score
            setScore(userScore);
        } else {
            // move to the next question
            reSetQuiz(step);
        };
    } else if(targetEl.dataset.answer != questions[step].correctAnswer !== targetEl.matches("#answer-list")){
        //generate an incorrect respinse
        var responseEl = document.createElement("div");
        responseEl.textContent = "incorrect";
        responseEl.setAttribute("class", "response");
        mainEl.appendChild(responseEl);
        //delete the response after a few seconds
        var timedResponse = setTimeout(deleteResponse, 2000);
        timedResponse;
        //check to see if we have hit the end of the questions
        step++;
        if(step === questions.length){
            //add the timer to the score
            userScore = userScore + timer;
            //send them to the setScore page to put in their final score
            setScore(userScore);
        } else {
            // move to the next question
            reSetQuiz(step);
        };
    };
};

///set up the home page
homePage();

//look for a click in the changeEl element. depending on the id value, it will perform different functions
changeEl.addEventListener("click", function(){
    if(changedAttributeEl == "initial-id"){
    //initialize the quiz format
    initializeQuiz();
    } else if(changedAttributeEl == "answer-list"){
    //check the quiz response
    quizResponse();
    };
});












