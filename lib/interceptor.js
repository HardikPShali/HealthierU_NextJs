import axios from 'axios';
import { checkAccessToken } from './service/RefreshAccessTokenService';
import Cookies from 'universal-cookie';
import { deleteTokenHandler } from "./utils";
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

const errorHandler = (error) => {
    const cookies = new Cookies();
    const currentLoggedInUser = cookies.get("currentUser");
    let homeUrl;
    const { authorities = [] } = currentLoggedInUser || {}

    if (!currentLoggedInUser) {
        homeUrl = '/';
    }
    if (authorities.some((user) => user === "ROLE_ADMIN" || user === "ROLE_USER")) {
        homeUrl = '/admin';
    }
    if (authorities.some((user) => user === "ROLE_PATIENT")) {
        homeUrl = '/patient';
    }
    if (authorities.some((user) => user === "ROLE_DOCTOR")) {
        homeUrl = '/doctor';
    }

    if (error.response && (error.response.status === 401)) {
        var index = error.response.data.error;  //unauthorised
        if (index) {
            checkAccessToken();
        }
    }
    if (error.response && (error.response.status === 403)) {
        const allCookies = cookies.getAll()
        for (let key in allCookies) {
            cookies.remove(key)
        }
        cookies.remove("refresh_token", { path: '/' });
        cookies.remove("currentUser", { path: '/' });
        cookies.remove("access_token", { path: '/' });
        cookies.remove("GOOGLE_ACCESS_TOKEN", { path: '/' });
        cookies.remove("GOOGLE_PROFILE_DATA", { path: '/' });
        cookies.remove("authorities", { path: '/' });
        cookies.remove("userProfileCompleted", { path: '/' });
        cookies.remove("profileDetails", { path: '/' });
        deleteTokenHandler().then(() => {
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
        }).catch(err => {
            localStorage.clear();
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
        });
        toast.error('Your account has been deactivated. Please contact the administrator.', {
            autoClose: 5000,
            hideProgressBar: true,
            toastId: "accountDeactivated",
        });
    }
    //console.log("status ::: in error", error.response.status);
    if (error.response && (error.response.status === 504 || error.response.status === 500)) {
        // confirmAlert({
        //   closeOnClickOutside: false,
        //   closeOnEscape: false,
        //   customUI: () => {
        //     return (
        //       <div className="custom-ui">
        //         <h1>Oops !</h1>
        //         <p>

        //           {error.response.data.message === 'Login name already used!' ? error.response.data.message : "Something went wrong. Unexpected error"}
        //           {" "}
        //           <b style={{ color: "red" }}>:(</b>
        //         </p>
        //         <button
        //           onClick={() => {
        //             window.location.assign(homeUrl);
        //           }}
        //         >
        //           Go to Homepage
        //         </button>
        //       </div>
        //     );
        //   }
        // });
    }
    return Promise.reject({ ...error })
}

axios.interceptors.response.use(
    response => {
        //console.log("Response :::", response.status);
        return response;
    },
    error => errorHandler(error)
)