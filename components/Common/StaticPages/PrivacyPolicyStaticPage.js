import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './StaticPages.module.css';

const PrivacyPolicyStaticPage = ({ currentuserInfo }) => {
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
                        <div>You will be redirected to HomePage in 5 sec.</div>
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
                                                <strong>Privacy and Security</strong>
                                            </h3>
                                        </center>
                                        <br />
                                        <Row>
                                            <Col md={12}>
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>Who are we</strong>
                                                        </h5>
                                                        <div className={styles.staticPagesContent}>
                                                            HealthierU (“HealthierU”) is a limited liability
                                                            company licensed in the United Arab Emirates and
                                                            a one-of-a-kind wellness and prevention
                                                            platform(“HealthierU”).
                                                            <br />
                                                            HealthierU is a telehealth platform that offers
                                                            online telemedicine and general health and
                                                            wellness consultation services (the “Services”),
                                                            in addition to products and merchandise
                                                            (“Products”). HealthierU offers its users the
                                                            ability to consult with doctors, wellness coaches,
                                                            nutritionists and other health practitioners or
                                                            health advisors (“Service Providers”) virtually
                                                            from anywhere in the world, in addition to access
                                                            to advanced diagnostic services, health
                                                            assessments, health monitoring and educational
                                                            resources. HealthierU provides personalized,
                                                            comprehensive solutions and health support such as
                                                            fitness training and wellness plans, tailored to
                                                            the user&apos;s needs and lifestyle.
                                                            <br />
                                                            HealthierU respects your privacy and is committed
                                                            to protecting it. This Privacy Policy applies to
                                                            your access to our website{' '}
                                                            <a href="https://healthieru.ae/">
                                                                https://healthieru.ae/
                                                            </a>
                                                            , as well as our mobile application which is
                                                            accessible through smartphone or tablet (“Our
                                                            Platforms”). In this Privacy Policy (the
                                                            “Policy”), we describe how we collect, use, and
                                                            disclose information that we obtain about visitors
                                                            to our Platforms and users of our Services.
                                                            <br />
                                                            For the purposes of this Policy “we”, “our”, “us”
                                                            and “MGW” refer to MG Wellness Holding LLC, “you”
                                                            and “your” refers to any individual accessing our
                                                            Platforms or subscribing to our Services through
                                                            our Platforms, and “Personal Information” means
                                                            any information relating to an identified or
                                                            identifiable natural person, and this may include
                                                            your health data. To understand the types of
                                                            Personal Information we collect about you, you can
                                                            refer to Section 3 of this Policy.
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>Principles we adhere to</strong>
                                                        </h5>
                                                        <div className={styles.staticPagesContent}>
                                                            We will comply with applicable data protection
                                                            laws that apply to our collection and processing
                                                            of your Personal Information. We will:
                                                            <ul>
                                                                <li>
                                                                    process your Personal Information in a lawful,
                                                                    fair, transparent and secure way;
                                                                </li>
                                                                <li>
                                                                    collect your Personal Information only for
                                                                    lawful purposes as explained in this Policy or
                                                                    as otherwise permitted by law;
                                                                </li>
                                                                <li>
                                                                    not use your Personal Information in any way
                                                                    that is incompatible with the purposes for
                                                                    which it was collected;
                                                                </li>
                                                                <li>
                                                                    process your Personal Information in a manner
                                                                    that is adequate and relevant to the purposes
                                                                    for which we have collected it and limited
                                                                    only to those purposes;
                                                                </li>
                                                                <li>
                                                                    keep your Personal Information accurate,
                                                                    complete and, where necessary, up to date; and
                                                                </li>
                                                                <li>
                                                                    keep your Personal Information for a period of
                                                                    time that does not exceed the necessary period
                                                                    for achieving the purposes for which we have
                                                                    collected it.
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>Data collection and use</strong>
                                                        </h5>
                                                        <div className={styles.staticPagesContent}>
                                                            The Personal Information we may collect from you
                                                            includes:
                                                            <ul>
                                                                <li>
                                                                    information establishing your identity (for
                                                                    example, name, address, email address, date of
                                                                    birth, gender);
                                                                </li>
                                                                <li>
                                                                    financial information (for example, credit
                                                                    card details);
                                                                </li>
                                                                <li>
                                                                    information relating to your use of our
                                                                    Services and our Platforms (for example,
                                                                    health conditions, weight, height, any
                                                                    medications you are currently on);
                                                                </li>
                                                                <li>
                                                                    information relating to a purchase or
                                                                    potential purchase of Products offered on our
                                                                    Platforms (such as records of purchase and
                                                                    feedback provided by you);
                                                                </li>
                                                                <li>
                                                                    (e) any information you independently choose
                                                                    to provide to us (for example, if you send us
                                                                    an email or contact our Customer Service
                                                                    Team).
                                                                </li>
                                                            </ul>
                                                            If you choose not to provide your Personal
                                                            Information when we ask you, this may limit the
                                                            Products and Services we can offer you. For
                                                            example, if you do not provide your weight, a
                                                            nutritionist offering Services on our Platforms
                                                            may not be able to provide you with nutritional
                                                            advice.
                                                            <br />
                                                            <strong>
                                                                Automatic Information Collection:
                                                            </strong>{' '}
                                                            We may collect certain information automatically
                                                            when you use our Platforms, such as your Internet
                                                            protocol (IP) address, device and advertising
                                                            identifiers, browser type, operating system,
                                                            Internet service provider, the date and time of
                                                            your visit, information about the links you click,
                                                            the pages you view, the general manner in which
                                                            you navigate through the Platforms, and other
                                                            standard server log information.
                                                        </div>
                                                        <br />
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>How we obtain your information</strong>
                                                        </h5>
                                                        <div className={styles.staticPagesContent}>
                                                            We may collect your Personal Information during
                                                            the course of our relationship with you and will
                                                            only use your Personal Information in accordance
                                                            with applicable data protection laws.
                                                            <br />
                                                            We may obtain this information from a variety of
                                                            sources, including:
                                                            <ul>
                                                                <li>
                                                                    from you directly (for example, when you
                                                                    access our Services or purchase Products from
                                                                    our Platforms, when you make an inquiry about
                                                                    one of our Services, send us an email, or
                                                                    otherwise provide us with your Personal
                                                                    Information);
                                                                </li>
                                                                <li>from third party suppliers; and</li>
                                                                <li>
                                                                    from advertisers or marketing companies.
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <br />
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>How we use your information</strong>
                                                        </h5>
                                                        <div className={styles.staticPagesContent}>
                                                            We may use or process your Personal Information
                                                            for the following purposes:
                                                            <ul>
                                                                <li>
                                                                    to provide you with information about our
                                                                    Services, Products offered on our Platforms
                                                                    and other information that we think may be
                                                                    valuable to you;
                                                                </li>
                                                                <li>
                                                                    to facilitate the supply of the Services to
                                                                    you;
                                                                </li>
                                                                <li>
                                                                    to personalize your experience of using our
                                                                    Platforms and offer content that is relevant
                                                                    to you and your geographic region (such as
                                                                    offers or promotions); and provide you with
                                                                    tailored recommendations.
                                                                </li>
                                                                <li>
                                                                    to respond to any queries, requests, or
                                                                    comments that you may have;
                                                                </li>
                                                                <li>to process your payments; </li>
                                                                <li>
                                                                    to review, develop and improve the Products
                                                                    and Services which we offer; and{' '}
                                                                </li>
                                                                <li>to comply with our legal obligations. </li>
                                                                <li>
                                                                    to understand and analyze how you use our
                                                                    Services and to develop new products,
                                                                    services, features, and functionality.
                                                                </li>
                                                                <li>
                                                                    to make automated decisions based on your
                                                                    information to generate better answers to your
                                                                    health needs.{' '}
                                                                </li>
                                                                <li>
                                                                    to connect you with a doctor/specialist that
                                                                    suits your needs.{' '}
                                                                </li>
                                                                <li>
                                                                    for marketing and advertising purposes such as
                                                                    developing and providing promotional and
                                                                    advertising materials that may be relevant,
                                                                    valuable, or otherwise of interest to you.
                                                                    Using information will assist in advertising
                                                                    on third-party websites.{' '}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <br />
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                On what basis will we use your information?
                                                            </strong>
                                                        </h5>
                                                        <div className={styles.staticPagesContent}>
                                                            We use your Personal Information on the following
                                                            bases:
                                                            <ul>
                                                                <li>
                                                                    for the provision of our wellness services and
                                                                    treatment or management of your health;{' '}
                                                                </li>
                                                                <li>
                                                                    because the information is necessary for the
                                                                    performance of a contract with you or to take
                                                                    steps at your request to enter into a contract
                                                                    for the provision of the Services or the
                                                                    purchase of the Products;{' '}
                                                                </li>
                                                                <li>
                                                                    because you have given your consent (if we
                                                                    expressly ask for consent to process your
                                                                    Personal Information, for a specific purpose);
                                                                    and{' '}
                                                                </li>
                                                                <li>
                                                                    to comply with our legal and regulatory
                                                                    obligations.{' '}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <br />
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                With whom do we share your information?
                                                            </strong>
                                                        </h5>
                                                        <div className={styles.staticPagesContent}>
                                                            We will only disclose or transfer your Personal
                                                            Information (on need-to-know basis) for the
                                                            purposes set out in this Policy to:
                                                            <ul>
                                                                <li>
                                                                    the Service Providers that are providing the
                                                                    Service to you through our Platforms;
                                                                </li>
                                                                <li>
                                                                    third party service providers and
                                                                    sub-contractors that provide a service to us
                                                                    which is related to the provision of our
                                                                    Platform, Services or Products (including but
                                                                    not limited to product delivery, software
                                                                    providers, marketing and advertising, data
                                                                    processing, IT and office services);{' '}
                                                                </li>
                                                                <li>any member of our group; and</li>
                                                                <li>
                                                                    (d) any competent authorities if we are
                                                                    legally required to comply with a request to
                                                                    disclose your Personal Information.{' '}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <br />
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>
                                                                Countries to which we transfer your information
                                                            </strong>
                                                        </h5>
                                                        <div className={styles.staticPagesContent}>
                                                            The Personal Information we collect from you may
                                                            be transferred, stored and hosted outside of the
                                                            country from which you may be accessing our
                                                            Platforms. We will not transfer all of the
                                                            Personal Information we collect on you, as certain
                                                            health data cannot be transferred outside of the
                                                            country it was collected from according to
                                                            applicable laws.
                                                            <br />
                                                            Certain Personal Information may be transferred to
                                                            countries which do not have data protection laws
                                                            or to countries where your privacy and other
                                                            fundamental rights will not be protected as
                                                            extensively by legislation. In those cases, we
                                                            will ensure that all transmissions of your
                                                            Personal Information will remain secure and under
                                                            our sole control.
                                                            <br />
                                                            We will implement appropriate measures to ensure
                                                            that your Personal Information remains protected
                                                            and secure when it is transferred outside your
                                                            home country and you can exercise your rights
                                                            effectively in compliance with applicable laws.
                                                        </div>
                                                        <br />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>Cookies</strong>
                                                        </h5>
                                                        <div className={styles.staticPagesContent}>
                                                            Cookies are small pieces of information that your
                                                            browser stores on your computer when requested by
                                                            a website.
                                                            <br />
                                                            We request your browser to store a cookie when you
                                                            access our Platforms and may request your browser
                                                            to store one or more cookies when you make
                                                            purchases, request or personalize information, or
                                                            request certain Services.
                                                            <br />
                                                            Our Platforms may use certain first party Cookies
                                                            on your computer or device. First party Cookies
                                                            are those placed directly by us and are used only
                                                            by us. We use Cookies to facilitate and improve
                                                            your experience of our Platforms and to provide
                                                            and improve our Services. We have carefully chosen
                                                            these Cookies and have taken steps to ensure that
                                                            your privacy and Personal Information are
                                                            protected and respected at all times.
                                                            <br />
                                                            We use cookies, Local Shared Objects, and similar
                                                            technologies for technical reasons to enable the
                                                            efficient operation of the Platforms, to enhance
                                                            the ease of use of the Platforms, and to gather
                                                            statistics on how you use our Platforms. By using
                                                            the Platforms, you consent to our use of cookies
                                                            and similar technologies. You may object to our
                                                            storage of cookies and similar technologies, but
                                                            certain functionalities on the Platforms may no
                                                            longer function for you if you choose to do so.
                                                            <br />
                                                            Some third parties collect information about users
                                                            of our Platforms to provide interest-based
                                                            advertising on our Platforms and elsewhere,
                                                            including across browsers and devices. These third
                                                            parties may use the information they collect on
                                                            our Platforms to make predictions about your
                                                            interests in order to provide you ads (from us and
                                                            other companies) across the internet. Some of
                                                            these third parties may participate in an industry
                                                            organization that gives users the opportunity to
                                                            opt out of receiving ads that are tailored based
                                                            on your online activities. Due to differences
                                                            between using apps and websites on mobile devices,
                                                            you may need to take additional steps to disable
                                                            targeted ad technologies in mobile apps. Many
                                                            mobile devices allow you to opt out of targeted
                                                            advertising for mobile apps using the settings
                                                            within the mobile app or your mobile device. For
                                                            more information, please check your mobile
                                                            settings.
                                                        </div>
                                                        <br />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>Data Retention</strong>
                                                        </h5>
                                                        <div className={styles.staticPagesContent}>
                                                            We will keep your Personal Information only for as
                                                            long as is necessary to respond to any queries or
                                                            complaints, to improve the Services that we offer
                                                            to you or to comply with any legal obligations to
                                                            which we may be subject.
                                                            <br />
                                                            To determine the appropriate retention period for
                                                            Personal Information, we consider the amount,
                                                            nature, and sensitivity of the Personal
                                                            Information, the potential risk of harm from
                                                            unauthorised use or disclosure of your Personal
                                                            Information, the purposes for which we process
                                                            your Personal Information and whether we can
                                                            achieve such purposes through other means, and the
                                                            applicable legal requirements.
                                                        </div>
                                                        <br />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>Your Rights</strong>
                                                        </h5>
                                                        <div className={styles.staticPagesContent}>
                                                            Please contact us if you would like to:
                                                            <ul>
                                                                <li>
                                                                    <strong>Access your data</strong> - request a
                                                                    copy of your Personal Information that we have
                                                                    stored;
                                                                </li>
                                                                <li>
                                                                    <strong>Correct your data</strong> - request
                                                                    us to amend or update your Personal
                                                                    Information where it is inaccurate or
                                                                    incomplete;
                                                                </li>
                                                                <li>
                                                                    <strong>Erase your data</strong> - request us
                                                                    to delete your Personal Information where it
                                                                    is no longer necessary for the purpose(s) for
                                                                    which your Personal Information was originally
                                                                    collected, subject to our legal obligations;
                                                                </li>
                                                                <li>
                                                                    <strong>
                                                                        Request the transfer of your data
                                                                    </strong>{' '}
                                                                    - request us to transfer your Personal
                                                                    Information to a third party;
                                                                </li>
                                                                <li>
                                                                    <strong>
                                                                        Object to the use of your data
                                                                    </strong>{' '}
                                                                    - at any time, object to us processing your
                                                                    Personal Information under certain
                                                                    circumstances, such as if such processing is
                                                                    not necessary to achieve the purposes for
                                                                    which the Personal Information has been
                                                                    collected by us;{' '}
                                                                </li>
                                                                <li>
                                                                    <strong>
                                                                        Object to certain types of processing
                                                                    </strong>{' '}
                                                                    - at any time, you can object to us processing
                                                                    your Personal Information using automated
                                                                    processing means;
                                                                </li>
                                                                <li>
                                                                    <strong>
                                                                        Be notified of unauthorised access or
                                                                        disclosure
                                                                    </strong>{' '}
                                                                    - you have the right to be notified if an
                                                                    inaccurate record of your Personal Information
                                                                    has been shared with a third party, or if your
                                                                    Personal Information has been unlawfully or
                                                                    accidentally accessed by a third party;
                                                                </li>
                                                                <li>
                                                                    <strong>Withdraw your consent</strong> - you
                                                                    have the right to withdraw your consent at any
                                                                    time to the use of your Personal Information
                                                                    for a particular purpose (where we have asked
                                                                    you for consent to use your Personal
                                                                    Information for that particular purpose).
                                                                </li>
                                                            </ul>
                                                            For any of the above, please email us at{' '}
                                                            <a href="mailto: info@healthieru.ae">
                                                                info@healthieru.ae{' '}
                                                            </a>
                                                            <br />
                                                            Subject to any overriding legal obligations,
                                                            requirements and/or exemptions, we will endeavour
                                                            to respond to your request within thirty (30) days
                                                            of receipt, unless we require further information
                                                            from you. We may ask you to provide proof of your
                                                            identity.
                                                            <br />
                                                            If you feel that we do not comply with applicable
                                                            data protection and privacy rules, you may lodge a
                                                            complaint with the data protection authority, the
                                                            UAE Data Office at{' '}
                                                            <a href="mailto: info@healthieru.ae">
                                                                info@healthieru.ae{' '}
                                                            </a>
                                                        </div>
                                                        <br />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>Children</strong>
                                                        </h5>
                                                        <div className={styles.staticPagesContent}>
                                                            We are committed to protecting the privacy needs
                                                            of children and we encourage parents and guardians
                                                            to take an active role in their children&apos;s online
                                                            activities and interests. We do not knowingly
                                                            collect information from children and we do not
                                                            target our Platforms to children.
                                                        </div>
                                                        <br />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>Security</strong>
                                                        </h5>
                                                        <div className={styles.staticPagesContent}>
                                                            We are committed to protecting the Personal
                                                            Information you provide us. We have implemented
                                                            security policies, rules and technical measures to
                                                            protect the Personal Information that we have
                                                            under our control, in accordance with applicable
                                                            data protection laws. The security measures are
                                                            designed to prevent unauthorised access, improper
                                                            use or disclosure, unauthorised modification and
                                                            unlawful destruction or accidental loss. In
                                                            addition, we limit access to your Personal
                                                            Information to those employees, agents,
                                                            contractors and other third parties who have a
                                                            business need to know. They will only process your
                                                            Personal Information on our instructions and they
                                                            are subject to a duty of confidentiality.
                                                            <br />
                                                            We have put in place procedures to deal with any
                                                            suspected data security breach and will notify you
                                                            and any applicable regulator of a suspected breach
                                                            where we are legally required to do so.
                                                            <br />
                                                            Please note that information collected by third
                                                            parties may not have the same security protections
                                                            as information you submit to us, and we are not
                                                            responsible for protecting the security of such
                                                            information.
                                                        </div>
                                                        <br />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>Hyperlinks</strong>
                                                        </h5>
                                                        <div className={styles.staticPagesContent}>
                                                            Our Platforms may provide links to third party
                                                            websites for your convenience. If you access those
                                                            links, you will leave our Platforms. We do not
                                                            control those websites or their privacy practices,
                                                            which may differ from ours. We do not endorse or
                                                            make any representations about third party
                                                            websites. This Policy does not cover the personal
                                                            data you choose to give to unrelated third
                                                            parties. We encourage you to review the privacy
                                                            policy of any company before submitting your
                                                            Personal Information. Some third party companies
                                                            may choose to share their personal data with us;
                                                            that sharing is governed by that third party
                                                            company&apos;s privacy policy.
                                                        </div>
                                                        <br />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>Notification of Changes</strong>
                                                        </h5>
                                                        <div className={styles.staticPagesContent}>
                                                            We may be required to update or change our Policy
                                                            from time to time. We will upload an updated
                                                            Policy on our Platforms. If there are any
                                                            significant changes to the Policy (e.g. if we
                                                            decide to use your Personal Information in a
                                                            manner different from that stated at the time it
                                                            was collected), we will notify you by email.
                                                        </div>
                                                        <br />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>
                                                            <strong>Contacting us</strong>
                                                        </h5>
                                                        <div className={styles.staticPagesContent}>
                                                            This Policy sets out in broad terms how we handle
                                                            your Personal Information and safeguard our
                                                            privacy. If you have any questions relating to our
                                                            Policy or if you would like to enforce any of your
                                                            rights, you can contact us at {" "}<a href='mailto:info@healthieru.ae'>info@healthieru.ae</a>
                                                            <br />
                                                        </div>
                                                        <br />
                                                    </Col>
                                                </Row>
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

            {/* <Footer /> */}
        </div>
    );
};

export default PrivacyPolicyStaticPage;
