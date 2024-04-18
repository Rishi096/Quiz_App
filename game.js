const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

console.log(choices);

let currentQuestion = {};
let acceptingAns = false;
let score = 0;
let questionCounter = 0;
let availablequestions = [];

let questions = [
          {  
            question : "What is the capital of France?",
            choice1: "London",
            choice2 : "Paris",
            choice3 : "Berlin",
            choice4 : "Madrid",
            answer : 2
          },
          {   
            question: "Who painted the Mona Lisa?",
            choice1: "Leonardo da Vinci",
            choice2 : "Pablo Picasso",
            choice3 : "Vincent van Gogh",
            choice4 : "Michelangelo",
            answer : 1
            
          },
          {     
            question: "What is the chemical symbol for water?",
            choice1: "H2O",
            choice2 : "CO2",
            choice3 : "NaCl",
            choice4 : "O2",
            answer : 1
           
          },
          {
            question: "Which planet is known as the Red Planet?",
            choice1: "Earth",
            choice2 : "Mars",
            choice3 : "Venus",
            choice4 : "Jupiter",
            answer : 2 
          },
          {
            question: "Who wrote 'Romeo and Juliet'?",
            choice1: "William Shakespeare",
            choice2 : "Charles Dickens",
            choice3 : "Jane Austen",
            choice4 : "F. Scott Fitzgerald",
            answer : 1 
          },
          {
            question: "What is the largest mammal in the world?",
            choice1: "Blue Whale",
            choice2 : "Elephant",
            choice3 : "Giraffe",
            choice4 : "Hippopotamus",
            answer : 1
          },
          {
            
            question: "Who is the author of 'To Kill a Mockingbird'?",
            choice1: "J.K. Rowling",
            choice2 : "Mark Twain ",
            choice3 : "Stephen King",
            choice4 : "Harper Lee",
            answer : 4 
          },
          {
            question: "What is the powerhouse of the cell?",
            choice1: "Nucleus",
            choice2 : "Ribosome",
            choice3 : "Mitochondria",
            choice4 : "Endoplasmic Reticulum",
            answer : 3
          },
          // {
          //   "question_id": 9,
          //   "quiz_id": 1,
          //   "question_text": "Who discovered penicillin?",
          //   "options": ["Alexander Fleming", "Marie Curie", "Louis Pasteur", "Albert Einstein"],
          //   "correct_answer": "Alexander Fleming",
          //   "explanation": "Penicillin was discovered by Alexander Fleming.",
          //   "points": 10
          // },
          // {
          //   "question_id": 10,
          //   "quiz_id": 1,
          //   "question_text": "Which planet is known as the 'Morning Star'?",
          //   "options": ["Venus", "Mercury", "Mars", "Jupiter"],
          //   "correct_answer": "Venus",
          //   "explanation": "Venus is known as the 'Morning Star' when it appears in the east before sunrise.",
          //   "points": 10
          // },
      
]

const bonus = 10;
const max_que = 8;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availablequestions = [...questions];
  console.log(availablequestions);
  getNewQuestion();

}

getNewQuestion = () => {

  if(availablequestions.length === 0 || questionCounter >= max_que){
    localStorage.setItem("mostRecentScore",score);
    // go to the end page
    return  window.location.href = "./end.html";
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${max_que}`;

  const queIdx = Math.floor(Math.random() * availablequestions.length);
  currentQuestion = availablequestions[queIdx];
  question.innerText = currentQuestion.question;
  
  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });
  availablequestions.splice(queIdx,1);
  acceptingAns = true;
};

choices.forEach(choice => {
  choice.addEventListener("click",e =>{
    if(!acceptingAns) return;
    acceptingAns = false;
    const selectedChoice = e.target;
    const selectedAns = selectedChoice.dataset['number'];

    const classToApply = selectedAns == currentQuestion.answer?"correct":"incorrect";

    if(classToApply === 'correct'){
      incrementScore(bonus);
    }
    selectedChoice.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();
    },500);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
}

startGame();