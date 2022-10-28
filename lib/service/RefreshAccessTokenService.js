import axios from 'axios';
import LocalStorageService from '../utils/LocalStorageService';
import Cookies from 'universal-cookie';
import { deleteTokenHandler } from "../utils";

export const checkAccessToken = (isReload = true) => {

    const cookies = new Cookies();

    var bodyFormData = new FormData();
    bodyFormData.append('refresh_token', cookies.get('refresh_token'));
    bodyFormData.append('grant_type', 'refresh_token');
    var config = {
        method: 'post',
        mode: 'no-cors',
        data: bodyFormData,
        url: `/oauth/token?scope=openid`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'cache-control': 'no-cache',
            'Authorization': 'Basic d2ViX2FwcDpjaGFuZ2VpdA==',
        }
    }
    return axios(config).then(response => {
        // const history =useHistory();
        if (response && response.data) {
            LocalStorageService.setToken(response.data);
            if (isReload) {
                window.location.reload()
            }
        }
    }).catch(error => {
        //redirect to logout
        // return <Logout />
        if (error) {
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
                localStorage.clear();
                // history.push("/");
                // history.go(0);
                window.location.href = "/";
            }).catch(err => {
                localStorage.clear();
                // history.push("/");
                // history.go(0);
                window.location.href = "/";
            });

        }
    })
}