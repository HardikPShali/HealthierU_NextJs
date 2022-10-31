import { useRouter } from 'next/router';
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../lib/redux/userSlice'

const PatientHomepage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout())
        router.push('/')
    }
    return (
        <div>
            logout
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default PatientHomepage