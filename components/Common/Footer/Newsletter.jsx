import React, { useState, useEffect } from 'react';
import styles from './Newsletter.module.css';
import validator from 'validator';
import cls from 'classnames';
// import { postNewsletterEmailApi } from '../../../service/frontendapiservices';
// import TransparentLoader from "../../Loader/transparentloader";

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [emailSubmit, setEmailSubmit] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [authorisedError, setAuthorisedError] = useState(false);
  const [loading, setLoading] = useState(false);

  const newsletterEmailInputHandler = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const postNewsletterEmail = async (email) => {
    // setLoading(true);
    // try {
    //   const response = await postNewsletterEmailApi(email);
    //   // console.log({ response });
    //   if (
    //     response.data.message === 'Email Added' ||
    //     response.data.status === 'true'
    //   ) {
    //     setLoading(false);
    //     setEmailSubmit(true);
    //   }
    // } catch (err) {
    //   console.log({
    //     err,
    //   });
    //   if (err.response.data.error === 'invalid_token') {
    //     setLoading(false);
    //     setAuthorisedError(true);
    //     setEmailSubmit(false);
    //   }
    // }
    console.log({ emailAdded: email });
  };

  const newsletterSubmitHandler = (e) => {
    e.preventDefault();
    if (validator.isEmail(email)) {
      postNewsletterEmail(email);
      setEmail('');
    } else {
      setLoading(false);
      setEmailError(true);
    }
  };

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setEmailSubmit(false);
      }, 3000);
    };
  }, [emailSubmit]);

  return (
    <div>
      {/* {loading && <TransparentLoader />} */}
      <p className={styles.paragraphStyles}> Email Newsletters </p>
      <p className={styles.paragraphStyles}>
        Stay up - to - date with the latest content and offers from HealthierU
      </p>
      <form>
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          className={styles.footerInput}
          value={email}
          onChange={(e) => newsletterEmailInputHandler(e)}
          autoComplete="off"
        />
        <input
          value="Subscribe"
          type="submit"
          className={cls('btn', styles.submitBtn)}
          onClick={(e) => newsletterSubmitHandler(e)}
        />
        {emailSubmit && (
          <span className={styles.subscriptionMessage}>
            Thanks for subscribing to our newsletter
          </span>
        )}
        {emailError && (
          <span className={styles.subscriptionMessage}>
            Please enter a valid email address
          </span>
        )}
        {authorisedError && (
          <span className={styles.subscriptionMessage}>
            Please sign in to subscribe to our newletters
          </span>
        )}
      </form>
    </div>
  );
};

export default Newsletter;
