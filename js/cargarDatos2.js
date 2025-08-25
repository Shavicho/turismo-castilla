document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const jsonPath = body.getAttribute("data-json");
  const distritoNombre = body.getAttribute("data-distrito");

  // Insertar nombre del distrito en el título
  document.getElementById("titulo-distrito").textContent =
    `Distrito de ${distritoNombre}`;

  // Función para crear bloque estilo Wikipedia
  function crearArticulo(item) {
    return `
      <div class="articulo">
        
        <h3>${item.titulo || ''}</h3>
        <p>${item.descripcion || ''}</p>
        ${item.img ? `<img src="${item.img}" alt="${item.alt || ''}" class="articulo-img">` : ""}
      </div>
    `;
  }

  // Cargar el JSON
  fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
      // Listado de secciones que podría tener un distrito
      const secciones = ["atractivos", "actividades", "gastronomia"];

      secciones.forEach(sec => {
        if (data[sec] && data[sec].length > 0) {
          const container = document.getElementById(`${sec}-container`);
          container.innerHTML = data[sec].map(crearArticulo).join("");
        }
      });
    })
    .catch(error => console.error("Error cargando JSON:", error));
});
