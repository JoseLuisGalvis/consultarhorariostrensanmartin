// clima.js - Funcionalidad para la página del clima

// Constantes de la API
const API_KEY = "135c58bcb5237fc560f0ca5f88796f0b"; // Reemplazar con tu API key de OpenWeatherMap
const API_URL = "https://api.openweathermap.org/data/2.5/";

// Coordenadas de las estaciones (latitud, longitud)
const estaciones = {
  retiro: { lat: -34.5924, lon: -58.3731, nombre: "Retiro" },
  palermo: { lat: -34.5792, lon: -58.4269, nombre: "Palermo" },
  villacrespo: { lat: -34.5997, lon: -58.4469, nombre: "Villa Crespo" },
  lapaternal: { lat: -34.6006, lon: -58.4687, nombre: "La Paternal" },
  villadelparque: { lat: -34.6048, lon: -58.4933, nombre: "Villa del Parque" }, // Nueva
  devoto: { lat: -34.6057, lon: -58.5106, nombre: "Devoto" }, // Nueva (coordenadas ajustadas)
  saenzpena: { lat: -34.6031, lon: -58.5295, nombre: "Sáenz Peña" },
  santoslugares: { lat: -34.6042, lon: -58.5468, nombre: "Santos Lugares" }, // Nueva
  caseros: { lat: -34.6056, lon: -58.5639, nombre: "Caseros" },
  elpalomar: { lat: -34.6053, lon: -58.5923, nombre: "El Palomar" },
  hurlingham: { lat: -34.5978, lon: -58.6428, nombre: "Hurlingham" },
  williammorris: { lat: -34.5906, lon: -58.663, nombre: "William C. Morris" }, // Ajustado nombre
  bellavista: { lat: -34.5648, lon: -58.6963, nombre: "Bella Vista" },
  muñiz: { lat: -34.5539, lon: -58.7066, nombre: "Muñiz" },
  sanmiguel: { lat: -34.5436, lon: -58.7123, nombre: "San Miguel" },
  josecpaz: { lat: -34.5153, lon: -58.7634, nombre: "José C. Paz" }, // Corregido
  solyverde: { lat: -34.5021, lon: -58.7866, nombre: "Sol y Verde" }, // Nueva
  ptederqui: { lat: -34.4792, lon: -58.8346, nombre: "Pte. Derqui" }, // Nueva
  villaastolfi: { lat: -34.4632, lon: -58.8738, nombre: "Villa Astolfi" }, // Nueva
  pilar: { lat: -34.4546, lon: -58.9151, nombre: "Pilar" },
  manzanares: { lat: -34.4355, lon: -58.9625, nombre: "Manzanares" }, // Nueva
  drcabred: { lat: -34.4121, lon: -59.0134, nombre: "Dr. Cabred" }, // Nueva (destino final)
};

// Elementos del DOM
const estacionSelector = document.getElementById("estacion-selector");
const temperaturaEl = document.getElementById("temperatura");
const descripcionClimaEl = document.getElementById("descripcion-clima");
const weatherIconEl = document.getElementById("weather-icon");
const humedadEl = document.getElementById("humedad");
const vientoEl = document.getElementById("viento");
const presionEl = document.getElementById("presion");
const visibilidadEl = document.getElementById("visibilidad");
const recomendacionEl = document.getElementById("recomendacion-texto");
const ultimaActualizacionEl = document.getElementById("ultima-actualizacion");
const pronosticoContainer = document.getElementById("pronostico-container");

// Inicializar AOS
document.addEventListener("DOMContentLoaded", function () {
  AOS.init();
  // Cargar clima de la estación seleccionada por defecto
  cargarClimaActual();

  // Evento para cambiar de estación
  estacionSelector.addEventListener("change", function () {
    cargarClimaActual();
  });
});

