const dev = {
    // CORE : "https://dev.healthy-u.ae",
    CORE: "https://dev.healthieru.ae",
    UAA: "https://dev.healthy-u.ae"

};

const prod = {
    CORE: "http://web_app:changeit@75.2.44.245",
    UAA: "http://172.33.0.4:9999"

};

const properties = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : dev;

export default properties;