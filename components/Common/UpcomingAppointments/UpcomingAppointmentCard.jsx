import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import moment from 'moment';
import { selectUser } from '../../../lib/redux/userSlice';
import { useSelector } from 'react-redux';
const UpcomingAppointmentCard = ({ appointment }) => {
  const [appointmentPersonKey, setAppointmentPersonKey] = useState('');
  const router = useRouter();
  const user = useSelector(selectUser);
  const key = user?.currentUser?.authorities
  useEffect(() => {
    let role;
    if (key === "ROLE_DOCTOR" ? role = "doctor" : role = "patient")
      setAppointmentPersonKey(role);
  }, []);

  const handleClickToAppointmentsPage = () => {
    if (key == 'ROLE_DOCTOR') {
      router.push(`/doctor/my-appointments?APID=${appointment.id}`);
    }
    else {
      router.push('/patient/myappointment');
    }
  };
  return (
    <div
      className="row align-items-start"
      style={{ cursor: 'pointer' }}
      onClick={handleClickToAppointmentsPage}
    >
      {appointmentPersonKey === 'doctor' && (
        <div className="col-md-3">
          {appointment.doctor.picture ? (
            <div className="safari-helper">
              <Image
                src={appointment.doctor.picture}
                alt={`${appointment.doctor.firstName}-image`}
                className="upcoming_img_circle ml-3 mt-3"
                width={50}
                height={50}
              />
            </div>
          ) : (
            <Image
              src={appointment.doctor.picture}
              alt={`${appointment.doctor.firstName}-image`}
              className="upcoming_img_circle ml-3 mt-3"
              width={50}
              height={50}
            />
          )}
        </div>
      )}
      {appointmentPersonKey === 'patient' && (
        <div className="col-md-3">
          {appointment.patient.picture ? (
            <div className="safari-helper">
              <Image
                src={appointment.patient.picture}
                alt={`${appointment.patient.firstName}-image`}
                className="upcoming_img_circle ml-3 mt-3"
                width={100}
                height={100}
              />
            </div>
          ) : (
            <Image
              src={appointment.doctor.picture}
              alt={`${appointment.doctor.firstName}-image`}
              className="upcoming_img_circle ml-3 mt-3"
              width={100}
              height={100}
            />
          )}
        </div>
      )}
      <div className="col-md-9">
        <div className="upcoming_appointment_card__card_details">
          <h5 className="upcoming_appointment_card__doctor_name">
            {appointmentPersonKey === 'doctor' &&
              appointment[appointmentPersonKey].salutation + ' '}
            {appointment[appointmentPersonKey] &&
              appointment[appointmentPersonKey].firstName +
              ' ' +
              (appointment[appointmentPersonKey].lastName || '')}
          </h5>
          <span className="upcoming_appointment_card__specality">
            {appointmentPersonKey === 'doctor' &&
              appointment[appointmentPersonKey] &&
              appointment[appointmentPersonKey].specialities.length &&
              appointment[appointmentPersonKey].specialities[0].name}

            {appointmentPersonKey === 'patient' && appointment.appointmentMode}
          </span>
          <div className="upcoming_appointment_card__card-details__date_div">
            <div className="upcoming_appointment_card__card_time_row">
              <Image
                src="/images/svg/calender-beige.svg"
                alt="icon"
                width={30}
                height={30}
              />
              <span className="upcoming_appointment_card__common_span">
                {moment(appointment.startTime).format('DD/MM/YY')}
              </span>
            </div>
            <div className="upcoming_appointment_card__card_time_row ml-4">
              <Image
                src="/images/svg/time-teal.svg"
                alt="icon"
                width={30}
                height={30}
              />
              <span className="upcoming_appointment_card__common_span">
                {moment(appointment.startTime).format('hh:mm A')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingAppointmentCard;
