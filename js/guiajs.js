// Navegación suave y funcionalidades interactivas para Tours Arequipa

document.addEventListener('DOMContentLoaded', function() {
    
    // Crear botón de navegación rápida
    //createQuickNavigation();
    
    // Añadir efectos de aparición progresiva
    initScrollAnimations();
    
    // Inicializar funcionalidad de botones de contacto
    //initContactButtons();
    
    // Mejorar placeholders de imágenes
    initImagePlaceholders();
    
    // Crear botón "volver arriba"
    createBackToTopButton();
    
    console.log('Tours Arequipa - Script cargado correctamente ✅');
});

// Crear navegación rápida entre tours
/*
function createQuickNavigation() {
    const nav = document.createElement('nav');
    nav.className = 'quick-nav';
    nav.innerHTML = `
        <div class="nav-container">
            <h3>Navegación Rápida</h3>
            <div class="nav-buttons">
                <button onclick="scrollToTour('ruta1')" class="nav-btn">
                    Ruta 1 - 1 Día<br>
                    <span>S/. 350.00</span>
                </button>
                <button onclick="scrollToTour('ruta2')" class="nav-btn">
                    Ruta 2 - 2 Días<br>
                    <span>S/. 600.00</span>
                </button>
                <button onclick="scrollToTour('ruta3')" class="nav-btn">
                    Ruta 3 - 3 Días<br>
                    <span>S/. 800.00</span>
                </button>
            </div>
        </div>
    `;
    
    // Insertar después del header
    const header = document.querySelector('header');
    header.insertAdjacentElement('afterend', nav);
}*/

// Función para hacer scroll suave a cada tour
function scrollToTour(tourId) {
    const element = document.getElementById(tourId);
    if (element) {
        const navHeight = document.querySelector('.quick-nav').offsetHeight;
        const elementPosition = element.offsetTop - navHeight - 20;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
        
        // Efecto de resaltado temporal
        element.style.transform = 'scale(1.02)';
        element.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 300);
    }
}

// Animaciones al hacer scroll
function initScrollAnimations() {
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
    
    // Observar elementos que deben animarse
    const elementsToAnimate = document.querySelectorAll('.tour-card, .itinerary-item, .places-section, .items-section');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Inicializar botones de contacto
/*
function initContactButtons() {
    // Crear botones de contacto para cada tour
    const tourCards = document.querySelectorAll('.tour-card');
    
    tourCards.forEach((card, index) => {
        const contactSection = document.createElement('div');
        contactSection.className = 'contact-section';
        contactSection.innerHTML = `
            <div class="contact-buttons">
                <button class="contact-btn whatsapp-btn" onclick="contactWhatsApp('${index + 1}')">
                    📱 WhatsApp
                </button>
                <button class="contact-btn email-btn" onclick="contactEmail('${index + 1}')">
                    ✉️ Email
                </button>
                <button class="contact-btn phone-btn" onclick="contactPhone()">
                    📞 Llamar
                </button>
            </div>
        `;
        
        card.querySelector('.tour-content').appendChild(contactSection);
    });
}*/

// Funciones de contacto (personalizar con datos reales)
/*
function contactWhatsApp(tourNumber) {
    const message = `Hola, estoy interesado en la Ruta Turística ${tourNumber}. ¿Podrían darme más información?`;
    const phoneNumber = "51999999999"; // REEMPLAZAR CON NÚMERO REAL
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function contactEmail(tourNumber) {
    const subject = `Consulta sobre Ruta Turística ${tourNumber}`;
    const body = `Hola,\n\nEstoy interesado en obtener más información sobre la Ruta Turística ${tourNumber}.\n\nGracias.`;
    const email = "info@toursarequipa.com"; // REEMPLAZAR CON EMAIL REAL
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
}

function contactPhone() {
    const phoneNumber = "+51999999999"; // REEMPLAZAR CON NÚMERO REAL
    window.location.href = `tel:${phoneNumber}`;
}*/

// Mejorar placeholders de imágenes
function initImagePlaceholders() {
    const placeholders = document.querySelectorAll('.image-placeholder');
    
    placeholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const message = "Aquí puedes reemplazar con la imagen correspondiente";
            
            // Crear tooltip temporal
            const tooltip = document.createElement('div');
            tooltip.className = 'image-tooltip';
            tooltip.textContent = message;
            tooltip.style.cssText = `
                position: fixed;
                background: #333;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                z-index: 1000;
                pointer-events: none;
                font-size: 0.9rem;
            `;
            
            document.body.appendChild(tooltip);
            
            // Posicionar tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - 40) + 'px';
            
            // Remover tooltip después de 2 segundos
            setTimeout(() => {
                if (document.body.contains(tooltip)) {
                    document.body.removeChild(tooltip);
                }
            }, 2000);
        });
        
        // Añadir efecto hover mejorado
        placeholder.addEventListener('mouseenter', function() {
            this.style.background = '#e3f2fd';
            this.style.borderColor = '#2196f3';
            this.style.cursor = 'pointer';
        });
        
        placeholder.addEventListener('mouseleave', function() {
            this.style.background = '#f8f9fa';
            this.style.borderColor = '#dee2e6';
        });
    });
}

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

