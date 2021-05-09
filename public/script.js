//Api - Open Weather Map

// Capturar los elementos del DOM, para modificarlos posteriormente

let container = document.getElementById("container");
let searchForm = document.getElementById("search_submit");
let searchInput = document.getElementById("search_input");
let temperatureDegrees = document.getElementById("degreeNumber");
let weatherIcon = document.getElementById("weatherIcon");
let temperatureDescription = document.getElementById("description");
let timeZone = document.getElementById("timezone");
let date = document.getElementById("date");
let min = document.getElementById("min");
let max = document.getElementById("max");

//declarar funciones secundarias

const displayData = (obj) => {
  temperatureDegrees.textContent = Math.floor(obj.list[0].main.temp);
  timeZone.textContent = obj.list[0].name;
  const icon = obj.list[0].weather[0].icon;
  weatherIcon.innerHTML = `<img src='icons/${icon}.png'></img>`;
  min.textContent = Math.floor(obj.list[0].main.temp_min);
  max.textContent = Math.floor(obj.list[0].main.temp_max);
  temperatureDescription.textContent = obj.list[0].weather[0].description.charAt(0).toUpperCase()+ obj.list[0].weather[0].description.slice(1);
}

const displayBackgroundImage = (obj) => {
  console.log(obj)
  // extraer hora del obj que contiene los datos del tiempo
  let datespanish = new Date(obj.list[4].dt*1000).toLocaleString("es-ES", {
    timeStyle: "short",
    dateStyle: "long"
  } )
  console.log(datespanish)
  // convertir a hora que entendamos
  // extraer la hora
  date.textContent = `Actualización ${datespanish}`

  const dayHour = new Date(obj.list[4].dt*1000).getHours();
  console.log(dayHour)
  // lógica
  if(dayHour > 6 && dayHour < 20) {
    container.classList.remove("night");
    container.classList.add("day");
  } else {
    container.classList.remove("day");
    container.classList.add("night");
  }
}

//declarar getweatherData

const getWeatherData = async (city) => {
  // Llamar a la api y obtener un objeto con los datos
  const res = await fetch(`https://community-open-weather-map.p.rapidapi.com/find?q=${city}&units=metric&lang=sp`, {
    "headers": {
      "x-rapidapi-key": "7090138c33msh36688bdd0a384bap197688jsn9b009d739916",
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
    }
  });

  const data = await res.json();
  // Cambiar el fondo de pantalla según sea día o noche
  displayBackgroundImage(data)
  // Mostrar los datos obtenidos en el DOM
  displayData(data);
}

searchForm.addEventListener("submit",e =>{
  e.preventDefault();
  getWeatherData(searchInput.value)
})

// Al cargar la página, nos cargue una ciudad

window.onload = () => {
  getWeatherData("Madrid");
}