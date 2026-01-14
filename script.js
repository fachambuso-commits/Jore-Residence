// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
   
    // Initialize components
    initBookingSystem();
    initReviews();
    initLanguageSwitcher();
    initMobileMenu();
    initContactForms();
    initDatePickers();
});

// Booking System
function initBookingSystem() {
    const bookingForm = document.querySelector('.booking-form');
    const bookingSummary = document.getElementById('booking-summary');
    const summaryDetails = document.getElementById('summary-details');
   
    if (bookingForm) {
        // Quantity selector
        document.querySelectorAll('.qty-btn').forEach(button => {
            button.addEventListener('click', function() {
                const input = this.parentNode.querySelector('input');
                const action = this.dataset.action;
                let value = parseInt(input.value);
               
                if (action === 'increase' && value < 20) {
                    input.value = value + 1;
                } else if (action === 'decrease' && value > 1) {
                    input.value = value - 1;
                }
            });
        });
       
        // Form submission
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
           
            const serviceType = document.getElementById('service-type').value;
            const checkin = document.getElementById('checkin-date').value;
            const checkout = document.getElementById('checkout-date').value;
            const guests = document.getElementById('guests').value;
           
            // Calculate price (simulated)
            const basePrices = {
                'room': 49,
                'tour': 35,
                'car': 29,
                'package': 99
            };
           
            const serviceNames = {
                'room': 'Room Booking',
                'tour': 'Tour Guide',
                'car': 'Car Rental',
                'package': 'Complete Package'
            };
           
            const price = basePrices[serviceType] * parseInt(guests);
           
            // Show summary
            summaryDetails.innerHTML = `
                <p><strong>Service:</strong> ${serviceNames[serviceType]}</p>
                <p><strong>Check-in:</strong> ${checkin}</p>
                <p><strong>Check-out:</strong> ${checkout}</p>
                <p><strong>Guests:</strong> ${guests}</p>
                <p><strong>Total Price:</strong> $${price}</p>
            `;
           
            bookingSummary.style.display = 'block';
           
            // Scroll to summary
            bookingSummary.scrollIntoView({ behavior: 'smooth' });
           
            // Show confirmation modal
            setTimeout(() => {
                if (confirm('Would you like to confirm this booking?')) {
                    alert('Booking confirmed! We will contact you shortly.');
                    bookingForm.reset();
                    bookingSummary.style.display = 'none';
                }
            }, 500);
        });
    }
}

// Reviews System
function initReviews() {
    // Star rating
    const starInputs = document.querySelectorAll('.stars-input i');
    const ratingValue = document.getElementById('rating-value');
   
    starInputs.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.dataset.rating;
            ratingValue.value = rating;
           
            // Update star display
            starInputs.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                } else {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                }
            });
        });
       
        // Hover effect
        star.addEventListener('mouseenter', function() {
            const rating = this.dataset.rating;
            starInputs.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('hover');
                } else {
                    s.classList.remove('hover');
                }
            });
        });
    });
   
    // Review form submission
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
           
            const name = this.querySelector('input[type="text"]').value;
            const rating = ratingValue.value;
           
            if (rating == 0) {
                alert('Please select a rating');
                return;
            }
           
            alert(`Thank you ${name} for your ${rating}-star review!`);
            this.reset();
           
            // Reset stars
            starInputs.forEach(star => {
                star.classList.remove('fas', 'active');
                star.classList.add('far');
            });
            ratingValue.value = 0;
        });
    }
}

