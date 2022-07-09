window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  let temperatureSection = document.querySelector(".temperature");

  let icon = document.querySelector("#icon");

  let temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position?.coords?.longitude;
      lat = position?.coords?.latitude;
      const api = `http://api.weatherapi.com/v1/current.json?key=3b6a0591355b4791bed94354220907&q=${lat},${long}&aqi=no`;

      fetch(api)
        .then((res) => res.json())
        .then((res) => {
          const { condition, feelslike_f, feelslike_c } = res.current;
          //   Set DOM Elements from API
          temperatureDescription.textContent = condition.text;
          locationTimezone.textContent = res.location.name;
          icon.src = condition.icon;
          if (temperatureSpan.textContent === "F") {
            temperatureSpan.textContent = "C";
            temperatureDegree.textContent = feelslike_c;
            temperatureDegree;
          } else {
            temperatureSpan.textContent = "F";
            temperatureDegree.textContent = feelslike_f;
          }
          // Change Temp C or F
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = feelslike_c;
              temperatureDegree;
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = feelslike_f;
            }
          });
        });
    });
  } else {
    h1.textContent =
      "Something Went Wrong! , Make Sure You Have Allowed Access To Location.";
  }
});
