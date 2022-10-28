import axios from 'axios';
import { toast } from 'react-toastify';

const toastMessageForError = (message) => {
    switch (message) {
        case '401 Unauthorized':
            toast.error('Unauthorized Login. Please contact administrator', {
                autoClose: 5000,
                hideProgressBar: true,
                position: toast.POSITION.TOP_LEFT,
                toastId: "unauthorized",
            });
            break;

        // case 'Deactivated User':
        //     toast.error('Your account has been deactivated. Please contact administrator', {
        //         autoClose: 5000,
        //         hideProgressBar: true,
        //         position: toast.POSITION.TOP_LEFT,
        //         toastId: "deactivatedUser",
        //     });
        //     break;

        default:
            toast.error('Something went wrong', {
                autoClose: 5000,
                hideProgressBar: true,
                position: toast.POSITION.TOP_LEFT,
                toastId: "somethingWentWrong",
            })
    }
}

export const handleGoogleAuth = async (googleUserData, history) => {

    var config = {
        method: 'post',
        mode: 'no-cors',
        data: googleUserData,
        url: '/oauth/google',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        }
    };
    const googleResponse = await axios(config).then(response => {
        if (response.status === 201 || response.status === 200) {
            if (response && response.data) {
                return response.data
            }
        }
    }).catch(error => {
        // const history = useHistory();

        if (error.response && error.response.status === 500 && error.response.data.message === "401 Unauthorized") {
            // history.push('/signin');
            toastMessageForError(error.response.data.message);
        }
        else if (error.response && error.response.status === 500 && error.response.data.message.includes("Required request body is missing:")) {
            toastMessageForError(error.response.data.message);
        }
        else if (error.response && error.response.status === 500 && error.response.data.message === "User role required.") {
            history.push(`/signupform?form-google=${true}`);
        }
        else if (error.response && error.response.status === 405) {
            history.push('/signupform');
        }

    })
    return googleResponse;
}