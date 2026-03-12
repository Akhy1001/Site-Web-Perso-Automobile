"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import Link from "next/link";
import { carsData } from "@/data/cars";

function ProductContent() {
  const searchParams = useSearchParams();
  const carId = searchParams.get("car");

  useEffect(() => {
    // Scroll reveal logic
    const sr = {
      reveal: (selector: string, distance: string, delay: number, origin: string = "bottom") => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
          (el as HTMLElement).style.opacity = "0";
          (el as HTMLElement).style.transform = `translateY(${distance})`;
          if (origin === "right") {
            (el as HTMLElement).style.transform = `translateX(-${distance})`;
          } else if (origin === "left") {
            (el as HTMLElement).style.transform = `translateX(${distance})`;
          }
          
          (el as HTMLElement).style.transition = `all 0.8s ease ${delay}ms`;

          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                (entry.target as HTMLElement).style.opacity = "1";
                if (origin === "bottom" || origin === "top") {
                   (entry.target as HTMLElement).style.transform = "translateY(0)";
                } else {
                   (entry.target as HTMLElement).style.transform = "translateX(0)";
                }
                observer.unobserve(entry.target);
              }
            });
          });

          observer.observe(el);
        });
      }
    };

    // The current product page doesn't heavily use `.reveal` but just in case
    sr.reveal('.reveal', '30px', 200);
    sr.reveal('.reveal-right', '50px', 200, 'right');
  }, [carId]);

  if (!carId || !carsData[carId]) {
    return (
      <section className="section product-detail" id="product-detail">
        <div className="container grid product__container">
          <div className="product__data">
            <h1 className="product__title">Véhicule introuvable</h1>
            <p className="product__description">
              Le véhicule demandé n&apos;est pas disponible ou l&apos;URL est incorrecte.
            </p>
            <div className="product__actions">
              <Link href="/#collection" className="button button--ghost">
                Retour à la collection
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const data = carsData[carId];

  return (
    <>
      <section className="section product-detail" id="product-detail">
        <div className="container grid product__container">
          {/* Image Dynamique */}
          <div className="product__img-box">
            <img 
              id="product-img" 
              src={data.img} 
              alt={data.title} 
              className="product__img" 
            />
          </div>

          {/* Info Dynamique */}
          <div className="product__data">
            <span className="section__subtitle" style={{ textAlign: "left", marginBottom: "0.5rem" }}>
              Collection Exclusive
            </span>
            <h1 className="product__title" id="product-title">{data.title}</h1>
            <p className="product__price" id="product-price">{data.price}</p>

            <p className="product__description" id="product-desc">
              {data.desc}
            </p>

            <div className="product__specs">
              <div className="spec__item">
                <span className="spec__label">Moteur</span>
                <span className="spec__value" id="spec-engine">{data.engine}</span>
              </div>
              <div className="spec__item">
                <span className="spec__label">Puissance</span>
                <span className="spec__value" id="spec-power">{data.power}</span>
              </div>
              <div className="spec__item">
                <span className="spec__label">0-100 km/h</span>
                <span className="spec__value" id="spec-accel">{data.accel}</span>
              </div>
              <div className="spec__item">
                <span className="spec__label">Année</span>
                <span className="spec__value" id="spec-year">{data.year}</span>
              </div>
            </div>

            <div className="product__actions">
              <Link href={`/reservation?car=${carId}`} id="reserve-btn" className="button button--flex">
                Réserver ce véhicule
              </Link>
              <Link href="/#collection" className="button button--ghost">
                Retour à la collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION (Simplified) */}
      <section className="contact section" id="contact" style={{ paddingTop: "2rem" }}>
        <h2 className="section__title section__title-center">Intéressé ?</h2>
        <div className="contact__container container grid">
          <div className="contact__content" style={{ margin: "0 auto", textAlign: "center", gridColumn: "1 / -1" }}>
            <p className="contact__description" style={{ marginBottom: "2rem", color: "var(--text-color-light)" }}>
              Nos conseillers sont à votre disposition pour organiser une présentation privée.
            </p>
            <Link href="mailto:contact@prestigemotors.com" className="button">
              Contacter le service commercial
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ProductPage() {
  return (
    <main className="main">
      <Suspense fallback={<div>Loading...</div>}>
        <ProductContent />
      </Suspense>
    </main>
  );
}
