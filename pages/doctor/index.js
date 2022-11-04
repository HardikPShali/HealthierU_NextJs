import { useSelector } from "react-redux"
import DoctorMainRoute from "../../components/Doctor"
import { selectUser } from "../../lib/redux/userSlice"


const index = () => {
    return (
        <div>
            <DoctorMainRoute />
        </div>
    )
}

export default index