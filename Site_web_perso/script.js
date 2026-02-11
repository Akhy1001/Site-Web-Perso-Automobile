/* MENU SHOW Y HIDDEN */
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* MENU SHOW */
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/* MENU HIDDEN */
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/* REMOVE MENU MOBILE */
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* HIGHLIGHT LINK ON SCROLL */
const sections = document.querySelectorAll('section[id]')

/* =========================================
   ANIMATED MENU INDICATOR
   ========================================= */
const indicator = document.querySelector('.nav__indicator');
const navList = document.querySelector('.nav__list');

function moveIndicator(element) {
    if (!indicator || !element || !navList) return;

    // We calculate position relative to the UL parent
    // Use getBoundingClientRect for precision across nested elements
    const parentRect = navList.getBoundingClientRect();
    const elRect = element.getBoundingClientRect();

    // Calculate relative position
    const left = elRect.left - parentRect.left;
    const top = elRect.top - parentRect.top;

    // Apply styles
    indicator.style.width = `${elRect.width}px`;
    indicator.style.height = `${elRect.height}px`; // Match height (pill shape)
    indicator.style.transform = `translate(${left}px, ${top}px)`;
    indicator.style.opacity = '1';
}

// Reset to active link
function resetIndicator() {
    const activeLink = document.querySelector('.nav__link.active-link');
    if (activeLink) {
        moveIndicator(activeLink);
    } else {
        // If no active link, hide indicator
        if (indicator) indicator.style.opacity = '0';
    }
}

// Event Listeners for Hover
const navLinksDesktop = document.querySelectorAll('.nav__link');
navLinksDesktop.forEach(link => {
    link.addEventListener('mouseenter', () => moveIndicator(link));
});

if (navList) {
    navList.addEventListener('mouseleave', resetIndicator);
}

// Update on Resize
window.addEventListener('resize', resetIndicator);

// Initial call
setTimeout(resetIndicator, 100); // Small delay to ensure layout reflow

// --- SCROLL ACTIVE UPDATE ---

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        // Check if link exists before accessing classList
        const link = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remove active from all first (optional, but good for cleanup)
                // Actually existing code just adds/removes based on condition
                // But we need to know if it CHANGED to animate the indicator

                if (!link.classList.contains('active-link')) {
                    // It's a new active link
                    document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active-link'));
                    link.classList.add('active-link');
                    moveIndicator(link);
                }
            } else {
                // We don't remove blindly, because we want ONE active at a time usually
                // But the logic above might leave multiple active if sections overlap?
                // Standard scroll spy usually handles "one active".
                // Existing logic:
                // if inside -> add active
                // else -> remove active
                // This means if we are OUTSIDE, we remove.

                // Refinining logic for single active:
                // The loop runs for ALL sections.
                // If we are NOT in the section, we remove active-link.
                link.classList.remove('active-link')
            }
        }
    })

    // Safety: If no link is active, or if logic needs sync
    // The loop above might cause flicker if we are between sections?
    // Let's rely on the fact that one will be added.
    // But we need to ensure ResetToActive works if the mouse is NOT hovering.

    // If user is hovering, we shouldn't force indicator away? 
    // Actually, usually scroll spy updates indicator even if hovering? 
    // Let's assume scroll priority is fine, or simple reset.
    // If hover is active, maybe we don't move? 
    // For now, let's keep it simple: scroll updates active-link. 
    // If not hovering, we want indicator to be at active-link.
    // resetIndicator() uses active-link.

    // We can call resetIndicator() at the end of scrollActive if NOT hovering?
    // Or just let it be.

    // Actually, the loop modifies classList. 
    // After the loop, the active-link is set correctly.
    // We should sync indicator to it.
    resetIndicator();
}
window.addEventListener('scroll', scrollActive)

/* =========================================
   SHOW SCROLL UP
   ========================================= */
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 350 viewport height, add the show-scroll class
    if (this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/* =========================================
   LIGHT/DARK THEME
   ========================================= */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'light-theme' // we add this class for light theme

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'light' : 'dark'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
    document.body.classList[selectedTheme === 'light' ? 'add' : 'remove'](darkTheme)
}

