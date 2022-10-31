import { useEffect } from 'react';
import { GOOGLECLIENTID } from '../../lib/utils/configurations'; //CAPTCHA_SITE_KEY

const GoogleSignInButton = ({
  id,
  responseCallBack,
  responseError,
  context = 'signin',
  autoSelect = false,
  theme = 'outline',
  size = 'large',
  width = '100%',
  shape = 'circle',
  text = 'signin_with',
}) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('google btn width', width);
      if (!window.google) {
        googleInit()
          .then(() => {
            renderGoogleSignInBtn();
          })
          .catch(() => {
            console.log('google script load error');
            responseError('google script load error');
          });
      } else {
        initGoogleButton();
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.google) {
        initGoogleButton();
      }
    }
  }, [width, text, context, autoSelect]);

  const googleInit = () => {
    var e = document.createElement('script');
    e.type = 'text/javascript';
    e.async = true;
    e.src = 'https://accounts.google.com/gsi/client';
    var script = document.getElementsByTagName('script')[0];
    script.parentNode.insertBefore(e, script);

    return new Promise((res, rej) => {
      e.onload = res;
      e.onerror = rej;
    });
  };

  const renderGoogleSignInBtn = () => {
    /* google global */

    /* google global */
    window.onload = () => {
      initGoogleButton();
    };
  };

  const initGoogleButton = () => {
    const google = window.google;
    google.accounts.id.initialize({
      client_id: GOOGLECLIENTID,
      callback: responseCallBack,
      context: context,
      auto_select: autoSelect,
    });
    // const width = document.getElementById("signinbtn").clientWidth;
    // console.log("signin button width", width);
    google.accounts.id.renderButton(
      document.getElementById(id),
      { theme: theme, size: size, width: width, shape: shape, text: text } // customization attributes
    );

    google.accounts.id.prompt();
  };

  return <div id={id}></div>;
};

export default GoogleSignInButton;
