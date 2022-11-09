import React from 'react'
import DoctorHeader from '../../components/Doctor/Header/DoctorHeader'
import DoctorProfile from '../../components/Doctor/Profile/profile'
import Footer from '../../components/Common/Footer/Footer'
const profile = () => {
  return (
    <div>
      <DoctorHeader />
      <DoctorProfile />
      <Footer />
    </div>
  )
}

export default profile
