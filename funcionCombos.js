// funcionCombos.js

// Combos predefinidos que tú creas manualmente
export const combosEstaticos = [
    {
        id: "combo-001",
        nombre: "Combo Seducción Total",
        categoria: "combos",
        descripcion: "Conjunto de lencería + vibrador + crema estimulante",
        precio: 85000,
        descuento: 15000, // Ahorro vs comprar por separado
        productos: [
            {
                tipo: "lenceria",
                codigo: "LEN-001",
                imagen: "imagenes/LEN-001.jpg"
            },
            {
                tipo: "juguetes",
                codigo: "pilot-liso",
                imagen: "imagenes/pilot-liso.jpg"
            },
            {
                tipo: "cremas",
                codigo: "multiorgasmico",
                imagen: "imagenes/multiorgasmico-cannabis.jpg"
            }
        ],
        whatsapp: "Hola, quiero más información del Combo Seducción Total"
    },
    {
        id: "combo-002",
        nombre: "Combo Noche de Pasión",
        categoria: "combos",
        descripcion: "Disfraz sexy + juguete + aceite relajante",
        precio: 95000,
        descuento: 20000,
        productos: [
            {
                tipo: "disfraces",
                codigo: "DIS-001",
                imagen: "imagenes/DIS-001.jpg"
            },
            {
                tipo: "juguetes",
                codigo: "pilot-liso",
                imagen: "imagenes/pilot-liso.jpg"
            },
            {
                tipo: "cremas",
                codigo: "jamaican-canabis",
                imagen: "imagenes/jamaican-canabis.jpg"
            }
        ],
        whatsapp: "Hola, quiero más información del Combo Noche de Pasión"
    },
    {
        id: "combo-003",
        nombre: "Combo Completo Premium",
        categoria: "combos",
        descripcion: "Lencería + Disfraz + 2 Juguetes + Crema",
        precio: 150000,
        descuento: 35000,
        productos: [
            {
                tipo: "lenceria",
                codigo: "LEN-002",
                imagen: "imagenes/LEN-002.jpg"
            },
            {
                tipo: "disfraces",
                codigo: "DIS-002",
                imagen: "imagenes/DIS-002.jpg"
            },
            {
                tipo: "juguetes",
                codigo: "pilot-liso",
                imagen: "imagenes/pilot-liso.jpg"
            },
            {
                tipo: "juguetes",
                codigo: "vibrador-2",
                imagen: "imagenes/vibrador-2.jpg"
            },
            {
                tipo: "cremas",
                codigo: "rhino-dorado",
                imagen: "imagenes/rhino-dorado.jpg"
            }
        ],
        whatsapp: "Hola, quiero más información del Combo Completo Premium"
    }
];

// Función para mostrar combos en el catálogo
export function mostrarCombos() {
    const contenedor = document.getElementById("products-grid");
    contenedor.innerHTML = "";

    if (combosEstaticos.length === 0) {
        contenedor.innerHTML = `<p style="text-align: center; padding: 2rem;">No hay combos disponibles</p>`;
        return;
    }

    combosEstaticos.forEach(combo => {
        const card = document.createElement("div");
        card.className = "product-card combo-card";

        // Crear el grid de imágenes del combo
        const imagenesGrid = combo.productos.map(prod => 
            `<div class="combo-image">
                <img src="${prod.imagen}" alt="${prod.tipo}" />
                <span class="tipo-badge">${prod.tipo}</span>
            </div>`
        ).join('');

        const precioOriginal = combo.precio + combo.descuento;

        card.innerHTML = `
            <div class="combo-header">
                <h3>${combo.nombre}</h3>
                <span class="combo-badge">COMBO</span>
            </div>
            
            <div class="combo-images-grid">
                ${imagenesGrid}
            </div>
            
            <p class="combo-description">${combo.descripcion}</p>
            
            <div class="combo-pricing">
                <div class="precio-original">Precio normal: <span class="tachado">$${precioOriginal.toLocaleString()}</span></div>
                <div class="precio-combo">Precio combo: <strong style="color: #c2185b;">$${combo.precio.toLocaleString()}</strong></div>
                <div class="ahorro">¡Ahorras $${combo.descuento.toLocaleString()}!</div>
            </div>
            
            <div class="combo-items">
                <strong>Incluye ${combo.productos.length} productos:</strong>
                <ul>
                    ${combo.productos.map(prod => `<li>${prod.tipo.charAt(0).toUpperCase() + prod.tipo.slice(1)}</li>`).join('')}
                </ul>
            </div>
            
            <button onclick='consultarWhatsAppCombo(${JSON.stringify(combo)})' 
                    style="background-color: #c2185b; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 1rem;">
                🛒 Consultar Combo
            </button>
        `;

        contenedor.appendChild(card);
    });
}

// Función para WhatsApp específica de combos
export function consultarWhatsAppCombo(combo) {
    const telefono = "+573044734713";
    
    // Crear lista de productos del combo
    const listaProductos = combo.productos.map(prod => `- ${prod.tipo}: ${prod.codigo}`).join('\n');
    
    const mensaje = `${combo.whatsapp}

📦 Detalles del combo:
${combo.descripcion}

🛍️ Productos incluidos:
${listaProductos}

💰 Precio: $${combo.precio.toLocaleString()}
💚 Ahorro: $${combo.descuento.toLocaleString()}`;

    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

// Hacer funciones globales
window.consultarWhatsAppCombo = consultarWhatsAppCombo;