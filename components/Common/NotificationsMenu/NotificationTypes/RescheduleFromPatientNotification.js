import React from 'react';
import moment from 'moment';
import { getUnreadNotificationsCount, putMarkAsReadFromNotificationMenu } from '../../../../lib/service/FrontendApiServices';
import Image from 'next/image';
import Link from 'next/link';

const RescheduleFromPatientNotification = ({ notification, key, createdAtDisplayStyle }) => {
    return (
        <div>
            <div key={key}>
                <div className="notif-section">
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
                        <div className="message-notif">
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