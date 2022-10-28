import axios from 'axios';
import LocalStorageService from '../utils/LocalStorageService';
import { AUTH_CODE } from '../utils/configurations';

export const getCurrentUserInfo = async () => {

    const userInfoApiCall = {
        method: 'get',
        url: `/api/v2/account`,
        headers: {
            'Authorization': 'Bearer ' + LocalStorageService.getAccessToken(),
            'Content-Type': 'application/json'
        }
    };
    const currentUserInformation = await axios(userInfoApiCall);

    return currentUserInformation.data
}


export const getCurrentPatientInfo = async (userid, userName) => {

    const patientInfoApiCall = {
        method: 'post',
        url: `/api/mobile/current-patient-info`,
        data: {
            userId: userid,
            firstName: userName
        },
        headers: {
            'Authorization': 'Bearer ' + LocalStorageService.getAccessToken(),
            'Content-Type': 'application/json'
        }
    };
    const currentPatientInformation = await axios(patientInfoApiCall);

    return currentPatientInformation.data
}

export const getPatientInfoByPatientId = async (patientId) => {

    const patientInfoApiCall = {
        method: 'get',
        url: `/api/admin/patients?userId.equals=` + patientId,
        headers: {
            'Authorization': 'Bearer ' + LocalStorageService.getAccessToken(),
            'Content-Type': 'application/json'
        }
    };
    const currentPatientInformation = await axios(patientInfoApiCall);

    return currentPatientInformation.data
}


export const getCurrentDoctorInfo = async (userId, username) => {

    const doctorInfoApiCall = {
        method: 'get',
        url: `/api/mobile/current-doctor-info?userid=${userId}&username=${username}`,
        headers: {
            'Authorization': 'Bearer ' + LocalStorageService.getAccessToken(),
            'Content-Type': 'application/json'
        }
    };
    const currentDoctorInformation = await axios(doctorInfoApiCall);

    return currentDoctorInformation.data

}


export const getDoctorDetails = async (doctorId) => {

    const doctorInfoApiCall = {
        method: 'get',
        url: `/api/doctors/` + doctorId,
        headers: {
            'Authorization': 'Bearer ' + LocalStorageService.getAccessToken(),
            'Content-Type': 'application/json'
        }
    };
    const currentDoctorInformation = await axios(doctorInfoApiCall);

    return currentDoctorInformation.data
}

export const handleSignin = async (username, password) => {
    var config = {
        method: 'post',
        mode: 'no-cors',
        url: `/oauth/token?grant_type=password&scope=openid&username=${username}&password=${password}`, //&grant_type=password&scope=openid
        headers: {
            'Authorization': 'Basic ' + AUTH_CODE,
        }
    }
    const response = await axios(config);

    return response;
}

export const activateUser = async (key) => {
    var activateUserCall = {
        method: 'get',
        url: `/api/mobile/activate?key=${key}`,
    };
    const response = await axios(activateUserCall);

    return response;
}


export const sendOtpEmail = async () => {
    var payload = {
        method: 'post',
        mode: 'no-cors',
        url: `/api/admin-2FA-request`,
        headers: {
            'Authorization': 'Bearer ' + LocalStorageService.getAccessToken(),
            'Content-Type': 'application/json'
        }
    };
    const response = await axios(payload).then(res => {
        if (res) {
            return res;
        }
    });
    return response;
}

export const verifyOtp = async (otp) => {
    var payload = {
        method: 'post',
        mode: 'no-cors',
        url: `/api/admin-2FA-validation?key=${otp}`,
        headers: {
            'Authorization': 'Bearer ' + LocalStorageService.getAccessToken(),
            'Content-Type': 'application/json'
        }

    };
    const response = await axios(payload).then(res => {
        if (res) {
            return res;
        }
    });
    return response;
}

export const activateOtp = async (data) => {
    var payload = {
        method: 'post',
        mode: 'no-cors',
        data: data,
        url: `/api/mobile/activate`,
        headers: {
            // 'Authorization': 'Bearer ' + LocalStorageService.getAccessToken(),
            'Content-Type': 'application/json'
        }

    };
    const response = await axios(payload).then(res => {
        if (res) {
            return res;
        }
    });
    return response;
}


export const accountActivationCheckBeforeTokenGeneration = async (data) => {
    var payload = {
        method: 'post',
        mode: 'no-cors',
        data: data,
        url: `/api/mobile/account/activation/check?email=${data}`,
        headers: {
            // 'Authorization': 'Bearer ' + LocalStorageService.getAccessToken(),
            'Content-Type': 'application/json'
        }

    };
    const response = await axios(payload).then(res => {
        if (res) {
            return res;
        }
    });
    return response;
}