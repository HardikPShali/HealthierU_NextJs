import { useState, useEffect } from 'react';
import { getAppointmentsForHomepage } from '../../../lib/service/FrontendApiServices';
import UpcomingAppointmentCard from './UpcomingAppointmentCard';
import styles from './UpcomingAppointments.module.css'
import { selectUser } from '../../../lib/redux/userSlice';
import { useSelector } from 'react-redux';
const UpcomingAppointments = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const user = useSelector(selectUser);
  const currentUser = user?.profileDetails;
  const getUpcomingAppointments = async (startTime, endTime, doctorId) => {
    const starttime = new Date();
    const endtime = new Date();
    endtime.setHours(23, 59, 0);
    const response = await getAppointmentsForHomepage(startTime = starttime.toISOString(), endTime = endtime.toISOString(), doctorId = currentUser.id).catch((err) => {
      console.log('err', err);
    });
    if (response?.status === 200 || response?.status === 201) {
      if (response && response.data) {
        const upcomingAppointments = response.data.data.appointmentsBetweenGivenDates;
        const reversedAppointments = upcomingAppointments.reverse();
        const updateArray = [];
        reversedAppointments.map((value, index) => {
          if (value.status === 'ACCEPTED') {
            if (
              value.unifiedAppointment ===
              (reversedAppointments[index + 1] &&
                reversedAppointments[index + 1].unifiedAppointment)
            ) {
              updateArray.push({
                id: value.id,
                patientId: value.patientId,
                doctorId: value.doctorId,
                doctor: value.doctor,
                title: `Appointment booked with Dr. ${value?.doctor?.firstName
                  } with ${value.urgency ? value.urgency : 'no'
                  } urgency, comments : ${value.remarks ? value.remarks : 'no comments'
                  }`,
                startTime: new Date(value.startTime),
                endTime: new Date(reversedAppointments[index + 1].endTime),
                remarks: value.remarks,
                status: value.status,
                appointmentId: value.appointmentId,
                unifiedAppointment: value.unifiedAppointment,
                appointmentMode: value.appointmentMode,
                patient: value.patient
              });
            } else if (
              value.unifiedAppointment !==
              (reversedAppointments[index + 1] &&
                reversedAppointments[index + 1].unifiedAppointment) &&
              value.unifiedAppointment ===
              (response[index - 1] && response[index - 1].unifiedAppointment)
            ) {
              return false;
            } else if (
              value.unifiedAppointment !==
              (reversedAppointments[index + 1] &&
                reversedAppointments[index + 1].unifiedAppointment) &&
              value.unifiedAppointment !==
              (reversedAppointments[index - 1] &&
                reversedAppointments[index - 1].unifiedAppointment)
            ) {
              updateArray.push({
                id: value.id,
                patientId: value.patientId,
                doctorId: value.doctorId,
                doctor: value.doctor,
                startTime: new Date(value.startTime),
                endTime: new Date(value.endTime),
                remarks: value.remarks,
                status: value.status,
                appointmentId: value.appointmentId,
                unifiedAppointment: value.unifiedAppointment,
                appointmentMode: value.appointmentMode,
                patient: value.patient
              });
            }
          }
        });
        setUpcomingAppointments(updateArray);
      }
    }
  };

  useEffect(() => {
    getUpcomingAppointments();
  }, []);

  return (
    <div className="mb-5 mt-5">
      <h3 className={styles.upcoming_appointment__main_header}>
        Upcoming Appointments
      </h3>
      <div className={styles.upcoming_appointment__card_box}>
        <div className={styles.card_holder}>
          <div className="row">
            {upcomingAppointments.length !== 0 ? (
              upcomingAppointments.map((appointment, index) => {
                return (
                  <div className="col-md-4 mb-2 mt-2 cursor-pointer" key={index}>
                    <div className={styles.upcoming_appointment_card}>
                      <UpcomingAppointmentCard appointment={appointment} />
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                className="col-12 ml-2"
                style={{ textShadow: 'none', color: '#3e4543' }}
              >
                No New Appointments
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingAppointments;
