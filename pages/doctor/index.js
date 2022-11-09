import DoctorMainRoute from "../../components/Doctor"
import Footer from '../../components/Common/Footer/Footer'
import Header from '../../components/Doctor/Header/DoctorHeader'

const index = () => {
    return (
        <div>
            <Header />
            <DoctorMainRoute />
            <Footer />
        </div>
    )
}

export default index