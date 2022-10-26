import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './StaticPages.module.css';

const FAQStaticPage = ({ currentuserInfo }) => {
    // console.log({ currentuserInfo });
    const [serverError, setServerError] = useState(false);

    const { authorities = [] } = currentuserInfo || {};

    let redirectUrl = '';
    if (authorities.some((user) => user === 'ROLE_PATIENT')) {
        redirectUrl = '/patient';
    } else if (authorities.some((user) => user === 'ROLE_DOCTOR')) {
        redirectUrl = '/doctor';
    } else {
        redirectUrl = '/';
    }

    return (
        <div>
            {serverError && (
                <>
                    <center
                        className="d-flex w-100 align-items-center"
                        style={{ height: '100vh' }}
                    >
                        <h2>Something went wrong. Try again after some time!</h2>
                        <p>You will be redirected to HomePage in 5 sec.</p>
                    </center>
                </>
            )}
            {!serverError && (
                <>
                    {authorities.length > 0 &&
                        authorities.some((user) => user === 'ROLE_PATIENT') ? (
                        <></>
                    ) : authorities.length > 0 &&
                        authorities.some((user) => user === 'ROLE_DOCTOR') ? (
                        <></>
                    ) : (
                        <Header />
                    )}
                    <Container>
                        <Row>
                            <Col md={2}></Col>
                            <Col md={8}>
                                <div className={styles.staticContentContainer}>
                                    <div>
                                        <center>
                                            <h3>
                                                <strong>StaticPage</strong>
                                            </h3>
                                        </center>
                                        <br />
                                        <Row>
                                            <Col md={12}>
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>What is HealthierU?</strong>
                                                        </h5>
                                                        <p className={styles.staticPagesContent}>
                                                            HealthierU is a preventative health and wellness
                                                            platform based out of Abu Dhabi. We utilize
                                                            next-generation telemedicine to provide you with
                                                            the best access to highly trained and licensed
                                                            wellness experts from across the globe.
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>How does HealthierU work?</strong>
                                                        </h5>
                                                        <p className={styles.staticPagesContent}>
                                                            Once you create an account you can partake in the
                                                            lifestyle health assessment and view our current
                                                            onboarded healthcare professionals. Currently, we
                                                            are offering consultation services across a
                                                            variety of wellness specialties with healthcare
                                                            professionals from the UAE, Europe, and the USA.{' '}
                                                            <br />
                                                            You can also store medical documents on the app.
                                                            Once you have a consultation with a healthcare
                                                            professional, he/she can upload a holistic
                                                            wellness plan within the app so everything is
                                                            under one roof. <br /> We will be adding many more
                                                            features with upcoming upgrades, stay tuned!
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                Where can I find the HealthierU app?{' '}
                                                            </strong>
                                                        </h5>
                                                        <p className={styles.staticPagesContent}>
                                                            HealthierU is available on the iOS App Store,
                                                            Google Play App Store, and on a Web browser.
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>Is my data confidential?</strong>
                                                        </h5>
                                                        <p className={styles.staticPagesContent}>
                                                            HealthierU is committed to protecting the privacy
                                                            of every individual who uses our platform. For
                                                            more information, please see our{' '}
                                                            <a href="./privacy-policy">Privacy Policy</a>.
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                Do I need an ID to sign up for the app?
                                                            </strong>
                                                        </h5>
                                                        <p className={styles.staticPagesContent}>
                                                            There will be no ID upload necessary. You will
                                                            need to verify your identity through a One Time
                                                            Passcode (OTP) sent to the email used to sign up.
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                I have signed up for the app but I have not
                                                                received my OTP.
                                                            </strong>
                                                        </h5>
                                                        <p className={styles.staticPagesContent}>
                                                            We recommend checking your spam/ junk inbox. If
                                                            after 5 minutes you have not received it, please
                                                            contact us on{' '}
                                                            <a href="mailto: info@healthieru.ae">
                                                                info@healthieru.ae{' '}
                                                            </a>
                                                            .
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>What are my payment options?</strong>
                                                        </h5>
                                                        <p className={styles.staticPagesContent}>
                                                            We accept all major credit cards and PayPal.
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                How do you screen your Board-Certified
                                                                Clinicians?
                                                            </strong>
                                                        </h5>
                                                        <p className={styles.staticPagesContent}>
                                                            We have a very thorough verification process. All
                                                            healthcare professionals must share a valid copy
                                                            of their medical or healthcare license,
                                                            undergraduate and medical school diploma, and any
                                                            other documents that verify that they can legally
                                                            practice in the country they are residing.
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                Will I be notified if my appointment is
                                                                canceled/ rescheduled?
                                                            </strong>
                                                        </h5>
                                                        <p className={styles.staticPagesContent}>
                                                            Yes, you will be notified via the app and email.
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                What is your cancellation policy and refund
                                                                policy?
                                                            </strong>
                                                        </h5>
                                                        <p className={styles.staticPagesContent}>
                                                            <ul>
                                                                <li>
                                                                    You can cancel your appointment and receive a
                                                                    refund up to 24 hours before your appointment.
                                                                    If you cancel your appointment less than 24
                                                                    hours before your appointment, 50% of the
                                                                    consult fee will be deducted.
                                                                </li>
                                                                <li>
                                                                    If a healthcare professional cancels the
                                                                    consultation, he/she will need to offer a
                                                                    rescheduling date and time as a priority for
                                                                    the patient.
                                                                </li>
                                                            </ul>
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                What if there are no available time slots with
                                                                my chosen Healthcare professional?
                                                            </strong>
                                                        </h5>
                                                        <p className={styles.staticPagesContent}>
                                                            The platform only allows for bookings based on the
                                                            availability of our healthcare professionals. If
                                                            there are no time slots available, we recommend
                                                            checking in at other times or using one of our
                                                            many other qualified professionals.
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                Can I choose my own Healthcare professional?
                                                            </strong>
                                                        </h5>
                                                        <p className={styles.staticPagesContent}>
                                                            Yes, the choice is completely up to you.
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                Can I book an appointment for my child/family
                                                                member?
                                                            </strong>
                                                        </h5>
                                                        <p className={styles.staticPagesContent}>
                                                            Unfortunately, at this stage, our services do not
                                                            include those who are less than 18 years old and
                                                            can only be provided to the person registered on
                                                            the app.
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                Why can I not send a message to my Healthcare
                                                                professional?
                                                            </strong>
                                                        </h5>
                                                        <p className={styles.staticPagesContent}>
                                                            Messages can only be sent to your healthcare
                                                            professional two days before your appointment and
                                                            three days after your appointment.
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                How do I contact the HealthierU team?
                                                            </strong>
                                                        </h5>
                                                        <p className={styles.staticPagesContent}>
                                                            If you have any inquiries, you may contact us
                                                            through email on{' '}
                                                            <a href="mailto: info@healthieru.ae">
                                                                info@healthieru.ae{' '}
                                                            </a>
                                                            .
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                Do I need to complete the health assessment?
                                                            </strong>
                                                        </h5>
                                                        <p className={styles.staticPagesContent}>
                                                            It is not required to complete the health
                                                            assessment, but we highly recommend filling it out
                                                            before booking a consultation as this can give
                                                            your healthcare professional basic information
                                                            about you and give you more time during the
                                                            appointment to discuss major concerns.
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                How much do the consultations cost and are they
                                                                covered by insurance companies?
                                                            </strong>
                                                        </h5>
                                                        <p className={styles.staticPagesContent}>
                                                            All our healthcare professionals determine their
                                                            own costs. At this stage, services provided by us
                                                            cannot be reimbursed by insurance companies.
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>I can&apos;t log in to my account.</strong>
                                                        </h5>
                                                        <p className={styles.staticPagesContent}>
                                                            If you are having trouble logging into your
                                                            account and you have changed your password, please
                                                            reach out to <a href="mailto: info@healthieru.ae">
                                                                info@healthieru.ae{' '}
                                                            </a>.
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <br />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    {authorities.length > 0 &&
                        authorities.some((user) => user === 'ROLE_PATIENT') ? (
                        <></>
                    ) : authorities.length > 0 &&
                        authorities.some((user) => user === 'ROLE_DOCTOR') ? (
                        <></>
                    ) : (
                        <Footer />
                    )}
                </>
            )}
        </div>
    );
};

export default FAQStaticPage;
