// !! Boxes

const startBtn = document.querySelector(".start_quiz");
const rulesBox = document.querySelector(".rules_box");
const quizBox = document.querySelector(".quiz_box");
const startComp = document.querySelector(".quiz_comp");

const exitBtn = document.querySelector(".buttons .quit");
const continueBtn = document.querySelector(".buttons .restart");

const quitBtn = document.querySelector(".buttons_final .quit");
const restartBtn = document.querySelector(".buttons_final .restart");

const option_list = document.querySelector(".option_list")

const timeCount = document.querySelector(".timer .time_sec");
const timeLine = document.querySelector(".time_line");

// !! Reveal Rules
startBtn.onclick = () => {
   //    startBtn.classList.add("activeBtn");
   rulesBox.classList.add("activeInfo");
};

exitBtn.onclick = () => {
   window.location.reload();
};

quitBtn.onclick = () => {
   window.location.reload();
};

restartBtn.onclick = () => {
   window.location.reload();
};

// !! Reveal Quiz
continueBtn.onclick = () => {
   rulesBox.classList.remove("activeInfo");
   quizBox.classList.add("activeQuiz");
   showQuestions(0);
   queCounter(1);
   startTimer(15);
   startTimeLine(0);
};

let que_count = 0;
let que_numb = 1;
let counter;
let numberValue = 15;
let widthValue = 0;
let userScore = 0;

const nextBtn = document.querySelector(".next_btn");

nextBtn.onclick = () => {
   if (que_count < questions.length - 1) {
      que_count++;
      que_numb++;
      showQuestions(que_count);
      queCounter(que_numb);
      clearInterval(counter);
      startTimer(numberValue);
      clearInterval(counterLine);
      startTimeLine(widthValue)
      nextBtn.style.display = "none";

   } else {
      console.log("Completed Questions");
      showResults();
   }
};

function showQuestions(index) {
   const que_text = document.querySelector(".que_text");
   
   const que_tag ="<span>" + questions[index].numb + ". " + questions[index].question + "</span>";
   let option_tag =
         '<div class="option"><span>' + questions[index].options[0] + "</span></div>"
       + '<div class="option"><span>' + questions[index].options[1] + "</span></div>"
       + '<div class="option"><span>' + questions[index].options[2] + "</span></div>"
       + '<div class="option"><span>' + questions[index].options[3] + "</span></div>";
       
   que_text.innerHTML = que_tag;
   option_list.innerHTML = option_tag;
    
   const option = option_list.querySelectorAll('.option');
   for (let i = 0; i < option.length; i++) {
      option[i].setAttribute("onclick", "optionSelected(this)")
   }
}

let tickIcon = '<div class="icon tick"><i class="fa fa-check"></i></div>'
let crossIcon ='<div class="icon cross"><i class="fa fa-times"></i></div>'

function optionSelected(answer) {
   clearInterval(counter);
   clearInterval(counterLine);
   let userAns = answer.textContent;
   let correctAns = questions[que_count].answer;
   let allOptions = option_list.children.length;
   console.log(correctAns);
   if (userAns == correctAns) {
      userScore++;
      console.log('correct');
      answer.classList.add("correct");
      answer.insertAdjacentHTML('beforeend', tickIcon)
   } else {
      console.log('wrong');      
      answer.classList.add("incorrect");
      answer.insertAdjacentHTML("beforeend", crossIcon);

      for (let i = 0; i < allOptions; i++) {
         if (option_list.children[i].textContent == correctAns) {
            option_list.children[i].setAttribute('class', 'option correct')
            option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
         }
       }
   }

   for (let i = 0; i < allOptions; i++) {
      option_list.children[i].classList.add('disabled')      
   }

   nextBtn.style.display = 'block'
}

function startTimer(time) {
   counter = setInterval(timer, 1000);
   function timer() {
      timeCount.textContent = time;
      time--;
      if (time < 9) {
         let addZero = timeCount.textContent;
         timeCount.textContent = '0' + addZero;
      }
      if (time < 0) {
         clearInterval(counter);
         timeCount.textContent = '00';
        }
      }
}

function startTimeLine(time) {
   counterLine = setInterval(timer, 29);
   function timer() {
      time++;
      timeLine.style.width = time + 'px';
      if (time > 549) {
         clearInterval(counterLine)
      }
   }
}

function queCounter(index) {
   const bottom_counter = document.querySelector(".total_que");
   let bottom_tag = "<p><span>" + index + "</span> of <span>" + questions.length + "</span> Questions</p>";

   bottom_counter.innerHTML = bottom_tag;
}

function showResults() {
   quizBox.classList.remove("activeQuiz");
   startComp.classList.add("activeComp");
   rulesBox.classList.remove("activeInfo");
   const score = document.querySelector(".score");

   if (userScore > 3) {
      let scoreTag = 'and congrats 🚀 You got only <span>' + userScore + '</span> out of <span>' + questions.length + '</span>'
      score.innerHTML = scoreTag;
   } else if (userScore > 1) {
      let scoreTag = 'and nice 🥂 You got only <span>' + userScore + '</span> out of <span>' + questions.length + '</span>'
      score.innerHTML = scoreTag;
   } else{
      let scoreTag = 'and sorry...😭 You got only <span>' + userScore + '</span> out of <span>' + questions.length + '</span>'
      score.innerHTML = scoreTag;
   }
}