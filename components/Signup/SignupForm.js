import { useState, useEffect } from 'react';
import styles from './Signup.module.css';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Cookies from 'universal-cookie';
import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import SelectRole from './SelectRole';
import {
    getPreLoginAccessCode,
    signupWithEmail,
} from '../../lib/service/FrontendApiServices';
import cls from 'classnames';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { handleGoogleAuth } from '../../lib/service/GoogleApiService';
import { activateOtp, getCurrentUserInfo } from '../../lib/service/AccountService';
import Image from 'next/image';
import { toast } from 'react-toastify';

const isNumberOnly = '(?=.*[0-9])';
const isSpecialChar = '(?=[~`!@#$%^&*()--+={}[]|\\:;"\'<>,.?/_₹])';
const islow = '(?=.*[a-z])';
const isup = '(?=.*[A-Z])';

const SignupForm = () => {
    const cookies = new Cookies();

    const [errorMsg, setErrorMsg] = useState({
        userNameExistance: '',
        emailExistance: '',
    });

    const [display, setDisplay] = useState({
        signupForm: 'block',
        whoyouAre: 'none',
        otpPage: 'none',
    });

    const [passwordShown, setPasswordShown] = useState(false);

    const [passwordValidity, setpasswordValidity] = useState({
        minchar: false,
        upcase: false,
        lowcase: false,
        num: false,
    });

    const googleAccessToken = cookies.get('GOOGLE_ACCESS_TOKEN');
    let googleProfileData = {};
    if (googleAccessToken) {
        googleProfileData = jwtDecode(googleAccessToken);
    }

    const [user, setUser] = useState({
        firstName:
            googleProfileData && googleProfileData.given_name
                ? googleProfileData.given_name + ' ' + googleProfileData.family_name
                : '',
        lastName:
            googleProfileData && googleProfileData.family_name
                ? googleProfileData.family_name
                : '',
        email:
            googleProfileData && googleProfileData.email
                ? googleProfileData.email
                : '',
        login:
            googleProfileData && googleProfileData.email
                ? googleProfileData.email
                : '',
        imageUrl:
            googleProfileData && googleProfileData.picture
                ? googleProfileData.picture
                : '',
        password: '',
        langKey: 'en',
        authorities: [],
    });

    const { userNameExistance, emailExistance } = errorMsg;
    const {
        firstName,
        lastName = '',
        email,
        login,
        // imageUrl,
        password,
        authorities,
    } = user;
    const { minchar, upcase, lowcase, num } = passwordValidity;

    const handleClickShowPassword = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleInputchange = (e) => {
        if (e.target.value === ' ') {
            e.preventDefault();
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
            if (e.target.name === 'password') {
                const passvalue = e.target.value;
                setpasswordValidity({
                    minchar: passvalue.length >= 8 ? true : false,
                    num:
                        passvalue.match(isNumberOnly) && passvalue.match(isSpecialChar)
                            ? true
                            : false,
                    lowcase: passvalue.match(islow) ? true : false,
                    upcase: passvalue.match(isup) ? true : false,
                });
            }
        }
    };

    const handleBlurChange = (name) => {
        if (name === 'firstName') {
            const str = firstName;
            const strNew = str.trim();
            setUser({ ...user, firstName: strNew });
        } else if (name === 'lastName') {
            const str = lastName;
            const strNew = str.trim();
            setUser({ ...user, lastName: strNew });
        }
    };

    const emailValidator = new RegExp(
        '^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$'
    );

    const usernameValidator = new RegExp('^[_.@A-Za-z0-9-]*$');
    const nameValidator = new RegExp('^[_.A-Za-z0-9 ]*$');
    ValidatorForm.addValidationRule('isValidEmail', (value) => {
        if (!emailValidator.test(value)) {
            return false;
        } else if (emailValidator.test(value)) {
            return true;
        }
    });

    ValidatorForm.addValidationRule('isValidUserName', (value) => {
        if (!usernameValidator.test(value)) {
            return false;
        } else if (usernameValidator.test(value)) {
            return true;
        }
    });

    ValidatorForm.addValidationRule('isValidName', (value) => {
        if (!nameValidator.test(value)) {
            return false;
        } else if (nameValidator.test(value)) {
            return true;
        }
    });

    ValidatorForm.addValidationRule('isHavingSpace', (value) => {
        if (/^\s/.test(value)) {
            return false;
        } else if (!/^\s/.test(value)) {
            return true;
        }
    });

    // ROLE SELECTION CODE
    // Doctor
    const handleDoctorClick = () => {
        const value = 'ROLE_DOCTOR';
        setUser({ ...user, authorities: [] });
        // if authorities>0 is there then pop the array and push the new value
        authorities.push(value);
        if (
            authorities &&
            authorities.length > 0 &&
            authorities.some((role) => role === 'ROLE_DOCTOR')
        ) {
            handleSignup();
        }
    };

    // Patient and prelogin
    const [showLoginCode, setShowLoginCode] = useState(false);
    const [loginCode, setLoginCode] = useState('');
    const [preLoginAuthicationEnabled, setPreLoginAuthicationEnabled] =
        useState(false);
    const [loginCodeFromApi, setLoginCodeFromApi] = useState('');
    const [loginCodeError, setLoginCodeError] = useState(false);
    const [loginCodeBlankError, setLoginCodeBlankError] = useState(false);
    const [loginCodeMatch, setLoginCodeMatch] = useState(false);

    const handleLoginCodeInput = (e) => {
        setLoginCode(e.target.value);
        setLoginCodeError(false);
        setLoginCodeMatch(false);
        setLoginCodeBlankError(false);
    };

    const preLoginCodeDetailsHandler = async () => {
        const response = await getPreLoginAccessCode();

        if (response.status === 200 && response.data.status === true) {
            setLoginCodeFromApi(response.data.data.preLoginCode);
            setPreLoginAuthicationEnabled(
                response.data.data.isPreLoginAuthenticationEnabled
            );
        } else {
            setPreLoginAuthicationEnabled(false);
        }
    };

    const handlePatientClick = () => {
        const value = 'ROLE_PATIENT';
        setUser({ ...user, authorities: [] });
        // if authorities>0 is there then pop the array and push the new value
        authorities.push(value);
        if (
            authorities &&
            authorities.length > 0 &&
            authorities.some((role) => role === 'ROLE_PATIENT')
        ) {
            // if isPreLoginAuthicationEnabled is true, enable modal popup
            if (preLoginAuthicationEnabled === true) {
                setUser({ ...user, authorities: [] });
                // if authorities>0 is there then pop the array and push the new value
                authorities.push(value);
                setShowLoginCode(true);
            } else if (preLoginAuthicationEnabled === false) {
                console.log('handleSignup Reached');
                setShowLoginCode(false);
                // if isPreLoginAuthicationEnabled is false, call handleSignup
                handleSignup();
            }
        }
    };

    //TODO: to verify login code
    const handlePatientClickAfterLoginCode = () => {
        const value = 'ROLE_PATIENT';
        //verify if login code mathced
        if (loginCode === loginCodeFromApi) {
            console.log('login code matched');
            setLoginCodeMatch(true);
            setUser({ ...user, authorities: [] });
            // if authorities>0 is there then pop the array and push the new value
            authorities.push(value);
            // if matched then call handleSignup
            handleSignup();
        } else if (loginCode === '') {
            // if not matched then show error
            setLoginCodeBlankError(true);
            setLoginCodeError(false);
            console.log('login code not matched');
            setUser({ ...user, authorities: [] });

            setLoginCode('');
            setLoginCodeMatch(false);
        } else {
            // if not matched then show error
            setLoginCodeError(true);
            console.log('login code not matched');
            setUser({ ...user, authorities: [] });

            setLoginCode('');
            setLoginCodeMatch(false);
        }
    };

    const onPreloginModalClode = () => {
        setShowLoginCode(false);
        setLoginCode('');
        setLoginCodeError(false);
        setLoginCodeMatch(false);
        setLoginCodeBlankError(false);
    };

    useEffect(() => {
        preLoginCodeDetailsHandler();
    }, []);

    //Physical trainer
    const handlePhysicaltrainerClick = () => {
        //const value = "UNKNOWN";
        //setUser({ ...user, authorities: [value] })
        handleComingSoonOpen();
    };

    const [comingSoon, setComingSoon] = useState(false);

    const handleComingSoonOpen = () => {
        setComingSoon(true);
    };

    const handleComingSoonClose = () => {
        setComingSoon(false);
    };

    //LOGIC FOR OTP BOXES
    const [otpBox, setOtpBox] = useState(new Array(4).fill(''));
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtpBox([...otpBox.map((ele, i) => (i === index ? element.value : ele))]);

        if (element.nextSibling) {
            element.nextSibling.focus();
        }

        setOtpUser({ ...otpUser, otp: otpBox.join(''), msg: '' });
    };

    //LOGIC FOR OTP SUBMIT
    const [otpUser, setOtpUser] = useState({
        msg: '',
        loggedIn: false,
        otp: '',
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOTPSubmit = async () => {
        const otp = otpBox.join('');

        const data = {
            email: user.email,
            key: otp,
        };

        console.log({ otp });
        if (otp === '') {
            setOtpUser({
                ...otpUser,
                msg: 'OTP cannot be blank. Please enter a valid OTP.',
            });
        } else {
            const res = await activateOtp(data).catch((err) => {
                if (err.response && err.response.status === 406) {
                    setOtpUser({
                        ...otpUser,
                        msg: 'Invalid OTP. Please generate new OTP and try again!',
                    });
                    setOtpBox(new Array(4).fill(''));
                }
            });

            if (
                res.data.message ===
                'Your account has been blocked. Please try after some time.' &&
                res.data.status === false
            ) {
                setOtpUser({
                    ...otpUser,
                    msg: res.data.message,
                });
                setOtpBox(new Array(4).fill(''));
                setTimeout(() => {
                    router.push('/signin');
                }, 3000);
            } else if (
                res.data.message === 'OTP mismatch' &&
                res.data.status === false
            ) {
                setOtpUser({
                    ...otpUser,
                    msg: 'Invalid OTP. Please enter the correct OTP.',
                });
                setOtpBox(new Array(4).fill(''));
            } else if (
                res.data.message === 'Account activated' &&
                res.data.status === true
            ) {
                setOtpBox(new Array(4).fill(''));
                toast.success('Account activated successfully. Please log in.', {
                    autoClose: 3000,
                    hideProgressBar: true,
                    toastId: 'activateAccount',
                });
                clearEveryCookie();
                router.push('/signin');
            } else {
                setOtpUser({
                    ...otpUser,
                    msg: 'Something went wrong. Please try again!',
                });
                setOtpBox(new Array(4).fill(''));
            }
        }
    };

    // to tackle "500 user role reqd." error
    const router = useRouter();

    const queryFromGSign = router.query.formGoogle;
    // console.log({ queryFromGSign });

    useEffect(() => {
        // setTimeout(() => setLoading(false), 1000);

        if (queryFromGSign === 'true') {
            setDisplay({
                ...display,
                signupForm: 'none',
                whoyouAre: 'block',
                otpPage: 'none',
            });
        }
    }, []);

    // SIGNUP LOGIC
    const handleSignup = async () => {
        setShowLoginCode(false);
        //setTransparentLoading(true);
        if (googleAccessToken) {
            const googleUserData = {
                token: googleAccessToken,
                authorities: authorities,
            };
            const _accessToken = await handleGoogleAuth(
                googleUserData,
                history
            ).catch((err) => {
                if (err.response.status === 500 || err.response.status === 504) {
                    //setTransparentLoading(false);
                }
            });

            //console.log(_accessToken);
            if (_accessToken) {
                LocalStorageService.setToken(_accessToken);
                const currentUserInformation = await getCurrentUserInfo().catch(
                    (err) => {
                        if (err.response.status === 500 || err.response.status === 504) {
                            //setTransparentLoading(false);
                        }
                    }
                );
                cookies.set('currentUser', currentUserInformation.data.userInfo, {
                    path: '/',
                });
                const currentLoggedInUser = cookies.get('currentUser');
                const { authorities = [] } = currentLoggedInUser || {};

                if (authorities.some((user) => user === 'ROLE_PATIENT')) {
                    router.push('/patient');
                }
                if (authorities.some((user) => user === 'ROLE_DOCTOR')) {
                    router.push('/doctor');
                }
            }
        }
        if (!googleAccessToken) {
            const response = await signupWithEmail(user).catch((error) => {
                //setTransparentLoading(false);
                setDisplay({ ...display, signupForm: 'block', whoyouAre: 'none' });

                if (
                    error.response &&
                    error.response.status === 500 &&
                    error.response.data.message === 'Login name already used!'
                ) {
                    setErrorMsg({
                        ...errorMsg,
                        userNameExistance:
                            'User name already used. Please try with different user name.',
                    });
                }
                if (
                    error.response &&
                    error.response.status === 500 &&
                    error.response.data.message === 'Email is already in use!'
                ) {
                    setErrorMsg({
                        ...errorMsg,
                        emailExistance:
                            'Email is already in use. Please try with different email.',
                    });
                }
            });

            console.log({ response });
            console.log({ authorities });

            if (response && response.status === 200) {
                //setTransparentLoading(false);

                if (authorities.some((user) => user === 'ROLE_PATIENT')) {
                    toast.success(
                        'OTP is sent to your email. Please check your email and verify OTP.',
                        {
                            autoClose: 3000,
                            hideProgressBar: true,
                            toastId: 'otpSent',
                        }
                    );
                    setDisplay({
                        ...display,
                        signupForm: 'none',
                        whoyouAre: 'none',
                        otpPage: 'block',
                    });
                }
                if (authorities.some((user) => user === 'ROLE_DOCTOR')) {
                    toast.success(
                        'OTP is sent to your email. Please check your email and verify OTP.',
                        {
                            autoClose: 3000,
                            hideProgressBar: true,
                            toastId: 'otpSent',
                        }
                    );
                    setDisplay({
                        ...display,
                        signupForm: 'none',
                        whoyouAre: 'none',
                        otpPage: 'block',
                    });
                }
            }
        }
    };

    // cookie removal function ----> 25072022
    const clearEveryCookie = () => {
        cookies.remove('refresh_token', { path: '/' });
        cookies.remove('currentUser', { path: '/' });
        cookies.remove('access_token', { path: '/' });
        cookies.remove('GOOGLE_ACCESS_TOKEN', { path: '/' });
        cookies.remove('GOOGLE_PROFILE_DATA', { path: '/' });
        cookies.remove('authorities', { path: '/' });
        cookies.remove('userProfileCompleted', { path: '/' });
        cookies.remove('profileDetails', { path: '/' });
    };

    return (
        <div>
            <Header hideButton={true} />

            <Container
                id="signupform-bg"
                className={styles.signupformBg}
                style={{ display: display.signupForm }}
            >
                <Row>
                    <Col md={7}></Col>
                    <Col md={5}>
                        <h2 className={styles.signupTitle}>Sign up</h2>
                        <div className={styles.signupBox}>
                            <ValidatorForm
                                onError={(errors) => console.log(errors)}
                                onSubmit={() => {
                                    setDisplay({
                                        ...display,
                                        signupForm: 'none',
                                        whoyouAre: 'block',
                                    });
                                    window.scrollTo(0, 0);
                                    setErrorMsg({
                                        ...errorMsg,
                                        emailExistance: '',
                                        userNameExistance: '',
                                    });
                                }}
                            >
                                <p>
                                    Full Name<sup>*</sup>
                                </p>
                                <TextValidator
                                    className={styles.inputStandardBasic}
                                    type="text"
                                    name="firstName"
                                    onChange={(e) => handleInputchange(e)}
                                    onBlur={() => handleBlurChange('firstName')}
                                    value={firstName}
                                    disabled={
                                        googleAccessToken && googleAccessToken ? true : false
                                    }
                                    autoComplete="new-password"
                                    validators={[
                                        'required',
                                        'maxStringLength:50',
                                        'isValidName',
                                        'isHavingSpace',
                                        'matchRegexp:^[a-zA-Z ]+$',
                                    ]}
                                    errorMessages={[
                                        'This field is required',
                                        'First name should not exceed 50 characters',
                                        'Please provide a valid Full Name',
                                        'Please do not use whitespace in front First Name',
                                        'First Name cannot have any numeric values',
                                    ]}
                                    variant="filled"
                                />

                                <TextValidator
                                    className={styles.inputStandardBasic}
                                    type="text"
                                    name="lastName"
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleInputchange(e)}
                                    onBlur={() => handleBlurChange('lastName')}
                                    value={lastName ? lastName : ''}
                                    disabled={
                                        googleAccessToken && googleAccessToken ? true : false
                                    }
                                    autoComplete="new-password"
                                    variant="filled"
                                />
                                <br />
                                <p>
                                    Email<sup>*</sup>
                                </p>
                                {emailExistance && (
                                    <label
                                        style={{ fontSize: 12, color: '#ff9393' }}
                                        className="left"
                                    >
                                        {emailExistance}
                                    </label>
                                )}
                                <TextValidator
                                    className={styles.inputStandardBasic}
                                    type="text"
                                    name="email"
                                    onBlur={(e) => handleInputchange(e)}
                                    onChange={(e) => handleInputchange(e)}
                                    value={email}
                                    disabled={
                                        googleAccessToken && googleAccessToken ? true : false
                                    }
                                    autoComplete="new-password"
                                    validators={[
                                        'isValidEmail',
                                        'required',
                                        'maxStringLength:50',
                                    ]}
                                    errorMessages={[
                                        'Please provide valid email',
                                        '',
                                        'Email should not exceed 50 characters',
                                    ]}
                                    variant="filled"
                                />
                                <br />
                                <p>
                                    Username<sup>*</sup>
                                </p>
                                {userNameExistance && (
                                    <label
                                        style={{ fontSize: 12, color: '#ff9393' }}
                                        className="left"
                                    >
                                        {userNameExistance}
                                    </label>
                                )}
                                <TextValidator
                                    className={styles.inputStandardBasic}
                                    type="text"
                                    name="login"
                                    onBlur={(e) => handleInputchange(e)}
                                    onChange={(e) => handleInputchange(e)}
                                    value={login}
                                    disabled={
                                        googleAccessToken && googleAccessToken ? true : false
                                    }
                                    validators={[
                                        'required',
                                        'isValidUserName',
                                        'maxStringLength:30',
                                    ]}
                                    errorMessages={[
                                        'This field is required',
                                        'Please provide a valid username',
                                        'Username should not exceed 30 characters',
                                    ]}
                                    variant="filled"
                                />
                                <br />
                                {!googleAccessToken && (
                                    <>
                                        <p>
                                            Password<sup>*</sup>
                                        </p>
                                        <TextValidator
                                            className={cls(
                                                styles.inputStandardBasic,
                                                styles.pwdSignupForm
                                            )}
                                            type={passwordShown ? 'text' : 'password'}
                                            name="password"
                                            onBlur={(e) => handleInputchange(e)}
                                            onChange={(e) => handleInputchange(e)}
                                            value={password}
                                            validators={[
                                                'required',
                                                'matchRegexp:(?=.*[a-z])',
                                                'matchRegexp:(?=.*[A-Z])',
                                                'matchRegexp:(?=.*[0-9])',
                                                'matchRegexp:(?=[~`!@#$%^&*()--+={}[]|\\:;"\'<>,.?/_₹])',
                                                'minStringLength:8',
                                                'maxStringLength:30',
                                            ]}
                                            errorMessages={[
                                                'This field is required',
                                                'Include at least 1 lower case alpbhabet',
                                                'Include at least 1 upper case alpbhabet',
                                                'Include at least 1 number',
                                                'Include at least 1 special character',
                                                'Minimum of 8 characters',
                                                'Password should not exceed 30 characters',
                                            ]}
                                            variant="filled"
                                            autoComplete="new-password"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {passwordShown ? (
                                                                <VisibilityIcon />
                                                            ) : (
                                                                <VisibilityOffIcon />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />

                                        <div
                                            className={cls(styles.signupText, styles.passValidation)}
                                        >
                                            <input type="radio" required checked={minchar} />
                                            <span>Minimum 8 characters</span>
                                            <br />
                                            <input type="radio" required checked={upcase} />
                                            <span>At least 1 upper case alphabet</span>
                                            <br />
                                            <input type="radio" required checked={lowcase} />
                                            <span>At least 1 lower case alphabet</span>
                                            <br />
                                            <input type="radio" required checked={num} />
                                            <span>Minimum 1 number and 1 special character</span>
                                        </div>
                                    </>
                                )}
                                <p className={styles.signupText}>
                                    By clicking Sign Up, you agree to our Term of Services.
                                </p>
                                <input
                                    className={cls(
                                        'btn',
                                        'w-100',
                                        'py-2',
                                        'pl-2',
                                        styles.signupBtn,
                                        'shadow-sm'
                                    )}
                                    type="submit"
                                    value="Sign Up"
                                />
                            </ValidatorForm>
                            <p className={styles.signupText}>Already a member?</p>
                            <Link className="w-100 d-block" href="/signin">
                                <button
                                    className={cls(
                                        'btn',
                                        'w-100',
                                        'py-2',
                                        'pl-2',
                                        styles.signupBtn,
                                        'shadow-sm'
                                    )}
                                >
                                    Sign In
                                </button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* ROLE SELeCT SECTION */}
            <SelectRole
                style={{ display: display.whoyouAre }}
                handleDoctorClick={handleDoctorClick}
                handlePatientClick={handlePatientClick}
                handlePhysicaltrainerClick={handlePhysicaltrainerClick}
            />

            {/* OTP SECTION */}
            <Container
                id="signupform-bg"
                className={styles.signupformBg}
                style={{ display: display.otpPage }}
            >
                <Row>
                    <Col md={6}></Col>
                    <Col md={5}>
                        <div className={cls('text-center', styles.signupBox)}>
                            <h2 className={cls('text-center', 'pt-2', styles.signupTitle)}>
                                OTP Verification
                            </h2>
                            <p style={{ fontSize: '14px' }}>
                                OTP has been sent to <b>{user.email}</b>
                            </p>

                            <div className={styles.otpBoxDiv}>
                                {otpBox.map((data, index) => {
                                    return (
                                        <input
                                            type="text"
                                            className={styles.otpField}
                                            name="otp"
                                            maxLength="1"
                                            key={index}
                                            value={data}
                                            onChange={(e) => handleChange(e.target, index)}
                                            onFocus={(e) => e.target.select()}
                                        />
                                    );
                                })}
                            </div>
                            {otpUser && (
                                <span style={{ color: 'red', fontSize: '14px' }}>
                                    {otpUser.msg}
                                </span>
                            )}

                            <div>
                                <button
                                    className={styles.otpVerify}
                                    onClick={() => handleOTPSubmit()}
                                >
                                    Verify
                                </button>
                                <button
                                    className={styles.otpVerify}
                                    onClick={() => {
                                        setOtpBox(new Array(4).fill(''));
                                    }}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Dialog aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title">
                        Account Activated Successfully!
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Please Log In.
                            <br />
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Link to="/signin">
                            <button
                                autoFocus
                                onClick={handleClose}
                                className="btn btn-primary sign-btn"
                                id="close-btn"
                            >
                                OK
                            </button>
                        </Link>
                    </DialogActions>
                </Dialog>
            </Container>

            {/* PRE-LOGIN CODE MODAL */}
            <Dialog
                aria-labelledby="customized-dialog-title"
                open={showLoginCode}
                onClose={onPreloginModalClode}
                maxWidth="xs"
                fullWidth={true}
            >
                <DialogTitle id="customized-dialog-title">Enter Login Code</DialogTitle>
                <DialogContent dividers>
                    <input
                        type="text"
                        name="loginCode"
                        onChange={(e) => handleLoginCodeInput(e)}
                        placeholder="Enter Login Code"
                        value={loginCode}
                        className="login-code-input"
                        autoComplete="off"
                        disabled={loginCodeMatch === true}
                    />
                    {loginCodeError && (
                        <span style={{ color: 'red', fontSize: '14px' }}>
                            Pre-login code does not match
                        </span>
                    )}
                    {loginCodeBlankError && (
                        <span style={{ color: 'red', fontSize: '14px' }}>
                            Pre-login code cannot be blank. Please enter code.
                        </span>
                    )}
                    {loginCodeMatch && (
                        <span style={{ color: 'green', fontSize: '14px' }}>
                            Pre-login code matched
                        </span>
                    )}
                </DialogContent>
                <DialogActions>
                    <div>
                        <button
                            autoFocus
                            onClick={handlePatientClickAfterLoginCode}
                            className="btn btn-primary sign-btn"
                        >
                            OK
                        </button>
                    </div>
                </DialogActions>
            </Dialog>
            <Footer />
            <Dialog aria-labelledby="customized-dialog-title" open={comingSoon}>
                {/* <DialogTitle id="customized-dialog-title">Coming Soon!</DialogTitle> */}
                <DialogContent dividers>
                    <div>
                        {/* <img  /> */}
                        <Image
                            src="/images/login-signup/comin_soon_png.png"
                            alt="coming soon"
                            height={443}
                            width={375}
                            effect="blur"
                        />
                        <p className={styles.comingSoonPara}>Coming Soon</p>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={handleComingSoonClose}
                        className={cls('btn', 'btn-primary', styles.comingSoonBtn, 'w-100')}
                        id="close-btn"
                    >
                        OK
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SignupForm;
