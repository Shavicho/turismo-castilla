document.addEventListener('DOMContentLoaded', function() {
    
    // Crear botón "volver arriba"
    createBackToTopButton();
    
    console.log('Tours Arequipa - Script cargado correctamente ✅');
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("grid-container");

  fetch("../data/destino.json?nocache=" + new Date().getTime())
    .then(response => response.json())
    .then(data => {
      Object.values(data).forEach(distrito => {
        const card = document.createElement("div");
        card.classList.add("card");

        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        // ----- FRONT -----
        const cardFront = document.createElement("div");
        cardFront.classList.add("card-front");

        // Barra de iconos arriba - SOLO mostrar iconos si hay datos disponibles
        const iconBar = document.createElement("div");
        iconBar.classList.add("icon-bar");
        
        // Definir solo los 4 iconos principales con sus condiciones
        const iconosDisponibles = [
          { 
            type: 'info', 
            icon: 'fas fa-info-circle', 
            title: 'Información general',
            condition: distrito.info || distrito.descripcion 
          },
          { 
            type: 'carro', 
            icon: 'fas fa-car', 
            title: 'En auto',
            condition: distrito.carro 
          },
          { 
            type: 'bus', 
            icon: 'fas fa-bus', 
            title: 'En bus',
            condition: distrito.bus 
          },
          { 
            type: 'walk', 
            icon: 'fas fa-images', 
            title: 'Ver imagen', // Cambié el título
            condition: distrito.walk 
          }
        ];

        // Construir HTML solo para iconos con datos disponibles
        let iconosHTML = '';
        iconosDisponibles.forEach(icono => {
          if (icono.condition) {
            iconosHTML += `<i class="${icono.icon}" data-type="${icono.type}" title="${icono.title}"></i>`;
          }
        });
        
        iconBar.innerHTML = iconosHTML;

        const img = document.createElement("img");
        img.src = distrito.imagen;
        img.alt = distrito.titulo;
        img.classList.add("main-image");

        const cardTitle = document.createElement("div");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = distrito.titulo;

        cardFront.appendChild(iconBar);
        cardFront.appendChild(img);
        cardFront.appendChild(cardTitle);

        // ----- BACK -----
        const cardBack = document.createElement("div");
        cardBack.classList.add("card-back");

        const backContent = document.createElement("div"); // Cambié de <p> a <div>
        backContent.textContent = distrito.info || distrito.descripcion || "Información no disponible";
        cardBack.appendChild(backContent);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        container.appendChild(card);

        // Eventos de los iconos - Manejo especial para 'walk'
        iconBar.querySelectorAll("i").forEach(icon => {
          icon.addEventListener("click", (e) => {
            e.stopPropagation();
            const type = icon.dataset.type;
            
            // IMPORTANTE: Limpiar todas las clases y contenido primero
            backContent.className = '';
            backContent.innerHTML = ''; // Limpia tanto texto como HTML
            
            if (type === 'walk') {
              // ESPECIAL: Para 'walk' mostrar imagen
              if (distrito.walk) {
                const imagen = document.createElement("img");
                imagen.src = distrito.walk; // El JSON debe contener la URL de la imagen
                imagen.alt = "Imagen de " + distrito.titulo;
                imagen.style.cssText = `
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  border-radius: 8px;
                `;
                backContent.appendChild(imagen);
                backContent.classList.add('image-container');
              } else {
                backContent.textContent = "Imagen no disponible";
              }
            } else {
              // Para otros tipos: mostrar texto como antes
              const content = distrito[type] || "Información no disponible";
              backContent.textContent = content;
              
              // Agregar clase especial SOLO para "info"
              if (type === 'info') {
                backContent.classList.add('info-text');
                console.log("Clase info-text agregada"); // Debug
              }
            }
            
            console.log(`Mostrando tipo: ${type}, clases: ${backContent.className}`); // Debug
            
            card.classList.add("flipped");
          });
        });

        // Click en la tarjeta para volver al frente
        card.addEventListener("click", () => {
          if (card.classList.contains("flipped")) {
            card.classList.remove("flipped");
          }
        });
      });
    })
    .catch(error => console.error("Error cargando distritos:", error));
});

// Toggle del menú en móvil
const toggleButton = document.getElementById('toggle-menu');
const menu = document.getElementById('menu');

toggleButton.addEventListener('click', () => {
  menu.classList.toggle('show');
});

// Crear botón "volver arriba"
function createBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    
    document.body.appendChild(backToTopBtn);
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
}