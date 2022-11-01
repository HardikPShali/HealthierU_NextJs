import moment from 'moment';
import { getUnreadNotificationsCount, putMarkAsReadFromNotificationMenu } from '../../../../lib/service/FrontendApiServices';
import Image from 'next/image';
import Link from 'next/link';


const StringNotifications = ({ notification, index, createdAtDisplayStyle }) => {

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

        <div key={index} onClick={() => markAsReadFromNotificationMenuHandler()}>
            <div className="notif-section">
                <div className="profile-img col-md-3">
                    {notification.data.appointmentDetails?.doctor?.picture ? (
                        <Image
                            alt="profile"
                            src={
                                notification.data.appointmentDetails?.doctor.picture
                            }
                            style={{

                                borderRadius: '50%',
                            }}
                            height={50}
                            width={50}
                        />
                    ) : (
                        <Image
                            alt="profile"
                            src={
                                notification.data.appointmentDetails?.doctor.picture
                            }
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
                        <span>{notification.data.message}</span>
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

    )
}

export default StringNotifications