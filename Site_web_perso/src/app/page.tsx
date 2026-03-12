"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    // Scroll reveal logic ported from vanilla JS
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

    sr.reveal('.reveal', '30px', 200);
    sr.reveal('.reveal-right', '50px', 200, 'right');
  }, []);

  return (
    <main className="main">
      {/* HOME SECTION */}
      <section className="home section" id="home">
        <div className="home__container container grid">
          <div className="home__content reveal">
            <div className="home__social">
              <Link href="#" className="home__social-icon">Rapide</Link>
              <Link href="#" className="home__social-icon">Frisson</Link>
              <Link href="#" className="home__social-icon">Exclusivité</Link>
            </div>

            <div className="home__data">
              <h1 className="home__title reveal-right">
                Conduisez <br /> <span className="highlight-text">L&apos;Exception</span>
              </h1>
              <p className="home__description reveal-right">
                Une sélection exclusive de véhicules de sport et de prestige.
                Redécouvrez le plaisir de conduire avec Prestige Motors.
              </p>
              <Link href="#collection" className="button button--flex reveal">
                Voir la collection <span className="button__icon">→</span>
              </Link>
            </div>
          </div>

          <div className="home__img-wrapper">
            <div className="abstract-shape shape-1"></div>
          </div>
        </div>

        <Link href="#collection" className="scroll-down">
          <span className="mouse">
            <span className="wheel"></span>
          </span>
          <span className="scroll-text">Découvrir</span>
        </Link>
      </section>

      {/* ABOUT SECTION */}
      <section className="about section" id="about">
        <div className="about__container container grid">
          <div className="about__img-box">
            <img 
              src="/assets/img/DSC0200-scaled.jpg" 
              alt="Showroom Prestige Motors" 
              loading="lazy"
              style={{ width: "100%", borderRadius: "0.5rem" }} 
            />
          </div>

          <div className="about__data reveal">
            <h2 className="section__title">Notre Maison <br /> d&apos;Excellence</h2>
            <p className="about__description">
              Depuis plus de 10 ans, nous sélectionnons les plus beaux véhicules du monde pour une clientèle
              exigeante. Chaque voiture est expertisée, certifiée et préparée avec le plus grand soin.
            </p>

            <div className="about__info">
              <div>
                <span className="about__info-title">12</span>
                <span className="about__info-name">Ans <br /> d&apos;Héritage</span>
              </div>
              <div>
                <span className="about__info-title">500+</span>
                <span className="about__info-name">Véhicules <br /> Livrés</span>
              </div>
              <div>
                <span className="about__info-title">99%</span>
                <span className="about__info-name">Satisfaction <br /> Client</span>
              </div>
            </div>

            <div className="about__buttons">
              <Link href="#contact" className="button button--ghost">
                Prendre Rendez-vous
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="skills section" id="services">
        <h2 className="section__title section__title-center reveal-right">Nos Services Exclusifs</h2>
        <span className="section__subtitle reveal-right">Un accompagnement sur-mesure</span>

        <div className="skills__container container grid">
          {/* Service 1 */}
          <div className="skills__content reveal">
            <h3 className="skills__title">Acquisition</h3>
            <div className="skills__box">
              <div className="skills__group">
                <div className="skills__data">
                  <h3 className="skills__name">Vente de Véhicules</h3>
                  <span className="skills__level">Stock Premium</span>
                </div>
                <div className="skills__data">
                  <h3 className="skills__name">Recherche Personnalisée</h3>
                  <span className="skills__level">Sur Inquiery</span>
                </div>
                <div className="skills__data">
                  <h3 className="skills__name">Import / Homologation</h3>
                  <span className="skills__level">Clé en main</span>
                </div>
              </div>
            </div>
          </div>

          {/* Service 2 */}
          <div className="skills__content reveal">
            <h3 className="skills__title">Services Plus</h3>
            <div className="skills__box">
              <div className="skills__group">
                <div className="skills__data">
                  <h3 className="skills__name">Financement / Leasing</h3>
                  <span className="skills__level">Sur-mesure</span>
                </div>
                <div className="skills__data">
                  <h3 className="skills__name">Conciergerie</h3>
                  <span className="skills__level">Gardiennage</span>
                </div>
                <div className="skills__data">
                  <h3 className="skills__name">Dépôt-Vente</h3>
                  <span className="skills__level">Sécurisé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION SECTION */}
      <section className="portfolio section" id="collection">
        <h2 className="section__title section__title-center reveal-right">Notre Collection</h2>
        <span className="section__subtitle reveal-right">Véhicules disponibles</span>

        <div className="portfolio__container container grid">
          {/* Cars */}
          {[
            { img: "porsche.png", name: "Porsche 911 GT3 RS", desc: "520ch - 2023 - 3500 km - Configuration unique.", slug: "porsche" },
            { img: "ferrari.png", name: "Ferrari F8 Tributo", desc: "720ch - 2022 - 7000 km - Rouge Corsa.", slug: "ferrari" },
            { img: "lamborghini.png", name: "Lamborghini Huracán Evo", desc: "640ch - 2021 - 12000 km - Noir Mat.", slug: "lamborghini" },
            { img: "mclaren.png", name: "McLaren 720S", desc: "720ch - 2021 - 4500 km - Orange Papaya.", slug: "mclaren" },
            { img: "aston.png", name: "Aston Martin DBS", desc: "725ch - 2022 - 2000 km - Vert Anglais.", slug: "aston" },
            { img: "audi.png", name: "Audi R8 V10 Perf.", desc: "620ch - 2023 - 1500 km - Blanc Ibis.", slug: "audi" },
            { img: "bugatti.png", name: "Bugatti Chiron", desc: "1500ch - 2023 - 500 km - Pur Sport.", slug: "bugatti" },
            { img: "rolls.png", name: "Rolls-Royce Phantom", desc: "571ch - 2024 - 100 km - The Best Car in the World.", slug: "rolls" },
            { img: "bentley.png", name: "Bentley Continental GT", desc: "659ch - 2023 - 2500 km - Speed Edition.", slug: "bentley" },
            { img: "mercedes.png", name: "Mercedes-AMG GT BS", desc: "730ch - 2023 - 500 km - Magma Beam.", slug: "mercedes" },
            { img: "pagani.png", name: "Pagani Huayra", desc: "764ch - 2022 - 1200 km - Carbone Bleu.", slug: "pagani" },
            { img: "koenigsegg.png", name: "Koenigsegg Jesko", desc: "1600ch - 2024 - 50 km - Absolut.", slug: "koenigsegg" }
          ].map((car) => (
            <article className="portfolio__card reveal" key={car.slug}>
              <div className="portfolio__img-wrapper">
                <img 
                  src={`/assets/img/${car.img}`} 
                  alt={car.name} 
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
              </div>
              <div className="portfolio__data">
                <h3 className="portfolio__title">{car.name}</h3>
                <p className="portfolio__description">{car.desc}</p>
                <Link href={`/product?car=${car.slug}`} className="portfolio__button">
                  Détails & Prix →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact section" id="contact">
        <h2 className="section__title section__title-center">Contact Privé</h2>
        <span className="section__subtitle">Discutons de votre acquisition</span>

        <div className="contact__container container grid">
          <div className="contact__content reveal">
            <h3 className="contact__title reveal-right">Coordonnées</h3>

            <div className="accordion">
              <div className="accordion__item">
                <header className="accordion__header">
                  <i className='bx bx-phone accordion__icon'></i>
                  <h3 className="accordion__title">Ligne Directe (VIP)</h3>
                  <div className="accordion__arrow">
                    <span className="accordion__arrow-icon">▼</span>
                  </div>
                </header>
                <div className="accordion__content">
                  <p className="accordion__description">
                    Notre service conciergerie est disponible 24/7 pour nos clients privilégiés.
                    <br /><br />
                    <span className="contact__card-data" style={{ fontWeight: 600 }}>+33 1 23 45 67 89</span>
                  </p>
                </div>
              </div>

              <div className="accordion__item">
                <header className="accordion__header">
                  <i className='bx bx-envelope accordion__icon'></i>
                  <h3 className="accordion__title">Email</h3>
                  <div className="accordion__arrow">
                    <span className="accordion__arrow-icon">▼</span>
                  </div>
                </header>
                <div className="accordion__content">
                  <p className="accordion__description">
                    Pour toute demande d&apos;information, de configuration ou de rendez-vous privé.
                    <br /><br />
                    <span className="contact__card-data">contact@prestigemotors.com</span>
                    <br /><br />
                    <Link href="mailto:contact@prestigemotors.com" className="contact__button">Envoyer un email →</Link>
                  </p>
                </div>
              </div>

              <div className="accordion__item">
                <header className="accordion__header">
                  <i className='bx bx-map accordion__icon'></i>
                  <h3 className="accordion__title">Showroom</h3>
                  <div className="accordion__arrow">
                    <span className="accordion__arrow-icon">▼</span>
                  </div>
                </header>
                <div className="accordion__content">
                  <p className="accordion__description">
                    Venez découvrir notre collection dans notre écrin parisien.
                    <br /><br />
                    <span className="contact__card-data">12 Avenue Montaigne, 75008 Paris</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact__content reveal">
            <h3 className="contact__title">Formulaire</h3>

            <form action="/api/contact" method="POST" className="contact__form">
              <div className="contact__form-div">
                <label className="contact__form-tag">Nom</label>
                <input type="text" name="name" placeholder="Votre nom" className="contact__form-input" required />
              </div>
              <div className="contact__form-div">
                <label className="contact__form-tag">Email</label>
                <input type="email" name="email" placeholder="Votre email" className="contact__form-input" required />
              </div>
              <div className="contact__form-div contact__form-area">
                <label className="contact__form-tag">Message</label>
                <textarea name="message" cols={30} rows={10} placeholder="Je suis intéressé par..." className="contact__form-input" required></textarea>
              </div>
              <button type="submit" className="button">Envoyer la demande</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
