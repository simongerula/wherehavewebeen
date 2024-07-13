document.addEventListener('DOMContentLoaded', () => {
    const correctWord = 'HONEY';
    const maxTries = 5;
    let currentAttempt = [];
    let attempts = JSON.parse(localStorage.getItem('attempts')) || [];
    let canCancel = true;
    let messageTimeout = null;

    const gameBoard = document.getElementById('game-board');
    const submitButton = document.getElementById('submit');
    const cancelButton = document.getElementById('cancel');
    const keys = document.querySelectorAll('.key');
    const messageContainer = document.getElementById('message-container');

    const showMessage = (msg, finalAttempt) => {
        clearTimeout(messageTimeout);
        messageContainer.textContent = msg;

        if (finalAttempt) {
            const shareButton = document.createElement('button');
            shareButton.textContent = 'Share';
            shareButton.classList.add('sharebutton');
            shareButton.addEventListener('click', () => {
                shareOnWhatsApp();
            });

            messageContainer.appendChild(shareButton);
            localStorage.setItem('finalMessage', JSON.stringify({ msg, finalAttempt: true }));
        }

        messageContainer.style.opacity = 1;
    };

    const loadFinalMessage = () => {
        const savedMessage = localStorage.getItem('finalMessage');
        if (savedMessage) {
            const { msg, finalAttempt } = JSON.parse(savedMessage);
            showMessage(msg, finalAttempt);
        }
    };

    const shareOnWhatsApp = () => {
        const correctIcons = currentAttempt.map((char, index) => char === correctWord[index] ? '🟩' : (correctWord.includes(char) ? '🟨' : '⬜️')).join('');
        let shareMessage = `Today's wordle ${attempts.length}/${maxTries}\n`;
        attempts.forEach((attempt) => {
            const attemptIcons = attempt.result.map((result) => result === 'correct' ? '🟩' : (result === 'present' ? '🟨' : '⬜️')).join('');
            shareMessage += `${attemptIcons}\n`;
        });
        shareMessage += `${correctIcons}`;
        const encodedMessage = encodeURIComponent(shareMessage);
        const shareURL = `https://wa.me/?text=${encodedMessage}`;
        window.open(shareURL, '_blank');
    };

    const initializeBoard = () => {
        gameBoard.innerHTML = '';
        for (let i = 0; i < 25; i++) {
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
                } else if (attempt.result[i] === 'present') {
                    tile.classList.add('yellow');
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
            const result = currentAttempt.map((char, index) => char === correctWord[index] ? 'correct' : (correctWord.includes(char) ? 'present' : 'incorrect'));
            attempts.push({ word: currentAttempt.join(''), result });
            saveAttempts();  // Ensure that the attempts are saved

            if (result.every(r => r === 'correct')) {
                showMessage('Well done love! You are AMAAAZING❤️', true);
            } else if (attempts.length >= maxTries) {
                showMessage(`Hey Love! The word was ${correctWord}`, true);
            } else {
                showMessage(`Wrong one love, Let's go! You have ${maxTries - attempts.length} tries left.`, false);
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
        for (let i = 0; i < 25; i++) {
            const tile = gameBoard.children[i];
            tile.textContent = '';
            tile.classList.remove('green', 'yellow');
        }

        loadAttempts();

        const currentRowIndex = attempts.length;
        currentAttempt.forEach((char, index) => {
            const tile = gameBoard.children[currentRowIndex * 5 + index];
            tile.textContent = char;
        });
    };

    const clearAttemptsIfYesterday = () => {
        const lastAttemptDateX = localStorage.getItem('lastAttemptDateX');
        const today = new Date();
        const todayStr = today.toDateString();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        if (!lastAttemptDateX || lastAttemptDateX !== todayStr) {
            localStorage.removeItem('attempts');
            localStorage.removeItem('finalMessage');
            attempts = [];
            saveAttempts();
            localStorage.setItem('lastAttemptDateX', todayStr);
        }
    };

    keys.forEach(key => {
        key.addEventListener('click', () => handleKeyPress(key.textContent));
    });

    submitButton.addEventListener('click', handleSubmit);
    cancelButton.addEventListener('click', handleCancel);

    initializeBoard();
    clearAttemptsIfYesterday();
    updateBoard();
    loadFinalMessage();
});
