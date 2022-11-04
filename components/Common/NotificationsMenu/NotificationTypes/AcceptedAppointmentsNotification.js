import React, { useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import {
  getUnreadNotificationsCount,
  putMarkAsReadFromNotificationMenu,
} from '../../../../lib/service/FrontendApiServices';
import styles from '../NotificationsMenu.module.css'

const AcceptedAppointmentsNotification = ({
  notification,
  index,
  createdAtDisplayStyle,
  role
}) => {
  
  //MARK AS READ NOTIFICATION LOGIC
  const markAsReadFromNotificationMenuHandler = async () => {
    const notificationId = notification.id;
    const userId = notification.userId;

    const data = {
      id: notificationId,
    };

    const response = await putMarkAsReadFromNotificationMenu(
      data,
      userId
    ).catch((err) => console.log({ err }));

    if (response.data.status === true) {
      //   setBadgeCount(0);
      //   toast.success("Notification marked as read successfully");
      await getUnreadNotificationsCount(userId);
    }
  };

  return (
    <div key={index} onClick={() => markAsReadFromNotificationMenuHandler()}>
      <div className={styles.notifSection}>
        <div className="profile-img col-md-3">
          {role === 'ROLE_DOCTOR' ? (notification.data.appointmentDetails?.doctor?.picture ? (
            <Image
              alt="profile"
              src={notification.data.appointmentDetails?.doctor.picture}
              style={{
                borderRadius: '50%',
              }}
              height={50}
              width={50}
            />
          ) : (
            <Image
              alt="profile"
              src={notification.data.appointmentDetails?.doctor.picture}
              style={{
                borderRadius: '50%',
              }}
              height={50}
              width={50}
            />
          )) : (
            notification.data.appointmentDetails?.patient?.picture ? (
              <Image
                alt="profile"
                src={notification.data.appointmentDetails?.patient.picture}
                style={{
                  borderRadius: '50%',
                }}
                height={50}
                width={50}
              />
            ) : (
              <Image
                alt="profile"
                src={notification.data.appointmentDetails?.patient.picture}
                style={{
                  borderRadius: '50%',
                }}
                height={50}
                width={50}
              />
            ))
          }
        </div>
        <div className="notif-section__message">
          <div className={styles.messageNotif}>
            <span>
              Your appointment has been booked with{' '}
              {role === 'ROLE_DOCTOR' ? (notification.data.appointmentDetails?.doctor.firstName) : (notification.data.appointmentDetails?.patient.firstName)} for time{' '}
              {moment(notification.data.appointmentDetails.startTime).format(
                'HH:mm'
              )}{' '}
              on{' '}
              {moment(notification.data.appointmentDetails.startTime).format(
                'DD-MM-YYYY'
              )}
              .
            </span>

            <div style={createdAtDisplayStyle}>
              <span
                style={{
                  color: '#bfbfbf',
                  fontSize: 11,
                }}
              >
                {moment(notification.createdAt).format('DD MMM YYYY')}
              </span>
              <span
                style={{
                  color: '#bfbfbf',
                  fontSize: 11,
                  marginLeft: 10,
                }}
              >
                {moment(notification.createdAt).format('HH:mm')}
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default AcceptedAppointmentsNotification;
