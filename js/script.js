let tooltip = document.getElementById("tooltip");
let datosDistritos = {};

// Cargar datos JSON  
fetch('data/distritos.json?nocache=' + new Date().getTime())
  .then(response => response.json())
  .then(data => {
    datosDistritos = data;  // Guardar datos cargados
    console.log("Datos cargados:", datosDistritos);
  })
  .catch(error => console.error('Error cargando JSON:', error));

// Eventos sobre los <a> dentro del SVG
document.querySelectorAll("svg a").forEach(area => {
  area.addEventListener("mouseenter", (e) => {
    let id = area.getAttribute("data-id");
    if (datosDistritos[id]) {
      let d = datosDistritos[id];
      /*
      tooltip.innerHTML = `
        <h3>${d.titulo}</h3>
        <hr>
        <img src="${d.imagen}" alt="${d.titulo}" style="width:120px; display:block; margin-top:5px;">
        <hr>
        <p>${d.descripcion}</p>
      `;
      tooltip.style.display = "block";
*/
      tooltip.innerHTML = `
        <div class="tooltip-contenido">
          <!-- <img src="${d.imagen}" alt="${d.titulo}"></img> -->
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
  /*
  area.addEventListener("mousemove", (e) => {
    tooltip.style.left = (e.pageX + 15) + "px";
    tooltip.style.top = (e.pageY + 15) + "px";
  });
  */


  area.addEventListener("mousemove", (e) => {
  const tooltipWidth = tooltip.offsetWidth;
  const tooltipHeight = tooltip.offsetHeight;
  const pageWidth = window.innerWidth;
  const pageHeight = window.innerHeight;

  let left = e.pageX + 15;
  let top = e.pageY + 15;

  // Evitar que se salga por la derecha
  if (left + tooltipWidth > pageWidth) {
    left = e.pageX - tooltipWidth - 15;
  }

  // Evitar que se salga por abajo
  if (top + tooltipHeight > pageHeight) {
    top = e.pageY - tooltipHeight - 15;
  }

  tooltip.style.left = left + "px";
  tooltip.style.top = top + "px";
  });
  area.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });
});


// Toggle del menú en móvil
const toggleButton = document.getElementById('toggle-menu');
const menu = document.getElementById('menu');

toggleButton.addEventListener('click', () => {
  menu.classList.toggle('show');
});
document.querySelectorAll('#menu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('show');
  });
});


// Detectar si es móvil
function isMobile() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
}

document.querySelectorAll("svg a").forEach(area => {
  let id = area.getAttribute("data-id");

  // ----- Desktop (mouse) -----
  area.addEventListener("mouseenter", () => {
    if (!isMobile() && datosDistritos[id]) {
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
    if (!isMobile()) {
      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;
      const pageWidth = window.innerWidth;
      const pageHeight = window.innerHeight;

      let left = e.pageX + 15;
      let top = e.pageY + 15;

      if (left + tooltipWidth > pageWidth) {
        left = e.pageX - tooltipWidth - 15;
      }
      if (top + tooltipHeight > pageHeight) {
        top = e.pageY - tooltipHeight - 15;
      }

      tooltip.style.left = left + "px";
      tooltip.style.top = top + "px";
    }
  });

  area.addEventListener("mouseleave", () => {
    if (!isMobile()) tooltip.style.display = "none";
  });

  // ----- Móvil (touch) -----
  area.addEventListener("touchstart", (e) => {
    if (isMobile() && datosDistritos[id]) {
      e.preventDefault(); // evita que abra el enlace de inmediato
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

      // Centrado en pantalla en móvil
      tooltip.style.position = "fixed";
      tooltip.style.left = "50%";
      tooltip.style.top = "50%";
      tooltip.style.transform = "translate(-50%, -50%)";
    }
  });

  area.addEventListener("touchend", () => {
    if (isMobile()) {
      setTimeout(() => { 
        tooltip.style.display = "none"; 
      }, 2000); // se oculta tras 2s
    }
  });
});