// Language Switcher
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const translations = {
        'en': {
            'hero_title': 'Your Complete Travel Solution',
            'hero_subtitle': 'Book rooms, hire guides, and rent cars all in one place',
            'book_now': 'Book Now',
            'booking_title': 'Make a Booking',
            'service_type': 'Service Type',
            'check_in': 'Check-in / Start Date',
            'check_out': 'Check-out / End Date',
            'guests': 'Guests / Persons',
            'check_availability': 'Check Availability',
            'booking_summary': 'Booking Summary',
            'confirm_booking': 'Confirm Booking',
            'our_services': 'Our Services',
            'from_price': 'From $',
            'rooms': 'Rooms & Accommodation',
            'rooms_desc': 'Comfortable rooms with all amenities. Free WiFi, breakfast included.',
            'tours': 'Tour Guides',
            'tours_desc': 'Certified local guides. Custom itineraries available.',
            'cars': 'Car Rentals',
            'cars_desc': 'Various vehicles. Insurance included. 24/7 roadside assistance.',
            'view_gallery': 'View Gallery',
            'customer_reviews': 'Customer Reviews',
            'review1': '"Excellent service! The room was clean, guide was knowledgeable, and car was perfect."',
            'review2': '"Great package deal. Everything was arranged perfectly. Will book again!"',
            'review3': '"The car rental process was smooth and the vehicle was in excellent condition."',
            'from_usa': 'From USA',
            'from_spain': 'From Spain',
            'from_france': 'From France',
            'leave_review': 'Leave a Review',
            'rating': 'Rating:',
            'submit_review': 'Submit Review',
            'contact_us': 'Contact Us',
            'address': 'Address',
            'phone': 'Phone',
            'email': 'Email',
            'hours': 'Business Hours',
            'hours_detail': 'Mon-Sun: 8:00 AM - 10:00 PM',
            'select_service': 'Select Service',
            'send_message': 'Send Message',
            'travelease': 'TravelEase',
            'footer_desc': 'Your trusted partner for complete travel solutions since 2015.',
            'quick_links': 'Quick Links',
            'home': 'Home',
            'about': 'About Us',
            'gallery': 'Gallery',
            'faq': 'FAQ',
            'terms': 'Terms',
            'services': 'Services',
            'packages': 'Packages',
            'follow_us': 'Follow Us',
            'all_rights': 'All rights reserved.',
            'privacy_policy': 'Privacy Policy',
            'terms_conditions': 'Terms & Conditions'
        },
        'es': {
            'hero_title': 'Tu Solución de Viaje Completa',
            'hero_subtitle': 'Reserva habitaciones, contrata guías y alquila coches en un solo lugar',
            'book_now': 'Reservar Ahora',
            'booking_title': 'Hacer una Reserva',
            'service_type': 'Tipo de Servicio',
            'check_in': 'Check-in / Fecha de Inicio',
            'check_out': 'Check-out / Fecha de Fin',
            'guests': 'Huéspedes / Personas',
            'check_availability': 'Verificar Disponibilidad',
            'booking_summary': 'Resumen de Reserva',
            'confirm_booking': 'Confirmar Reserva',
            'our_services': 'Nuestros Servicios',
            'from_price': 'Desde $',
            'rooms': 'Habitaciones y Alojamiento',
            'rooms_desc': 'Habitaciones cómodas con todas las comodidades. WiFi gratis, desayuno incluido.',
            'tours': 'Guías Turísticos',
            'tours_desc': 'Guías locales certificados. Itinerarios personalizados disponibles.',
            'cars': 'Alquiler de Coches',
            'cars_desc': 'Varios vehículos. Seguro incluido. Asistencia en carretera 24/7.',
            'view_gallery': 'Ver Galería',
            'customer_reviews': 'Opiniones de Clientes',
            'review1': '"¡Excelente servicio! La habitación estaba limpia, el guía era conocedor y el coche perfecto."',
            'review2': '"¡Gran oferta de paquete. Todo estuvo perfectamente organizado. ¡Reservaré de nuevo!"',
            'review3': '"El proceso de alquiler de coches fue fluido y el vehículo estaba en excelentes condiciones."',
            'from_usa': 'De EE.UU.',
            'from_spain': 'De España',
            'from_france': 'De Francia',
            'leave_review': 'Dejar una Reseña',
            'rating': 'Calificación:',
            'submit_review': 'Enviar Reseña',
            'contact_us': 'Contáctanos',
            'address': 'Dirección',
            'phone': 'Teléfono',
            'email': 'Correo Electrónico',
            'hours': 'Horario Comercial',
            'hours_detail': 'Lun-Dom: 8:00 AM - 10:00 PM',
            'select_service': 'Seleccionar Servicio',
            'send_message': 'Enviar Mensaje',
            'travelease': 'TravelEase',
            'footer_desc': 'Tu socio de confianza para soluciones de viaje completas desde 2015.',
            'quick_links': 'Enlaces Rápidos',
            'home': 'Inicio',
            'about': 'Sobre Nosotros',
            'gallery': 'Galería',
            'faq': 'Preguntas Frecuentes',
            'terms': 'Términos',
            'services': 'Servicios',
            'packages': 'Paquetes',
            'follow_us': 'Síguenos',
            'all_rights': 'Todos los derechos reservados.',
            'privacy_policy': 'Política de Privacidad',
            'terms_conditions': 'Términos y Condiciones'
        },
        'fr': {
            'hero_title': 'Votre Solution de Voyage Complète',
            'hero_subtitle': 'Réservez des chambres, engagez des guides et louez des voitures en un seul endroit',
            'book_now': 'Réserver Maintenant',
            'booking_title': 'Faire une Réservation',
            'service_type': 'Type de Service',
            'check_in': 'Check-in / Date de Début',
            'check_out': 'Check-out / Date de Fin',
            'guests': 'Invités / Personnes',
            'check_availability': 'Vérifier la Disponibilité',
            'booking_summary': 'Résumé de la Réservation',
            'confirm_booking': 'Confirmer la Réservation',
            'our_services': 'Nos Services',
            'from_price': 'À partir de $',
            'rooms': 'Chambres et Hébergement',
            'rooms_desc': 'Chambres confortables avec toutes les commodités. WiFi gratuit, petit-déjeuner inclus.',
            'tours': 'Guides Touristiques',
            'tours_desc': 'Guides locaux certifiés. Itinéraires personnalisés disponibles.',
            'cars': 'Location de Voitures',
            'cars_desc': 'Différents véhicules. Assurance incluse. Assistance routière 24/7.',
            'view_gallery': 'Voir la Galerie',
            'customer_reviews': 'Avis des Clients',
            'review1': '"Excellent service ! La chambre était propre, le guide était compétent et la voiture parfaite."',
            'review2': '"Super offre forfaitaire. Tout était parfaitement organisé. Je réserverai à nouveau !"',
            'review3': '"Le processus de location de voiture était fluide et le véhicule était en excellent état."',
            'from_usa': 'Des États-Unis',
            'from_spain': 'D\'Espagne',
            'from_france': 'De France',
            'leave_review': 'Laisser un Avis',
            'rating': 'Note :',
            'submit_review': 'Soumettre l\'Avis',
            'contact_us': 'Contactez-nous',
            'address': 'Adresse',
            'phone': 'Téléphone',
            'email': 'Email',
            'hours': 'Heures d\'Ouverture',
            'hours_detail': 'Lun-Dim : 8:00 AM - 10:00 PM',
            'select_service': 'Sélectionner un Service',
            'send_message': 'Envoyer le Message',
            'travelease': 'TravelEase',
            'footer_desc': 'Votre partenaire de confiance pour des solutions de voyage complètes depuis 2015.',
            'quick_links': 'Liens Rapides',
            'home': 'Accueil',
            'about': 'À Propos',
            'gallery': 'Galerie',
            'faq': 'FAQ',
            'terms': 'Conditions',
            'services': 'Services',
            'packages': 'Forfaits',
            'follow_us': 'Suivez-nous',
            'all_rights': 'Tous droits réservés.',
            'privacy_policy': 'Politique de Confidentialité',
            'terms_conditions': 'Conditions Générales'
        }
    };

    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.dataset.lang;
           
            // Update active button
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
           
            // Update HTML lang attribute
            document.documentElement.setAttribute('data-lang', lang);
           
            // Translate all elements
            document.querySelectorAll('.translate').forEach(element => {
                const key = element.dataset.key;
                if (translations[lang] && translations[lang][key]) {
                    element.textContent = translations[lang][key];
                   
                    // For placeholders
                    if (element.placeholder) {
                        element.placeholder = translations[lang][key];
                    }
                }
            });
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
   
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
       
        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            });
        });
    }
}

// Contact Forms
function initContactForms() {
    const forms = document.querySelectorAll('form');
   
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
           
            // Basic validation
            let isValid = true;
            const inputs = this.querySelectorAll('input[required], textarea[required], select[required]');
           
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = 'var(--accent)';
                    isValid = false;
                   
                    // Reset border color on input
                    input.addEventListener('input', function() {
                        this.style.borderColor = '';
                    });
                }
            });
           
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
               
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
               
                setTimeout(() => {
                    alert('Thank you! Your message has been sent successfully.');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });
}

// Date Pickers
function initDatePickers() {
    if (typeof flatpickr !== 'undefined') {
        flatpickr(".date-picker", {
            minDate: "today",
            dateFormat: "Y-m-d",
            disableMobile: true
        });
    }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
       
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
       
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});