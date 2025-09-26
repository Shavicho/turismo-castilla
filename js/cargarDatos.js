// ===== TU CÓDIGO ORIGINAL (SIN CAMBIOS) =====
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const jsonPath = body.getAttribute("data-json");
  const distritoNombre = body.getAttribute("data-distrito");

  // Insertar nombre del distrito en el título
  document.getElementById("titulo-distrito").textContent =
    `Distrito de ${distritoNombre}`;

  // Función para procesar saltos de línea
  function procesarTexto(texto) {
    if (!texto) return '';
    return texto
      .replace(/\n\n/g, '<br>')  // Dobles saltos = párrafos
      .replace(/\n/g, '<br>');       // Saltos simples = líneas
  }

  // Función para crear una card
  function crearCard(item) {
    const descripcionProcesada = procesarTexto(item.descripcion);
    
    return `
      <div class="card">
        <img src="${item.img || ''}" alt="${item.alt || ''}">
        <div class="card-content">
          <h3>${item.titulo || ''}</h3>
          <p>${descripcionProcesada}</p>
        </div>
      </div>
    `;
  }

  // Cargar el JSON
  fetch(jsonPath + "?nocache=" + new Date().getTime())
  //fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
      // Listado de secciones que podría tener un distrito
      const secciones = ["atractivos", "actividades", "gastronomia","danzas"];

      secciones.forEach(sec => {
        if (data[sec] && data[sec].length > 0) {
          const container = document.getElementById(`${sec}-container`);
          container.innerHTML = data[sec].map(crearCard).join("");
        }
      });
    })
    .catch(error => console.error("Error cargando JSON:", error));
});

// Toggle del menú en móvil
const toggleButton = document.getElementById('toggle-menu');
const menu = document.getElementById('menu');

if (toggleButton && menu) {
  toggleButton.addEventListener('click', () => {
    menu.classList.toggle('show');
  });
}

// Acordeón original
const headers = document.querySelectorAll(".accordion-header");

headers.forEach(header => {
  header.addEventListener("click", () => {
    const body = header.nextElementSibling;
    body.classList.toggle("open");
  });
});

// ===== MEJORAS VISUALES ADICIONALES (SIN TOCAR FUNCIONALIDAD) =====

// Animaciones de scroll
document.addEventListener("DOMContentLoaded", () => {
  // Configurar observer para animaciones
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observar secciones para animaciones
  const sections = document.querySelectorAll('section');
  sections.forEach(section => observer.observe(section));

  // Crear y configurar botón volver arriba
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.title = 'Volver arriba';
  
  document.body.appendChild(backToTopBtn);
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  });

  // Mostrar/ocultar botón según scroll
  function toggleBackToTop() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }

  window.addEventListener('scroll', toggleBackToTop);

  // Navegación suave para enlaces del índice
  const indexLinks = document.querySelectorAll('.indice a[href^="#"]');
  indexLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 20;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Añadir efecto de carga a las imágenes
  function handleImageLoading() {
    const images = document.querySelectorAll('.card img');
    images.forEach(img => {
      if (img.complete) {
        img.style.opacity = '1';
      } else {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        img.addEventListener('load', function() {
          this.style.opacity = '1';
        });
      }
    });
  }

  // Ejecutar después de que se carguen las cards
  setTimeout(handleImageLoading, 1000);

  console.log('Mejoras visuales de Andagua cargadas ✨');
});
