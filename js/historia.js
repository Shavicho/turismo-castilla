document.addEventListener('DOMContentLoaded', async () => {
  // ===== TU CÓDIGO ORIGINAL (NAVBAR Y FUNCIONALIDAD EXISTENTE) =====
  
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
  //               FLUJO PARA PC (ORIGINAL)
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
  //               FLUJO PARA MÓVIL (ORIGINAL)
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
  //               NAVBAR (ORIGINAL)
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

  // ===== NUEVAS MEJORAS VISUALES PARA LA PÁGINA DE HISTORIA =====

  // Crear y configurar botón volver arriba
  function createBackToTopButton() {
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
    return backToTopBtn;
  }

  // Configurar observer para animaciones de scroll
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Efecto especial para párrafos
          if (entry.target.tagName === 'P') {
            entry.target.style.animationDelay = '0s';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
          }
        }
      });
    }, observerOptions);

    // Observar elementos para animaciones
    const elementsToObserve = document.querySelectorAll(
      '.historia-container, .historia-imagen, .logo-historia'
    );
    
    elementsToObserve.forEach(el => observer.observe(el));

    return observer;
  }

  // Mejorar la experiencia de lectura
  function enhanceReadingExperience() {
    const paragraphs = document.querySelectorAll('.historia-container p');
    
    paragraphs.forEach((p, index) => {
      // Efecto de lectura progresiva
      p.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(74, 144, 164, 0.05)';
        this.style.padding = '1rem 1rem 1rem 2rem';
        this.style.borderRadius = '8px';
        this.style.transition = 'all 0.3s ease';
      });

      p.addEventListener('mouseleave', function() {
        this.style.background = 'transparent';
        this.style.padding = '0 0 0 1rem';
      });

      // Contador de lectura (opcional)
      p.setAttribute('data-paragraph', index + 1);
    });
  }

  // Efecto parallax sutil en scroll
  function initParallaxEffect() {
    const historiaContainer = document.querySelector('.historia-container');
    const logoHistoria = document.querySelector('.logo-historia');
    
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.1;
        const logoRate = scrolled * 0.05;
        
        if (historiaContainer) {
          historiaContainer.style.transform = `translateY(${rate}px)`;
        }
        
        if (logoHistoria) {
          logoHistoria.style.transform = `translateY(${logoRate}px)`;
        }
      });
    }
  }

  // Mejorar carga de imágenes
  function enhanceImageLoading() {
    const images = document.querySelectorAll('.historia-imagen');
    
    images.forEach(img => {
      if (img.complete && img.naturalHeight !== 0) {
        img.style.opacity = '1';
      } else {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease';
        
        img.addEventListener('load', function() {
          this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
          this.style.opacity = '0.5';
          this.style.filter = 'grayscale(100%)';
        });
      }
    });
  }
/*
  // Funcionalidad de impresión mejorada
  function addPrintButton() {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      const printBtn = document.createElement('button');
      printBtn.innerHTML = '🖨️ Imprimir Historia';
      printBtn.className = 'print-button';
      printBtn.style.cssText = `
        position: fixed;
        bottom: 8rem;
        right: 2rem;
        background: linear-gradient(135deg, #4a90a4 0%, #2c5aa0 100%);
        color: white;
        border: none;
        padding: 0.8rem 1.2rem;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(44, 90, 160, 0.3);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        font-size: 0.9rem;
      `;
      
      document.body.appendChild(printBtn);
      
      // Mostrar botón al hacer scroll
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
          printBtn.style.opacity = '1';
          printBtn.style.visibility = 'visible';
        } else {
          printBtn.style.opacity = '0';
          printBtn.style.visibility = 'hidden';
        }
      });
      
      printBtn.addEventListener('click', () => {
        window.print();
      });

      // Hover effect
      printBtn.addEventListener('mouseenter', () => {
        printBtn.style.transform = 'translateY(-2px)';
        printBtn.style.boxShadow = '0 6px 20px rgba(44, 90, 160, 0.4)';
      });
      
      printBtn.addEventListener('mouseleave', () => {
        printBtn.style.transform = 'translateY(0)';
        printBtn.style.boxShadow = '0 4px 15px rgba(44, 90, 160, 0.3)';
      });
    }
  }*/

  // Inicializar todas las mejoras después de un pequeño delay
  setTimeout(() => {
    createBackToTopButton();
    initScrollAnimations();
    enhanceReadingExperience();
    enhanceImageLoading();
    //addPrintButton();
    
    // Solo añadir parallax en pantallas grandes
    if (window.innerWidth > 768) {
      initParallaxEffect();
    }
  }, 500);

  console.log('Página de Historia cargada con mejoras visuales ✨');
});