// Función para cargar el clima actual
function cargarClimaActual() {
  const estacionSeleccionada = estacionSelector.value;
  const { lat, lon, nombre } = estaciones[estacionSeleccionada];

  // Mostrar spinner
  weatherIconEl.innerHTML = '<i class="fas fa-spinner fa-spin fa-3x"></i>';
  temperaturaEl.textContent = "Cargando...";
  descripcionClimaEl.textContent = "Obteniendo datos del clima";

  // Llamada a la API para el clima actual
  fetch(
    `${API_URL}weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener datos del clima");
      }
      return response.json();
    })
    .then((data) => {
      mostrarClimaActual(data, nombre);
      cargarPronostico(lat, lon);
    })
    .catch((error) => {
      console.error("Error:", error);
      mostrarError();
    });
}

// Variable global para almacenar los datos del clima actual
let currentWeatherData = null;
let currentStationName = null;

// Función para mostrar el clima actual
function mostrarClimaActual(data, nombreEstacion) {
  currentWeatherData = data;
  currentStationName = nombreEstacion;

  temperaturaEl.textContent = `${Math.round(data.main.temp)}°C`;

  const descripcion = data.weather[0].description;
  descripcionClimaEl.textContent = `${
    descripcion.charAt(0).toUpperCase() + descripcion.slice(1)
  } en ${nombreEstacion}`;

  const weatherId = data.weather[0].id;
  const iconoClima = obtenerIconoClima(weatherId, data.weather[0].icon);
  weatherIconEl.innerHTML = iconoClima;

  humedadEl.textContent = `${data.main.humidity}%`;
  vientoEl.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
  presionEl.textContent = `${data.main.pressure} hPa`;
  visibilidadEl.textContent = data.visibility
    ? `${(data.visibility / 1000).toFixed(1)} km`
    : "N/A";

  recomendacionEl.textContent = generarRecomendacion(weatherId, data.main.temp);

  const ahora = new Date();
  ultimaActualizacionEl.textContent = ahora.toLocaleString();
}

function updateRecommendation() {
  if (currentWeatherData && currentStationName) {
    const weatherId = currentWeatherData.weather[0].id;
    const temperatura = currentWeatherData.main.temp;
    recomendacionEl.textContent = generarRecomendacion(weatherId, temperatura);
  }
}

window.updateRecommendation = updateRecommendation; // Hacer la función accesible globalmente

// Función para cargar el pronóstico de 5 días
function cargarPronostico(lat, lon) {
  fetch(
    `${API_URL}forecast?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener pronóstico");
      }
      return response.json();
    })
    .then((data) => {
      mostrarPronostico(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      pronosticoContainer.innerHTML = `
        <div class="col-12 text-center">
          <div class="alert alert-danger">
            <i class="fas fa-exclamation-triangle me-2"></i>
            Error al cargar el pronóstico. Intenta nuevamente más tarde.
          </div>
        </div>
      `;
    });
}

// Función para mostrar el pronóstico
function mostrarPronostico(data) {
  // Limpiar el contenedor
  pronosticoContainer.innerHTML = "";

  // Obtener pronóstico para cada día (a las 12:00)
  const pronosticoPorDia = {};

  data.list.forEach((item) => {
    const fecha = new Date(item.dt * 1000);
    const dia = fecha.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
    });

    // Agrupar por día
    if (!pronosticoPorDia[dia]) {
      pronosticoPorDia[dia] = {
        temperaturaMin: item.main.temp_min,
        temperaturaMax: item.main.temp_max,
        descripcion: item.weather[0].description,
        icon: item.weather[0].icon,
        id: item.weather[0].id,
      };
    } else {
      // Actualizar mínimos y máximos
      pronosticoPorDia[dia].temperaturaMin = Math.min(
        pronosticoPorDia[dia].temperaturaMin,
        item.main.temp_min
      );
      pronosticoPorDia[dia].temperaturaMax = Math.max(
        pronosticoPorDia[dia].temperaturaMax,
        item.main.temp_max
      );
    }
  });

  // Mostrar hasta 5 días
  const dias = Object.keys(pronosticoPorDia).slice(0, 5);

  dias.forEach((dia) => {
    const pronostico = pronosticoPorDia[dia];
    const colDiv = document.createElement("div");
    colDiv.className = "col-md-6 col-lg-4 mb-3";
    colDiv.setAttribute("data-aos", "fade-up");

    colDiv.innerHTML = `
      <div class="card forecast-card">
        <div class="forecast-day">${dia}</div>
        <div class="forecast-icon">
          ${obtenerIconoClima(pronostico.id, pronostico.icon)}
        </div>
        <div class="forecast-temp">
          <span class="max-temp">${Math.round(
            pronostico.temperaturaMax
          )}°C</span> / 
          <span class="min-temp">${Math.round(
            pronostico.temperaturaMin
          )}°C</span>
        </div>
        <div class="forecast-desc">
          ${
            pronostico.descripcion.charAt(0).toUpperCase() +
            pronostico.descripcion.slice(1)
          }
        </div>
      </div>
    `;

    pronosticoContainer.appendChild(colDiv);
  });
}

