import Image from 'next/image';
import Link from 'next/link';
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
      {/* BANNER CAROUSEL */}
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
                  src="/images/landing-images/appointment-banner.png"
                  alt="First slide"
                  width={1500}
                  height={700}
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
                  src="/images/landing-images/global-connection.jpg"
                  alt="Second slide"
                  width={1500}
                  height={700}
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
                  src="/images/landing-images/take-charge.jpg"
                  alt="Third slide"
                  width={1500}
                  height={700}
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
                  src="/images/landing-images/empower.jpg"
                  alt="Third slide"
                  width={1500}
                  height={700}
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

      {/* ABOUT SECTION */}
      <div id="about-us" className={styles.aboutUsSection}>
        <Container className={cls('p-0', styles.paddingMobile)}>
          <div className={styles.betterFutureContent}>
            <div className="about-sec">
              <Row>
                <Col sm={12} md={7} lg={5}>
                  <div className={styles.aboutContent}>
                    <h3>ABOUT US</h3>
                    <span className="line"></span>
                    <p className={styles.light} id="how-it-work">
                      HealthierU utilizes next-generation telemedicine to
                      provide you with the best access to highly trained and
                      licensed experts from wellness centers and clinics across
                      the UAE and across the globe.
                    </p>
                  </div>
                  <div className={styles.howContent}>
                    <h3>HOW?</h3>
                    <ul className={styles.light}>
                      <li>We use technology to transform your experience.</li>
                      <li>
                        We believe in a proactive care management approach.
                      </li>
                      <li>
                        We create a consumer-first approach and a personalized
                        data-driven digital health experience.
                      </li>
                      <li>
                        We are pioneers in bringing the Internet of Health to
                        everyone.
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>

      {/* EDGE SECTION */}
      <div className={styles.edgeSection}>
        <Container className={styles.edgeSectionContainer}>
          <Row>
            <Col className={styles.edgeText} sm={12} md={12} lg={6} xl={6}>
              <h1>OUR EDGE</h1>
              <p className={cls(styles.light, styles.edgeSubtitle)}>
                A one-of-a-kind and scalable wellness and prevention
                telemedicine platform.
              </p>
              <ul>
                <li>Personalized</li>
                <li>Proactive system: Predicts diseases before they occur</li>
                <li>Patient-centered</li>
                <li>Value and not volume-based</li>
                <li>Designed to prevent diseases</li>
                <li>Barely any waiting time</li>
                <li>
                  Treatment decisions are influenced by what is best for the
                  patient
                </li>
              </ul>
            </Col>
            <Col className={styles.edgeImage} sm={12} md={12} lg={6} xl={6}>
              <Image
                src="/images/landing-images/phone.png"
                alt=""
                width={600}
                height={800}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* POWERFUL FEATURE */}
      <div className={styles.powerfulFeature}>
        <Container>
          <Row>
            <Col
              className={styles.powerfulFeatureImage}
              sm={12}
              md={12}
              lg={6}
              xl={6}
            >
              <Image
                src="/images/landing-images/step13.png"
                alt=""
                width={500}
                height={600}
              />
            </Col>
            <Col
              className={styles.powerfulFeatureText}
              sm={12}
              md={12}
              lg={6}
              xl={6}
            >
              <h1>POWERFUL FEATURES</h1>
              <ul>
                <li>Convenient and easy-to-use app</li>
                <li>
                  Comprehensive solutions to help prevent and predict diseases
                </li>
                <li>
                  Unlimited 24/7 access to professionals in the wellness and
                  prevention field
                </li>
                <li>Robust and powerful technology</li>
                <li>Quick access to personalized supplements and wearables</li>
                <li>Customized nutrition meal and fitness plans</li>
                <li>E-courses on wellness, health, and much more</li>
                <li>Medicine and appointment reminders</li>
                <li>Quick access to labs near you</li>
                <li>Healthcare data security</li>
              </ul>
              <br></br>
              <br></br>
              <br id="our-service"></br>
            </Col>
          </Row>
        </Container>
      </div>

      {/* OUR SPECIALITIES SECTION */}
      <div className={styles.ourSpecialitiesSection}>
        <Container className={cls('p-0', styles.paddingMobile)}>
          <div>
            <br></br>
            <h1 className="our_spl-title">OUR SPECIALITIES</h1>
            <p className={styles.ourSpecialitiesSubtitle}>
              We offer programs and plans to help support your wellness journey.
            </p>
          </div>
          <Row>
            <Col sm={12} md={6} lg={3} xl={3} l="true">
              <Image
                src="/images/landing-images/HeartSpl.png"
                alt=""
                width={100}
                height={100}
              />
              <h3>REGENERATIVE MEDICINE</h3>
              <ul>
                <li>Sleep Therapy</li>
                <li>Immune Health</li>
                <li>Sexual health</li>
              </ul>
            </Col>
            <Col sm={12} md={6} lg={3} xl={3} l="true">
              <Image
                src="/images/landing-images/LabSpl.png"
                alt=""
                width={400}
                height={100}
              />
              <h3>FUNCTIONAL MEDICINE</h3>
              <ul>
                <li>Comprehensive lab diagnostics</li>
                <li>Gut Microbiome</li>
                <li>Sexual health hormones</li>
              </ul>
            </Col>
            <Col sm={12} md={6} lg={3} xl={3} l="true">
              <Image
                src="/images/landing-images/MolecularSpl.png"
                alt=""
                width={100}
                height={100}
              />
              <h3>MOLECULAR MEDICINE</h3>
              <ul>
                <li>
                  Integrative and Holistic Nutrition and sport Performance
                </li>
              </ul>
            </Col>
            <Col sm={12} md={6} lg={3} xl={3} l="true">
              <Image
                src="/images/landing-images/CareSpl.png"
                alt=""
                width={100}
                height={100}
              />
              <h3>ENERGY / BODY-MIND MEDICINE</h3>
              <ul>
                <li>Stress management</li>
                <li>Mental management</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>

      {/* TWO-BOX SECTION */}
      <div className={styles.twoBoxSection}>
        <Container className={cls('p-0', styles.paddingMobile)}>
          <Row className="pb-5 two-box-padding">
            <Col md={12} lg={6} xl={6} className="mb-3">
              <Card className={styles.card}>
                <Card.Img
                  variant="top"
                  src="/images/landing-images/home-2.png"
                  className={styles.cardImgTop}
                />
                <Card.Body className={styles.cardBody}>
                  <Card.Title className={styles.cardTitle}>
                    How healthy are you?
                  </Card.Title>
                  <Card.Text className={styles.cardText}>
                    Find out how you measure with health and well-being
                    assessment
                  </Card.Text>
                  <div className={styles.boxCardBtn}>
                    <Link href="/signin" onClick={() => window.scrollTo(0, 0)}>
                      <button
                        variant="primary"
                        className={cls(
                          'btn',
                          'btn-outline-light',
                          styles.assessmentBtn
                        )}
                      >
                        Take my assessment
                      </button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} lg={6} xl={6}>
              <Card className={styles.card}>
                <Card.Img
                  variant="top"
                  src="/images/landing-images/home-3.png"
                  className={styles.cardImgTop}
                />
                <Card.Body className={styles.cardBody}>
                  <Card.Title className={styles.cardTitle}>
                    Looking for an expert advise?
                  </Card.Title>
                  <Card.Text className={styles.cardText}>
                    Check out our available wellness specialists
                  </Card.Text>
                  <div className={styles.boxCardBtn}>
                    <Link href="/signin" onClick={() => window.scrollTo(0, 0)}>
                      <button
                        variant="primary"
                        className={cls(
                          'btn',
                          'btn-outline-light',
                          styles.assessmentBtn
                        )}
                      >
                        Meet Our Doctors
                      </button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default LandingPage;
