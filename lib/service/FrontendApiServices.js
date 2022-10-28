import axios from "axios";
import LocalStorageService from "../utils/LocalStorageService";
import { commonUtilFunction } from "../utils";

// GET PRE-LOGIN ACCESS CODE FOR SIGNUP
export const getPreLoginAccessCode = async () => {
    var payload = {
        method: 'get',
        mode: 'no-cors',
        url: `/api/v2/pre-login`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };
    const response = await axios(payload).then(res => {
        if (res) {
            return res;
        }
    });
    return response;
}

// SIGNUPFORM
export const signupWithEmail = async (userData) => {
    var payload = {
        method: "post",
        mode: "no-cors",
        data: JSON.stringify(userData),
        url: "/api/mobile/register",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    };
    const response = await axios(payload).then((res) => {
        if (res) {
            return res;
        }
    });
    return response;
};

//PRE-LOGIN API FOR ADMIN
export const addPreLoginAccessCode = async (data) => {
    var payload = {
        method: "post",
        data: data,
        mode: "no-cors",
        url: `/api/v2/pre-login`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        },
    };
    const response = await axios(payload).then((res) => {
        if (res) {
            return res;
        }
    });
    return response;
};
export const editPreLoginAccessCode = async (data) => {
    var payload = {
        method: "put",
        data: data,
        mode: "no-cors",
        url: `/api/v2/pre-login`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        },
    };
    const response = await axios(payload).then((res) => {
        if (res) {
            return res;
        }
    });
    return response;
};