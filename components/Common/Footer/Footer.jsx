import Link from 'next/link';
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.css';
import cls from 'classnames';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Newsletter from './Newsletter';

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer}>
        <Container className={cls('p-0', styles.paddingMobile)}>
          <Row className="align-items-center">
            <Col md={3} lg={2} xl={2}>
              <Link href="/#about-us" className={styles.footerLink}>
                About us
              </Link>
              <Link href="/#how-it-work" className={styles.footerLink}>
                How it Works
              </Link>
              <Link href="/#our-service" className={styles.footerLink}>
                Our services
              </Link>
              <Link
                href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&href=info@healthieru.ae"
                className={styles.footerLink}
              >
                Contact Us
              </Link>
            </Col>
            <Col
              md={9}
              lg={6}
              xl={6}
              style={{ display: 'flex', height: 135, alignItems: 'center' }}
            >
              <div style={{ width: '100%' }}>
                <Newsletter />
              </div>
            </Col>
            <Col md={12} lg={4} xl={4} className={styles.lastCol}>
              <h4 className={styles.footerWellnessHeading}>
                Wellness Optimized
              </h4>
              <p className={styles.downloadStatement}>
                Unlock your health data and get instant insights
                <br />
                Download the HealthierU app today
              </p>
              <div className={styles.footerStoreIcons}>
                <Image
                  src="/images/icons/appstore.png"
                  alt=""
                  // id="store-icon"
                  className={cls(
                    styles.storeIcon,
                    styles.storeIcon_marginRight,
                    styles.imageMobileRespv
                  )}
                  width={150}
                  height={50}
                />

                <Image
                  src="/images/icons/googleplay.png"
                  alt=""
                  // id="store-icon"
                  width={150}
                  height={50}
                  className={styles.storeIcon}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={styles.copyright}>
        <Container className="p-0 padding-mobile">
          <Row>
            <Col md={8}>
              <div className={styles.termsContainer}>
                <Link
                  href="/static/privacy-policy"
                  className={styles.copyrightLinks}
                >
                  Privacy and Security
                </Link>
                <Link
                  href="/static/terms-and-conditions"
                  className={styles.copyrightLinks}
                >
                  Terms and Conditions
                </Link>
                <Link
                  href="/static/help-and-support"
                  className={styles.copyrightLinks}
                >
                  Help and Support
                </Link>
                <Link href="/static/faq-page" className={styles.copyrightLinks}>
                  FAQ
                </Link>
              </div>
              <p className={styles.copyrightText}>
                © 2021 <Link href="/">HealthierU</Link> - All Rights Reserved.
              </p>
            </Col>
            <Col className={styles.lastCol}>
              <div className={styles.socialIcon}>
                <Link
                  href="https://www.facebook.com/HealthierU-109526728064645"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footIcon}
                >
                  <Image
                    src="/images/icons/facebook.png"
                    width={40}
                    height={40}
                    alt=""
                  />
                </Link>
                <Link
                  href="https://twitter.com/healthierU_ae?s=08"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footIcon}
                >
                  <Image
                    src="/images/icons/twitter.png"
                    width={40}
                    height={40}
                    alt=""
                  />
                </Link>
                <Link
                  href="https://www.instagram.com/healthieru_ae/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footIcon}
                >
                  <Image
                    src="/images/icons/instagram.png"
                    width={40}
                    height={40}
                    alt=""
                  />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/healthieruae/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footIcon}
                >
                  <LinkedInIcon />
                </Link>
                <Link
                  href="https://www.youtube.com/channel/UCRAOeEpbC3sekMbOWgdTTPQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footIcon}
                >
                  <YouTubeIcon color="primary" />
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
