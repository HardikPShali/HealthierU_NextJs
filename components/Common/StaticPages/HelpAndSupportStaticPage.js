import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './StaticPages.module.css';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import axios from "axios";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import cls from 'classnames';


const HelpAndSupportStaticPage = ({ currentuserInfo }) => {
    const router = useRouter();

    const [disbleBtn, setDisbleBtn] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [contactDetails, setContactDetails] = useState({
        senderName: "",
        senderMail: "",
        subject: "",
        message: "",
    });

    const { senderName, senderMail, subject, message } = contactDetails;

    const { authorities = [] } = currentuserInfo || {};

    let redirectUrl = '';
    if (authorities.some((user) => user === 'ROLE_PATIENT')) {
        redirectUrl = '/patient';
    } else if (authorities.some((user) => user === 'ROLE_DOCTOR')) {
        redirectUrl = '/doctor';
    } else {
        redirectUrl = '/';
    }

    const handleInputChange = (e) => {
        setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
    };

    const sendContactDetails = () => {
        setDisbleBtn(true);
        var payload = {
            method: "post",
            mode: "no-cors",
            data: contactDetails,
            url: `/api/contact-us`,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        };
        axios(payload)
            .then((response) => {
                // //console.log(response.status);
                if (response.status === 200 || response.status === 201) {
                    toast.success("Message sent successfully");
                    setContactDetails({
                        senderName: "",
                        senderMail: "",
                        subject: "",
                        message: "",
                    })
                }
                setDisbleBtn(false);
            })
            .catch((error) => {
                if (error.response && error.response.status === 500) {
                    setServerError(true);
                    setTimeout(() => router.push("/"), 5000);
                }
            });
    };


    const emailValidator = new RegExp(
        "^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$"
    );
    ValidatorForm.addValidationRule("isValidEmail", (value) => {
        if (!emailValidator.test(value)) {
            return false;
        } else if (emailValidator.test(value)) {
            return true;
        }
    });

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

                    <Container id="contact-us">
                        <Row className={styles.helpAndSupportRow}>
                            <Col md={12} className="mt-5 mb-5">
                                <h2>Feel Free To Contact Us</h2>
                                <h5>Contact Our Support Team At Anytime</h5>
                                <br />
                                <br />
                                <ValidatorForm onSubmit={() => sendContactDetails()}>
                                    <Row>
                                        <Col md={6}>
                                            <TextValidator
                                                className={styles.inputStandardBasic}
                                                type="text"
                                                name="senderName"
                                                value={senderName}
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder="YOUR NAME*"
                                                validators={["required", "matchRegexp:^[a-zA-Z ]+$"]}
                                                errorMessages={["This field is required", "Name cannot have any numeric values"]}
                                                variant="filled"
                                            />
                                            <br />
                                            <TextValidator
                                                className={styles.inputStandardBasic}
                                                type="email"
                                                name="senderMail"
                                                value={senderMail}
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder="EMAIL ADDRESS*"
                                                validators={[
                                                    "required",
                                                    // "isValidEmail",
                                                    "maxStringLength:50",
                                                ]}
                                                errorMessages={[
                                                    "This field is required",
                                                    // "Please enter a valid email",
                                                    "Email should not exceed 50 characters",
                                                ]}
                                                variant="filled"
                                            />
                                            <br />
                                            <TextValidator
                                                className={styles.inputStandardBasic}
                                                type="text"
                                                name="subject"
                                                value={subject}
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder="SUBJECT"
                                                variant="filled"
                                            />
                                            <br />
                                        </Col>
                                        <Col md={6}>
                                            <TextValidator
                                                className={styles.inputStandardBasic}
                                                type="text"
                                                name="message"
                                                value={message}
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder="YOUR MESSAGE"
                                                multiline
                                                rows={4}
                                                variant="filled"
                                            />
                                            <input
                                                className={cls("btn", "btn-primary", styles.signBtn)}
                                                type="submit"
                                                value="SEND MESSAGE"
                                                disabled={disbleBtn}
                                            />
                                        </Col>
                                    </Row>
                                </ValidatorForm>
                                <br />
                                <br />
                                <Row className={styles.contactDetails}>
                                    <Col md={4}>
                                        <h6>Phone</h6>
                                        <p>+971 2 650 2444</p>
                                    </Col>
                                    <Col md={4}>
                                        <h6>E-mail Address</h6>
                                        <p>info@healthieru.ae</p>
                                    </Col>
                                    <Col md={4}>
                                        <h6>Office Address</h6>
                                        <p>Reem Island, Abu Dhabi, UAE</p>
                                    </Col>
                                </Row>
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

            {/* <Footer /> */}
        </div>
    );
}

export default HelpAndSupportStaticPage;