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

// --- Móvil: click abre modal ---
if (window.innerWidth <= 768) {
  const modal = document.getElementById("modal");
  const modalTitulo = document.getElementById("modal-titulo");
  const modalDescripcion = document.getElementById("modal-descripcion");
  const modalVerMas = document.getElementById("modal-vermas");
  const cerrarBtn = document.querySelector(".cerrar");

  if (modal && modalTitulo && modalDescripcion && modalVerMas && cerrarBtn) {
    document.querySelectorAll("svg a").forEach(area => {
      area.addEventListener("click", (e) => {
        e.preventDefault(); // evita que redirija de frente
        let id = area.getAttribute("data-id");

        if (datosDistritos[id]) {
          let d = datosDistritos[id];
          modalTitulo.textContent = d.titulo;
          modalDescripcion.textContent = d.descripcion;
          modalVerMas.href = area.getAttribute("href"); // usa el mismo enlace del mapa
          modal.style.display = "flex";
        }
      });
    });

    // Cerrar modal al hacer click en la X
    cerrarBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Cerrar modal al hacer click fuera de la ventana
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }
}


// Toggle del menú en móvil
// Toggle del menú (seguro para páginas sin navbar o con DOM tardío)
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggle-menu');
  const menu = document.getElementById('menu');

  if (toggleButton && menu) {
    toggleButton.addEventListener('click', () => {
      menu.classList.toggle('show');
    });

    menu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => menu.classList.remove('show'));
    });
  } else {
    // Opcional para depurar si alguna página no tiene IDs correctos
    // console.warn('Navbar no encontrada en esta página (falta #toggle-menu o #menu).');
  }
});
