const emojiArrays = [
    ["💫", "🏓", "🌶️", "🏡", "🍱", "✈️", "❤️", "🎨", "🥝", "☀️", "🇳🇿", "🏂", "🇦🇷"],
    ["🏡", "🍱", "🇳🇿", "🏖️", "🐶", "🌊", "🇦🇷", "🏂", "☀️", "💚", "🥝", "💫", "🎾"],
    ["🌊", "✈️", "🇦🇷", "🎨", "🍱", "🌶️", "🐶", "🇳🇿", "🏖️", "💚", "🏓", "❤️", "🎾"]
];
let selectedArray;
let shuffledButtons = [];
let correctOrder = [];
let currentSequenceIndex = 0;
let timer;
const totalTime = 60;
const maxTriesPerDay = 3;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createButtons(disable = false) {
    const buttonsContainer = document.getElementById('buttons');
    selectedArray = emojiArrays[Math.floor(Math.random() * emojiArrays.length)];
    shuffledButtons = [...selectedArray];
    shuffleArray(shuffledButtons);
    buttonsContainer.innerHTML = '';
    shuffledButtons.slice(0, 4).forEach(buttonEmoji => {
        const button = document.createElement('button');
        button.innerText = buttonEmoji;
        button.addEventListener('click', handleButtonClick);
        if (disable) {
            button.disabled = true;
        }
        buttonsContainer.appendChild(button);
    });
    correctOrder = selectedArray.filter(item => shuffledButtons.slice(0, 4).includes(item));

    localStorage.setItem('shuffledButtons', JSON.stringify(shuffledButtons.slice(0, 4)));
    localStorage.setItem('selectedArray', JSON.stringify(selectedArray));
    localStorage.setItem('correctOrder', JSON.stringify(correctOrder));
}

function loadGameFromStorage(disable = false) {
    const storedShuffledButtons = JSON.parse(localStorage.getItem('shuffledButtons'));
    const storedSelectedArray = JSON.parse(localStorage.getItem('selectedArray'));
    const storedCorrectOrder = JSON.parse(localStorage.getItem('correctOrder'));

    if (storedShuffledButtons && storedSelectedArray && storedCorrectOrder) {
        shuffledButtons = storedShuffledButtons;
        selectedArray = storedSelectedArray;
        correctOrder = storedCorrectOrder;

        const buttonsContainer = document.getElementById('buttons');
        buttonsContainer.innerHTML = '';
        shuffledButtons.forEach(buttonEmoji => {
            const button = document.createElement('button');
            button.innerText = buttonEmoji;
            button.addEventListener('click', handleButtonClick);
            if (disable) {
                button.disabled = true;
            }
            buttonsContainer.appendChild(button);
        });
    } else {
        createButtons(disable);
    }
}

function handleButtonClick(event) {
    console.log('button -> ', event.target.innerText);
    console.log('expected -> ', selectedArray[currentSequenceIndex]);
    if (event.target.innerText === correctOrder[currentSequenceIndex]) {
        currentSequenceIndex++;
        if (currentSequenceIndex === 4) {
            bombDefused();
        }
    } else {
        gameOver('BOOOM!');
    }
}

function startTimer() {
    const startTime = localStorage.getItem('bombGameStartTime');
    const startTimeDate = startTime ? new Date(startTime) : new Date();
    const endTimeDate = new Date(startTimeDate.getTime() + totalTime * 1000);

    localStorage.setItem('bombGameStartTime', startTimeDate.toISOString());

    function updateTimer() {
        const now = new Date();
        const remainingTime = Math.max((endTimeDate - now) / 1000, 0);
        document.getElementById('timer').innerText = `${Math.floor(remainingTime)}s`;

        if (remainingTime <= 0) {
            gameOver('Time Up! BOOOM!');
        }
    }

    updateTimer();
    timer = setInterval(updateTimer, 1000);
}

