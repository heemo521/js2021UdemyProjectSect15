'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      //   console.log(position);

      //current location lat, lng
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      //   console.log(`https://www.google.com/maps/@${latitude},@${longitude}`);
      const coords = [latitude, longitude];

      map = L.map('map').setView(coords, 13); //second argument is zoom level
      //   console.log(map);

      //maps are made of small tiles sourced from the openstreemap here - style fr/hot/
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //creating marker
      //   L.marker(coords)
      //     .addTo(map)
      //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      //     .openPopup();

      //Handling clicks on map
      map.on('click', function (mapE) {
        mapEvent = mapE; //mapEvent declared globally then assigned here with this eventHandler to be used elsewhere
        form.classList.remove('hidden'); //reveal form when clicked on map
        inputDistance.focus(); //immedediately move the cursor to the form box
      });
    },
    function () {
      alert('Could not get your position');
    }
  );

//Form submit
form.addEventListener('submit', function (e) {
  e.preventDefault();

  //Clear input fields
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      '';

  // Display marker
  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  //L.marker([location]) .addTo the (map) .bindPopup(message to show)
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        //find customization options from documentation of Leaflet
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});

inputType.addEventListener('change', function (e) {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
