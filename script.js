document.addEventListener('DOMContentLoaded', () => {
    const correctWord = 'WHALE';
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

    const showMessage = (msg, finalAttempt) => {
        clearTimeout(messageTimeout);
        messageContainer.textContent = msg;

        if(finalAttempt){
            // Create a Share button
            const shareButton = document.createElement('button.key');
            shareButton.textContent = ' Share';
            shareButton.addEventListener('click', () => {
                shareOnWhatsApp();
            });

            // Append the Share button to the message container
            messageContainer.appendChild(shareButton);
        }

        messageContainer.style.opacity = 1;
    };

    const shareOnWhatsApp = () => {
        // Calculate correct and incorrect icons for the current attempt
        const correctIcons = currentAttempt.map((char, index) => char === correctWord[index] ? '🟩' : '⬛️').join('');

        // Prepare the message to be shared on WhatsApp
        let shareMessage = `Today's worldle ${attempts.length}/${maxTries}\n`;
        attempts.forEach((attempt) => {
            const attemptIcons = attempt.result.map((result) => result === 'correct' ? '🟩' : '⬛️').join('');
            shareMessage += `${attemptIcons}\n`;
        });
        shareMessage += `${correctIcons}`;

        // Encode the message for WhatsApp URL
        const encodedMessage = encodeURIComponent(shareMessage);

        // Construct the WhatsApp share URL
        const shareURL = `https://wa.me/?text=${encodedMessage}`;

        // Open the WhatsApp share URL in a new tab
        window.open(shareURL, '_blank');
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

    const clearAttemptsIfYesterday = () => {
        const lastAttemptDate = localStorage.getItem('lastAttemptDate');
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        //remove after 01/06/2024
        if(!lastAttemptDate){
            localStorage.removeItem('attempts');
            attempts = [];
            saveAttempts();
        }
        //
        if (lastAttemptDate) {
            const lastAttemptDateTime = new Date(lastAttemptDate);
            if (lastAttemptDateTime.getDate() === yesterday.getDate() &&
                lastAttemptDateTime.getMonth() === yesterday.getMonth() &&
                lastAttemptDateTime.getFullYear() === yesterday.getFullYear()) {
                localStorage.removeItem('attempts');
                attempts = [];
                saveAttempts();
            }
        }

        localStorage.setItem('lastAttemptDate', today);
    };

    keys.forEach(key => {
        key.addEventListener('click', () => handleKeyPress(key.textContent));
    });

    submitButton.addEventListener('click', handleSubmit);
    cancelButton.addEventListener('click', handleCancel);

    initializeBoard();
    updateBoard();
    clearAttemptsIfYesterday();
});
