document.addEventListener('DOMContentLoaded', async () => {
  // ------- Referencias comunes -------
  const tooltip = document.getElementById("tooltip");
  const modal = document.getElementById('modal');
  const modalTitulo = document.getElementById('modal-titulo');
  const modalDescripcion = document.getElementById('modal-descripcion');
  const modalVerMas = document.getElementById('modal-vermas');
  const cerrarBtn = document.querySelector('.cerrar');

  // ------- Cargar datos JSON -------
  let datosDistritos = {};
  try {
    const r = await fetch('data/distritos.json?nocache=' + Date.now());
    if (r.ok) {
      datosDistritos = await r.json();
    }
  } catch (err) {
    console.error('Error cargando JSON:', err);
  }

  // ------- util: esperar a que existan anchors <svg a> -------
  function waitForSVGAnchors(timeout = 3000) {
    const start = Date.now();
    return new Promise(resolve => {
      (function check() {
        const anchors = document.querySelectorAll('svg a');
        if (anchors.length > 0) return resolve(anchors);
        if (Date.now() - start > timeout) return resolve([]);
        requestAnimationFrame(check);
      })();
    });
  }

  const svgAnchors = await waitForSVGAnchors(3000);

  // =========================================================
  //               FLUJO PARA PC
  // =========================================================
  if (window.innerWidth > 768 && tooltip) {
    svgAnchors.forEach(area => {
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

  // =========================================================
  //               FLUJO PARA MÓVIL
  // =========================================================
  if (window.innerWidth <= 768) {
    function abrirModal(area) {
      const id = area.getAttribute('data-id');
      const href = area.getAttribute('href') || area.getAttribute('xlink:href') || '#';

      if (modal && modalTitulo && modalDescripcion && modalVerMas) {
        const d = datosDistritos[id] || {};
        modalTitulo.textContent = d.titulo || area.getAttribute('title') || '';
        modalDescripcion.textContent = d.descripcion || '';
        modalVerMas.href = href;
        modal.style.display = 'flex';
      } else {
        window.location.href = href;
      }
    }

    const svgEl = document.querySelector('svg');
    if (svgEl) {
      svgEl.addEventListener('click', (e) => {
        const area = e.target.closest('a');
        if (!area) return;
        e.preventDefault();
        abrirModal(area);
      });
    }

    // ------- listeners del modal -------
    if (cerrarBtn && modal) {
      cerrarBtn.addEventListener('click', () => modal.style.display = 'none');

      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
      });

      const modalContent = document.querySelector('.modal-content');
      if (modalContent) {
        modalContent.addEventListener('click', (e) => e.stopPropagation());
      }
    }
  }

  // =========================================================
  //               NAVBAR (mismo en ambos)
  // =========================================================
  const toggleButton = document.getElementById('toggle-menu');
  const menu = document.getElementById('menu');

  if (toggleButton && menu) {
    toggleButton.addEventListener('click', () => {
      menu.classList.toggle('show');
    });

    menu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => menu.classList.remove('show'));
    });
  }
});

