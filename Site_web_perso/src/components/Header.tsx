"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [theme, setTheme] = useState("dark-theme");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Check saved theme or default to dark
    const selectedTheme = localStorage.getItem("selected-theme");
    if (selectedTheme === "light") {
      document.body.classList.add("light-theme");
      // eslint-disable-next-line
      setTheme("light-theme");
    } else {
      document.body.classList.remove("light-theme");
      setTheme("dark-theme");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark-theme") {
      document.body.classList.add("light-theme");
      setTheme("light-theme");
      localStorage.setItem("selected-theme", "light");
    } else {
      document.body.classList.remove("light-theme");
      setTheme("dark-theme");
      localStorage.setItem("selected-theme", "dark");
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu on link click
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <nav className="nav container">
        <Link href="/" className="nav__logo">
          Prestige<span className="dot">.</span>
        </Link>

        <div className={`nav__menu ${menuOpen ? "show-menu" : ""}`} id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <Link href="/#home" className="nav__link active-link" onClick={closeMenu}>
                Accueil
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/#about" className="nav__link" onClick={closeMenu}>
                La Maison
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/#services" className="nav__link" onClick={closeMenu}>
                Services
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/compare" className="nav__link" onClick={closeMenu}>
                Comparateur
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/#collection" className="nav__link" onClick={closeMenu}>
                Collection
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/#contact" className="nav__link button-link" onClick={closeMenu}>
                Nous contacter
              </Link>
            </li>
            {/* Sliding Indicator */}
            <li className="nav__indicator"></li>
          </ul>
          <div className="nav__close" id="nav-close" onClick={closeMenu}>
            ⨯
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Theme change button */}
          <button
            className="change-theme"
            id="theme-button"
            aria-label="Changer le thème"
            onClick={toggleTheme}
          >
            <svg
              className="theme-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Sun/Moon Center */}
              <mask id="moon-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <circle cx="12" cy="4" r="9" fill="black" className="moon-mask-circle" />
              </mask>
              <circle cx="12" cy="12" r="5" className="sun-core" mask="url(#moon-mask)" />

              {/* Sun Rays */}
              <g className="sun-rays">
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </g>
            </svg>
          </button>
          <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
            ☰
          </div>
        </div>
      </nav>
    </header>
  );
}
