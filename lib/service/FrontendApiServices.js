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

export const updatePatientData = async (data) => {
    var payload = {
        method: "put",
        mode: "no-cors",
        data: data,
        url: "/api/admin/patients/",
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

//My Calendar APIs
export const createAppointment = async (data) => {
    var payload = {
        method: "post",
        mode: "no-cors",
        data: data,
        url: `/api/appointments`,
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
export const deleteAvailableAppointment = async (data) => {
    var payload = {
        method: "put",
        mode: "no-cors",
        data: data,
        url: `/api/appointments`,
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

export const deleteBookedAppointment = async (data) => {
    var payload = {
        method: "put",
        mode: "no-cors",
        data: data,
        url: `/api/appointments`,
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
export const getDoctorAppointment = async (data) => {
    var payload = {
        method: "post",
        mode: "no-cors",
        data: data,
        url: `/api/appointments/filter`,
        //url: '/api/appointments/active-past?sort=startTime,asc',
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
export const getPaymentInfoForDoctor = async (appId) => {
    var payload = {
        method: "get",
        mode: "no-cors",
        url: `/api/v2/appointments/${appId}`,
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
export const getGlobalAppointmentsSearch = async (data) => {
    var payload = {
        method: "post",
        mode: "no-cors",
        url: `/api/v2/appointments/filter`,
        data: data,
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

//Availibility Apis
export const addRecurringSLot = async (data) => {
    var payload = {
        method: 'post',
        mode: 'no-cors',
        url: `/api/v2/appointments/recur`,
        data: data,
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
export const getRecurringSLots = async (data) => {
    var payload = {
        method: 'post',
        mode: 'no-cors',
        url: `/api/v2/appointments/recur/doctor`,
        data: data,
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
export const toggleRecurSlots = async (data) => {
    var payload = {
        method: 'post',
        mode: 'no-cors',
        url: `/api/v2/recur/toggle`,
        data: data,
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
export const deleteReccurSlot = async (data) => {
    var payload = {
        method: "delete",
        mode: "no-cors",
        data: data,
        url: `/api/v2/recurSlot/delete`,
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

//Doctor-Myappointment APIS
export const rescheduleAppointmentDoctor = async (data) => {
    var payload = {
        method: "post",
        data: data,
        url: `/api/v2/appointment/doctor/reschedule`,
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
export const getGlobalAppointmentsSearchNew = async (data) => {
    var payload = {
        method: "post",
        mode: "no-cors",
        url: `/api/v2/appointments/mobile/filter`,
        data: data,
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
// ConsultationHistory-Doctor
export const consultationHistory = async (patientId, doctorId) => {
    var payload = {
        method: "get",
        url: `/api/v2/notes/?patientId=${patientId}&doctorId=${doctorId}`,
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
//HealthAssessment-Doctor
export const getHealthAssessmentPdf = async (patientId) => {
    var payload = {
        method: 'get',
        mode: 'no-cors',
        url: `/api/v2/assessment/download?patientId=${patientId}`,
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

//Medical-records Doctor
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
export const postLabDocument = async (data) => {
    const headers = {
        mode: "no-cors",
        Authorization: "Bearer " + LocalStorageService.getAccessToken(),
    };
    const methodType = data.get("id") ? "PUT" : "POST";
    const medicalDocumentInfo = {
        duration: data.get("duration"),
        documentType: "LabResult",
        patientId: data.get("patientId"),
        doctorId: data.get("doctorId"),
        labName: data.get("labName"),
        resultType: data.get("resultType"),
        name: data.get("resultName")
    };
    const formData = new FormData();
    formData.append("file", data.get("labResultDocument"));
    formData.append("medicalDocumentInfo", new Blob([JSON.stringify(medicalDocumentInfo)], {
        type: "application/json"
    }));

    var config = {
        method: methodType,
        url: "/api/v2/medical-document-upload",
        headers: headers,
        data: formData,
    };

    return await axios(config).then((response) => {
        return response.data;
    });
};
export const getDocumentById = async (payload) => {
    const config = {
        method: "get",
        url:
            payload.patientId !== null
                ? "/api/medical-document?docId=" +
                payload.id +
                "&patId=" +
                payload.patientId
                : "/api/medical-document?docId=" + payload.id,
        headers: {
            mode: "no-cors",
            Authorization: "Bearer " + LocalStorageService.getAccessToken(),
            "Content-Type": "multipart/form-data",
        },
    };
    const response = await axios(config).then((res) => {
        if (res) {
            return res;
        }
    });
    return response;
};
export const deleteDocument = async (documentId) => {
    const headers = {
        mode: "no-cors",
        Authorization: "Bearer " + LocalStorageService.getAccessToken(),
    };

    const config = {
        method: "delete",
        url: "/api/v2/medical-documents/" + documentId,
        headers: headers,
    };

    return await axios(config).then((response) => {
        return response.data;
    });
};
export const getGlobalMedicalRecordsSearch = async (page, size, data) => {
    var payload = {
        method: 'post',
        mode: 'no-cors',
        url: `/api/v2/medical-documents/filter?page=${page}&size=${size}`,
        data: data,
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
export const postDocumentAddPrescriptionLabResult = async (data) => {
    const headers = {
        mode: "no-cors",
        Authorization: "Bearer " + LocalStorageService.getAccessToken(),
    };
    var config = {
        method: 'post',
        url: "/api/v2/medical-document-upload",
        headers: headers,
        data: data,
    };

    return await axios(config).then((response) => {
        return response.data;
    });
};