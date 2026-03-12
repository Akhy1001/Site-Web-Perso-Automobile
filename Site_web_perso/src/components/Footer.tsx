import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer__container container">
          <h1 className="footer__title">Prestige Motors</h1>
          <ul className="footer__list">
            <li>
              <Link href="/#about" className="footer__link">
                La Maison
              </Link>
            </li>
            <li>
              <Link href="/#collection" className="footer__link">
                Collection
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="footer__link">
                Contact
              </Link>
            </li>
          </ul>
          <span className="footer__copy">
            &#169; {new Date().getFullYear()} Prestige Motors. All luxury rights reserved.
          </span>
        </div>
      </footer>

      {/* SCROLL UP */}
      <Link href="/#" className="scrollup" id="scroll-up">
        <span className="scrollup__icon">↑</span>
      </Link>
    </>
  );
}
