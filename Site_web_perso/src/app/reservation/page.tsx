"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { carsData } from "@/data/cars";

function ReservationContent() {
  const searchParams = useSearchParams();
  const carId = searchParams.get("car");
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const car = carId && carsData[carId] ? carsData[carId] : null;

  // Calendar Logic
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  let startDay = firstDay.getDay() - 1;
  if (startDay === -1) startDay = 6;

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day: number, isBooked: boolean) => {
    if (isBooked) return;
    const formattedDate = `${day} ${monthNames[month]} ${year}`;
    setSelectedDate(formattedDate);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("booking-form")?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAlert(true);
  };

  const confirmReservation = () => {
    // Actually submit form programmatically
    (document.getElementById("booking-form") as HTMLFormElement).submit();
  };

  return (
    <>
      <section className="section reservation" id="reservation">
        <div className="container grid reservation__container">
          {/* Recap Véhicule */}
          <div className="reservation__summary glass-effect">
            <h2 className="section__title" style={{ textAlign: "left", marginBottom: "1rem" }}>
              Votre Sélection
            </h2>
            <div className="reservation__car-preview">
              <img id="res-car-img" src={car?.img || ""} alt="Véhicule sélectionné" className="reservation__img" />
            </div>
            <h3 className="reservation__car-title" id="res-car-title">
              {car?.title || "Sélection inconnue"}
            </h3>
            <p className="reservation__car-price" id="res-car-price">
              {car?.price || "-- €"}
            </p>
          </div>

          {/* Calendrier */}
          <div className="reservation__calendar-box glass-effect">
            <h2 className="section__title" style={{ textAlign: "left", marginBottom: "1rem" }}>
              Disponibilités
            </h2>

            <div className="calendar">
              <div className="calendar__header">
                <button className="calendar__nav" onClick={handlePrevMonth}>&lt;</button>
                <h3 className="calendar__month" id="calendar-month">
                  {monthNames[month]} {year}
                </h3>
                <button className="calendar__nav" onClick={handleNextMonth}>&gt;</button>
              </div>

              <div className="calendar__weekdays">
                <div>Lu</div>
                <div>Ma</div>
                <div>Me</div>
                <div>Je</div>
                <div>Ve</div>
                <div>Sa</div>
                <div>Di</div>
              </div>

              <div className="calendar__days" id="calendar-days">
                {Array.from({ length: startDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="calendar__day empty"></div>
                ))}
                
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const today = new Date();
                  const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                  
                  // Same pseudo-random booking logic based on JS
                  const isBooked = (day + month) % 7 === 0 || (day * month) % 9 === 0;
                  const formattedCheck = `${day} ${monthNames[month]} ${year}`;
                  const isSelected = selectedDate === formattedCheck;

                  let classNames = "calendar__day";
                  if (isToday) classNames += " today";
                  if (isSelected) classNames += " selected";
                  if (isBooked) classNames += " booked";

                  return (
                    <div
                      key={day}
                      className={classNames}
                      title={isBooked ? "Indisponible" : ""}
                      onClick={() => handleDayClick(day, isBooked)}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="reservation__legend">
              <div className="legend__item">
                <span className="legend__color available"></span> Disponible
              </div>
              <div className="legend__item">
                <span className="legend__color booked"></span> Réservé
              </div>
              <div className="legend__item">
                <span className="legend__color selected"></span> Sélectionné
              </div>
            </div>

            <form
              className={`reservation__form ${!showForm ? "hidden" : ""}`}
              id="booking-form"
              action="/api/reservation"
              method="POST"
              onSubmit={handleSubmit}
              style={{ display: showForm ? "block" : "none" }}
            >
              <h4 className="form__title">Confirmer la date</h4>

              {/* Hidden fields to pass data */}
              <input type="hidden" name="car_model" value={carId || "Inconnu"} />

              <div className="form__group">
                <label>Date sélectionnée</label>
                <input
                  type="text"
                  name="date"
                  id="selected-date"
                  readOnly
                  className="form__input"
                  value={selectedDate || ""}
                />
              </div>
              <div className="form__group">
                <label>Email</label>
                <input type="email" name="email" placeholder="votre@email.com" className="form__input" required />
              </div>
              <button type="submit" className="button button--flex" style={{ width: "100%", marginTop: "1rem" }}>
                Confirmer la demande
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Custom Alert Dialog for Reservation Confirmation */}
      {showAlert && (
        <div id="reservation-alert" className="alert-overlay">
          <div className="alert-content">
            <div className="alert-header">
              <h3 className="alert-title">Confirmer la réservation</h3>
              <p className="alert-description">
                Êtes-vous sûr de vouloir confirmer cette réservation pour le <span id="alert-date-display">{selectedDate}</span> ?
                <br />Un email de confirmation vous sera envoyé.
              </p>
            </div>
            <div className="alert-footer">
              <button 
                id="alert-cancel" 
                className="alert-button alert-cancel"
                onClick={() => setShowAlert(false)}
              >
                Annuler
              </button>
              <button 
                id="alert-confirm" 
                className="alert-button alert-confirm"
                onClick={confirmReservation}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ReservationPage() {
  return (
    <main className="main">
      <Suspense fallback={<div>Loading...</div>}>
        <ReservationContent />
      </Suspense>
    </main>
  );
}
