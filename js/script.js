/* index.html*/

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar AOS
  AOS.init({
    duration: 3000,
    once: false,
  });

  // Función para actualizar el reloj
  function updateTime() {
    const now = new Date();
    const timeElement = document.querySelector(".current-time");
    const newTime = `Hora: ${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

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

  // Actualizar el reloj cada segundo
  setInterval(updateTime, 1000);

  // Mejorar la transición del modo oscuro
  const toggleButton = document.querySelector(".toggle-dark-mode");
  const moonIcon = document.querySelector(".moon-icon");
  const sunIcon = document.querySelector(".sun-icon");

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
});