// Activate / deactivate the theme manually with the button
if (themeButton) {
    themeButton.addEventListener('click', () => {
        // Add or remove the light / dark icon
        document.body.classList.toggle(darkTheme)

        // We save the theme and the current icon that the user chose
        localStorage.setItem('selected-theme', getCurrentTheme())
    })
}

/* =========================================
   SCROLL REVEAL ANIMATION
   ========================================= */
const sr = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active-reveal');
        }
    });
});

const revealElements = document.querySelectorAll('.reveal, .reveal-right');
revealElements.forEach((el) => sr.observe(el));



/* =========================================
   PRODUCT DETAIL LOGIC
   ========================================= */

// DATABASE
const carsData = {
    'porsche': {
        title: "Porsche 911 GT3 RS",
        price: "295 000 €",
        desc: "L'incarnation ultime de la performance sur circuit homologuée pour la route. Avec son aileron massif, son aérodynamisme actif et son moteur atmosphérique de 4.0 litres, elle offre des sensations de pilotage inégalées. Finition argent GT métallisé.",
        engine: "4.0L Flat-6 Atmo",
        power: "518 ch",
        accel: "3.2 sec",
        year: "2023",
        img: "assets/img/porsche.png",
        consumption: "13.4 L/100km",
        trunk: "132 L",
        features: ["Pack Weissach", "Arceau Carbone", "PCCB (Céramique)", "Lift System"]
    },
    'ferrari': {
        title: "Ferrari F8 Tributo",
        price: "260 000 €",
        desc: "Un hommage au moteur V8 le plus puissant de l'histoire de Ferrari. Design sculpté par le vent, sonorité envoûtante et performances extrêmes. Cette F8 Tributo en Rouge Corsa est une véritable œuvre d'art italienne.",
        engine: "3.9L V8 Twin-Turbo",
        power: "710 ch",
        accel: "2.9 sec",
        year: "2022",
        img: "assets/img/ferrari.png",
        consumption: "12.9 L/100km",
        trunk: "200 L",
        features: ["Écussons d'ailes", "Volant Carbone LED", "Caméra 360°", "Sièges Racing"]
    },
    'lamborghini': {
        title: "Lamborghini Huracán Evo",
        price: "245 000 €",
        desc: "L'évolution du V10 iconique. Avec ses roues arrière directrices et son système LDVI (Lamborghini Dinamica Veicolo Integrata), la Huracán Evo anticipe vos moindres désirs. Configuration Noir Mat agressive et élégante.",
        engine: "5.2L V10 Atmo",
        power: "640 ch",
        accel: "2.9 sec",
        year: "2021",
        img: "assets/img/lamborghini.png",
        consumption: "13.9 L/100km",
        trunk: "100 L",
        features: ["Style Package", "Jantes Aesir 20\"", "Lift System", "Sensonum Audio"]
    },
    'mclaren': {
        title: "McLaren 720S",
        price: "280 000 €",
        desc: "Une supercar redéfinissant les limites. Structure en fibre de carbone Monocage II, aérodynamisme actif et portes en élytre. La 720S allie une légèreté extrême à une puissance brute pour une expérience de conduite télépathique.",
        engine: "4.0L V8 Twin-Turbo",
        power: "720 ch",
        accel: "2.9 sec",
        year: "2021",
        img: "assets/img/mclaren.png",
        consumption: "12.2 L/100km",
        trunk: "150 L (Av) + 210 L (Ar)",
        features: ["Pack Performance", "Échappement Sport", "Gorilla Glass", "Télémétrie"]
    },
    'aston': {
        title: "Aston Martin DBS Superleggera",
        price: "315 000 €",
        desc: "Le summum de l'élégance britannique brute. Sous ses lignes sculpturales se cache un V12 biturbo monumental délivrant un couple inépuisable. Une Grand Tourisme ultra-rapide, luxueuse et intimidante.",
        engine: "5.2L V12 Twin-Turbo",
        power: "725 ch",
        accel: "3.4 sec",
        year: "2022",
        img: "assets/img/aston.png",
        consumption: "14.0 L/100km",
        trunk: "270 L",
        features: ["Audio Bang & Olufsen", "Sièges Ventilés", "Parapluie Intégré", "Pack Carbone"]
    },
    'audi': {
        title: "Audi R8 V10 Performance",
        price: "195 000 €",
        desc: "La dernière de son espèce. Avec son fabuleux V10 atmosphérique hurlant jusqu'à 8700 tr/min et sa transmission intégrale Quattro, la R8 offre une polyvalence rare dans le monde des supercars, sans sacrifier l'émotion.",
        engine: "5.2L V10 Atmo",
        power: "620 ch",
        accel: "3.1 sec",
        year: "2023",
        img: "assets/img/audi.png",
        consumption: "13.1 L/100km",
        trunk: "112 L",
        features: ["Pack Dynamique", "Freins Céramique", "Phares Laser", "Bang & Olufsen"]
    },
    'bugatti': {
        title: "Bugatti Chiron Pur Sport",
        price: "3 800 000 €",
        desc: "L'apex de l'ingénierie automobile. Conçue pour mordre l'asphalte, la Pur Sport allie le monumental W16 à une agilité défiant la physique. Une œuvre d'art capable de dépasser 400 km/h.",
        engine: "8.0L W16 Quad-Turbo",
        power: "1500 ch",
        accel: "2.3 sec",
        year: "2023",
        img: "assets/img/bugatti.png",
        consumption: "22.5 L/100km",
        trunk: "44 L",
        features: ["Carbone Bleu Royal", "Aileron Fixe 1.90m", "Jantes Magnésium", "Pneus Cup 2 R"]
    },
    'rolls': {
        title: "Rolls-Royce Phantom",
        price: "550 000 €",
        desc: "Le silence absolu. La Phantom n'est pas une voiture, c'est un sanctuaire mobile. Chaque détail est une célébration de l'artisanat d'exception et du confort suprême.",
        engine: "6.75L V12 Twin-Turbo",
        power: "571 ch",
        accel: "5.3 sec",
        year: "2024",
        img: "assets/img/rolls.png",
        consumption: "15.5 L/100km",
        trunk: "548 L",
        features: ["Ciel Étoilé", "Portes Antagonistes", "Gallery sur mesure", "Suspension Tapis Volant"]
    },
    'bentley': {
        title: "Bentley Continental GT Speed",
        price: "320 000 €",
        desc: "La Grand Tourisme par excellence. Alliant une puissance phénoménale à un luxe artisanal, la GT Speed est capable de traverser les continents à des vitesses inavouables dans un confort total.",
        engine: "6.0L W12 Twin-Turbo",
        power: "659 ch",
        accel: "3.6 sec",
        year: "2023",
        img: "assets/img/bentley.png",
        consumption: "13.7 L/100km",
        trunk: "358 L",
        features: ["Rotating Display", "Cuir Diamant", "4 Roues Directrices", "Naim Audio"]
    },
    'mercedes': {
        title: "Mercedes-AMG GT Black Series",
        price: "400 000 €",
        desc: "La bête de l'enfer vert. Avec son aérodynamisme actif dérivé de la GT3 et son V8 vilebrequin à plat, c'est la Mercedes de série la plus extrême jamais produite.",
        engine: "4.0L V8 Bi-Turbo",
        power: "730 ch",
        accel: "3.2 sec",
        year: "2023",
        img: "assets/img/mercedes.png",
        consumption: "12.8 L/100km",
        trunk: "Unknown",
        features: ["Aéro Actif", "Pack Track", "Carbone Apparent", "Pneus Cup 2 R"]
    },
    'pagani': {
        title: "Pagani Huayra Roadster",
        price: "3 500 000 €",
        desc: "L'art en mouvement. Plus légère que le coupé, cette sculpture de carbone et de titane célèbre la complexité mécanique et la beauté pure. Moteur V12 AMG fabriqué à la main spécifiquement pour Pagani.",
        engine: "6.0L V12 Twin-Turbo",
        power: "764 ch",
        accel: "2.8 sec",
        year: "2022",
        img: "assets/img/pagani.png",
        consumption: "15.0 L/100km",
        trunk: "Set de bagages",
        features: ["Carbo-Titane", "Toit Carbone", "Intérieur Sur-Mesure", "Échappement Titane"]
    },
    'koenigsegg': {
        title: "Koenigsegg Jesko",
        price: "3 000 000 €",
        desc: "La mégacar ultime. Nommée en l'honneur du père du fondateur, la Jesko repousse les limites de la physique avec sa transmission LST à 9 rapports et son appui aérodynamique colossal.",
        engine: "5.0L V8 Twin-Turbo",
        power: "1600 ch (E85)",
        accel: "2.5 sec",
        year: "2024",
        img: "assets/img/koenigsegg.png",
        consumption: "20.0 L/100km",
        trunk: "Petit",
        features: ["Transmission LST", "Portes Dihedral", "Autoskin", "Triplex Suspension"]
    }
};

