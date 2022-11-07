import React from 'react';
import moment from 'moment';
import { getUnreadNotificationsCount, putMarkAsReadFromNotificationMenu } from '../../../../lib/service/FrontendApiServices';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../NotificationsMenu.module.css'


const RescheduleByDoctorNotification = ({
    notification,
    key,
    createdAtDisplayStyle,
}) => {
    const setDoctorIdInSession = (doctorId) => {
        // console.log({ doctorId });
        sessionStorage.setItem('doctorId', doctorId);
    };

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
        console.log({ markAsReadFromNotificationMenuHandler: response });

        if (response.data.status === true) {
            //   setBadgeCount(0);
            //   toast.success("Notification marked as read successfully");
            await getUnreadNotificationsCount(userId);
        }
    };

    return (
        <div
            onClick={() => {
                setDoctorIdInSession(notification.data.appointmentDetails.doctor.id);
                markAsReadFromNotificationMenuHandler();
            }}
        >
            <Link
                href={`/patient/rescheduleappointment/${notification.data.appointmentDetails.id
                    }/${notification.data.appointmentDetails.appointmentMode
                        .toLowerCase()
                        .replace(' ', '-')}/${notification.data.appointmentDetails.doctorId}/${notification.data.appointmentDetails.unifiedAppointment
                    }`}
                className="d-flex flex-column text-dark navlink-hover"
                key={key}
                style={{ marginLeft: 0, marginTop: -16, fontWeight: 400 }}
            >
                <div key={key}>
                    <div className={styles.notifSection}>
                        <div className="profile-img col-md-3">
                            {notification.data.appointmentDetails.doctor?.picture ? (
                                <Image
                                    alt="profile"
                                    src={notification.data.appointmentDetails.doctor.picture}
                                    style={{

                                        borderRadius: '50%',
                                    }}
                                    height={50}
                                    width={50}
                                />
                            ) : (
                                <Image
                                    alt="profile"
                                    src={notification.data.appointmentDetails.doctor.picture}
                                    style={{

                                        borderRadius: '50%',
                                    }}
                                    height={50}
                                    width={50}
                                />
                            )}
                        </div>
                        <div className="notif-section__message">
                            <div className={styles.messageNotif}>
                                <span>
                                    Dr. {notification.data.appointmentDetails.doctor?.firstName}{' '}
                                    has requested to reschedule the appointment booked for{' '}
                                    {moment(
                                        notification.data.appointmentDetails.startTime
                                    ).format('DD-MM-YYYY HH:mm')}{' '}
                                    . Click here to reschedule
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
                        <div className="notif-section__arrow">
                            <Image
                                src='/images/svg/right-icon.svg'
                                alt="right-icon"
                                style={{ marginRight: '15px' }}
                                className="ml-2"
                                height={10}
                                width={10}
                            />
                        </div>
                    </div>
                </div>
            </Link>
            <hr />
        </div>
    );
};

export default RescheduleByDoctorNotification;
