import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../lib/redux/userSlice';
import { getAppointmentsListByStatus } from '../../../lib/service/FrontendApiServices';

const MyAppointments = () => {
  const user = useSelector(selectUser);
  const patientId = user.profileDetails.id;

  const [upcomingAppointment, setUpcomingAppointment] = useState([]);
  const [completedAppointment, setCompletedAppointment] = useState([]);
  const [cancelledAppointment, setCancelledAppointment] = useState([]);

  const getAppointmentsTabList = async (patientId) => {
    // setAppointmentTabLoading(true);
    const response = await getAppointmentsListByStatus(patientId).catch(
      (err) => {
        if (err.response.status === 500 || err.response.status === 504) {
          // setLoading(false);
          // setAppointmentTabLoading(false);
        }
      }
    );

    console.log({ response });

    if (response?.status === 200 || response?.status === 201) {
      if (response && response.data) {
        // setAppointmentTabLoading(false);
        const upcomingArray = response.data.data.upcoming;

        setUpcomingAppointment(upcomingArray);

        const completedAppointmentsArray = response.data.data.completed;
        setCompletedAppointment(completedAppointmentsArray.reverse());
        // console.log('completedAppointmentsArray', completedAppointmentsArray);

        const cancelledAppointmentsArray = response.data.data.cancelled;
        // console.log({ cancelledAppointmentsArray });
        setCancelledAppointment(cancelledAppointmentsArray.reverse());
      }
    }
    // setAppointmentTabLoading(false);
  };

  // CANCEL APPOINTMENT HANDLER
  // const handleDelete = async (selectedAppointment) => {
  //   const { currentPatient, doctorDetailsList } = props;
  //   setLoading(true);
  //   handleClose();
  //   // console.log({ selectedAppointment })
  //   const payload = {
  //     id: selectedAppointment.id,
  //     startTime: new Date(selectedAppointment.startTime).toISOString(),
  //     endTime: new Date(selectedAppointment.endTime).toISOString(),
  //     patientId: selectedAppointment.patientId,
  //     doctorId: selectedAppointment.doctorId,
  //     type: 'DR',
  //     status: 'CANCELLED_BY_PATIENT',
  //     unifiedAppointment: selectedAppointment.unifiedAppointment,
  //   };
  //   const res = await deleteAppointment(payload).catch((err) => {
  //     if (err.response.status === 500 || err.response.status === 504) {
  //       setLoading(false);
  //     }
  //   });
  //   // console.log({ res });
  //   if (res?.status === 200 || res?.status === 201) {
  //     getMyAppointmentList(currentPatient.id);
  //     handleClose();
  //     toast.success('Appointment Cancelled');
  //     history.go(0);
  //   }
  //   //})
  // };

  useEffect(() => {
    getAppointmentsTabList(patientId);
  }, []);
  return (
    <Container>
      <Row>
        <h1>
          Calendar used to come here | Will have different set of apis for this
          portion (not migrated yet)
        </h1>
      </Row>
      <hr />
      <Row>
        <h1>List of Appointments</h1>
        <Col>
          <h3>Upcoming</h3>
          <ul>
            {upcomingAppointment &&
              Array.isArray(upcomingAppointment) &&
              upcomingAppointment.length > 0 &&
              upcomingAppointment.map((appointment, index) => {
                return (
                  <div key={index}>
                    <li>
                      {appointment.id} & {appointment.appointmentMode} &
                      {appointment.startTime}
                    </li>
                  </div>
                );
              })}
          </ul>
          {upcomingAppointment.length === 0 && (
            <span className="no-data-found">No DATA</span>
          )}
        </Col>
        <Col>
          <h3>Completed</h3>
          <ul>
            {completedAppointment &&
              Array.isArray(completedAppointment) &&
              completedAppointment.length > 0 &&
              completedAppointment.map((appointment, index) => {
                return (
                  <div key={index}>
                    <li>
                      {appointment.id} & {appointment.appointmentMode} &
                      {appointment.startTime}
                    </li>
                  </div>
                );
              })}
          </ul>
          {completedAppointment.length === 0 && (
            <span className="no-data-found">No DATA</span>
          )}
        </Col>
        <Col>
          <h3>Cancelled</h3>
          <ul>
            {cancelledAppointment &&
              Array.isArray(cancelledAppointment) &&
              cancelledAppointment.length > 0 &&
              cancelledAppointment.map((appointment, index) => {
                return (
                  <div key={index}>
                    <li>
                      {appointment.id} & {appointment.appointmentMode} &
                      {appointment.startTime}
                    </li>
                  </div>
                );
              })}
          </ul>
          {cancelledAppointment.length === 0 && (
            <span className="no-data-found">No DATA</span>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MyAppointments;
