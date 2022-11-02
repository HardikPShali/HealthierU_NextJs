import React from 'react'
import PatientMainRoute from '../../components/Patient'
import PatientHeader from '../../components/Patient/Header/PatientHeader'

const PatientIndex = () => {
    return (
        <div>
            <PatientHeader />
            <PatientMainRoute />
        </div>
    )
}

export default PatientIndex