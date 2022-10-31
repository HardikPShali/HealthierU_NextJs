import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from 'react';
import styles from './Signin.module.css';
import cls from 'classnames';
import {
  accountActivationCheckBeforeTokenGeneration,
  getCurrentUserInfo,
  handleSignin,
} from '../../lib/service/AccountService';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import LocalStorageService from '../../lib/utils/LocalStorageService';
import GoogleSignInButton from './GoogleSignInButton';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../lib/redux/userSlice';
import TransparentLoader from '../Common/Loader/TransparentLoader';
import Loader from '../Common/Loader/Loader';

const Signin = () => {
  const router = useRouter();
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);

  const [googleBtnWidth, setGoogleBtnWidth] = useState(500);

  const [user, setUser] = useState({
    msg: '',
    loggedIn: false,
    email: '',
    password: '',
    otp: '',
  });
  const { email, password, msg, otp } = user;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // You now have access to `window`
      const width = document.getElementById('signinbtn').clientWidth;
      setGoogleBtnWidth(width);
    }
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value, msg: '' });
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const handleClickShowPassword = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const emailValidator = new RegExp(
    '^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$'
  );
  ValidatorForm.addValidationRule('isValidEmail', (value) => {
    if (!emailValidator.test(value)) {
      return false;
    } else if (emailValidator.test(value)) {
      return true;
    }
  });

  const removeAllCookies = () => {
    const allCookies = cookies.getAll();

    for (let key in allCookies) {
      cookies.remove(key);
    }
  };

  const [currentUser, setCurrentUser] = useState();
  const getCurrentUserData = async () => {
    const currentUserInformation = await getCurrentUserInfo().catch((err) => {
      if (err.response.status === 500 || err.response.status === 504) {
        setLoading(false);
      }
    });
    console.log({ currentUserInformation });
    setCurrentUser(currentUserInformation.data.userInfo);

    const { authorities = [] } = currentUserInformation.data.userInfo || {};

    // delete currentUserInformation.data.role.languages;
    // delete currentUserInformation.data.role.bio;
    // delete currentUserInformation.data.role.specialities;
    // delete currentUserInformation.data.role.specialitiesList;
    // delete currentUserInformation.data.role.educationalQualifications;

    // cookies.set('currentUser', currentUserInformation.data.userInfo, {
    //   path: '/',
    // });
    // currentUserInformation.data.role.firebasePwd =
    //   currentUserInformation.data.firebasePwd;
    // if (!currentUserInformation.data.role.email) {
    //   currentUserInformation.data.role.email =
    //     currentUserInformation.data.userInfo.email;
    // }
    // cookies.set('profileDetails', currentUserInformation.data.role, {
    //   path: '/',
    // });

    dispatch(
      login({
        currentUser: currentUserInformation.data.userInfo,
        profileDetails: currentUserInformation.data.role,
      })
    );

    if (
      authorities.some((user) => user === 'ROLE_ADMIN' || user === 'ROLE_USER')
    ) {
      router.push('/admin');
      // router.go(0);
    }

    if (authorities.some((user) => user === 'ROLE_PATIENT')) {
      router.push('/patient');
      // router.go(0);
    }
    if (authorities.some((user) => user === 'ROLE_DOCTOR')) {
      router.push('/doctor');
      // router.go(0);
    }
  };

  const handleSigninHandler = async () => {
    let encodedPassword = encodeURIComponent(password);
    removeAllCookies();
    // SIGNIN LOGIC
    const response = await handleSignin(email, encodedPassword).catch((err) => {
      if (err.response && err.response.status === 400) {
        setUser({
          ...user,
          msg: 'Invalid email or password combination. Please try again',
        });
        setLoader(false);
      } else if (err.response && err.response.status === 401) {
        setLoader(false);
        handleActivateErrorOpen();
      }
    });
    if (response && response.data) {
      LocalStorageService.setToken(response.data);
      getCurrentUserData();
    }
  };

  const handleLogin = async (e) => {
    //if (captchaVerify) {
    setLoader(true);
    const accountCheckResponse =
      await accountActivationCheckBeforeTokenGeneration(email).catch((err) =>
        console.log({ err })
      );

    console.log({ accountCheckResponse });

    if (accountCheckResponse.data.status === true) {
      handleSigninHandler();
    } else if (accountCheckResponse.data.data.registerAgain === true) {
      // setLoader(false);
      toast.error(
        'Your account was not registered properly. Please register again.',
        {
          autoClose: 3000,
          hideProgressBar: true,
          toastId: 'accountNotRegistered',
        }
      );
      setTimeout(() => {
        router.push('/signup');
      }, 3000);
    } else if (
      accountCheckResponse.data.data.registerAgain === false &&
      accountCheckResponse.data.message === 'Your account has been deactivated'
    ) {
      //setLoader(false);
      toast.error(
        'Your account has been deactivated. Please contact the administrator.',
        {
          autoClose: 5000,
          hideProgressBar: true,
          toastId: 'accountDeactivated',
        }
      );
    } else if (
      accountCheckResponse.data.message ===
      'Your account has been deactivated. Please contact administrator'
    ) {
      //setLoader(false);
      toast.error(
        'Your account has been deactivated. Please contact the administrator.',
        {
          autoClose: 5000,
          hideProgressBar: true,
          toastId: 'accountDeactivated',
        }
      );
    } else if (
      accountCheckResponse.data.data.profileComplete === true &&
      accountCheckResponse.data.data.approved === false
    ) {
      handleSigninHandler();
    } else if (accountCheckResponse.data.data.unrgistered === true) {
      //setLoader(false);
      setUser({
        ...user,
        msg: 'Invalid email or password combination. Please try again',
      });
    } else {
      //setLoader(false);
      toast.error('Something went wrong. Please try again.', {
        autoClose: 5000,
        hideProgressBar: true,
        toastId: 'somethingWentWrong',
      });
    }
  };

  const responseGoogle = async (response) => {
    removeAllCookies();
    // setLoader(true);
    storeGoogleToken(response);
    const googleUserData = {
      token: response.credential,
    };
    const googleAccessToken = await handleGoogleAuth(
      googleUserData,
      history
    ).catch((err) => {
      console.log({ err });
      if (err.response.status === 500 || err.response.status === 504) {
        setLoader(false);
      }
    });
    if (googleAccessToken) {
      //console.log("googleAccessToken  :: ", googleAccessToken);
      LocalStorageService.setToken(googleAccessToken);
      getCurrentUserData();
      // triggerFcmTokenHandler();
    }
    // setLoader(false);
  };

  return (
    <div>
      {loading && <Loader />}
      {loader && <TransparentLoader />}
      <Header hideButton={true} />
      <div id="signin-bg" className={styles.signinBg}>
        <Container>
          <Row>
            <Col md={7}></Col>
            <Col md={5}>
              <h2 className={styles.signinTitle}>Sign in</h2>
              <div className={styles.signBox}>
                <ValidatorForm
                  onError={(errors) => console.log(errors)}
                  onSubmit={(e) => handleLogin(e)}
                >
                  <label
                    style={{ fontSize: 12, color: '#ff9393' }}
                    className="left"
                  >
                    {msg}
                  </label>
                  <p>
                    Email<sup>*</sup>
                  </p>
                  <TextValidator
                    className={styles.inputStandardBasic}
                    type="email"
                    name="email"
                    onChange={(e) => handleInputChange(e)}
                    value={email}
                    validators={[
                      // "isValidEmail",
                      'required',
                      'maxStringLength:50',
                    ]}
                    errorMessages={[
                      // "Please enter a valid email",
                      'This field is required',
                      'Email should not exceed 50 characters',
                    ]}
                    variant="filled"
                  />
                  <br />
                  <p>
                    Password<sup>*</sup>
                  </p>
                  <TextValidator
                    className={styles.inputStandardBasic}
                    name="password"
                    type={passwordShown ? 'text' : 'password'}
                    onChange={(e) => handleInputChange(e)}
                    value={password}
                    validators={['required']}
                    errorMessages={['This field is required']}
                    variant="filled"
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
                  <Link href="/forget-password" className={styles.forgetText}>
                    Forgot password?
                  </Link>
                  <input
                    id="signinbtn"
                    className={cls('btn', styles.signBtn, 'shadow-sm')}
                    type="submit"
                    value="Sign In"
                  />
                </ValidatorForm>
                <div className="w-100 mt-3">
                  <GoogleSignInButton
                    id="google-btn"
                    width={googleBtnWidth}
                    responseCallBack={responseGoogle}
                    responseError={(e) => console.log(e)}
                  />
                </div>
                <div className="row">
                  <div className="col-12">
                    <p className={styles.signupText}>
                      Don&apos;t have an account yet?
                    </p>
                    <Link className="w-100 d-block" href="/signup">
                      <button
                        className={cls('btn', styles.signBtn, 'shadow-sm')}
                      >
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Signin;
