"use client";

import { useState } from "react";
import { carsData } from "@/data/cars";

export default function ComparePage() {
  const [car1, setCar1] = useState<string>("");
  const [car2, setCar2] = useState<string>("");

  const carKeys = Object.keys(carsData);

  const getPowerPercent = (powerStr: string) => {
    const powerVal = parseInt(powerStr.replace(/\D/g, ''));
    return Math.min((powerVal / 800) * 100, 100);
  };

  const getAccelPercent = (accelStr: string) => {
    const accelVal = parseFloat(accelStr.replace(',', '.'));
    let accelPercent = 100 - ((accelVal - 2) / 3 * 100);
    if (accelPercent < 0) accelPercent = 10;
    if (accelPercent > 100) accelPercent = 100;
    return accelPercent;
  };

  return (
    <main className="main">
      <section className="section compare section__title-center" id="compare">
        <h2 className="section__title">Comparateur Visuel</h2>
        <span className="section__subtitle">Analysez. Comparez. Choisissez.</span>

        <div className="compare__container container grid">
          {/* VÉHICULE A */}
          <div className="compare__item glass-effect">
            <div className="compare__header">
              <select
                id="select-car-1"
                className="compare__select"
                value={car1}
                onChange={(e) => setCar1(e.target.value)}
              >
                <option value="" disabled>Choisir véhicule 1</option>
                {carKeys.map((key) => (
                  <option key={key} value={key}>
                    {carsData[key].title}
                  </option>
                ))}
              </select>
            </div>

            <div id="compare-result-1" className={`compare__result ${!car1 ? "hidden" : ""}`}>
              {car1 && carsData[car1] && (
                <>
                  <div className="compare__img-box">
                    <img src={carsData[car1].img} alt="" id="img-1" className="compare__img" />
                  </div>
                  <h3 className="compare__car-title" id="title-1">{carsData[car1].title}</h3>
                  <p className="compare__price highlight-text" id="price-1">{carsData[car1].price}</p>

                  <div className="compare__specs">
                    <div className="spec__row">
                      <span className="spec__label">Moteur</span>
                      <span className="spec__value" id="engine-1">{carsData[car1].engine}</span>
                    </div>

                    <div className="spec__progress-container">
                      <div className="spec__label-row">
                        <span className="spec__label">Puissance</span>
                        <span className="spec__value" id="power-1">{carsData[car1].power}</span>
                      </div>
                      <div className="progress-bg">
                        <div
                          className="progress-bar"
                          id="bar-power-1"
                          style={{ width: `${getPowerPercent(carsData[car1].power)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="spec__progress-container">
                      <div className="spec__label-row">
                        <span className="spec__label">0-100 km/h</span>
                        <span className="spec__value" id="accel-1">{carsData[car1].accel}</span>
                      </div>
                      <div className="progress-bg">
                        <div
                          className="progress-bar progress-bar--accel"
                          id="bar-accel-1"
                          style={{ width: `${getAccelPercent(carsData[car1].accel)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="spec__row">
                      <span className="spec__label">Conso. Mixte</span>
                      <span className="spec__value" id="conso-1">{carsData[car1].consumption}</span>
                    </div>
                    <div className="spec__row">
                      <span className="spec__label">Coffre</span>
                      <span className="spec__value" id="trunk-1">{carsData[car1].trunk}</span>
                    </div>
                  </div>

                  <div className="compare__features">
                    <h4 className="compare__features-title">Équipements Clés</h4>
                    <ul className="compare__features-list" id="features-1">
                      {carsData[car1].features.map((feat, i) => (
                        <li key={i}>✓ {feat}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* VS SEPARATOR */}
          <div className="compare__vs">
            <div className="vs-badge">VS</div>
          </div>

          {/* VÉHICULE B */}
          <div className="compare__item glass-effect">
            <div className="compare__header">
              <select
                id="select-car-2"
                className="compare__select"
                value={car2}
                onChange={(e) => setCar2(e.target.value)}
              >
                <option value="" disabled>Choisir véhicule 2</option>
                {carKeys.map((key) => (
                  <option key={key} value={key}>
                    {carsData[key].title}
                  </option>
                ))}
              </select>
            </div>

            <div id="compare-result-2" className={`compare__result ${!car2 ? "hidden" : ""}`}>
              {car2 && carsData[car2] && (
                <>
                  <div className="compare__img-box">
                    <img src={carsData[car2].img} alt="" id="img-2" className="compare__img" />
                  </div>
                  <h3 className="compare__car-title" id="title-2">{carsData[car2].title}</h3>
                  <p className="compare__price highlight-text" id="price-2">{carsData[car2].price}</p>

                  <div className="compare__specs">
                    <div className="spec__row">
                      <span className="spec__label">Moteur</span>
                      <span className="spec__value" id="engine-2">{carsData[car2].engine}</span>
                    </div>

                    <div className="spec__progress-container">
                      <div className="spec__label-row">
                        <span className="spec__label">Puissance</span>
                        <span className="spec__value" id="power-2">{carsData[car2].power}</span>
                      </div>
                      <div className="progress-bg">
                        <div
                          className="progress-bar"
                          id="bar-power-2"
                          style={{ width: `${getPowerPercent(carsData[car2].power)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="spec__progress-container">
                      <div className="spec__label-row">
                        <span className="spec__label">0-100 km/h</span>
                        <span className="spec__value" id="accel-2">{carsData[car2].accel}</span>
                      </div>
                      <div className="progress-bg">
                        <div
                          className="progress-bar progress-bar--accel"
                          id="bar-accel-2"
                          style={{ width: `${getAccelPercent(carsData[car2].accel)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="spec__row">
                      <span className="spec__label">Conso. Mixte</span>
                      <span className="spec__value" id="conso-2">{carsData[car2].consumption}</span>
                    </div>
                    <div className="spec__row">
                      <span className="spec__label">Coffre</span>
                      <span className="spec__value" id="trunk-2">{carsData[car2].trunk}</span>
                    </div>
                  </div>

                  <div className="compare__features">
                    <h4 className="compare__features-title">Équipements Clés</h4>
                    <ul className="compare__features-list" id="features-2">
                      {carsData[car2].features.map((feat, i) => (
                        <li key={i}>✓ {feat}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