// Función para imprimir o guardar como PDF
function printTour(tourId) {
    const tourElement = document.getElementById(tourId);
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <html>
        <head>
            <title>Tour ${tourId.replace('ruta', '')}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .tour-card { margin-bottom: 2rem; }
                .price { color: #e74c3c; font-weight: bold; }
                .itinerary-item { margin-bottom: 1rem; padding: 0.5rem; }
                h1, h2, h3 { color: #2c5aa0; }
            </style>
        </head>
        <body>
            ${tourElement.outerHTML}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// Validación de formulario de contacto (si se añade posteriormente)
function validateContactForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Ingrese un email válido');
    }
    
    if (!formData.phone || formData.phone.trim().length < 9) {
        errors.push('Ingrese un teléfono válido');
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función de utilidad para formatear precios
function formatPrice(price) {
    return `S/. ${price.toFixed(2)}`;
}

// Mostrar/ocultar secciones con animación
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section.style.display === 'none') {
        section.style.display = 'block';
        section.style.animation = 'slideInUp 0.5s ease-out';
    } else {
        section.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            section.style.display = 'none';
        }, 300);
    }
}

// Función para compartir en redes sociales
/*
function shareOnSocial(platform, tourNumber) {
    const tourNames = [
        'Tour Arqueológico Toro Muerto y Querullpa',
        'Tour Aventura Majes River y Sitios Arqueológicos', 
        'Tour Aguas Termales y Valle de Volcanes'
    ];
    
    const tourName = tourNames[tourNumber - 1];
    const url = window.location.href + '#ruta' + tourNumber;
    const text = `¡Descubre ${tourName}! Tours increíbles en Arequipa, Perú`;
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}*/

// Función para calcular precio por grupo
function calculateGroupPrice(tourNumber, groupSize) {
    const basePrices = [350, 600, 800];
    const basePrice = basePrices[tourNumber - 1];
    
    let discount = 0;
    if (groupSize >= 4) {
        discount = 0.1; // 10% descuento para grupos de 4+
    } else if (groupSize >= 6) {
        discount = 0.15; // 15% descuento para grupos de 6+
    }
    
    const finalPrice = basePrice * (1 - discount);
    return {
        originalPrice: basePrice,
        finalPrice: finalPrice,
        discount: discount * 100,
        totalCost: finalPrice * groupSize
    };
}

// Función para generar itinerario personalizado
function generateCustomItinerary(preferences) {
    // Esta función podría expandirse para crear itinerarios personalizados
    // basados en las preferencias del usuario
    const activities = {
        archaeology: ['Petroglifos de Toro Muerto', 'Complejo de Maucallacta'],
        nature: ['Valle de Volcanes', 'Laguna de Mamacocha', 'Nevado Coropuna'],
        adventure: ['Canotaje en Majes River', 'Caminatas'],
        culture: ['Pueblo de Viraco', 'Hacienda Santa María']
    };
    
    return activities;
}

// Función para buscar tours
function searchTours(searchTerm) {
    const tourCards = document.querySelectorAll('.tour-card');
    const searchLower = searchTerm.toLowerCase();
    
    tourCards.forEach(card => {
        const content = card.textContent.toLowerCase();
        if (content.includes(searchLower)) {
            card.style.display = 'block';
            // Resaltar términos encontrados
            highlightSearchTerm(card, searchTerm);
        } else {
            card.style.display = 'none';
        }
    });
}

function highlightSearchTerm(element, term) {
    // Función auxiliar para resaltar términos de búsqueda
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }
    
    textNodes.forEach(textNode => {
        const parent = textNode.parentNode;
        const text = textNode.textContent;
        const regex = new RegExp(term, 'gi');
        
        if (regex.test(text)) {
            const highlightedText = text.replace(regex, `<mark>${term}</mark>`);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = highlightedText;
            
            while (tempDiv.firstChild) {
                parent.insertBefore(tempDiv.firstChild, textNode);
            }
            parent.removeChild(textNode);
        }
    });
}

// Función para limpiar búsqueda
function clearSearch() {
    const tourCards = document.querySelectorAll('.tour-card');
    tourCards.forEach(card => {
        card.style.display = 'block';
        // Remover resaltados
        const marks = card.querySelectorAll('mark');
        marks.forEach(mark => {
            const text = document.createTextNode(mark.textContent);
            mark.parentNode.replaceChild(text, mark);
        });
    });
}

// Toggle del menú en móvil
const toggleButton = document.getElementById('toggle-menu');
const menu = document.getElementById('menu');

toggleButton.addEventListener('click', () => {
  menu.classList.toggle('show');
});


const headers = document.querySelectorAll(".accordion-header");

headers.forEach(header => {
  header.addEventListener("click", () => {
    const body = header.nextElementSibling;
    body.classList.toggle("open");
  });
});
