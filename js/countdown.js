function updateCountdown() {
    const targetDate = new Date('July 25, 2024 00:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

/*     if(difference <= 0){
        clearInterval(intervalId);
        document.getElementById('weDidIt').style.display = 'block'
        document.getElementById('title').innerText = 'We did it love'
        document.getElementById('countdown').style.display = 'none'
        document.getElementById('theGif').style.display = 'none'

    } */

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

const intervalId = setInterval(updateCountdown, 1000);
updateCountdown();
