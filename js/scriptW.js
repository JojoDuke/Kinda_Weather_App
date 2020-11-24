// Selectors
const degreeCelcius = document.querySelector(".celcius");
const weatherDescription = document.querySelector(".description");
const weatherLocation = document.querySelector(".location");
const changeLocationBtn = document.querySelector(".change-location-btn");
const iconImg = document.getElementById("icon-imgID");

const corsProxy = "https://cors-anywhere.herokuapp.com/";

function changeLocation(latitude, longitude){
    const api = `${corsProxy}http://api.weatherapi.com/v1/current.json?key=0711bb209d7f480eab0125024202411&q=${latitude}, ${longitude}`;

            // Fetch data from the API
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temp_c, condition} = data.current;

                    degreeCelcius.textContent = temp_c + '°C';
                    weatherDescription.textContent = condition.text;
                    weatherLocation.textContent = data.location.name + ", " + data.location.country;
                });
}

// Event Listeners
window.addEventListener("load", () => {
    let longitude;
    let latitude;
    const weathers = ["Partly cloudy", "Overcast"];

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            console.log("Current location: " + latitude, longitude);

            changeLocation(latitude, longitude);
        });
    }

    // Initial image
    if(weatherDescription.textContent == "Partly cloudy"){
        iconImg.src = "./icons/svg/021-cloud.svg";
        iconImg.classList.add("icon-img");
    }

    // Change the location event-listener
    changeLocationBtn.addEventListener("click", function(){
        longitude = (Math.random() * (80 + 180) + -180).toFixed(3);
        latitude = (Math.random() * (90 + 90) + -90).toFixed(3);
        console.log("Next location: " + latitude, longitude);

        changeLocation(latitude, longitude);


        //Add the icon image to the div here
        if(weatherDescription.textContent == "Overcast"){
            iconImg.src = "./icons/svg/021-snowflake.svg";
            console.log("I should be working");
        }
        else{
            iconImg.src = "./icons/svg/021-rain.svg";
        }

        // Check if the element already contains class
        // And remove as required
        if(iconImg.classList.contains("icon-img")){
            iconImg.classList.remove("icon-img");
        }

        iconImg.classList.add("icon-img2");
    });
});