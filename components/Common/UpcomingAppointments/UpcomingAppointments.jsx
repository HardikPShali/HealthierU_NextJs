import { useState, useEffect } from 'react';
import { getUpcomingAppointmentsForHomepage } from '../../../lib/service/FrontendApiServices';
import UpcomingAppointmentCard from './UpcomingAppointmentCard';

const UpcomingAppointments = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  const getUpcomingAppointments = async () => {
    const response = await getUpcomingAppointmentsForHomepage().catch((err) => {
      console.log('err', err);
    });
    if (response?.status === 200 || response?.status === 201) {
      if (response && response.data) {
        //console.log("response.data ::: ", response.data)
        const upcomingAppointments = response.data.data;
        const reversedAppointments = upcomingAppointments.reverse();
        const updateArray = [];
        reversedAppointments.map((value, index) => {
          if (value.status === 'ACCEPTED') {
            updateArray.push({
              id: value.id,
              patientId: value.patientId,
              doctorId: value.doctorId,
              doctor: value.doctor,
              title: `Appointment booked with Dr. ${
                value?.doctor?.firstName
              } with ${
                value.urgency ? value.urgency : 'no'
              } urgency, comments : ${
                value.remarks ? value.remarks : 'no comments'
              }`,
              startTime: new Date(value.startTime),
              endTime: new Date(value.endTime),
              remarks: value.remarks,
              status: value.status,
              appointmentId: value.appointmentId,
              unifiedAppointment: value.unifiedAppointment,
              patient: value.patient,
            });
          }
        });

        setUpcomingAppointments(updateArray.reverse());
      }
    }
  };

  useEffect(() => {
    getUpcomingAppointments();
  }, []);

  return (
    <div>
      <h3 className="upcoming-appointment--main-header mb-3 mt-2">
        Upcoming Appointments
      </h3>
      <div className="upcoming-appointment__card-box scroller-cardlist mb-4">
        <div className="card-holder">
          <div className="row">
            {upcomingAppointments.length !== 0 ? (
              upcomingAppointments.map((appointment, index) => {
                return (
                  <div className="col-md-4 mb-2 mt-2" key={index}>
                    <div className="upcoming-appointment-card">
                      <UpcomingAppointmentCard appointment={appointment} />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12 ml-2 empty-message no-appointments">
                No Upcoming Appointments
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingAppointments;
