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

//PATIENT
export const getUnreadNotificationsCount = async (userId) => {
    var payload = {
        method: 'get',
        mode: 'no-cors',
        url: `/api/v2/count/unread/notification?userId=${userId}`,
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

export const putMarkAsReadNotification = async (userId) => {
    var payload = {
        method: "put",
        mode: "no-cors",
        url: `/api/v2/mark-all-as-read?userId=${userId}`,
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

export const putMarkAsReadFromNotificationMenu = async (data, userId) => {
    var payload = {
        method: "put",
        data: data,
        mode: "no-cors",
        url: `/api/v2/set/read/notification?userId=${userId}`,
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

export const pushNotificationsApi = async (userId) => {
    var payload = {
        method: 'get',
        mode: 'no-cors',
        url: `/api/v2/notifications?userId=${userId}`,
        headers: {
            'Authorization': 'Bearer ' + LocalStorageService.getAccessToken(),
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

export const getUpcomingAppointmentsForHomepage = async () => {
    var payload = {
        method: "get",
        mode: "no-cors",
        url: `/api/v2/appointments/upcoming`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
            "Content-Type": "application/json",
        },
    };
    const response = await axios(payload).then((res) => {
        if (res) {
            return res;
        }
    });
    return response;
};

export const getHealthAssessment = async (patientId) => {
    var payload = {
        method: "get",
        mode: "no-cors",
        url: `/api/v2/assessment?patientId=${patientId}`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
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

export const getSearchDataAndFilter = (data, offset, limit, patientId) => { //page ofset, size limit
    var payload = {
        method: "post",
        mode: "no-cors",
        data: data,
        url: `/api/mobile/tab/doctors?sort=id,desc&page=${offset}&size=${limit}&patientId=${patientId}`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    };
    return axios(payload);
};

export const getLikedDoctorByPatientId = async (
    patientId,
    likedOffset
) => {
    var payload = {
        method: "get",
        mode: "no-cors",
        url:
            `/api/like-logs?type=DOCTOR&patientId.equals=` +
            patientId +
            `&page=${likedOffset}&size=20`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
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

export const getAppointmentsListByStatus = async (patientId) => {
    var payload = {
        method: "get",
        mode: "no-cors",
        url: `/api/v2/appointments/all?patientId=${patientId}`, // &searchParam=${searchParam}
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
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

export const postHealthAssessment = async (method, data, patientId) => {
    var payload = {
        method: method,
        mode: "no-cors",
        data: data,
        url: `/api/v2/assessment?patientId=${patientId}`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
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

export const getCountryList = async () => {
    var payload = {
        method: 'get',
        url: `/api/mobile/countries`,
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

export const getLanguageList = async () => {
    var payload = {
        method: 'get',
        url: `/api/mobile/languages`,
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

//Doctor-Homepage 
export const getAppointmentsForHomepage = async (
    startTime,
    endTime,
    doctorId
) => {
    var payload = {
        method: "get",
        mode: "no-cors",
        url: `/api/v2/appointments/doctor/mobile?startTime=${startTime}&endTime=${endTime}&doctorId=${doctorId}`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
            "Content-Type": "application/json",
        },
    };
    const response = await axios(payload).then((res) => {
        if (res) {
            return res;
        }
    });
    return response;
};
//Doctor-Profile
export const getCountryList = async () => {
    var payload = {
        method: 'get',
        url: `/api/mobile/countries`,
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

export const getSpecialityList = async () => {
    var payload = {
        method: 'get',
        url: `/api/mobile/specialities/all`,
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

export const getLanguageList = async () => {
    var payload = {
        method: 'get',
        url: `/api/mobile/languages`,
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
//Doctor-Document
export const uploadDoctorDocument = async (files, info) => {
    var newData = new FormData();
    for (let i = 0; i < files.length; i++) {
        newData.append(`doctorDocumentFile`, files[i])
    }
    newData.append(
        "doctorDocumentInfo",
        new Blob([JSON.stringify(info)], {
            type: "application/json",
        })
    );
    var payload = {
        method: "post",
        mode: "no-cors",
        data: newData,
        url: `/api/mobile/doctor-documents`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
            "Content-Type": "multipart/form-data",
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
export const updateDoctorDocumentNew = async (data) => {
    // var newData = new FormData();
    // newData.append("doctorDocumentDTO", JSON.stringify(info));
    var payload = {
        method: "put",
        mode: "no-cors",
        data: data,
        url: `/api/mobile/doctor-documents/edit`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
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
export const updateDoctorDocument = async (files, info) => {
    var newData = new FormData();
    newData.append(`doctorDocumentFile`, files)
    // newData.append("doctorDocumentInfo", JSON.stringify(info));
    newData.append(
        "doctorDocumentInfo",
        new Blob([JSON.stringify(info)], {
            type: "application/json",
        })
    );
    var payload = {
        method: "put",
        mode: "no-cors",
        data: newData,
        url: `/api/doctor-documents`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
            "Content-Type": "multipart/form-data",
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
export const getDoctorDocument = async (doctorId, page) => {
    var payload = {
        method: "get",
        mode: "no-cors",
        url: `/api/doctor-documents?doctorId.equals=${doctorId}&page=${page}&size=5&sort=id%2Cdesc`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
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
export const updateDoctorDocumentStatus = async (data) => {
    var newData = new FormData();
    newData.append("doctorDocumentInfo", JSON.stringify(data));
    var payload = {
        method: "put",
        mode: "no-cors",
        data: newData,
        url: `/api/doctor-documents`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
            "Content-Type": "multipart/form-data",
        },
    };
    const response = await axios(payload).then((res) => {
        if (res) {
            return res;
        }
    });
    return response;
};
export const deleteDoctorDocument = async (docId) => {
    var payload = {
        method: "delete",
        mode: "no-cors",
        url: `/api/doctor-documents/${docId}`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
            "Content-Type": "application/json",
        },
    };
    const response = await axios(payload).then((res) => {
        if (res) {
            return res;
        }
    });
    return response;
};
export const getDoctorDocumentUrlForAdmin = async (data) => {
    var payload = {
        method: "get",
        mode: "no-cors",
        url: `/api/doctor-documents?doctorId.equals=${data.doctorId}&id.equals=${data.id}`,
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
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
export const updateDoctorData = async (data) => {
    var payload = {
        method: "put",
        mode: "no-cors",
        data: data,
        url: "/api/mobile/admin/doctors",
        headers: {
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
            "Content-Type": "multipart/form-data",
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