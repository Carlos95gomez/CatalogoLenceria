import {productosCremas} from './productosCremas.js';
import {productosDisfraces} from './productosDisfraces.js';
import {productosJuguetes} from './productosJuguetes.js';
import {productosLenceria} from './productosLenceria.js';
import {combosEstaticos, mostrarCombos} from './funcionCombos.js';

const productos = [
  ...productosCremas,
  ...productosDisfraces,
  ...productosJuguetes,
  ...productosLenceria
];

function mostrarProductos(categoria) {
  const contenedor = document.getElementById("products-grid");
  contenedor.innerHTML = "";

  // Si es combos, usar función especializada
  if (categoria === "combos") {
    mostrarCombos();
    return;
  }

  // Para otras categorías, usar lógica normal
  const filtrados = productos.filter(p => p.categoria === categoria);

  if (filtrados.length === 0) {
    contenedor.innerHTML = `
      <div style="padding: 2rem; text-align: center; background: #f0f0f0; border-radius: 10px;">
        <h3>❌ No hay productos en "${categoria}"</h3>
        <p><strong>Categorías disponibles:</strong></p>
        <p>${[...new Set(productos.map(p => p.categoria))].join(' | ')}</p>
      </div>
    `;
    return;
  }

  filtrados.forEach(prod => {
    const card = document.createElement("div");
    card.className = "product-card";

    const precioHtml = prod.precio ? `<p><strong>Precio:</strong> $${prod.precio.toLocaleString()}</p>` : "";
    const tallasHtml = prod.tallas ? `<p><strong>Tallas:</strong> ${prod.tallas.join(", ")}</p>` : "";
    const coloresHtml = prod.colores ? 
      `<div class="colores">
         <strong>Colores:</strong>
         ${prod.colores.map(color => `<span class="color-circle ${color}"></span>`).join(" ")}
       </div>` : "";

    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" onclick="abrirModal('${prod.imagen}', '${prod.nombre}')" style="cursor: pointer;" />
      <h3>${prod.nombre}</h3>
      ${precioHtml}
      ${tallasHtml}
      ${coloresHtml}
      <button onclick='consultarWhatsApp(${JSON.stringify(prod)})' 
              style="background-color: #c2185b; color: white; padding: 0.5rem 1rem; border: none; border-radius: 5px; cursor: pointer;">
        Consultar
      </button>
    `;

    contenedor.appendChild(card);
  });
}

function consultarWhatsApp(prod) {
  const telefono = "+573044734713";
  const mensaje = prod.whatsapp || `Hola, quiero más info de este producto: ${prod.nombre}`;
  const mensajeCompleto = `${mensaje} - Imagen: https://carlos95gomez.github.io/CatalogoLenceria/${prod.imagen}`;
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensajeCompleto)}`;
  window.open(url, "_blank");
}

// Función para modal de imágenes - VERSIÓN SIMPLIFICADA
function abrirModal(imagen, nombre) {
  const modal = document.getElementById('modalImagen');
  const modalImg = document.getElementById('imagenModal');
  
  modal.style.display = "flex"; // Cambié de "block" a "flex" para centrar
  modalImg.src = imagen;
  modalImg.alt = nombre; // Solo cambio el alt de la imagen
  document.body.style.overflow = 'hidden'; // Prevenir scroll del body
}

function cerrarModal() {
  const modal = document.getElementById('modalImagen');
  modal.style.display = "none";
  document.body.style.overflow = 'auto'; // Restaurar scroll del body
}

document.addEventListener("DOMContentLoaded", () => {
  // Mostrar lencería por defecto
  mostrarProductos("lenceria");
  
  // Event listeners para botones
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filtro = btn.getAttribute("data-filter");
      mostrarProductos(filtro);
    });
  });

  // Cerrar modal al hacer clic fuera
  window.addEventListener('click', (event) => {
    const modal = document.getElementById('modalImagen');
    if (event.target === modal) {
      cerrarModal();
    }
  });
});

// Funciones globales
window.mostrarProductos = mostrarProductos;
window.consultarWhatsApp = consultarWhatsApp;
window.abrirModal = abrirModal;
window.cerrarModal = cerrarModal;