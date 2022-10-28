// Google Client Id for google signup / signin for Dev.
// export const GOOGLECLIENTID = "49495895192-rfha1rs20dkgeld3n6sstqp4l5lvseli.apps.googleusercontent.com";

// Google Client Id for google signup / signin for Prod.
export const GOOGLECLIENTID = "741301312281-ms7qbvkauftg8pmo5tfb2fjcq6d5bpkm.apps.googleusercontent.com";

// Prod config for firebase
export const LOCALFIRESTORECONFIG = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export const PRODFIRESTORECONFIG = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Firebase server key for push notification on prod

export const SERVER_KEY_PROD = process.env.REACT_APP_FIREBASE_SERVER_KEY_PROD;

// For Prod Env
export const FIREBASESENDERID = process.env.REACT_APP_FIREBASE_SENDER_ID_PROD;

// Agora config for video call starts
export const RESOLUTION_ARR = {
    '120p,120p_1': [160, 120, 15, 65],
    '120p_3': [120, 120, 15, 50],
    '180p,180p_1': [320, 180, 15, 140],
    '180p_3': [180, 180, 15, 100],
    '180p_4': [240, 180, 15, 120],
    '240p,240p_1': [320, 240, 15, 200],
    '240p_3': [240, 240, 15, 140],
    '240p_4': [424, 240, 15, 220],
    '360p,360p_1': [640, 360, 15, 400],
    '360p_3': [360, 360, 15, 260],
    '360p_4': [640, 360, 30, 600],
    '360p_6': [360, 360, 30, 400],
    '360p_7': [480, 360, 15, 320],
    '360p_8': [480, 360, 30, 490],
    '360p_9': [640, 360, 15, 800],
    '360p_10': [640, 360, 24, 800],
    '360p_11': [640, 360, 24, 1000],
    '480p,480p_1': [640, 480, 15, 500],
    '480p_2': [640, 480, 30, 1000],
    '480p_3': [480, 480, 15, 400],
    '480p_4': [640, 480, 30, 750],
    '480p_6': [480, 480, 30, 600],
    '480p_8': [848, 480, 15, 610],
    '480p_9': [848, 480, 30, 930],
    '480p_10': [640, 480, 10, 400],
    '720p,720p_1': [1280, 720, 15, 1130],
    '720p_2': [1280, 720, 15, 2080],
    '720p_3': [1280, 720, 30, 1710],
    '720p_5': [960, 720, 15, 910],
    '720p_6': [960, 720, 30, 1380],
    '1080p,1080p_1': [1920, 1080, 15, 2080],
    '1080p_2': [1920, 1080, 30, 3000],
    '1080p_3': [1920, 1080, 30, 3150],
    '1080p_5': [1920, 1080, 60, 4780],
    '1440p,1440p_1': [2560, 1440, 30, 4850],
    '1440p_2': [2560, 1440, 60, 7350],
    '4k,4k_1': [3840, 2160, 30, 8910],
    '4k_3': [3840, 2160, 60, 13500],
};

export const SHARE_ID = 1;

export const APP_ID = process.env.REACT_APP_AGORA_APPID;
// Agora config for video call ends

// For Access Token Generation
export const AUTH_CODE = "d2ViX2FwcDpjaGFuZ2VpdA==";

// Encryption and Decryption
export const SECRET_KEY = "healthyU42123456";

export const doctorListLimit = 14;

export const doctorListLimitNonPaginated = 5000;


export const CAPTCHA_SITE_KEY = "6Lf7eKYfAAAAAEJJo8Coy99WTeDXdxMHsSZAVtl0";

export const ROLES = {
    ROLE_PATIENT: 'ROLE_PATIENT',
    ROLE_DOCTOR: 'ROLE_DOCTOR',
    ROLE_ADMIN: 'ROLE_ADMIN'
}