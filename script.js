document.addEventListener('DOMContentLoaded', () => {
    // Cursor personalizado
    const cursor = document.getElementById('cursor');
    const cursorBorder = document.getElementById('cursor-border');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Función para actualizar la posición del cursor
    const updateCursorPosition = (e) => {
        gsap.to(cursor, { duration: 0.1, x: e.clientX, y: e.clientY });
        gsap.to(cursorBorder, { duration: 0.5, x: e.clientX - 20, y: e.clientY - 20 });
    };

    // Evento para actualizar la posición del cursor
    document.addEventListener('mousemove', updateCursorPosition);

    // Eventos para cambiar el tamaño del borde del cursor al hacer clic
    document.addEventListener('mousedown', () => {
        gsap.to(cursorBorder, { duration: 0.5, scale: 0.7 });
    });

    document.addEventListener('mouseup', () => {
        gsap.to(cursorBorder, { duration: 0.5, scale: 1 });
    });

    // Funciones para cambiar el estilo del cursor al pasar sobre elementos interactivos
    const handleLinkHover = () => {
        gsap.to(cursorBorder, { duration: 0.3, scale: 1.5 });
    };

    const handleLinkHoverOut = () => {
        gsap.to(cursorBorder, { duration: 0.3, scale: 1 });
    };

    // Aplicar efecto de hover a todos los enlaces y botones
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', handleLinkHover);
        el.addEventListener('mouseleave', handleLinkHoverOut);
    });

    // Efecto de scroll para las secciones
    const parallaxSections = document.querySelectorAll('.parallax-section');
    if (parallaxSections.length > 0) {
        window.addEventListener('scroll', () => {
            parallaxSections.forEach((section) => {
                // Efecto de desplazamiento del fondo
                const speed = 0.3; // Velocidad del efecto
                const offset = window.pageYOffset * speed;
                section.style.backgroundPositionY = offset + 'px';
            });
        });
    }

    // Contact form submission
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission behavior

            // Get form input values
            const name = document.querySelector('#name').value.trim();
            const email = document.querySelector('#email').value.trim();
            const message = document.querySelector('#message').value.trim();

            // Basic validation
            if (name === '' || email === '' || message === '') {
                alert('Please fill out all fields.');
                return;
            }

            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission (for demo purposes)
            alert('Form submitted successfully!');
            
            // Optionally, clear the form fields
            contactForm.reset();
        });

        // Email validation function
        function validateEmail(email) {
            const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return re.test(String(email).toLowerCase());
        }
    }

    // Menu hamburguesa
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

// Animaciones para la página de Información
if (document.querySelector('.info-content')) {
    gsap.registerPlugin(ScrollTrigger);

    // Animación de entrada para los bloques de información
    gsap.utils.toArray('.info-block').forEach((block, index) => {
        gsap.from(block, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: block,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Efecto de hover
        block.addEventListener('mouseenter', () => {
            gsap.to(block, {
                y: -10,
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        block.addEventListener('mouseleave', () => {
            gsap.to(block, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Animación para los iconos
    gsap.utils.toArray('.info-block .icon').forEach((icon) => {
        gsap.from(icon, {
            scale: 0,
            rotation: 180,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: icon,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animación para los números
    gsap.utils.toArray('.info-block h2').forEach((number) => {
        gsap.from(number, {
            textContent: 0,
            duration: 2,
            ease: "power1.inOut",
            snap: { textContent: 1 },
            stagger: 1,
            scrollTrigger: {
                trigger: number,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
            }
        });
    });

    // Animación para los subtítulos y párrafos
    gsap.utils.toArray('.info-block h3, .info-block p').forEach((element) => {
        gsap.from(element, {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}
});


// JavaScript para mostrar y ocultar la sección emergente
document.querySelectorAll('.info-button').forEach(button => {
    button.addEventListener('click', () => {
        const target = document.getElementById(button.getAttribute('data-target'));
        target.style.display = 'flex';
    });
});

document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.info-popup').style.display = 'none';
    });
});



