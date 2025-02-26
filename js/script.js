/* script.js */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Script cargado");
  const savedLang = localStorage.getItem("selectedLanguage") || "es";
  console.log("Idioma cargado:", savedLang);

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
      // Nuevas traducciones para contact.html
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
      shareSocial: "Comparte en Redes Sociales",
      share: "Compartir",
    },
    en: {
      inicio: "Home",
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
      // Nuevas traducciones para contact.html
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
      shareSocial: "Share on Social Media",
      share: "Share",
    },
  };

  // Elementos comunes
  const languageDropdownBtn = document.getElementById("languageDropdown");
  const navLinks = document.querySelectorAll(".nav-link");

  // Elementos específicos de cada página
  const homeTitle = document.querySelector(".home-title"); // index.html
  const consultaBtn = document.querySelector(".btn.bg-consultar"); // index.html y schedule.html
  const idaTitle = document.querySelector(".ida-title"); // schedule.html
  const vueltaTitle = document.querySelector(".vuelta-title"); // schedule.html
  const btnIdaLv = document.querySelector(".btn-ida-lv");
  const btnIdaSab = document.querySelector(".btn-ida-sab");
  const btnIdaDom = document.querySelector(".btn-ida-dom");
  const btnVueltaLv = document.querySelector(".btn-vuelta-lv");
  const btnVueltaSab = document.querySelector(".btn-vuelta-sab");
  const btnVueltaDom = document.querySelector(".btn-vuelta-dom");
  const btnAtras = document.querySelector(".btn-atras");

  // Elementos de las páginas ida/ y vuelta/
  const scheduleTitle = document.querySelector(".schedule-title"); // Título principal
  const formTitle = document.querySelector(".card-body .card-title"); // "Selecciona los detalles"
  const stationLabel = document.querySelector("label[for='estacion']"); // "Estación"
  const stationSelect = document.querySelector("#estacion option[value='']"); // "Selecciona una estación"
  const stationHelp = document.getElementById("estacionHelp"); // Texto de ayuda
  const timeLabel = document.querySelector("label[for='hora']"); // "Hora"
  const timeHelp = document.getElementById("horaHelp"); // Texto de ayuda
  const submitBtn = document.getElementById("submit-btn"); // "Ver horarios"
  const resultsTitle = document.querySelector(".resultados-card .card-title"); // "Horarios Disponibles"
  const responseHelp = document.getElementById("responseHelp"); // Mensaje inicial

  // Elementos de contact.html
  const contactTitle = document.querySelector(".text-center-contact");
  const nameLabel = document.querySelector("label[for='from_name']");
  const lastnameLabel = document.querySelector("label[for='from_lastname']");
  const emailLabel = document.querySelector("label[for='from_email']");
  const countryLabel = document.querySelector("label[for='country']");
  const stateLabel = document.querySelector("label[for='state']");
  const municipalityLabel = document.querySelector("label[for='municipality']");
  const messageLabel = document.querySelector("label[for='message']");
  const messageTextarea = document.querySelector("textarea[name='message']");
  const sendBtn = document.querySelector("#contactForm .btn.bg-consultar"); // Corregido selector
  const backToHomeBtn = document.getElementById("backToHomeContact");
  const shareSocialText = document.querySelector(".social-share p");
  const shareButtons = document.querySelectorAll(".social-share .btn"); // Simplificado

  // Definir updateLanguage
  function updateLanguage(lang) {
    const t = translations[lang];

    // Elementos comunes
    if (navLinks.length) {
      navLinks[0].textContent = t.inicio;
      navLinks[1].textContent = t.contacto;
    }
    if (languageDropdownBtn) {
      languageDropdownBtn.textContent = t.language;
    }
    if (homeTitle) {
      homeTitle.textContent = t.title;
    }
    if (consultaBtn) {
      consultaBtn.textContent = t.consulta;
    }
    if (idaTitle) {
      idaTitle.textContent = t.ida;
    }
    if (vueltaTitle) {
      vueltaTitle.textContent = t.vuelta;
    }
    if (btnIdaLv) btnIdaLv.textContent = t.lunesViernes;
    if (btnIdaSab) btnIdaSab.textContent = t.sabado;
    if (btnIdaDom) btnIdaDom.textContent = t.domingoFeriados;
    if (btnVueltaLv) btnVueltaLv.textContent = t.lunesViernes;
    if (btnVueltaSab) btnVueltaSab.textContent = t.sabado;
    if (btnVueltaDom) btnVueltaDom.textContent = t.domingoFeriados;
    if (btnAtras) btnAtras.textContent = t.atras;

    // Elementos de las páginas ida/ y vuelta/
    if (scheduleTitle) {
      const path = window.location.pathname;
      if (path.includes("ida/lunes-a-viernes")) {
        scheduleTitle.textContent = t.idaLunesViernes;
      } else if (path.includes("ida/sabado")) {
        scheduleTitle.textContent = t.idaSabado;
      } else if (path.includes("ida/domingo-y-feriados")) {
        scheduleTitle.textContent = t.idaDomingoFeriados;
      } else if (path.includes("vuelta/lunes-a-viernes")) {
        scheduleTitle.textContent = t.vueltaLunesViernes;
      } else if (path.includes("vuelta/sabado")) {
        scheduleTitle.textContent = t.vueltaSabado;
      } else if (path.includes("vuelta/domingo-y-feriados")) {
        scheduleTitle.textContent = t.vueltaDomingoFeriados;
      }
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

    // Elementos de contact.html
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
    if (shareButtons.length) {
      shareButtons.forEach((btn) => (btn.textContent = t.share));
    }
  }

  // Configurar el cambio de idioma
  if (languageDropdownBtn) {
    document.querySelectorAll(".dropdown-item").forEach((item) => {
      item.addEventListener("click", function () {
        const lang = this.getAttribute("data-lang");
        console.log("Idioma seleccionado:", lang);
        localStorage.setItem("selectedLanguage", lang);
        updateLanguage(lang);
      });
    });
  }

  // Aplicar el idioma guardado al cargar la página
  updateLanguage(savedLang);

  // Mejorar la transición del modo oscuro
  const toggleButton = document.querySelector(".toggle-dark-mode");
  const moonIcon = document.querySelector(".moon-icon");
  const sunIcon = document.querySelector(".sun-icon");

  if (toggleButton && moonIcon && sunIcon) {
    toggleButton.addEventListener("click", () => {
      document.body.style.transition =
        "background-color 0.5s ease, color 0.5s ease";
      document.body.classList.toggle("dark-mode");

      moonIcon.style.transform = "translate(-50%, -50%) rotate(180deg)";
      sunIcon.style.transform = "translate(-50%, -50%) rotate(180deg)";

      setTimeout(() => {
        moonIcon.classList.toggle("d-none");
        sunIcon.classList.toggle("d-none");

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
        emailjs
          .sendForm("service_wmjz6ab", "template_gsd9qm4", form)
          .then(() => {
            alert("Mensaje enviado correctamente ✅");
            form.reset();
          })
          .catch((error) => {
            alert("Error al enviar el mensaje ❌");
            console.error(error);
          });
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

  // Llamar a la función en la inicialización
  setupContactForm();
});
