document.addEventListener('DOMContentLoaded', function() {
    
    // Crear botón "volver arriba"
    createBackToTopButton();
    
    console.log('Tours Arequipa - Script cargado correctamente ✅');
});
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("grid-container");

  fetch("../data/distritos.json?nocache=" + new Date().getTime()) // evitar caché
    .then(response => response.json())
    .then(data => {
      // Recorremos cada propiedad del objeto
      Object.values(data).forEach(distrito => {
  // Enlace envolviendo la tarjeta
        const link = document.createElement("a");
        link.href = distrito.url;
        link.classList.add("card-link");
        link.style.textDecoration = "none"; // opcional, quitar subrayado

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = distrito.imagen;
        img.alt = distrito.titulo;

        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        const p = document.createElement("p");
        p.textContent = distrito.descripcion;

        overlay.appendChild(p);

        const cardTitle = document.createElement("div");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = distrito.titulo;

        card.appendChild(img);
        card.appendChild(overlay);
        card.appendChild(cardTitle);

        link.appendChild(card);
        container.appendChild(link);
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
