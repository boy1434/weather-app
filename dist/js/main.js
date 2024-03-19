import { setLocationObject, getHomeLocation } from "./dataFunctions.js";
import { addSpinner, displayError } from "./domFunctions.js";
import CurrentLocation from "./CurrentLocation.js";
const currentLoc = new CurrentLocation();

const initApp = () => {
    const geoButton = document.getElementById("getLocation");
    geoButton.addEventListener("click", getGeoWeather);
    const homeButton = document.getElementById("home");
    homeButton.addEventListener("click", loadWeather);

    loadWeather();
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
        name: `위도:${position.coords.latitude} 경도:${position.coords.longitude}`
    };
    setLocationObject(currentLoc, myCoordsObj);
    updateDataAndDisplay(currentLoc);
};

const loadWeather = (e) => {
    const savedLocation = getHomeLocation();
    if(!savedLocation && !e) return getGeoWeather();
    if(!savedLocation && e.type === "click") {
        displayError(
            "저장된 집 위치가 없습니다.",
            "먼저 집 위치를 저장 해주세요."
        );
    } else if(savedLocation && !e) {
        displayHomeLocationWeather(savedLocation);
    } else {
        const homeIcon = document.querySelector(".fa-home");
        addSpinner(homeIcon);
        displayHomeLocationWeather(savedLocation);
    }
}

const displayHomeLocationWeather = (home) => {
    if(typeof home === "string") {
        const locationJson = JSON.parse(home);
        const myCoordsObj = {
            lat: locationJson.lat,
            lon: locationJson.lon,
            name: locationJson.name,
            unit: locationJson.unit
        };
        setLocationObject(current, myCoordsObj);
        updateDataAndDisplay(currentLoc);
    }
}

const updateDataAndDisplay = async (locationObj) => {
    console.log(locationObj);
    //const weatherJson = await getWeatherFromCoords(locationObj);
    //if (weatherJson) updateDisplay(weatherJson, locationObj);
}