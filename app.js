// !! Boxes

const startBtn = document.querySelector(".start_quiz");
const rulesBox = document.querySelector(".rules_box");
const quizBox = document.querySelector(".quiz_box");
const startComp = document.querySelector(".quiz_comp");

const exitBtn = document.querySelector(".buttons .quit");
const continueBtn = document.querySelector(".buttons .restart");

const quitBtn = document.querySelector(".buttons_final .quit");
const restartBtn = document.querySelector(".buttons_final .restart");

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
};

let que_count = 0;
let que_numb = 1;

const nextBtn = document.querySelector(".next_btn");

nextBtn.onclick = () => {
   if (que_count < questions.length) {
      que_count++;
      que_numb++;
      showQuestions(que_count);
      queCounter(que_numb);
   } else {
      console.log("Completed Questions");
   }
};

function showQuestions(index) {
   const que_text = document.querySelector(".que_text");
   const option_list = document.querySelector(".option_list");

   const que_tag ="<span>" + questions[index].numb + ". " + questions[index].question + "</span>";
   let option_tag =
         '<div class="option"><span>' + questions[index].options[0] + "</span></div>"
       + '<div class="option"><span>' + questions[index].options[1] + " </span></div>"
       + '<div class="option"><span>' + questions[index].options[2] + " </span></div>"
       + '<div class="option"><span>' + questions[index].options[3] + " </span></div>";
   que_text.innerHTML = que_tag;

   que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    
   const option = option_list.querySelectorAll('.option');
   for (let i = 0; i < option.length; i++) {
      option[i].setAttribute("onclick", "optionSelected(this)")
   }
}

function optionSelected(answer) {
   let userAns = answer.textContent;
   let correctAns = questions[que_count].answer;
   console.log(correctAns);
   if (userAns == correctAns) {
      console.log('correct');
      answer.classList.add("correct");
   } else {
      console.log('wrong');
      answer.classList.add("incorrect");
   }
}

function queCounter(index) {
   const bottom_counter = document.querySelector(".total_que");
   let bottom_tag = "<p><span>" + index + "</span> of <span>" + questions.length + "</span> Questions</p>";

   bottom_counter.innerHTML = bottom_tag;
}