
/* RESERVATION JS */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Car Info from URL
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('car');

    // Database of cars (Simulated - aligned with script.js)
    const cars = {
        'porsche': {
            title: 'Porsche 911 GT3 RS',
            price: '280 000 €',
            img: 'assets/img/porsche.png'
        },
        'ferrari': {
            title: 'Ferrari F8 Tributo',
            price: '320 000 €',
            img: 'assets/img/ferrari.png'
        },
        'lamborghini': {
            title: 'Lamborghini Huracán Evo',
            price: '290 000 €',
            img: 'assets/img/lamborghini.png'
        },
        'mclaren': {
            title: 'McLaren 720S',
            price: '310 000 €',
            img: 'assets/img/mclaren.png'
        },
        'aston': {
            title: 'Aston Martin DBS',
            price: '300 000 €',
            img: 'assets/img/aston.png'
        },
        'audi': {
            title: 'Audi R8 V10',
            price: '180 000 €',
            img: 'assets/img/audi.png'
        },
        'bugatti': {
            title: 'Bugatti Chiron',
            price: '3 200 000 €',
            img: 'assets/img/bugatti.png'
        },
        'rolls': {
            title: 'Rolls-Royce Phantom',
            price: '450 000 €',
            img: 'assets/img/rolls.png'
        },
        'bentley': {
            title: 'Bentley Continental GT',
            price: '260 000 €',
            img: 'assets/img/bentley.png'
        },
        'mercedes': {
            title: 'Mercedes-AMG GT BS',
            price: '400 000 €',
            img: 'assets/img/mercedes.png'
        },
        'pagani': {
            title: 'Pagani Huayra',
            price: '2 800 000 €',
            img: 'assets/img/pagani.png'
        },
        'koenigsegg': {
            title: 'Koenigsegg Jesko',
            price: '3 500 000 €',
            img: 'assets/img/koenigsegg.png'
        }
    };

    if (carId && cars[carId]) {
        document.getElementById('res-car-title').textContent = cars[carId].title;
        document.getElementById('res-car-price').textContent = cars[carId].price;
        document.getElementById('res-car-img').src = cars[carId].img;
    } else {
        document.getElementById('res-car-title').textContent = "Sélection inconnue";
    }

    // 2. Calendar Logic
    const calendarMonth = document.getElementById('calendar-month');
    const calendarDays = document.getElementById('calendar-days');
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
    const bookingForm = document.getElementById('booking-form');
    const selectedDateInput = document.getElementById('selected-date');

    let currentDate = new Date();

    function renderCalendar(date) {
        calendarDays.innerHTML = '';

        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();

        // Month Display
        const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        calendarMonth.textContent = `${monthNames[month]} ${year}`;

        // Empty slots for previous month
        // getDay() returns 0 for Sunday. We want Monday to be 0 for the grid loop or adjust.
        // Standard: Sun=0, Mon=1... Sat=6.
        // My grid starts with Monday. So Mon=0 in my grid logic?
        // Let's adjust: if getDay() is 0 (Sunday), it should be 6th index (7th slot).
        // if getDay() is 1 (Monday), it should be 0th index.
        let startDay = firstDay.getDay() - 1;
        if (startDay === -1) startDay = 6; // Sunday

        for (let i = 0; i < startDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add('calendar__day', 'empty');
            calendarDays.appendChild(emptyDiv);
        }

        // Days
        const today = new Date();

        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('calendar__day');
            dayDiv.textContent = i;

            // Check if it's today
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayDiv.classList.add('today');
            }

            // Randomly book some days for realism
            // Seed based on day/month so it stays consistent during session
            if ((i + month) % 7 === 0 || (i * month) % 9 === 0) {
                dayDiv.classList.add('booked');
                dayDiv.title = "Indisponible";
            } else {
                // Click event
                dayDiv.addEventListener('click', () => {
                    // Remove other selections
                    document.querySelectorAll('.calendar__day.selected').forEach(el => el.classList.remove('selected'));

                    dayDiv.classList.add('selected');

                    // Show form
                    bookingForm.classList.remove('box-hidden');
                    bookingForm.style.display = 'block';

                    // Update input
                    const formattedDate = `${i} ${monthNames[month]} ${year}`; // This assumes French format in input
                    selectedDateInput.value = formattedDate;

                    // Populate hidden car model input (from URL or fallback)
                    const carModelInput = document.getElementById('input-car-model');
                    if (carModelInput) {
                        carModelInput.value = carId || 'Inconnu';
                    }

                    // Smooth scroll to form
                    bookingForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                });
            }

            calendarDays.appendChild(dayDiv);
        }
    }

    renderCalendar(currentDate);

    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });
});
