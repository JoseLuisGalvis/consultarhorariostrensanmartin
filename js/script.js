/* script.js */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Script cargado");
  const savedLang = localStorage.getItem("selectedLanguage") || "es";
  console.log("Idioma cargado:", savedLang);

  let allowRightClick = false; // Variable para controlar si se permite el clic derecho

  // Escuchar el evento de teclado
  // Evitar el clic derecho
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault(); // Bloquear el menú contextual
    alert("El clic derecho está deshabilitado en esta página.");
  });

  // Evitar combinaciones de teclas (Ctrl + U, Ctrl + Shift + I, F12, etc.)
  document.addEventListener("keydown", function (e) {
    // Bloquear Ctrl + U
    if (e.ctrlKey && e.key === "u") {
      e.preventDefault();
      alert("La combinación Ctrl + U está deshabilitada.");
    }
    // Bloquear Ctrl + Shift + I y F12 (herramientas de desarrollo)
    if ((e.ctrlKey && e.shiftKey && e.key === "I") || e.key === "F12") {
      e.preventDefault();
      alert("El acceso a las herramientas de desarrollo está deshabilitado.");
    }
  });

  // Inicializar AOS
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 3000,
      once: false,
    });
  }

  // Función para actualizar el reloj
  function updateTime() {
    const now = new Date();
    const timeElement = document.querySelector(".current-time");
    if (timeElement) {
      const newTime = `Hora: ${String(now.getHours()).padStart(
        2,
        "0"
      )}:${String(now.getMinutes()).padStart(2, "0")}:${String(
        now.getSeconds()
      ).padStart(2, "0")}`;
      if (timeElement.textContent !== newTime) {
        timeElement.style.transform = "scale(0.95)";
        timeElement.style.opacity = "0.8";
        setTimeout(() => {
          timeElement.textContent = newTime;
          timeElement.style.transform = "scale(1)";
          timeElement.style.opacity = "1";
        }, 100);
      }
    }
  }

  // Actualizar el reloj cada segundo
  setInterval(updateTime, 1000);

  // Internacionalización
  const translations = {
    es: {
      inicio: "Inicio",
      clima: "Clima",
      mapa: "Mapa",
      contacto: "Contacto",
      language: "Español",
      consulta: "Ir a la Consulta",
      title: "Horarios de Servicio",
      ida: "Ida: Retiro → Dr. Cabred",
      vuelta: "Vuelta: Dr. Cabred → Retiro",
      lunesViernes: "Lunes a Viernes",
      sabado: "Sábado",
      domingoFeriados: "Domingo y Feriados",
      atras: "Atrás",
      idaLunesViernes: "Ida: Lunes a Viernes",
      idaSabado: "Ida: Sábado",
      idaDomingoFeriados: "Ida: Domingo y Feriados",
      vueltaLunesViernes: "Vuelta: Lunes a Viernes",
      vueltaSabado: "Vuelta: Sábado",
      vueltaDomingoFeriados: "Vuelta: Domingo y Feriados",
      selectDetails: "Selecciona los detalles",
      station: "Estación",
      selectStation: "Selecciona una estación",
      stationHelp:
        "Selecciona la estación de la que deseas consultar los horarios",
      time: "Hora",
      timeHelp: "Ingresa la hora para consultar los próximos trenes",
      viewSchedules: "Ver horarios",
      availableSchedules: "Horarios Disponibles",
      selectStationAndTime:
        "Selecciona una estación y hora para ver los horarios disponibles",
      name: "Nombre",
      lastname: "Apellidos",
      email: "Correo Electrónico",
      country: "País",
      state: "Estado o Provincia",
      municipality: "Municipio",
      message: "Mensaje",
      messagePlaceholder:
        "Por favor incluya el lugar que desea evaluemos para visitar o el mensaje con su aporte o sugerencia. Gracias!",
      send: "Enviar",
      backToHome: "Volver al Inicio",
      shareSocial: "Visita Nuestras Redes Sociales",
      share: "Compartir",
      map: "Comercios Publicados",
      // Nuevas traducciones para la sección Clima
      weatherTitle: "Clima en la Línea San Martín",
      selectStationTitle: "Selecciona una estación",
      currentWeather: "Clima Actual",
      humidity: "Humedad",
      wind: "Viento",
      pressure: "Presión",
      visibility: "Visibilidad",
      forecastTitle: "Pronóstico próximos días",
      followUs: "Sigamos en contacto",
      footer: "© 2025 Consultar San Martín - Todos los Derechos Reservados",
      loading: "Cargando...",
      gettingWeatherData: "Obteniendo datos del clima",
      lastUpdate: "Última actualización",
      // Nuevas traducciones para recomendaciones
      weatherRecommendations: {
        thunderstorms:
          "Se esperan tormentas. Recomendamos llevar paraguas y evitar zonas abiertas.",
        drizzle: "Llovizna ligera. Un impermeable o paraguas sería útil hoy.",
        rain: "Lluvia prevista. Lleva paraguas o impermeable y verifica posibles demoras en el tren.",
        snow: "Condiciones de nieve o aguanieve. Abrígate bien y verifica el servicio del tren.",
        fog: "Reducida visibilidad por niebla/bruma. Presta atención a las señales y a tu entorno.",
        clearHot:
          "Día despejado y muy caluroso. Lleva agua, protector solar y usa ropa ligera.",
        clearWarm:
          "Día soleado y cálido. Recomendamos protector solar y mantenerte hidratado.",
        clearCold: "Día despejado pero frío. Abrígate bien antes de salir.",
        clearNice:
          "Día despejado con temperatura agradable. ¡Perfecto para viajar en tren!",
        fewClouds: "Algunas nubes, pero en general buen tiempo para viajar.",
        partlyCloudy:
          "Parcialmente nublado. Considera llevar un abrigo ligero.",
        mostlyCloudy:
          "Día mayormente nublado. Considera llevar un abrigo por si refresca.",
      },
    },
    en: {
      inicio: "Home",
      clima: "Weather",
      mapa: "Map",
      contacto: "Contact",
      language: "English",
      consulta: "Go to the Query",
      title: "Service Schedules",
      ida: "Outbound: Retiro → Dr. Cabred",
      vuelta: "Return: Dr. Cabred → Retiro",
      lunesViernes: "Monday to Friday",
      sabado: "Saturday",
      domingoFeriados: "Sunday & Holidays",
      atras: "Back",
      idaLunesViernes: "Outbound: Monday to Friday",
      idaSabado: "Outbound: Saturday",
      idaDomingoFeriados: "Outbound: Sunday & Holidays",
      vueltaLunesViernes: "Return: Monday to Friday",
      vueltaSabado: "Return: Saturday",
      vueltaDomingoFeriados: "Return: Sunday & Holidays",
      selectDetails: "Select the details",
      station: "Station",
      selectStation: "Select a station",
      stationHelp: "Select the station you want to check schedules for",
      time: "Time",
      timeHelp: "Enter the time to check the next trains",
      viewSchedules: "View schedules",
      availableSchedules: "Available Schedules",
      selectStationAndTime:
        "Select a station and time to view available schedules",
      name: "Name",
      lastname: "Last Name",
      email: "Email",
      country: "Country",
      state: "State or Province",
      municipality: "Municipality",
      message: "Message",
      messagePlaceholder:
        "Please include the place you would like us to evaluate for a visit or your message with your contribution or suggestion. Thank you!",
      send: "Send",
      backToHome: "Back to Home",
      shareSocial: "Connect with Us on Social Media",
      share: "Share",
      map: "Published Stores",
      // Nuevas traducciones para la sección Clima
      weatherTitle: "Weather on the San Martín Line",
      selectStationTitle: "Select a Station",
      currentWeather: "Current Weather",
      humidity: "Humidity",
      wind: "Wind",
      pressure: "Pressure",
      visibility: "Visibility",
      forecastTitle: "Forecast for the Next Few Days",
      followUs: "Stay in Touch",
      footer: "© 2025 Consultar San Martín - All Rights Reserved",
      loading: "Loading...",
      gettingWeatherData: "Getting weather data",
      lastUpdate: "Last update",
      // Nuevas traducciones para recomendaciones
      weatherRecommendations: {
        thunderstorms:
          "Thunderstorms expected. We recommend bringing an umbrella and avoiding open areas.",
        drizzle: "Light drizzle. A raincoat or umbrella would be useful today.",
        rain: "Rain expected. Bring an umbrella or raincoat and check for possible train delays.",
        snow: "Snow or sleet conditions. Dress warmly and check the train service.",
        fog: "Reduced visibility due to fog/mist. Pay attention to signs and your surroundings.",
        clearHot:
          "Clear and very hot day. Bring water, sunscreen, and wear light clothing.",
        clearWarm:
          "Sunny and warm day. We recommend sunscreen and staying hydrated.",
        clearCold: "Clear but cold day. Dress warmly before heading out.",
        clearNice:
          "Clear day with pleasant temperature. Perfect for train travel!",
        fewClouds: "Some clouds, but generally good weather for traveling.",
        partlyCloudy: "Partly cloudy. Consider bringing a light jacket.",
        mostlyCloudy:
          "Mostly cloudy day. Consider bringing a jacket in case it gets chilly.",
      },
    },
  };

  window.translations = translations; // Hacer translations accesible globalmente

  // Elementos comunes
  const languageDropdownBtn = document.getElementById("languageDropdown");
  const navLinks = document.querySelectorAll(".nav-link");

  // Detectar página actual y aplicar clase active
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const normalizedHref = href === "#" ? "/" : href.replace("../", "/");
      const isActive =
        (currentPath === "/" && normalizedHref === "/") ||
        currentPath.includes(normalizedHref);
      if (isActive) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }

  // Llamar a la función al cargar la página
  setActiveNavLink();

  // Elementos específicos de cada página
  const homeTitle = document.querySelector(".home-title");
  const consultaBtn = document.querySelector(".btn.bg-consultar");
  const idaTitle = document.querySelector(".ida-title");
  const vueltaTitle = document.querySelector(".vuelta-title");
  const btnIdaLv = document.querySelector(".btn-ida-lv");
  const btnIdaSab = document.querySelector(".btn-ida-sab");
  const btnIdaDom = document.querySelector(".btn-ida-dom");
  const btnVueltaLv = document.querySelector(".btn-vuelta-lv");
  const btnVueltaSab = document.querySelector(".btn-vuelta-sab");
  const btnVueltaDom = document.querySelector(".btn-vuelta-dom");
  const btnAtras = document.querySelector(".btn-atras");

  const scheduleTitle = document.querySelector(".schedule-title");
  const formTitle = document.querySelector(".card-body .card-title");
  const stationLabel = document.querySelector("label[for='estacion']");
  const stationSelect = document.querySelector("#estacion option[value='']");
  const stationHelp = document.getElementById("estacionHelp");
  const timeLabel = document.querySelector("label[for='hora']");
  const timeHelp = document.getElementById("horaHelp");
  const submitBtn = document.getElementById("submit-btn");
  const resultsTitle = document.querySelector(".resultados-card .card-title");
  const responseHelp = document.getElementById("responseHelp");

  const contactTitle = document.querySelector(".text-center-contact");
  const nameLabel = document.querySelector("label[for='from_name']");
  const lastnameLabel = document.querySelector("label[for='from_lastname']");
  const emailLabel = document.querySelector("label[for='from_email']");
  const countryLabel = document.querySelector("label[for='country']");
  const stateLabel = document.querySelector("label[for='state']");
  const municipalityLabel = document.querySelector("label[for='municipality']");
  const messageLabel = document.querySelector("label[for='message']");
  const messageTextarea = document.querySelector("textarea[name='message']");
  const sendBtn = document.querySelector("#contactForm .btn.bg-consultar");
  const backToHomeBtn = document.getElementById("backToHomeContact");
  const shareSocialText = document.querySelector(".social-share p");
  const shareButtons = document.querySelectorAll(".social-share .btn");

  const mapTitleElement = document.querySelector(".map-title");

  const weatherTitle = document.querySelector(".weather-title");

  // Definir updateLanguage
  function updateLanguage(lang) {
    const t = translations[lang];

    // Elementos comunes
    const navInicio = document.getElementById("nav-inicio");
    const navClima = document.getElementById("nav-clima");
    const navMapa = document.getElementById("nav-mapa");
    const navContacto = document.getElementById("nav-contacto");

    if (navInicio) navInicio.textContent = t.inicio;
    if (navClima) navClima.textContent = t.clima;
    if (navMapa) navMapa.textContent = t.mapa;
    if (navContacto) navContacto.textContent = t.contacto;

    if (languageDropdownBtn) {
      languageDropdownBtn.textContent = t.language;
    }
    if (homeTitle) homeTitle.textContent = t.title;
    if (consultaBtn) consultaBtn.textContent = t.consulta;
    if (idaTitle) idaTitle.textContent = t.ida;
    if (vueltaTitle) vueltaTitle.textContent = t.vuelta;
    if (btnIdaLv) btnIdaLv.textContent = t.lunesViernes;
    if (btnIdaSab) btnIdaSab.textContent = t.sabado;
    if (btnIdaDom) btnIdaDom.textContent = t.domingoFeriados;
    if (btnVueltaLv) btnVueltaLv.textContent = t.lunesViernes;
    if (btnVueltaSab) btnVueltaSab.textContent = t.sabado;
    if (btnVueltaDom) btnVueltaDom.textContent = t.domingoFeriados;
    if (btnAtras) btnAtras.textContent = t.atras;

    if (scheduleTitle) {
      const path = window.location.pathname;
      if (path.includes("ida/lunes-a-viernes"))
        scheduleTitle.textContent = t.idaLunesViernes;
      else if (path.includes("ida/sabado"))
        scheduleTitle.textContent = t.idaSabado;
      else if (path.includes("ida/domingo-y-feriados"))
        scheduleTitle.textContent = t.idaDomingoFeriados;
      else if (path.includes("vuelta/lunes-a-viernes"))
        scheduleTitle.textContent = t.vueltaLunesViernes;
      else if (path.includes("vuelta/sabado"))
        scheduleTitle.textContent = t.vueltaSabado;
      else if (path.includes("vuelta/domingo-y-feriados"))
        scheduleTitle.textContent = t.vueltaDomingoFeriados;
    }
    if (formTitle) formTitle.textContent = t.selectDetails;
    if (stationLabel) stationLabel.textContent = t.station;
    if (stationSelect) stationSelect.textContent = t.selectStation;
    if (stationHelp) stationHelp.textContent = t.stationHelp;
    if (timeLabel) timeLabel.textContent = t.time;
    if (timeHelp) timeHelp.textContent = t.timeHelp;
    if (submitBtn) submitBtn.textContent = t.viewSchedules;
    if (resultsTitle) resultsTitle.textContent = t.availableSchedules;
    if (responseHelp) responseHelp.textContent = t.selectStationAndTime;

    if (contactTitle) contactTitle.textContent = t.contacto;
    if (nameLabel) nameLabel.textContent = t.name;
    if (lastnameLabel) lastnameLabel.textContent = t.lastname;
    if (emailLabel) emailLabel.textContent = t.email;
    if (countryLabel) countryLabel.textContent = t.country;
    if (stateLabel) stateLabel.textContent = t.state;
    if (municipalityLabel) municipalityLabel.textContent = t.municipality;
    if (messageLabel) messageLabel.textContent = t.message;
    if (messageTextarea) messageTextarea.placeholder = t.messagePlaceholder;
    if (sendBtn) sendBtn.textContent = t.send;
    if (backToHomeBtn) backToHomeBtn.textContent = t.backToHome;
    if (shareSocialText) shareSocialText.textContent = t.shareSocial;
    if (shareButtons.length)
      shareButtons.forEach((btn) => (btn.textContent = t.share));

    if (mapTitleElement) mapTitleElement.textContent = t.map;
    if (weatherTitle && window.location.pathname.includes("clima")) {
      weatherTitle.textContent = t.weatherTitle;
    }

    // Nuevos elementos para la sección Clima (con verificaciones)
    const selectStationTitle = document.querySelector(".card-title"); // Título del selector de estaciones
    const climaActualElement = document.querySelector("#clima-actual");
    const currentWeatherTitle = climaActualElement
      ? climaActualElement.parentElement.querySelector(".card-title")
      : null;
    const humedadElement = document.querySelector("#humedad");
    const humidityLabel = humedadElement
      ? humedadElement.previousElementSibling.previousElementSibling
      : null;
    const vientoElement = document.querySelector("#viento");
    const windLabel = vientoElement
      ? vientoElement.previousElementSibling.previousElementSibling
      : null;
    const presionElement = document.querySelector("#presion");
    const pressureLabel = presionElement
      ? presionElement.previousElementSibling.previousElementSibling
      : null;
    const visibilidadElement = document.querySelector("#visibilidad");
    const visibilityLabel = visibilidadElement
      ? visibilidadElement.previousElementSibling.previousElementSibling
      : null;
    const pronosticoContainerElement = document.querySelector(
      "#pronostico-container"
    );
    const forecastTitle = pronosticoContainerElement
      ? pronosticoContainerElement.parentElement.querySelector(".card-title")
      : null;
    const socialIconsElement = document.querySelector(".social-icons");
    const followUsTitle = socialIconsElement
      ? socialIconsElement.previousElementSibling
      : null;
    const footerText = document.querySelector("footer .container p");

    if (selectStationTitle)
      selectStationTitle.textContent = t.selectStationTitle;
    if (currentWeatherTitle) currentWeatherTitle.textContent = t.currentWeather;
    if (humidityLabel) humidityLabel.textContent = t.humidity;
    if (windLabel) windLabel.textContent = t.wind;
    if (pressureLabel) pressureLabel.textContent = t.pressure;
    if (visibilityLabel) visibilityLabel.textContent = t.visibility;
    if (forecastTitle) forecastTitle.textContent = t.forecastTitle;
    if (followUsTitle) followUsTitle.textContent = t.followUs;
    if (footerText) footerText.textContent = t.footer;

    // Actualizar textos dinámicos iniciales (como "Cargando...")
    const temperaturaEl = document.getElementById("temperatura");
    const descripcionClimaEl = document.getElementById("descripcion-clima");
    const recomendacionEl = document.getElementById("recomendacion-texto");
    if (temperaturaEl && temperaturaEl.textContent === "Cargando...")
      temperaturaEl.textContent = t.loading;
    if (
      descripcionClimaEl &&
      descripcionClimaEl.textContent === "Obteniendo datos del clima"
    )
      descripcionClimaEl.textContent = t.gettingWeatherData;
    if (
      recomendacionEl &&
      recomendacionEl.textContent === "Cargando recomendaciones..."
    )
      recomendacionEl.textContent = t.loading;
  }
  // Configurar el cambio de idioma
  if (languageDropdownBtn) {
    document.querySelectorAll(".dropdown-item").forEach((item) => {
      item.addEventListener("click", function () {
        const lang = this.getAttribute("data-lang");
        console.log("Idioma seleccionado:", lang);
        localStorage.setItem("selectedLanguage", lang);
        updateLanguage(lang);
        // Actualizar la recomendación si estamos en la página de clima
        if (
          window.location.pathname.includes("clima") &&
          typeof window.updateRecommendation === "function"
        ) {
          window.updateRecommendation();
        }
      });
    });
  }

  // Elimina el bloque duplicado al final del archivo

  // Aplicar el idioma guardado al cargar la página
  updateLanguage(savedLang);

  // Configurar el modo oscuro
  const toggleButton = document.querySelector(".toggle-dark-mode");
  const moonIcon = document.querySelector(".moon-icon");
  const sunIcon = document.querySelector(".sun-icon");

  function applyDarkMode(isDark) {
    if (isDark) {
      document.body.classList.add("dark-mode");
      if (moonIcon && sunIcon) {
        moonIcon.classList.add("d-none");
        sunIcon.classList.remove("d-none");
      }
    } else {
      document.body.classList.remove("dark-mode");
      if (moonIcon && sunIcon) {
        moonIcon.classList.remove("d-none");
        sunIcon.classList.add("d-none");
      }
    }
  }

  const savedDarkMode = localStorage.getItem("darkMode");
  const isDarkMode = savedDarkMode === null ? false : savedDarkMode === "true";
  applyDarkMode(isDarkMode);

  if (toggleButton && moonIcon && sunIcon) {
    toggleButton.addEventListener("click", () => {
      const isCurrentlyDark = document.body.classList.contains("dark-mode");
      const newDarkMode = !isCurrentlyDark;
      document.body.style.transition =
        "background-color 0.5s ease, color 0.5s ease";
      localStorage.setItem("darkMode", newDarkMode);
      applyDarkMode(newDarkMode);
      moonIcon.style.transform = "translate(-50%, -50%) rotate(180deg)";
      sunIcon.style.transform = "translate(-50%, -50%) rotate(180deg)";
      setTimeout(() => {
        moonIcon.style.transform = "translate(-50%, -50%) rotate(0deg)";
        sunIcon.style.transform = "translate(-50%, -50%) rotate(0deg)";
      }, 150);
    });
  }

  // Función para manejar el envío del formulario y compartir en redes
  function setupContactForm() {
    const form = document.getElementById("contactForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        emailjs.sendForm("service_wmjz6ab", "template_gsd9qm4", form).then(
          () => {
            alert("Mensaje enviado correctamente ✅");
            form.reset();
          },
          (error) => {
            alert("Error al enviar el mensaje ❌");
            console.error(error);
          }
        );
      });
    }

    const backToHomeContact = document.getElementById("backToHomeContact");
    if (backToHomeContact) {
      backToHomeContact.addEventListener("click", () => {
        window.location.href = "/";
      });
    }

    const shareFacebook = document.getElementById("shareFacebook");
    if (shareFacebook) {
      shareFacebook.addEventListener("click", () => {
        window.open(
          "https://www.facebook.com/sharer/sharer.php?u=" +
            encodeURIComponent(window.location.href),
          "_blank"
        );
      });
    }

    const shareInstagram = document.getElementById("shareInstagram");
    if (shareInstagram) {
      shareInstagram.addEventListener("click", () => {
        window.open(
          "https://www.instagram.com/?url=" +
            encodeURIComponent(window.location.href),
          "_blank"
        );
      });
    }
  }

  setupContactForm();

  // Lista de sitios visitados
  const visitedSites = [
    {
      position: [-34.59696569167834, -58.54140107245756],
      name: "Av Rodríguez Peña, Sáenz Peña, Tres de Febrero",
    },
  ];

  // Función para inicializar el mapa
  function setupMap() {
    const buenosAiresPosition = [-34.6037, -58.3816];
    const map = L.map("leaflet-map", {
      center: buenosAiresPosition,
      zoom: 5,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const violetIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    visitedSites.forEach(({ position, name }) => {
      L.marker(position, { icon: violetIcon }).addTo(map).bindPopup(name);
    });

    console.log("Mapa inicializado con ícono violeta (URL externa):", map);
  }

  setupMap();
});
