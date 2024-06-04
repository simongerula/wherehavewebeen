// Initialize the map
var map = L.map('map').setView([-40.9006, 174.8860], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var todaysIndex = getTodaysIndex();
var targetLocation = locations[todaysIndex];
document.getElementById('photo').src = `./src/imageGuess${todaysIndex}.JPG`;

// Retrieve closest guess from local storage
var closestGuess = localStorage.getItem('closestGuess');
var closestGuessDisplay = closestGuess ? `Closest Guess: ${closestGuess}` : "";
document.getElementById('closest-guess').innerHTML = closestGuessDisplay;

// Check if the user has already made a guess today
var lastGuessDate = localStorage.getItem('lastGuessDate');
var today = new Date();
var year = today.getFullYear();
var month = String(today.getMonth() + 1).padStart(2, '0');
var day = String(today.getDate()).padStart(2, '0');
today = `${year}-${month}-${day}`;

var lastGuessDistance = localStorage.getItem('lastGuessDistance');

if (lastGuessDate === today) {
    // Show the map with previous guess and target location
    var lastGuessLatLng = JSON.parse(localStorage.getItem('lastGuessLatLng'));

    if (lastGuessLatLng) {
        var clickedLocation = L.latLng(lastGuessLatLng.lat, lastGuessLatLng.lng);

        L.polyline([clickedLocation, targetLocation], {color: 'red'}).addTo(map);

        L.marker(clickedLocation).addTo(map)
            .bindPopup(`
                Your distance from the photo was: ${lastGuessDistance}<br>
                <button onclick="window.open('${createShareLink(lastGuessDistance)}', '_blank')">Share</button>
            `).openPopup();

        var cameraIcon = L.icon({
            iconUrl: '../src/cameraIcon.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
        L.marker(targetLocation, {icon: cameraIcon}).addTo(map);
    }
} else {
    map.on('click', function(e) {
        if (lastGuessDate !== today) {
            lastGuessDate = today;
            localStorage.setItem('lastGuessDate', today);
            var clickedLocation = e.latlng;
            var distance = map.distance(clickedLocation, targetLocation);

            var distanceDisplay;
            if (distance > 1000) {
                distanceDisplay = (distance / 1000).toFixed(2) + " kilometers";
            } else {
                distanceDisplay = distance.toFixed(2) + " meters";
            }

            // Save today's distance guess
            localStorage.setItem('lastGuessDistance', distanceDisplay);
            localStorage.setItem('lastGuessLatLng', JSON.stringify(clickedLocation));

            // Check if this is the closest guess
            if (!closestGuess || distance < parseFloat(closestGuess)) {
                localStorage.setItem('closestGuess', distanceDisplay);
                closestGuess = distanceDisplay;
            }

            // Update closest guess display
            document.getElementById('closest-guess').innerHTML = `Your closest Guess: ${closestGuess}`;

            L.polyline([clickedLocation, targetLocation], {color: 'red'}).addTo(map);

            L.marker(clickedLocation).addTo(map)
                .bindPopup(`
                    Your distance from the photo was: ${distanceDisplay}<br>
                    <button onclick="window.open('${createShareLink(distanceDisplay)}', '_blank')">Share</button>
                `).openPopup();

            var cameraIcon = L.icon({
                iconUrl: '../src/cameraIcon.png',
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            });
            L.marker(targetLocation, {icon: cameraIcon}).addTo(map);
        }
    });
}

function createShareLink(distanceDisplay) {
    var shareMessage = "My guess today was " + distanceDisplay + " away from the photo!";
    var shareUrl = "https://wa.me/?text=" + encodeURIComponent(shareMessage);
    return shareUrl;
}

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

window.onload = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
