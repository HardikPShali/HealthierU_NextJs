import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import cls from 'classnames';

const Header = ({ hideButton }) => {
  return (
    <div className={styles.navigation_main_wrapper}>
      <div className={styles.web_navigation_wrapper}>
        <Navbar
          variant="dark"
          id="navbar"
          sticky="top"
          className={styles.nav_navbar}
        >
          <div className={styles.web_navigation_main}>
            <Container className={styles.web_navigation_content}>
              <Link href="/">
                <Image
                  className="header_logo-image"
                  src="/images/logo/logo-with-quote.png"
                  id="icon"
                  alt="HealthierU Logo"
                  width={190}
                  height={50}
                />
              </Link>
              <Nav>
                {!hideButton && (
                  <div>
                    <div className={styles.navMenuWrapper}>
                      <div className={styles.navMenuContainer}>
                        <ul className={styles.navMenuUl}>
                          <li>
                            <Link href="/#about-us">About Us</Link>
                          </li>
                          <li>
                            <Link href="/#how-it-work">How It Works</Link>
                          </li>
                          <li>
                            <Link href="/#our-service">Our Services</Link>
                          </li>
                        </ul>
                      </div>
                      <Link href="/signin">
                        <button className={cls('btn', styles.btnSignUp)}>
                          Sign in / Join Now
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </Nav>
            </Container>
          </div>
        </Navbar>
      </div>
      <div className={styles.mobileNavHeader}>
        <Link href="/" className={styles.mrAuto}>
          <Image
            src="/images/logo/logo-with-quote.png"
            id="icon"
            alt="HealthierU Logo"
            width={70}
            height={70}
          />
        </Link>
        <input className={styles.menuBtn} type="checkbox" id="menu-btn" />
        <label className={styles.menuIcon} htmlFor="menu-btn">
          <span className={styles.navicon}></span>
        </label>
        <ul className={styles.menu}>
          <li>
            <Link href="/#about-us">About Us</Link>
          </li>
          <li>
            <Link href="/#how-it-work">How It Works</Link>
          </li>
          <li>
            <Link href="/#our-service">Our Services</Link>
          </li>
          <li>
            <Link href="/#footer">Contact Us</Link>
          </li>
          <li>
            <Link href="/signin">
              <button className={cls('btn', styles.btnSignUp)}>
                Sign in / Join Now
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
