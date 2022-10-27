import Image from 'next/image';
import Header from '../Header/Header';
import {
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBContainer,
} from 'mdbreact';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from './LandingPage.module.css';
import cls from 'classnames';

const LandingPage = () => {
  return (
    <div>
      <MDBContainer className={styles.carouselContainer}>
        <MDBCarousel
          activeItem={1}
          length={4}
          showIndicators={true}
          className="z-depth-1"
        >
          <MDBCarouselInner>
            <MDBCarouselItem itemId="1">
              <MDBView>
                <Image
                  className={styles.carouselImage}
                  src="/images/banner-images/appointment-banner.png"
                  alt="First slide"
                  width={1500}
                  height={670}
                />
                <MDBMask overlay="black-strong" />
              </MDBView>
              <MDBCarouselCaption>
                <Container className={styles.bannerTextAlign}>
                  <h3 className={styles.h3Responsive}>Book Appointment</h3>
                  <p className={styles.helpDesc}>
                    Your virtual health advisor in your preferred time zone.
                  </p>
                </Container>
              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="2">
              <MDBView>
                <Image
                  className={styles.carouselImage}
                  src="/images/banner-images/global-connection.jpg"
                  alt="Second slide"
                  width={1500}
                  height={670}
                />
                <MDBMask overlay="black-strong" />
              </MDBView>
              <MDBCarouselCaption>
                <Container className={styles.bannerTextAlign}>
                  <h3 className={styles.h3Responsive}>
                    Connect with our Global Wellness Experts Virtually
                  </h3>
                  <p className={styles.helpDesc}>
                    Our specialties include mental health, nutrition, sleep
                    health, immunity, fitness, and much more.
                  </p>
                </Container>
              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="3">
              <MDBView>
                <Image
                  className={styles.carouselImage}
                  src="/images/banner-images/take-charge.jpg"
                  alt="Third slide"
                  width={1500}
                  height={670}
                />
                <MDBMask overlay="black-slight" />
              </MDBView>
              <MDBCarouselCaption>
                <Container className={styles.bannerTextAlign}>
                  <h3 className={styles.textPrimaryClr}>
                    Take Charge of your Health
                  </h3>
                  <p className={styles.textPrimaryClrPara}>
                    Get your personalized wellness plan to prevent and manage
                    possible future diseases.
                  </p>
                </Container>
              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="4">
              <MDBView>
                <Image
                  className={styles.carouselImage}
                  src="/images/banner-images/empower.jpg"
                  alt="Third slide"
                  width={1500}
                  height={670}
                />
                <MDBMask overlay="black-slight" />
              </MDBView>
              <MDBCarouselCaption>
                <Container className={styles.bannerTextAlign}>
                  <h3 className={styles.h3Responsive}>
                    We empower you to become a better version of yourself.
                  </h3>
                </Container>
              </MDBCarouselCaption>
            </MDBCarouselItem>
          </MDBCarouselInner>
        </MDBCarousel>
      </MDBContainer>
    </div>
  );
};

export default LandingPage;
