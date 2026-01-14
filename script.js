let questions = {
  science: [
    { q: "Water formula?", options: ["H2O", "CO2", "O2"], answer: 0 },
    { q: "Sun is a?", options: ["Planet", "Star", "Galaxy"], answer: 1 },
    { q: "Human heart has?", options: ["2 chambers", "4 chambers", "3 chambers"], answer: 1 },
    { q: "Gas needed for breathing?", options: ["Hydrogen", "Oxygen", "Nitrogen"], answer: 1 },
    { q: "Earth is ___ planet from Sun?", options: ["2nd", "3rd", "4th"], answer: 1 },
    { q: "Plants make food using?", options: ["Respiration", "Photosynthesis", "Digestion"], answer: 1 },
    { q: "Boiling point of water?", options: ["100°C", "90°C", "50°C"], answer: 0 },
    { q: "Largest organ in human body?", options: ["Heart", "Skin", "Brain"], answer: 1 },
    { q: "Which is renewable energy?", options: ["Coal", "Solar", "Petrol"], answer: 1 },
    { q: "Blood is red due to?", options: ["Iron", "Oxygen", "Hemoglobin"], answer: 2 }
  ],

  math: [
    { q: "5 + 3 = ?", options: ["6", "8", "9"], answer: 1 },
    { q: "12 x 2 = ?", options: ["22", "24", "20"], answer: 1 },
    { q: "Square root of 16?", options: ["2", "4", "6"], answer: 1 },
    { q: "10 ÷ 2 = ?", options: ["2", "5", "8"], answer: 1 },
    { q: "7 x 6 = ?", options: ["42", "36", "48"], answer: 0 },
    { q: "100 – 45 = ?", options: ["65", "55", "75"], answer: 1 },
    { q: "π approx?", options: ["3.14", "2.17", "1.62"], answer: 0 },
    { q: "Perimeter of square?", options: ["4a", "a²", "2a"], answer: 0 },
    { q: "Cube of 3?", options: ["9", "27", "81"], answer: 1 },
    { q: "Even number?", options: ["7", "11", "14"], answer: 2 }
  ],

  computer: [
    { q: "HTML stands for?", options: ["Markup", "Machine", "Model"], answer: 0 },
    { q: "CSS is used for?", options: ["Logic", "Design", "Database"], answer: 1 },
    { q: "JS is?", options: ["Language", "Browser", "App"], answer: 0 },
    { q: "CPU means?", options: ["Central Processing Unit", "Computer Power Unit", "Core Program Unit"], answer: 0 },
    { q: "Keyboard is a?", options: ["Input device", "Output device", "Storage"], answer: 0 },
    { q: "Permanent memory?", options: ["RAM", "ROM", "Cache"], answer: 1 },
    { q: "Which is OS?", options: ["Windows", "Google", "Chrome"], answer: 0 },
    { q: "Binary uses?", options: ["0 & 1", "1 & 2", "2 & 3"], answer: 0 },
    { q: "Brain of computer?", options: ["Monitor", "CPU", "Mouse"], answer: 1 },
    { q: "Internet is?", options: ["Network", "Software", "Hardware"], answer: 0 }
  ]
};

let playerName = "";
let current = 0;
let score = 0;
let quizData = [];
let timer;
let timeLeft = 15;

function saveName() {
  let name = document.getElementById("username").value;

  if (name.trim() === "") {
    alert("Please enter your name!");
    return;
  }

  playerName = name;
  document.getElementById("playerName").innerText = playerName;

  document.getElementById("name-screen").classList.add("hide");
  document.getElementById("category-screen").classList.remove("hide");
}


function startQuiz(category) {
  quizData = questions[category];
  current = 0;
  score = 0;

  document.getElementById("category-screen").classList.add("hide");
  document.getElementById("quiz-screen").classList.remove("hide");

  showQuestion();
}

function showQuestion() {
  document.getElementById("qno").innerText = `Q${current + 1}/${quizData.length}`;
  timeLeft = 15;
  document.getElementById("timer").innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;
    if (timeLeft === 0) nextQuestion();
  }, 1000);

  let q = quizData[current];
  document.getElementById("question").innerText = q.q;

  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, i) => {
    let btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => selectAnswer(btn, i);
    optionsDiv.appendChild(btn);
  });
}

function selectAnswer(btn, i) {
  clearInterval(timer);
  let correct = quizData[current].answer;
  let buttons = document.getElementById("options").children;

  if (i === correct) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    buttons[correct].classList.add("correct");
  }

  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  current++;
  if (current < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-screen").classList.add("hide");
  document.getElementById("result-screen").classList.remove("hide");

  document.getElementById("score").innerText =
  playerName + " scored " + score + " / " + quizData.length;

}
