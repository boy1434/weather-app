import { setLocationObject } from "./dataFunctions.js";
import {
    addSpinner, displayError
} from "./domFunctions.js";
import CurrentLocation from "./CurrentLocation.js";
const currentLoc = new CurrentLocation();

const initApp = () => {
    const geoButton = document.getElementById("getLocation");
    geoButton.addEventListener("click", getGeoWeather);
}

document.addEventListener("DOMContentLoaded", initApp);

const getGeoWeather = (e) => {
    if (e) {
        if(e.type === "click") {
            const mapIcon = document.querySelector(".fa-map-marker-alt");
            addSpinner(mapIcon);
        }
    }
    if (!navigator.geolocation) geoError();
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};

const geoError = (errObj) => {
    const errMsg = errObj.message ? errObj.message : "Geoloaction not supported";
    displayError(errMsg, errMsg);
};

const geoSuccess = (position) => {
    const myCoordsObj = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        name: `Lat:${position.coords.latitude} Long:${position.coords.longitude}`
    };
    setLocationObject(currentLoc, myCoordsObj);
    console.log(currentLoc);
}