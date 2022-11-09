import React from 'react';
import moment from 'moment';
import { getUnreadNotificationsCount, putMarkAsReadFromNotificationMenu } from '../../../../lib/service/FrontendApiServices';
import styles from '../NotificationsMenuPatient.module.css'
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectRole } from '../../../../lib/redux/userSlice';
import useRole from '../../../../lib/custom-hooks/useRole';

const AppointmentCancelledNotifications = ({ notification, index, createdAtDisplayStyle }) => {
    const role = useSelector(selectRole)
    const roleName = useRole(role)

    console.log({ notification })

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
                <div className={styles.profileImage}>
                    {
                        roleName === 'patient' && (
                            notification.data.appointmentDetails?.doctor?.picture ? (
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
                                    src='/images/default_image.jpg'
                                    style={{
                                        borderRadius: '50%',
                                    }}
                                    height={50}
                                    width={50}
                                />
                            )
                        )
                    }
                    {
                        roleName === 'doctor' && (
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
                                    src='/images/default_image.jpg'
                                    style={{
                                        borderRadius: '50%',
                                    }}
                                    height={50}
                                    width={50}
                                />
                            )
                        )
                    }
                </div>
                <div className="notif-section__message">
                    <div className={styles.messageNotif}>
                        <span>
                            Your appointment with{' '}
                            {
                                roleName === 'patient' && (notification.data.appointmentDetails?.doctor.firstName)
                            }{' '}
                            {
                                roleName === 'doctor' && (notification.data.appointmentDetails?.patient.firstName)
                            }{' '} is
                            cancelled for the time{' '}
                            {moment(notification.data.appointmentDetails.startTime).format(
                                'HH:mm'
                            )}{' '}
                            on{' '}
                            {moment(notification.data.appointmentDetails.startTime).format(
                                'DD-MM-YYYY'
                            )}
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

export default AppointmentCancelledNotifications;
