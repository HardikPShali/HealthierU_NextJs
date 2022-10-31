import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { logout } from '../../../lib/redux/userSlice';
import Link from 'next/link';

const DoctorHeader = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout())
        router.push('/')
    }
    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default DoctorHeader