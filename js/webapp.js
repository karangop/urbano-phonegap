/* global MozActivity, alert, console, Notification */
"use strict";
(function () {
		// Geolocation
    var geolocation = document.querySelector("#geolocation"),
        geolocationDisplay = document.querySelector("#geolocation-display");
    if (geolocation && geolocationDisplay) {
        geolocation.onclick = function () {
            navigator.geolocation.getCurrentPosition(function (position) {
                geolocationDisplay.innerHTML = "<strong>Latitude:</strong> " + position.coords.latitude + ", <strong>Longitude:</strong> " + position.coords.longitude;
                //Latitude: -33.4570322, Longitude: -70.7012826
                geolocationDisplay.style.display = "block";
            },
            function () {
                geolocationDisplay.innerHTML = "Failed to get your current location";
                geolocationDisplay.style.display = "block";
            });
        };
    }
    
})();