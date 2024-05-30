document.addEventListener('DOMContentLoaded', () => {
    const correctWord = 'APPLE';
    const maxTries = 3;
    let currentAttempt = [];
    let attempts = JSON.parse(localStorage.getItem('attempts')) || [];
    let canCancel = true;
    let messageTimeout = null;

    const gameBoard = document.getElementById('game-board');
    const submitButton = document.getElementById('submit');
    const cancelButton = document.getElementById('cancel');
    const keys = document.querySelectorAll('.key');
    const messageContainer = document.getElementById('message-container');

    const showMessage = (msg) => {
        clearTimeout(messageTimeout);
        messageContainer.textContent = msg;
        messageContainer.style.opacity = 1;
        messageTimeout = setTimeout(() => {
            messageContainer.style.opacity = 0;
        }, 3000);
    };

    const initializeBoard = () => {
        gameBoard.innerHTML = '';
        for (let i = 0; i < 15; i++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            gameBoard.appendChild(tile);
        }
    };

    const loadAttempts = () => {
        attempts.forEach((attempt, index) => {
            for (let i = 0; i < 5; i++) {
                const tile = gameBoard.children[index * 5 + i];
                tile.textContent = attempt.word[i];
                if (attempt.result[i] === 'correct') {
                    tile.classList.add('green');
                }
            }
        });
    };

    const saveAttempts = () => {
        localStorage.setItem('attempts', JSON.stringify(attempts));
    };

    const handleKeyPress = (key) => {
        if (currentAttempt.length < 5) {
            currentAttempt.push(key);
            updateBoard();
            canCancel = true;
        }
    };

    const handleSubmit = () => {
        if (currentAttempt.length === 5 && attempts.length < maxTries) {
            const result = currentAttempt.map((char, index) => char === correctWord[index] ? 'correct' : 'incorrect');
            attempts.push({ word: currentAttempt.join(''), result });
            saveAttempts();

            if (result.every(r => r === 'correct')) {
                showMessage('Well done love! You are AMAAAZING❤️');
            } else if (attempts.length >= maxTries) {
                showMessage(`Hey Love! The word was ${correctWord}`);
            } else {
                showMessage(`Wrong one love, Let's go! You have ${maxTries - attempts.length} tries left.`);
            }

            currentAttempt = [];
            updateBoard();
            canCancel = false;
        }
    };

    const handleCancel = () => {
        if (canCancel && currentAttempt.length > 0) {
            currentAttempt = [];
            updateBoard();
            canCancel = false;
        }
    };

    const updateBoard = () => {
        for (let i = 0; i < 15; i++) {
            const tile = gameBoard.children[i];
            tile.textContent = '';
            tile.classList.remove('green');
        }

        loadAttempts();

        const currentRowIndex = attempts.length;
        currentAttempt.forEach((char, index) => {
            const tile = gameBoard.children[currentRowIndex * 5 + index];
            tile.textContent = char;
        });
    };

    keys.forEach(key => {
        key.addEventListener('click', () => handleKeyPress(key.textContent));
    });

    submitButton.addEventListener('click', handleSubmit);
    cancelButton.addEventListener('click', handleCancel);

    initializeBoard();
    updateBoard();
});
