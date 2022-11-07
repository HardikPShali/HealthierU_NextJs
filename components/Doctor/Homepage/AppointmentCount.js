import React, { useState, useEffect } from 'react';
import { getAppointmentsForHomepage } from '../../../lib/service/FrontendApiServices';
import { selectUser } from '../../../lib/redux/userSlice';
import { useSelector } from 'react-redux';
import styles from '../doctorHomepage.module.css'
const AppointmentCount = () => {
    const starttime = new Date();
    const endtime = new Date();
    endtime.setHours(23, 59, 0);
    const [appointmentsCount, setAppointmentsCount] = useState(0);
    const user = useSelector(selectUser);
    const currentUser = user?.profileDetails;
    const getAppointmentsCount = async (startTime, endTime, doctorId) => {
        const response = await getAppointmentsForHomepage(startTime = starttime.toISOString(), endTime = endtime.toISOString(), doctorId = currentUser.id).catch((err) => {
            console.log('err', err);
        });
        if (response?.status === 200 || response?.status === 201) {
            setAppointmentsCount(response.data.data);
        }

    }
    useEffect(() => {
        getAppointmentsCount();
    }, []);
    return (
        <div>
            <h3 className={styles.appointment_card_header}>Overview</h3>
            <section className={styles.page_contain}>
                <div className={styles.data_card}>
                    <div className={styles.data_card__helper}>
                        <h3 className={styles.appointment_count_h3}>{appointmentsCount.totalAppointmentsForTheDay}</h3>
                        <h4 className={styles.appointment_count_h4}>Today's Appointments</h4>
                    </div>
                </div>
                <div className={styles.data_card1}>
                    <div className={styles.data_card__helper}>
                        <h3 className={styles.appointment_count_h3}>{appointmentsCount.pendingAppointments}</h3>
                        <h4 className={styles.appointment_count_h4}>Pending Appointments</h4>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AppointmentCount
