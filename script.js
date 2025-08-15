const characterImg = document.getElementById("character-img");
const questionText = document.getElementById("question-text");
const answerDropdown = document.getElementById("answer-dropdown");
const feedback = document.getElementById("feedback");

const questions = [
    {
        question: "What's my favourite colour?",
        options: ["Blue", "Red", "Green"],
        correct: "Blue"
    },
    {
        question: "What's my favourite food?",
        options: ["Pizza", "Burger", "Pasta"],
        correct: "Pizza"
    },
    {
        question: "What's my favourite animal?",
        options: ["Dog", "Cat", "Rabbit"],
        correct: "Dog"
    }
];

let currentQuestion = 0;
let wrongAttempts = 0;

function loadQuestion() {
    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    answerDropdown.innerHTML = `<option value="">--Choose an Answer--</option>`;
    q.options.forEach(opt => {
        const optionEl = document.createElement("option");
        optionEl.value = opt;
        optionEl.textContent = opt;
        answerDropdown.appendChild(optionEl);
    });

    characterImg.src = "images/neutral.png";
    feedback.textContent = "";
    wrongAttempts = 0; // Reset attempts for each new question
}

answerDropdown.addEventListener("change", () => {
    const selected = answerDropdown.value;
    const q = questions[currentQuestion];

    if (selected === q.correct) {
        feedback.textContent = "Shabbas mere Piddi!";
        characterImg.src = "images/happy.png";
        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                loadQuestion();
            } else {
                questionText.textContent = "You know me so well ❤️";
                // Reset the quiz to start over
                currentQuestion = 0;
                answerDropdown.value = "";
                setTimeout(() => {
                    loadQuestion();
                    answerDropdown.style.display = "block";
                }, 2000); // Wait a bit before restarting
            }
        }, 1000);
    } else {
        wrongAttempts++;

        if (wrongAttempts === 1) {
            feedback.textContent = "Waah beta, yeh toh nahi hai";
            characterImg.src = "images/angry.png";
        } else if (wrongAttempts === 2) {
            feedback.textContent = "Arey baap re, waapas wrong, WOW!";
            characterImg.src = "images/angry.png";
        } else if (wrongAttempts >= 3) {
            feedback.textContent = "Do you even love me?:("; // Or you could add another message here
            characterImg.src = "images/angry.png";
        }
    }
});

loadQuestion();