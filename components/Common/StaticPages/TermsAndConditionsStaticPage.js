import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './StaticPages.module.css';

const TermsAndConditionsStaticPage = ({ currentuserInfo }) => {
    const [serverError, setServerError] = useState(false);
    const [loading, setLoading] = useState(true);

    const { authorities = [] } = currentuserInfo || {};
    //console.log("authorities ::::: about us :::::", authorities);
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
            {' '}
            {/* {loading && <Loader />} */}{' '}
            {serverError && (
                <>
                    <center
                        className="d-flex w-100 align-items-center"
                        style={{
                            height: '100vh',
                        }}
                    >
                        <h2> Something went wrong.Try again after some time! </h2>{' '}
                        <p> You will be redirected to HomePage in 5 sec. </p>{' '}
                    </center>{' '}
                </>
            )}{' '}
            {!serverError && (
                <>
                    {' '}
                    {authorities.length > 0 &&
                        authorities.some((user) => user === 'ROLE_PATIENT') ? (
                        <> </>
                    ) : authorities.length > 0 &&
                        authorities.some((user) => user === 'ROLE_DOCTOR') ? (
                        <> </>
                    ) : (
                        <Header />
                    )}{' '}
                    <Container>
                        <Row>
                            <Col md={2}> </Col>{' '}
                            <Col md={8}>
                                <div className={styles.staticContentContainer}>
                                    <div>
                                        <center>
                                            <h3>
                                                <strong> Terms And Conditions </strong>{' '}
                                            </h3>{' '}
                                        </center>{' '}
                                        <br />
                                        <Row>
                                            <Col md={12}>
                                                <Row>
                                                    <Col md={12}>
                                                        <p className={styles.staticPagesContent}>
                                                            Thank you for using our website{' '}
                                                            <a href="https://healthieru.ae/">
                                                                {' '}
                                                                https://healthieru.ae/
                                                            </a>
                                                            , as well as our mobile application or any other
                                                            electronic application software made available by
                                                            us, which may be accessible through smartphone,
                                                            tablet or any other electronic devices (the
                                                            “Platform”). HealthierU is a telehealth platform
                                                            that offers online telemedicine and general health
                                                            and wellness consultation services (the
                                                            “Services”), in addition to products and
                                                            merchandise (“Products”). We strive to provide our
                                                            customers with the best service and user
                                                            experience. Please read these terms and conditions
                                                            carefully before using our Platform.
                                                            <br />
                                                            The Platform is operated by HealthierU Wellness
                                                            Services LLC (“HealthierU”) is a limited liability
                                                            company licensed in the United Arab Emirates
                                                            (“we”, “our”, “us” and “HealthierU”) and is the
                                                            company that developed the one-of-a-kind wellness
                                                            and prevention platform, HealthierU. These terms
                                                            and conditions (“T&C&apos;s”) govern our relationship
                                                            when you use our Platform, purchase Products from
                                                            us or subscribe to our Services through our
                                                            Platform.
                                                            <br />
                                                            By accessing, browsing or using our Platform, you
                                                            confirm that you accept the T&C&apos;s and that you
                                                            agree to comply with and to be bound by them and
                                                            you agree that they form an agreement between you
                                                            and us. You can also find out more on our Help
                                                            pages (which also form part of these T&C&apos;s).
                                                            <br />
                                                            These T&C&apos;s affect your legal rights and
                                                            obligations. If you do not agree to any conditions
                                                            provided in these T&C&apos;s, you must refrain from
                                                            accessing or using our Platform.
                                                            <br />
                                                            To contact us about the T&C&apos;s, please email us at{' '}
                                                            <a href="mailto:info@healthieru.ae ">
                                                                info@healthieru.ae
                                                            </a>
                                                            .
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>Privacy policy</strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            The Privacy Policy is not a part of this
                                                            contractual agreement between you and us but you
                                                            should read it to find out more about how we may
                                                            collect, store and process your personal
                                                            information and the measures we implement to
                                                            protect your personal information.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                {' '}
                                                                Keeping your account details safe{' '}
                                                            </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            If you choose, or you are provided with, a user
                                                            login details comprising of a username, password
                                                            or any other piece of information as part of our
                                                            security procedures, you must treat such
                                                            information as strictly confidential. You must not
                                                            disclose it to any third party.
                                                            <br />
                                                            We have the right to disable any user account,
                                                            user login details or password, whether chosen by
                                                            you or allocated by us, at any time, if in our
                                                            reasonable opinion you have failed to comply with
                                                            any of the provisions of these T&C&apos;s or your
                                                            ongoing use poses a security threat to us or
                                                            anyone else.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong> Conditions of use </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            To purchase Products or subscribe to Services from
                                                            our Platform, you must:
                                                        </p>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            <ul>
                                                                <li> be at least 18 years of age; </li>{' '}
                                                                <li>
                                                                    {' '}
                                                                    have a form of payment that we accept (e.g.
                                                                    credit card); and{' '}
                                                                </li>{' '}
                                                                <li>
                                                                    {' '}
                                                                    be authorised to use that form of payment.{' '}
                                                                </li>{' '}
                                                            </ul>{' '}
                                                            If you know or suspect that anyone other than you
                                                            knows your user login details, you must promptly
                                                            notify us at{' '}
                                                            <a href="mailto:info@healthieru.ae">
                                                                info@healthieru.ae
                                                            </a>
                                                            .
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>Using the Platform</strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            You agree to access and use the Platform only for
                                                            lawful purposes. By accessing the Platform, you
                                                            agree that you will not:
                                                            <ul>
                                                                <li>
                                                                    {' '}
                                                                    use the Platform to impersonate any person or
                                                                    entity, or otherwise misrepresent your
                                                                    affiliation with a person or entity;{' '}
                                                                </li>
                                                                <li>
                                                                    post or transmit discriminatory, offensive,
                                                                    libellous, harassing, defamatory, blasphemous,
                                                                    insulting, obscene or otherwise unlawful
                                                                    content;
                                                                </li>
                                                                <li>
                                                                    post or transmit discriminatory, offensive,
                                                                    libellous, harassing, defamatory, blasphemous,
                                                                    insulting, obscene or otherwise unlawful
                                                                    content;
                                                                </li>
                                                                <li>
                                                                    post or use any material that infringes upon
                                                                    or violates our intellectual property rights
                                                                    or the intellectual property rights of
                                                                    another;{' '}
                                                                </li>
                                                                <li>
                                                                    engage in inappropriate actions or behaviours
                                                                    with any of the doctors, wellness coaches,
                                                                    nutritionists and other health practitioners
                                                                    or health advisors that offer Services on the
                                                                    Platform (“Service Providers”);
                                                                </li>
                                                                <li>
                                                                    use the Platform for any purpose other than to
                                                                    subscribe to the Services or to purchase
                                                                    Products;
                                                                </li>
                                                                <li>
                                                                    disclose the personal, health or confidential
                                                                    information of others;
                                                                </li>
                                                                <li>
                                                                    upload, post, email or otherwise transmit any
                                                                    material that you do not have a right to
                                                                    transmit under any law or under a contractual
                                                                    relationship through the Platform;
                                                                </li>
                                                                <li>
                                                                    use the Platform to commit a criminal offence
                                                                    or to encourage others to engage in any
                                                                    conduct which would constitute a criminal
                                                                    offence or give rise to civil liability;
                                                                </li>
                                                                <li>
                                                                    access the Platform to distribute viruses or
                                                                    other harmful computer code; or
                                                                </li>
                                                                <li>
                                                                    use the Platform or Services for emergency
                                                                    medical needs.
                                                                </li>
                                                            </ul>
                                                            You are responsible for making sure your
                                                            activities are lawful.
                                                            <br />
                                                            We and our software and other technology service
                                                            providers may conduct maintenance and support for
                                                            the Platform and you acknowledge that any third
                                                            party provider from whom you download the App or
                                                            access the Platform is not under any obligation to
                                                            you to carry out any maintenance and/or support
                                                            for the Platform.
                                                            <br />
                                                            From time to time we may issue updates to the
                                                            Platform. Some updates may not be available to
                                                            certain mobile models (Legacy models). You also
                                                            understand and accept that the Platform has not
                                                            been developed to meet your individual
                                                            requirements, and that it is therefore your
                                                            responsibility to ensure that the functionality of
                                                            the Platform meet the requirements of your device
                                                            from which you are accessing the Platform.
                                                            <br />
                                                            Access to the Platform may be suspended
                                                            temporarily and without notice if there was any
                                                            system failure, maintenance or repair. We have the
                                                            right to suspend your access to the Platform where
                                                            we reasonably suspect there has been a breach of
                                                            these T&C&apos;s.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong> Use of services </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            When you request a Service through the Platform,
                                                            you should receive an acknowledgement e-mail
                                                            confirming receipt of your request. We will work
                                                            to assign you with the appropriate Service
                                                            Provider, or we may provide you with the option of
                                                            selecting your desired Service Provider. You will
                                                            only have access to the Service and the Service
                                                            Provider once payment has been approved and we
                                                            have debited the payment method, at which point we
                                                            will send another email confirming acceptance of
                                                            the Service. This is when the contract is created
                                                            between us and you based on these T&C’s.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong> Product orders </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            If you purchase a Product with us, we will send
                                                            you an email acknowledging receipt of your order.
                                                            We will verify the availability of the Products,
                                                            and confirm that your order has been placed
                                                            successfully with a second confirmation email once
                                                            your payment method has been successfully charged.
                                                            <br />
                                                            You may be able to cancel your order within a
                                                            short period of ordering - timings depend on your
                                                            chosen delivery method and we will set this
                                                            information out in the order acknowledgement
                                                            email. You cannot change your order, so if you
                                                            wish to make any changes to the order you placed,
                                                            you will need to cancel the order within the
                                                            permitted cancellation period, or if the order has
                                                            already been placed, return the original item(s)
                                                            once you received them, and place a new order. If
                                                            you have any questions, we suggest you contact our
                                                            Customer Service team.
                                                            <br />
                                                            All orders are subject to stock availability and
                                                            confirmation of the order price. If there is an
                                                            issue with an order, we will get in touch with you
                                                            to find a suitable replacement or issue you with a
                                                            refund.
                                                            <br />
                                                            There are rare occasions when we may need to
                                                            refuse or cancel an order or close or freeze an
                                                            account (even if we have previously confirmed your
                                                            order), for example if we notice something unusual
                                                            on an order or an account If this happens to you
                                                            and you think we have made a mistake, please get
                                                            in touch with our Customer Service team and they
                                                            will assist you with your query.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong> Payments </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            All payment transactions will be processed through
                                                            third party providers.
                                                            <br />
                                                            We have implemented security policies, rules and
                                                            technical measures designed to protect your
                                                            financial data processed through the Platform, in
                                                            accordance with applicable laws. Any payments made
                                                            through the Platform will be conducted in a secure
                                                            manner and are encrypted using SSL (Secure Socket
                                                            Layer) technology. <br />
                                                            The security measures are designed to prevent
                                                            unauthorised access, improper use or disclosure,
                                                            unauthorised modification and unlawful destruction
                                                            or accidental loss of your financial data.
                                                            <br />
                                                            When you purchase a Product or a Service, you must
                                                            provide us with complete and accurate payment
                                                            information. By submitting payment details you
                                                            confirm that you are entitled to purchase the
                                                            Service or Product using those payment details.
                                                            <br /> If we do not receive payment authorization
                                                            or any authorization is subsequently cancelled, we
                                                            may immediately terminate or suspend the order. In
                                                            suspicious circumstances we may contact the
                                                            issuing bank/payment provider and/or law
                                                            enforcement authorities or other appropriate third
                                                            parties. If you are entitled to a refund under
                                                            these terms and conditions, we will credit that
                                                            refund to the card or other payment method you
                                                            used to submit payment, unless it has expired in
                                                            which case, we will contact you.
                                                            <br /> Payment options are primarily through
                                                            credit card, PayPal, or other third party online
                                                            payment systems. We may offer other payment
                                                            mechanisms from time to time.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                {' '}
                                                                Prices and descriptions of Products and Services{' '}
                                                            </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            We aim to clearly describe the Products and
                                                            Services offered on our Platform. You should be
                                                            aware that we are an intermediary between you and
                                                            the Service Provider, and that the Service is not
                                                            offered by us. We cannot guarantee that the
                                                            description is free of errors or exhaustive as
                                                            some elements or details may be hard to describe.
                                                            If you find that a Product or Service description
                                                            is confusing or unclear, let us know and we will
                                                            do our best to make the appropriate changes.
                                                            <br />
                                                            Prices shown on the Platform can be updated
                                                            regularly, and may vary depending on applicable
                                                            sales and promotional offers. The price you will
                                                            be charged is the price shown on the Platform at
                                                            the time of placing the order. Prices shown on the
                                                            Platform will include VAT (where applicable).
                                                            <br />
                                                            Depending on the value of your order or the
                                                            delivery option or address you choose, delivery
                                                            costs may also be charged (see below). Such
                                                            additional charges will be clearly shown during
                                                            the checkout process and included in the &apos;Total
                                                            Price&apos; tab prior to submitting your order.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong> Delivery </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            Before you finalise your order of a Product, you
                                                            will be given various delivery options to choose
                                                            from with estimated delivery times and dates
                                                            depending on the delivery address.
                                                            <br />
                                                            Once we prepare, package and ship your order, we
                                                            will send you an order shipment confirmation
                                                            email. Please be aware that we work with several
                                                            external suppliers and Service Providers from our
                                                            network of partners to provide you with the best
                                                            Services, so prices and delivery and return times
                                                            may vary. <br />
                                                            We try our best to meet all delivery times but
                                                            sometimes there may be unavoidable delays due to
                                                            large volume of orders, postal/carrier delays, or
                                                            various other reasons. We will keep you updated as
                                                            much as we can and you should be able to track
                                                            your parcel&apos;s progress using the delivery tracking
                                                            link we provide on the order shipment confirmation
                                                            email. <br /> Please check out our [Delivery and
                                                            Returns] section on every Product information page
                                                            for more information on the delivery and returns
                                                            terms and conditions for that Product. If you are
                                                            facing any problems with the delivery of your
                                                            order or have not received your order, please let
                                                            us know within 30 days of the delivery estimated
                                                            date and we will do our best to help you.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong> Returns and Refunds </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            If you wish to return a Product you purchased from
                                                            us, you may lodge a return claim within 10 days of
                                                            receiving the Product through one of our Platform,
                                                            by accessing the same account you used to purchase
                                                            the Product or by contacting our Customer Service
                                                            team.
                                                            <br /> We may require up to 20 days from the day
                                                            we receive the returned Product to process your
                                                            return request and issue you with a refund. We
                                                            will issue you with a full refund by way of the
                                                            original payment method, if applicable. The refund
                                                            may take up to 30 days to be processed by your
                                                            bank.
                                                            <br /> Please check the Delivery and Returns
                                                            section of a Product before you place your order.
                                                            Certain items such as, pharmaceuticals and other
                                                            consumable supplements are non-refundable for
                                                            health and hygiene reasons. <br />
                                                            If you have paid for a Service but you are not
                                                            satisfied with the Service provided to you by a
                                                            Service Provider, you may file a complaint through
                                                            info@healthieru.ae. We will assess the nature of
                                                            the complaints and consider whether it would be
                                                            appropriate to offer you a refund, at our own
                                                            discretion. <br /> Products returned must be in
                                                            their original condition and original packaging.
                                                            If a Product is returned to us damaged or not in
                                                            its original condition, we will not accept the
                                                            returned item and we may have to send it back to
                                                            you (and ask you to cover the delivery costs).{' '}
                                                            <br /> We do not accept returns after the relevant
                                                            return period has passed. If you try to make a
                                                            return after the return period has passed, we may
                                                            have to send the Product back to you and ask you
                                                            to cover the delivery costs.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                {' '}
                                                                Our loyalty programmes and discounts{' '}
                                                            </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            When you register an account with us, you
                                                            automatically sign up for our loyalty programme.
                                                            We may offer discounts and early access to special
                                                            Services of discounted Products. In addition to
                                                            other rewards that we may decide to offer from
                                                            time to time. We may give you Promotional Codes
                                                            (“Promo Code”) that you can use to reduce the
                                                            price of certain Products or Services at checkout.
                                                            The terms of use of the Promo Code will be
                                                            communicated to you at the time it is issued to
                                                            you. <br /> When we give you a unique Promo Code,
                                                            this is meant for use by you only. If we think
                                                            there is or has been misuse of a Promo Code in any
                                                            way (e.g. selling it or sharing it with others),
                                                            we may take action to cancel your Promo Code
                                                            and/or suspend or even close your account without
                                                            telling you.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong> Intellectual Property </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            We are the owner or the licensee of all
                                                            intellectual property rights displayed on the
                                                            Platform, and in the material and content
                                                            published on the Platform (“the Materials”). Those
                                                            works are protected by intellectual property laws
                                                            and treaties around the world, including copyright
                                                            rules. All such rights are reserved. All trade
                                                            marks, service marks and logos (the “Trade Marks”)
                                                            displayed on the Platform are the exclusive
                                                            property of HealthierU and our affiliates. You
                                                            will not use the Trade Marks in any manner without
                                                            our prior written consent. <br /> You may print
                                                            off one copy, and may download extracts, of any
                                                            page(s) from the Platform for your personal use
                                                            and you may draw the attention of others to
                                                            content posted on the Platform. <br /> You must
                                                            not modify the paper or digital copies of the
                                                            Materials and Trade Marks you have printed off or
                                                            downloaded in any way. <br /> Our status (and that
                                                            of any identified contributors) as the authors of
                                                            content on our Platform must always be
                                                            acknowledged. <br /> Other than as set out above
                                                            and other than when viewing the Platform on your
                                                            electronic device you are not granted any licence
                                                            to use or view the Materials and Trade Marks.{' '}
                                                            <br /> In particular, you must not use any part of
                                                            the content on the Platform for commercial
                                                            purposes without obtaining a licence to do so from
                                                            us or our licensors. You will not: (i) use, copy,
                                                            modify, display, delete, distribute, download,
                                                            store, reproduce, transmit, publish, sell,
                                                            re-sell, adapt, reverse engineer, or create
                                                            derivative works of the Materials and Trade Marks;
                                                            or (ii) use the Materials and Trade Marks on other
                                                            websites or any media (e.g. social media) without
                                                            our prior written consent. <br /> If you violate
                                                            any terms in this Section 12 (Intellectual
                                                            Property), your right to use the Platform will
                                                            cease immediately and you must, at our option,
                                                            return or destroy any copies of the Materials and
                                                            Trade Marks you have made.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                {' '}
                                                                No liability for reliance on advice{' '}
                                                            </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            The content displayed publicly on the Platform is
                                                            provided for general information only and does not
                                                            constitute any form of professional or medical
                                                            advice on which you should rely nor does it
                                                            constitute a patient-client relationship with you.
                                                            We will not bear any liability for your reliance
                                                            on any information provided on or via the Platform
                                                            which is intended to be for informational or
                                                            educational purposes only. <br /> Service
                                                            Providers may make statements or provide advice to
                                                            you in the course of providing the Services, and
                                                            you should be aware that any statements or advice
                                                            you receive from a Service Provider is independent
                                                            of us and we will not bear any liability for the
                                                            Service Provider’s own actions in providing the
                                                            Services. The Service Provider is an independent
                                                            contractor and they are not acting as our agents
                                                            or our employees or representatives. <br /> We do
                                                            not provide medical advice. The information and
                                                            Services you are provided with via the Platform
                                                            are not intended to be a substitute for
                                                            professional medical advice, diagnosis or
                                                            treatment and should not be relied upon as medical
                                                            advice. Always seek the guidance of your doctor or
                                                            other qualified healthcare professional with any
                                                            questions you may have regarding your health or a
                                                            medical condition. You must obtain separate
                                                            professional or specialist advice before taking,
                                                            or refraining from, any action on the basis of the
                                                            content of the Platform or Services provided.{' '}
                                                            <br /> Although we make reasonable efforts to
                                                            update the information on the Platform and we
                                                            strive to provide accurate information, we make no
                                                            representations, warranties or guarantees of any
                                                            kind, whether express or implied, regarding the
                                                            accuracy, adequacy, currency, validity,
                                                            reliability, availability or completeness of any
                                                            information on our Platform which should not be
                                                            relied upon. We bear no liability in this regard.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong> Cookies </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            Our Platform uses cookies to distinguish you from
                                                            other users of our Platform. This helps us to
                                                            provide you with a good experience when you browse
                                                            or use our Platform and also allows us to improve
                                                            our Platform. <br /> A cookie is a small file of
                                                            letters and numbers that we store on your browser
                                                            or the hard drive of your computer. Cookies
                                                            contain information that is transferred to your
                                                            computer&apos;s hard drive. <br /> Our platform may
                                                            place and access certain first party Cookies on
                                                            your computer or device. First party Cookies are
                                                            those placed directly by us and are used only by
                                                            us. We use Cookies to facilitate and improve your
                                                            experience of our platform and to provide and
                                                            improve our Services. We have carefully chosen
                                                            these Cookies and have taken steps to ensure that
                                                            your privacy and personal data is protected and
                                                            respected at all times. <br /> We use the
                                                            following cookies:
                                                            <ul>
                                                                <li>
                                                                    Strictly necessary cookies: these are cookies
                                                                    that are required for the operation of our
                                                                    Platform. They include, for example, cookies
                                                                    that enable you to log into secure areas of
                                                                    our Platform or make use of payment services;
                                                                </li>
                                                                <li>
                                                                    Analytical or performance cookies: these allow
                                                                    us to recognise and count the number of
                                                                    visitors and to see how visitors move around
                                                                    our Platform when they are using them. This
                                                                    helps us to improve the way our Platform
                                                                    works, for example, by ensuring that users are
                                                                    finding what they are looking for easily;
                                                                </li>
                                                                <li>
                                                                    Functionality cookies: these are used to
                                                                    recognise you when you return to use any of
                                                                    our Platform. This enables us to personalize
                                                                    our content for you (greet you by name) and
                                                                    remember your preferences (for example, your
                                                                    choice of language), and Services history; and
                                                                </li>
                                                                <li>
                                                                    Targeting cookies: these cookies record your
                                                                    visit to our Platform, the pages you have
                                                                    visited and the links you have followed. We
                                                                    will use this information to make our Platform
                                                                    and the advertising displayed on them more
                                                                    relevant to your interests. We may also share
                                                                    this information with third parties for this
                                                                    purpose.
                                                                </li>
                                                            </ul>
                                                            For further information about the individual
                                                            cookies, we use and the purposes for which we use
                                                            them, please email us at{' '}
                                                            <a href="mailto:info@healthieru.ae">
                                                                info@healthieru.ae
                                                            </a>
                                                            . <br />
                                                            Please note that third parties may also use
                                                            cookies, over which we have no control. These
                                                            named third parties may include, for example,
                                                            advertising networks and providers of external
                                                            services like web traffic analysis services. These
                                                            third-party cookies are likely to be analytical
                                                            cookies or performance cookies or targeting
                                                            cookies. <br /> Most browsers automatically store
                                                            cookies by default, but you can choose to refuse
                                                            or selectively accept to store certain cookies by
                                                            adjusting the preferences in your browser.
                                                            However, if your browser refuses to store cookies,
                                                            some features of the Platform may not be available
                                                            to you and some pages on our Platform may not
                                                            display properly. You can find information on
                                                            popular browsers and how to adjust your cookie
                                                            preferences at the following websites:
                                                            <ul>
                                                                <li>Google Chrome: www.google.com/chrome</li>
                                                                <li>
                                                                    Microsoft Edge: http://www.microsoft.com{' '}
                                                                </li>
                                                                <li>Mozilla Firefox: http://www.mozilla.org</li>
                                                            </ul>
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong> Other linked websites </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            Where the Platform contains links to other
                                                            websites and resources provided by third parties
                                                            or Service Providers, these links are provided for
                                                            your information only. Such links should not be
                                                            interpreted as approval by us of those linked
                                                            websites or information you may obtain from them.
                                                            <br />
                                                            We have no control over the contents of those
                                                            websites or resources. When you select a link to
                                                            an outside website, you are subject to the terms
                                                            and conditions of the owner/sponsors of that
                                                            website and you accept all risks of using such
                                                            website.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong> Our responsibility </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            In no event will HealthierU or its affiliates be
                                                            liable for any incidental, indirect, special,
                                                            punitive, exemplary, or consequential damages,
                                                            arising out of your use of or inability to use the
                                                            Platform or the Material contained on it, or from
                                                            any decision or action taken as a result of using
                                                            the Platform. We will not be liable for any loss
                                                            of revenue or anticipated profits, loss of
                                                            goodwill, loss of business, loss of data, computer
                                                            failure or malfunction. <br /> Our liability is
                                                            limited to the maximum extent permitted by law.
                                                            However, we do not exclude or limit our liability
                                                            to you for death or personal injury caused by our
                                                            negligence or the negligence of our employees,
                                                            agents or subcontractors and for fraud.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                {' '}
                                                                Disclaimer of warranties and suspension of
                                                                withdrawal of the Platform{' '}
                                                            </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            You expressly understand and agree that your use
                                                            of our Platform, or the Services made available
                                                            through the Platform, is at your own risk. The
                                                            content and function of the Platform are provided
                                                            to you as is” without warranties of any kind,
                                                            either express or implied. <br /> HealthierU will
                                                            never ask for your payment credentials by phone or
                                                            email. Access to the Platform is made available
                                                            free of charge. We do not guarantee that the
                                                            Platform (or any content on it), or the Services,
                                                            will always be available or their use will be
                                                            uninterrupted. We may suspend or withdraw or
                                                            restrict the availability of all or any part of
                                                            the Platform or take down any Services from the
                                                            Platform for business and operational reasons. We
                                                            will try to give you reasonable notice of any
                                                            planned suspension or withdrawal by posting notice
                                                            online. <br /> You are also responsible for
                                                            ensuring that all persons who access the Platform
                                                            through your internet connection are aware of
                                                            these T&C&apos;s and other applicable terms and
                                                            conditions, and that they comply with them.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />

                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong> Hold harmless and indemnity </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            You agree to defend, indemnify and hold harmless
                                                            HealthierU and all of its employees and agents
                                                            from any harm, liability or damages incurred in
                                                            connection with any claim arising from any breach
                                                            by you of these T&C&apos;s, including reasonable
                                                            attorney&apos;s fees and costs. You agree to cooperate
                                                            fully in the defence of any such claim. We reserve
                                                            the right to assume, at our own expense, the
                                                            exclusive defence and control of any matter
                                                            otherwise subject to indemnification by you. You
                                                            agree not to settle any matter without the prior
                                                            written consent by us.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />

                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong> Using your personal information </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            We will follow our Privacy Policy in relation to
                                                            personal information collected via the Platform.
                                                            <br />
                                                            Communications over the internet and other public
                                                            communications networks rely on infrastructure
                                                            operated by various parties and we cannot
                                                            guarantee the security or integrity of
                                                            communications between you and us over such
                                                            networks.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />

                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong> Viruses protection </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            You must not misuse the Platform by knowingly
                                                            uploading any content that contains a software
                                                            virus, a “Trojan Horse” or any other computer
                                                            code, file or programme that may alter, damage or
                                                            interrupt the functionality of the Platform or the
                                                            hardware or software of any person who accesses
                                                            the Platform and you must take reasonable
                                                            precautions to ensure that any such uploaded
                                                            content is screened for such things. <br /> You
                                                            must not attempt to gain unauthorised access to
                                                            the Platform, the server on which the Platform is
                                                            stored or any server, computer or database
                                                            connected to our Platform.
                                                            <br /> You must not attack the Platform via a
                                                            denial-of-service attack or a distributed
                                                            denial-of service attack, or any other similar
                                                            type of attack or conduct designed to disrupt or
                                                            cause damage the Platform. By breaching this
                                                            provision, you may commit a criminal offence under
                                                            applicable cybercrimes laws. We will report any
                                                            such breach to the relevant law enforcement
                                                            authorities and we will co-operate with those
                                                            authorities by disclosing your identity to them.
                                                            In the event of such a breach, your right to use
                                                            the Platform will cease immediately. <br /> You
                                                            agree that we are not responsible for any
                                                            electronic virus that you may encounter using the
                                                            platform, although we deploy reasonable security
                                                            measures. Routinely scan your PC using any
                                                            reliable virus protection product to detect and
                                                            remove any viruses found. We shall not be liable
                                                            for errors or delays or your inability to access
                                                            the platform. We are not liable for the cost of
                                                            upgrading your equipment to stay current with the
                                                            Platform nor are we responsible for any damage to
                                                            your equipment or the data resident thereon.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />

                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong> Changes to these T&C&apos;s </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            We keep these T&C&apos;s updated regularly and may
                                                            amend them from time to time. Every time you wish
                                                            to use the Platform, please make sure to check
                                                            these T&C&apos;s before you purchase Products or
                                                            request Services through the Platform, to ensure
                                                            you understand the terms that apply at that time
                                                            as the latest version of these T&C&apos;s will apply.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />

                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong> Changes to the Platform </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            We may update and change the Platform from time to
                                                            time for any reason. We will try to give you
                                                            reasonable notice of any major changes.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />

                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong> Termination of use </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            We may, in our sole discretion, terminate or
                                                            suspend your access to and use of the Platform
                                                            without notice for any reason, including for
                                                            violation of these T&C&apos;s or for other conduct
                                                            which we, in our sole discretion, believe is
                                                            unlawful or harmful to us or to others. In the
                                                            event of termination, you will no longer be
                                                            authorised to access the Platform, and we will use
                                                            any means possible to enforce this termination.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />

                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong> Additional terms </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            Some parts of the Platform may be subject to
                                                            additional terms and conditions which apply to
                                                            their use. In such circumstances, such terms and
                                                            conditions will be made clear before your access
                                                            to those parts of the Platform. These T&C&apos;s will
                                                            continue to apply but the additional terms will
                                                            take precedence if there is a conflict between
                                                            them and these T&C&apos;s.
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />

                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong> Governing law </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            These T&C’s shall be governed by and construed in
                                                            accordance with the laws of England and Wales. You
                                                            and we agree that we shall submit to the exclusive
                                                            jurisdiction of the courts of England and Wales in
                                                            relation to any dispute or claim arising out of or
                                                            in connection with these T&C&apos;s or their subject
                                                            matter or formation (including non-contractual
                                                            disputes or claims).
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />

                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                {' '}
                                                                Complaints and how to contact us{' '}
                                                            </strong>{' '}
                                                        </h5>{' '}
                                                        <p className={styles.staticPagesContent}>
                                                            If you have any concerns, complaints and
                                                            questions, or if you wish to contact us for any
                                                            other reason, please get in contact with us using
                                                            the following forms of communication: Send us an
                                                            email at:{' '}<a hrel='mailto:info@healthieru.ae'>info@healthieru.ae</a>
                                                        </p>{' '}
                                                    </Col>{' '}
                                                </Row>{' '}
                                                <br />
                                            </Col>{' '}
                                        </Row>{' '}
                                    </div>{' '}
                                </div>{' '}
                            </Col>{' '}
                        </Row>{' '}
                    </Container>{' '}
                    {authorities.length > 0 &&
                        authorities.some((user) => user === 'ROLE_PATIENT') ? (
                        <> </>
                    ) : authorities.length > 0 &&
                        authorities.some((user) => user === 'ROLE_DOCTOR') ? (
                        <> </>
                    ) : (
                        <Footer />
                    )}{' '}
                </>
            )}
            {/* <Footer /> */}{' '}
        </div>
    );
};

export default TermsAndConditionsStaticPage;