function bombDefused() {
    document.getElementById('status').innerText = 'Fiuf! That was close, thanks. Bomb Defused!';
    clearInterval(timer);
    localStorage.removeItem('bombGameStartTime');
    localStorage.setItem('bombDefused', 'true');
    const remainingTime = document.getElementById('timer').innerText;
    localStorage.setItem('remainingTime', remainingTime);
    document.getElementById('share-button').style.display = 'block';
    disableButtons();
}

function gameOver(message) {
    document.getElementById('bomb-image').style.display = 'block';
    document.getElementById('bomb-image').style.width = '300px';
    document.getElementById('bomb-image').style.height = '400px';
    clearInterval(timer);
    document.getElementById('status').innerText = message;
    document.getElementById('timer').innerText = message;
    localStorage.removeItem('bombGameStartTime');
    document.getElementById('retry-button').style.display = 'block';
    incrementTries();
}

function incrementTries() {
    let today = new Date().toISOString().split('T')[0];
    let triesData = JSON.parse(localStorage.getItem('triesData')) || {};
    if (triesData.date !== today) {
        triesData = { date: today, tries: 0 };
    }
    triesData.tries++;
    localStorage.setItem('triesData', JSON.stringify(triesData));

/*     if (triesData.tries >= maxTriesPerDay) {
        document.getElementById('retry-button').disabled = true;
        document.getElementById('status').innerText = 'Three bombs were dropped already, please no more today. Come back tomorrow.';
        disableButtonsAndHideTimer();
    } */
}

function checkTries() {
    let today = new Date().toISOString().split('T')[0];
    let triesData = JSON.parse(localStorage.getItem('triesData')) || { date: today, tries: 0 };
    if (triesData.date !== today) {
        triesData = { date: today, tries: 0 };
        localStorage.setItem('triesData', JSON.stringify(triesData));
    }
/*     if (triesData.tries >= maxTriesPerDay) {
        document.getElementById('retry-button').disabled = true;
        document.getElementById('status').innerText = 'Three bombs were dropped already, please no more today. Come back tomorrow.';
        document.getElementById('bomb-image').style.display = 'block';
        document.getElementById('bomb-image').style.width = '300px';
        document.getElementById('bomb-image').style.height = '400px';
        disableButtonsAndHideTimer();
    } */
}

function disableButtons() {
    const buttonsContainer = document.getElementById('buttons');
    const buttons = buttonsContainer.querySelectorAll('button');
    buttons.forEach(button => button.disabled = true);
}

function disableButtonsAndHideTimer() {
    disableButtons();
    document.getElementById('timer').style.display = 'none';
}

document.getElementById('retry-button').addEventListener('click', () => {
    localStorage.removeItem('shuffledButtons');
    localStorage.removeItem('selectedArray');
    localStorage.removeItem('bombDefused');
    localStorage.removeItem('remainingTime');
    location.reload();
});

document.getElementById('share-button').addEventListener('click', () => {
    const timerText = document.getElementById('timer').innerText;
    const message = `Today I have defused the bomb! With ${timerText} left 💨`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});

// Modal handling
const modal = document.getElementById('instructionsModal');
const btn = document.getElementById('instructions-button');
const span = document.getElementsByClassName('close')[0];

btn.onclick = function() {
    modal.style.display = 'block';
}

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

function initializeGame() {
    const triesData = JSON.parse(localStorage.getItem('triesData'));
    const today = new Date().toISOString().split('T')[0];
    //const disable = triesData && triesData.date === today && triesData.tries >= maxTriesPerDay;

    if (localStorage.getItem('bombDefused') === 'true') {
        document.getElementById('status').innerText = 'Fiuf! That was close, thanks. Bomb Defused!';
        document.getElementById('share-button').style.display = 'block';
        const remainingTime = localStorage.getItem('remainingTime');
        document.getElementById('timer').innerText = remainingTime;
        disableButtons();
    } else {
        loadGameFromStorage(disable);
        if (!disable) {
            startTimer();
        }
    }

    checkTries();
}

initializeGame();
