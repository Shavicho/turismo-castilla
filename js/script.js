let tooltip = document.getElementById("tooltip");
let datosDistritos = {};

// Cargar datos JSON
fetch('data/distritos.json?nocache=' + new Date().getTime())
  .then(response => response.json())
  .then(data => { datosDistritos = data; })
  .catch(error => console.error('Error cargando JSON:', error));

// --- PC: tooltip que sigue el mouse ---
if (window.innerWidth > 768) {
  document.querySelectorAll("svg a").forEach(area => {
    area.addEventListener("mouseenter", () => {
      let id = area.getAttribute("data-id");
      if (datosDistritos[id]) {
        let d = datosDistritos[id];
        tooltip.innerHTML = `
          <div class="tooltip-contenido">
            <div class="texto">
              <h3>${d.titulo}</h3>
              <hr>
              <p>${d.descripcion}</p>
            </div>
          </div>
        `;
        tooltip.style.display = "block";
      }
    });

    area.addEventListener("mousemove", (e) => {
      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;
      const pageWidth = window.innerWidth;
      const pageHeight = window.innerHeight;

      let left = e.pageX + 15;
      let top = e.pageY + 15;

      if (left + tooltipWidth > pageWidth) left = e.pageX - tooltipWidth - 15;
      if (top + tooltipHeight > pageHeight) top = e.pageY - tooltipHeight - 15;

      tooltip.style.left = left + "px";
      tooltip.style.top = top + "px";
    });

    area.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  });
}

// --- Móvil: long press ---
if (window.innerWidth <= 768) {
  document.querySelectorAll("svg a").forEach(area => {
    let touchTimer;
    let longPress = false;
    let startX = 0, startY = 0;

    area.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      longPress = false;

      touchTimer = setTimeout(() => {
        longPress = true;
        let id = area.getAttribute("data-id");
        if (datosDistritos[id]) {
          let d = datosDistritos[id];
          tooltip.innerHTML = `
            <div class="tooltip-contenido">
              <div class="texto">
                <h3>${d.titulo}</h3>
                <hr>
                <p>${d.descripcion}</p>
              </div>
            </div>
          `;
          tooltip.style.display = "block";
        }
      }, 500); // tiempo para long press
    });

    area.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      if (Math.abs(touch.clientX - startX) > 10 || Math.abs(touch.clientY - startY) > 10) {
        clearTimeout(touchTimer);
      }
    });

    area.addEventListener("touchend", (e) => {
      clearTimeout(touchTimer);
      if (longPress) {
        tooltip.style.display = "none";
        e.preventDefault();
      }
    });
  });
}

// Toggle del menú en móvil
const toggleButton = document.getElementById('toggle-menu');
const menu = document.getElementById('menu');

toggleButton.addEventListener('click', () => {
  menu.classList.toggle('show');
});
document.querySelectorAll('#menu .nav-link').forEach(link => {
  link.addEventListener('click', () => menu.classList.remove('show'));
});