// Función para obtener el icono según el código de clima
function obtenerIconoClima(id, icon) {
  let iconClass = "";

  // Determinar icono según el ID y si es de día o noche
  const esNoche = icon.includes("n");

  if (id >= 200 && id < 300) {
    // Tormentas
    iconClass = esNoche ? "fa-bolt" : "fa-bolt";
  } else if (id >= 300 && id < 500) {
    // Llovizna
    iconClass = esNoche ? "fa-cloud-rain" : "fa-cloud-rain";
  } else if (id >= 500 && id < 600) {
    // Lluvia
    iconClass = esNoche ? "fa-cloud-showers-heavy" : "fa-cloud-showers-heavy";
  } else if (id >= 600 && id < 700) {
    // Nieve
    iconClass = "fa-snowflake";
  } else if (id >= 700 && id < 800) {
    // Atmósfera (niebla, bruma, etc.)
    iconClass = "fa-smog";
  } else if (id === 800) {
    // Despejado
    iconClass = esNoche ? "fa-moon" : "fa-sun";
  } else if (id > 800) {
    // Nubes
    if (id === 801) {
      iconClass = esNoche ? "fa-cloud-moon" : "fa-cloud-sun";
    } else {
      iconClass = "fa-cloud";
    }
  }

  // Determinar color según el tipo de clima
  let iconColor = "#007bff"; // Azul por defecto

  if (id === 800) {
    // Despejado
    iconColor = esNoche ? "#5c6bc0" : "#ffd700"; // Amarillo para sol, azul índigo para luna
  } else if (id >= 200 && id < 300) {
    // Tormentas
    iconColor = "#6c757d"; // Gris oscuro
  } else if ((id >= 300 && id < 600) || (id >= 700 && id < 800)) {
    // Lluvia o niebla
    iconColor = "#17a2b8"; // Cian
  } else if (id >= 600 && id < 700) {
    // Nieve
    iconColor = "#adb5bd"; // Gris claro
  }

  return `<i class="fas ${iconClass}" style="color: ${iconColor}; font-size: 3rem;"></i>`;
}

// Función para generar recomendaciones según el clima
// Función para generar recomendaciones según el clima
function generarRecomendacion(weatherId, temperatura) {
  const lang = localStorage.getItem("selectedLanguage") || "es"; // Obtener el idioma actual
  const t = window.translations[lang].weatherRecommendations; // Acceder a las recomendaciones traducidas

  if (weatherId >= 200 && weatherId < 300) {
    return t.thunderstorms;
  } else if (
    (weatherId >= 300 && weatherId < 500) ||
    (weatherId >= 520 && weatherId < 600)
  ) {
    return t.drizzle;
  } else if (weatherId >= 500 && weatherId < 520) {
    return t.rain;
  } else if (weatherId >= 600 && weatherId < 700) {
    return t.snow;
  } else if (weatherId >= 700 && weatherId < 800) {
    return t.fog;
  } else if (weatherId === 800) {
    if (temperatura > 30) {
      return t.clearHot;
    } else if (temperatura > 25) {
      return t.clearWarm;
    } else if (temperatura < 10) {
      return t.clearCold;
    } else {
      return t.clearNice;
    }
  } else if (weatherId > 800 && weatherId <= 804) {
    if (weatherId === 801) {
      return t.fewClouds;
    } else if (weatherId === 802) {
      return t.partlyCloudy;
    } else {
      return t.mostlyCloudy;
    }
  }
} // Cierre de la función generarRecomendacion

// Función para mostrar error (agregada por completitud)
function mostrarError() {
  temperaturaEl.textContent = "Error";
  descripcionClimaEl.textContent = "No se pudo cargar el clima.";
  weatherIconEl.innerHTML =
    '<i class="fas fa-exclamation-triangle" style="color: #dc3545; font-size: 3rem;"></i>';
  humedadEl.textContent = "N/A";
  vientoEl.textContent = "N/A";
  presionEl.textContent = "N/A";
  visibilidadEl.textContent = "N/A";
  recomendacionEl.textContent = "Intenta nuevamente más tarde.";
}
