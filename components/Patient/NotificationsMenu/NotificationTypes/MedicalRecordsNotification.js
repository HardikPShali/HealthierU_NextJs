import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import {
    getUnreadNotificationsCount,
    putMarkAsReadFromNotificationMenu,
} from '../../../../lib/service/FrontendApiServices';
import styles from '../NotificationsMenuPatient.module.css'

const MedicalRecordsNotification = ({
    notification,
    index,
    createdAtDisplayStyle,
    defaultTabKey,
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
        console.log({ response });

        if (response.data.status === true) {
            //   setBadgeCount(0);
            //   toast.success("Notification marked as read successfully");
            await getUnreadNotificationsCount(userId);
        }
    };

    return (
        <>
            <Link
                href={`/patient/document?defaultTabKey=${defaultTabKey}`}
                className="d-flex flex-column text-dark navlink-hover"
                style={{ marginLeft: 0, marginTop: -16, fontWeight: 400 }}
            >
                <div
                    key={index}
                    onClick={() => markAsReadFromNotificationMenuHandler()}
                >
                    <div className={styles.notifSection}>
                        <div className="profile-img col-md-3">
                            {notification?.data?.appointmentDetails?.doctor?.picture &&
                                notification?.data?.appointmentDetails?.doctor?.picture !==
                                null ? (
                                <Image
                                    alt="profile"
                                    src={notification?.data.appointmentDetails?.doctor.picture}
                                    style={{
                                        borderRadius: '50%',
                                    }}
                                    height={50}
                                    width={50}
                                />
                            ) : (
                                <Image
                                    alt="profile"
                                    src="/images/svg/right-icon.svg"
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
                                <span>{notification.data.message} </span>
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
                                src="/images/svg/right-icon.svg"
                                alt="right-icon"
                                style={{ marginRight: '15px' }}
                                className="ml-2"
                                height={20}
                                width={20}
                            />
                        </div>
                    </div>
                </div>
            </Link>
            <hr />
        </>
    );
};

export default MedicalRecordsNotification;
