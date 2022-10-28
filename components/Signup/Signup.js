import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import GoogleSignInButton from '../Login/GoogleSignInButton';
import styles from './Signup.module.css';
import cls from 'classnames';
import { useRouter } from 'next/router';
import LocalStorageService from '../../lib/utils/LocalStorageService'
import { handleGoogleAuth } from '../../lib/service/GoogleApiService';
import { getCurrentUserInfo } from '../../lib/service/AccountService'

const Signup = () => {
    const router = useRouter();
    const [googleBtnWidth, setGoogleBtnWidth] = useState(500);

    const cookies = new Cookies();

    useEffect(() => {
        const width = document.getElementById('signupBtn').clientWidth;
        setGoogleBtnWidth(width);

        cookies.remove('GOOGLE_ACCESS_TOKEN');
        cookies.remove('GOOGLE_PROFILE_DATA');
        // setTimeout(() => setLoading(false), 1000);
    }, []);

    const storeGoogleToken = (response) => {
        cookies.set("GOOGLE_ACCESS_TOKEN", response.credential, { path: '/' });
        cookies.set("GOOGLE_PROFILE_DATA", response.profileObj, { path: '/' });
        router.push("/signupform");
    };
    const responseGoogle = async (response) => {
        cookies.set("GOOGLE_ACCESS_TOKEN", response.tokenId, { path: '/' });
        cookies.set("GOOGLE_PROFILE_DATA", response.profileObj, { path: '/' });
        const googleUserData = {
            token: response.tokenId,
        };
        const googleAccessToken = await handleGoogleAuth(googleUserData, history);
        if (googleAccessToken) {
            LocalStorageService.setToken(googleAccessToken);

            const currentUserInformation = await getCurrentUserInfo();
            cookies.set("currentUser", currentUserInformation.data.userInfo, { path: '/' });
            const currentLoggedInUser = cookies.get("currentUser");
            const { authorities = [] } = currentLoggedInUser || {};

            if (authorities.some((user) => user === "ROLE_PATIENT")) {
                router.push("/patient");
            }
            if (authorities.some((user) => user === "ROLE_DOCTOR")) {
                router.push("/doctor");
            }
        }
    };

    return (
        <div>
            <Header hideButton={true} />
            <Container id="signup-bg" className={styles.signupBg}>
                <Row>
                    <Col md={7}></Col>
                    <Col md={5}>
                        <h2 className={styles.signupTitle}>Sign up</h2>
                        <div className={styles.signupBox}>
                            <Link href="/signupform">
                                <button
                                    id="signupBtn"
                                    className={cls(
                                        'btn',
                                        'w-100',
                                        'py-2',
                                        'pl-2',
                                        styles.signupBtn,
                                        'shadow-sm'
                                    )}
                                >
                                    <div className={styles.signupBtnWrap}>
                                        <Image
                                            src="/images/svg/mail.svg"
                                            alt=""
                                            className={styles.signupIcon}
                                            width={20}
                                            height={20}
                                        />
                                        Sign up with email
                                    </div>
                                </button>
                            </Link>
                            <p className={styles.textDivider}>
                                <span>or</span>
                            </p>

                            <div className="w-100 mt-3">
                                {googleBtnWidth > 0 && (
                                    <GoogleSignInButton
                                        id="google-signup-btn"
                                        width={googleBtnWidth}
                                        autoSelect={false}
                                        text="signup_with"
                                        context="signup"
                                        responseCallBack={storeGoogleToken}
                                        responseError={(e) => console.log(e)}
                                    />
                                )}
                            </div>
                            <p className={styles.signupText}>Already a member?</p>
                            <Link className="w-100 d-block" href="/signin">
                                <button className={cls(
                                    'btn',
                                    'w-100',
                                    'py-2',
                                    'pl-2',
                                    styles.signupBtn,
                                    'shadow-sm'
                                )}>
                                    Sign In
                                </button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default Signup;
