import React from 'react';
import moment from 'moment';
import { getUnreadNotificationsCount, putMarkAsReadFromNotificationMenu } from '../../../../lib/service/FrontendApiServices';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../NotificationsMenuPatient.module.css'

const RescheduleFromPatientNotification = ({ notification, key, createdAtDisplayStyle }) => {
    return (
        <div>
            <div key={key}>
                <div className={styles.notifSection}>
                    <div className={styles.profileImage}>
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
                                src='/images/default_image.jpg'
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

                                Appointment is rescheduled on{' '}
                                {moment(notification.data.appointmentDetails.startTimeAsString).format(
                                    'DD-MM-YYYY HH:mm'
                                )}{' '}
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
            </div>
            <hr />
        </div>
    )
}

export default RescheduleFromPatientNotification