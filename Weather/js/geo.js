import weather from "./weather.js";
import content from "./content.js";

export function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    weather(latitude + ',' + longitude)
        .then(weatherData => {
            const current = document.querySelector('#current');
            current.innerHTML = content(weatherData);
        })
        .catch( err => { // em caso de erro
            console.log('Promise com erro',err.message);
        })
}

export function showError(error) { 
    switch (error.code) {
        case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
        case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
        case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
        case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
}