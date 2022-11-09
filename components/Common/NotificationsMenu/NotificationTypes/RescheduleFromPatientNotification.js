import React from 'react';
import moment from 'moment';
import { getUnreadNotificationsCount, putMarkAsReadFromNotificationMenu } from '../../../../lib/service/FrontendApiServices';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../NotificationsMenuPatient.module.css'
import { useSelector } from 'react-redux';
import { selectRole } from '../../../../lib/redux/userSlice';
import useRole from '../../../../lib/custom-hooks/useRole';

const RescheduleFromPatientNotification = ({ notification, key, createdAtDisplayStyle }) => {

    const role = useSelector(selectRole)
    const roleName = useRole(role)

    return (
        <div>
            <div key={key}>
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

                                You have an appointment rescheduled on{' '}
                                {moment(notification.data.appointmentDetails.startTimeAsString).format(
                                    'DD-MM-YYYY HH:mm'
                                )}{' '}
                                {
                                    roleName === 'patient' && (notification.data.appointmentDetails?.doctor.firstName)
                                }{' '}
                                {
                                    roleName === 'doctor' && (notification.data.appointmentDetails?.patient.firstName)
                                }{' '}
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