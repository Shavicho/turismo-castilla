document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const jsonPath = body.getAttribute("data-json");
  const distritoNombre = body.getAttribute("data-distrito");

  // Insertar nombre del distrito en el título
  document.getElementById("titulo-distrito").textContent =
    `Distrito de ${distritoNombre}`;

  // Función para crear una card
  function crearCard(item) {
    return `
      <div class="card">
        <img src="${item.img || ''}" alt="${item.alt || ''}">
        <div class="card-content">
          <h3>${item.titulo || ''}</h3>
          <p>${item.descripcion || ''}</p>
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

toggleButton.addEventListener('click', () => {
  menu.classList.toggle('show');
});
