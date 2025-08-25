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