// LOAD CONTENT
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the product page by looking for spec elements
    const productTitle = document.getElementById('product-title');

    if (productTitle) {
        // Get URL param ?car=...
        const urlParams = new URLSearchParams(window.location.search);
        const carId = urlParams.get('car');

        if (carId && carsData[carId]) {
            const data = carsData[carId];

            // Inject Data
            document.title = `${data.title} | Prestige Motors`;
            document.getElementById('product-title').textContent = data.title;

            // Robust way to get price element even if ID was class in CSS
            const priceEl = document.getElementById('product-price') || document.querySelector('.product__price');
            if (priceEl) priceEl.textContent = data.price;

            document.getElementById('product-desc').textContent = data.desc;
            document.getElementById('product-img').src = data.img;

            // Specs
            document.getElementById('spec-engine').textContent = data.engine;
            document.getElementById('spec-power').textContent = data.power;
            document.getElementById('spec-accel').textContent = data.accel;
            document.getElementById('spec-year').textContent = data.year;

            // Update Reservation Button Link
            const reserveBtn = document.getElementById('reserve-btn');
            if (reserveBtn) {
                reserveBtn.href = `reservation.html?car=${carId}`;
            }

        } else {
            // Handle error or invalid car
            document.getElementById('product-title').textContent = "Véhicule introuvable";
            document.getElementById('product-desc').textContent = "Le véhicule demandé n'est pas disponible ou l'URL est incorrecte.";
            const actions = document.querySelector('.product__actions');
            if (actions) actions.style.display = 'none';
        }
    }
});

/* =========================================
   ACCORDION LOGIC
   ========================================= */
const accordionItems = document.querySelectorAll('.accordion__item');

accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion__header');

    header.addEventListener('click', () => {
        const isOpen = item.classList.contains('accordion__open');

        // Close all other items (optional, but standard for accordion)
        accordionItems.forEach((otherItem) => {
            if (otherItem !== item) {
                otherItem.classList.remove('accordion__open');
                otherItem.querySelector('.accordion__content').style.height = '0px';
            }
        });

        // Toggle current item
        if (isOpen) {
            item.classList.remove('accordion__open');
            item.querySelector('.accordion__content').style.height = '0px';
        } else {
            item.classList.add('accordion__open');
            const content = item.querySelector('.accordion__content');
            content.style.height = content.scrollHeight + 'px';
        }
    });
});

/* =========================================
   FORM FEEDBACK (URL Params)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    if (status === 'success') {
        alert("Votre demande a bien été envoyée ! Nous vous répondrons dans les plus brefs délais.");
        // Optional: Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
    } else if (status === 'error') {
        alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
    }
});
