import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
// import Paypal from '../../../CommonModule/Paypal';
import { Col } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import LocalStorageService from '../../../../util/LocalStorageService';
import axios from 'axios';
import { toast } from 'react-toastify';
import rightIcon from '../../../../images/svg/right-icon.svg';
import { getAppointmentMode } from '../../../../util/appointmentModeUtil';
import {
    getUnreadNotificationsCount,
    putMarkAsReadFromNotificationMenu,
} from '../../../../service/frontendapiservices';
import PromoCodeForPatient from '../../PromoCodeForPatient/PromoCodeForPatient';
import PaypalCheckoutButton from '../../PaypalCheckout/PaypalCheckoutButton';

const NextAppointmentNotifications = ({
    notification,
    index,
    createdAtDisplayStyle,
}) => {
    const [clickModal, setClickModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const cookies = new Cookies();
    const currentPatient = cookies.get('profileDetails');

    const userId = currentPatient.userId;
    const firstName = currentPatient.firstName;
    const lastName = currentPatient.lastName;
    const email = currentPatient.email;
    const rate = notification.data.appointmentDetails.doctor.rate;
    const halfRate = notification.data.appointmentDetails.doctor.halfRate;
    const appointmentId = notification.data.appointmentDetails.id;
    const appointmentMode = notification.data.appointmentDetails.appointmentMode;
    const notificationIdForPayment = notification.id;
    const paymentStatus = notification.data.appointmentDetails.paymentStatus;
    const appointmentExpired =
        notification.data.appointmentDetails.appointmentExpired;

    //PROMO-CODE LOGIC---> START
    const [promoCodeApplied, setPromoCodeApplied] = useState(false);
    const [couponIdState, setCouponIdState] = useState(null);
    const [discountApplied, setDiscountApplied] = useState(false);
    const [promoCodeEntered, setPromoCodeEntered] = useState('');
    const [promoCodeObject, setPromoCodeObject] = useState({});
    const [isPromoCodeLoading, setIsPromoCodeLoading] = useState(false);

    const doctorId = notification.data.appointmentDetails.doctor.id;
    const patientId = notification.data.appointmentDetails.patient.id;

    const handlePromoCodeLoading = (loading) => {
        setIsPromoCodeLoading(loading);
    };

    const handlePromoCodeStates = (promoCodeData) => {
        if (!promoCodeData || promoCodeData === false) {
            setPromoCodeApplied(promoCodeData.promoCodeAdded);
            handlePromoCodeLoading(true);
        } else {
            setPromoCodeApplied(promoCodeData.promoCodeAdded);
            setCouponIdState(promoCodeData.couponId);
            setDiscountApplied(promoCodeData.discountApplied);
            setPromoCodeEntered(promoCodeData.promoCodeTextEntered);
            handlePromoCodeLoading(false);
        }
    };

    const onClickPayNowModalHandler = () => {
        setClickModal(true);
    };

    const handleFreeCouponTransactions = async () => {
        setLoading(true);
        let finalAppointmentDataArray = {};
        if (
            promoCodeApplied === true &&
            promoCodeEntered === 'HEALTHIERUAE' &&
            (appointmentMode === 'First Consultation' ||
                appointmentMode === 'FIRST_CONSULTATION')
        ) {
            finalAppointmentDataArray = {
                id: appointmentId,
                type: 'FIRST_CONSULTATION',
                paymentsAppointmentsDTO: {
                    appointmentMode: 'First Consultation',
                    intent: 'CAPTURE',
                    payerId: '44MRCR555FJEA',
                    paymentId: '8CY307745J947952L',
                    paymentmethod: 'paypal website',
                    state: 'COMPLETED',
                    transactionAmount: '0.00',
                    transactionCurrency: 'USD',
                    transactionId:
                        '100%DISCOUNT_COUPON' + Math.floor(Math.random() * 1000000),
                    userName: 'John Doe',
                    userId: 1478,
                },
                notificationId: notificationIdForPayment,
                couponId: couponIdState,
            };
            setLoading(false);
        } else if (
            promoCodeApplied === true &&
            promoCodeEntered === 'HEALTHIERUAE' &&
            (appointmentMode === 'Follow Up' || appointmentMode === 'FOLLOW_UP')
        ) {
            finalAppointmentDataArray = {
                id: appointmentId,
                type: 'FOLLOW_UP',
                paymentsAppointmentsDTO: {
                    appointmentMode: 'Follow Up',
                    intent: 'CAPTURE',
                    payerId: '44MRCR555FJEA',
                    paymentId: '8CY307745J947952L',
                    paymentmethod: 'paypal website',
                    state: 'COMPLETED',
                    transactionAmount: '0.00',
                    transactionCurrency: 'USD',
                    transactionId:
                        '100%DISCOUNT_COUPON' + Math.floor(Math.random() * 1000000),
                    userName: 'John Doe',
                    userId: 1478,
                },
                notificationId: notificationIdForPayment,
                couponId: couponIdState,
            };
            setLoading(false);
        }

        const freePaymentPayload = {
            ...finalAppointmentDataArray,
        };

        const paymentUrlToBeUsed = () => {
            if (promoCodeApplied === true) {
                return '/api/v2/appointments/payment/bulk/coupon';
            } else {
                return '/api/v2/appointments/payment/bulk';
            }
        };

        const paymentUrl = paymentUrlToBeUsed();

        paymentHandler(freePaymentPayload, paymentUrl);
    };

    useEffect(() => {
        if (appointmentMode !== '') {
            setPromoCodeObject({
                doctorId: doctorId,
                patientId: patientId,
                rate: rate,
                halfRate: halfRate,
                apptMode: appointmentMode,
            });
        }
    }, [doctorId, patientId, appointmentMode]);
    //PROMO-CODE LOGIC---> END

    const onPaymentStatusTrueHandler = () => {
        toast.error('Payment already done for this notification.', {
            toastId: 'paymentAlreadyDone',
            hideProgressBar: true,
            autoClose: 3000,
        });
    };

    const onExpiredAppointmentHandler = () => {
        toast.error('This appointment is expired.', {
            toastId: 'expiredAppointment',
            hideProgressBar: true,
            autoClose: 3000,
        });
    };

    const onClickHandler = () => {
        if (
            paymentStatus === false &&
            (appointmentExpired === true || appointmentExpired === null)
        ) {
            onExpiredAppointmentHandler();
        } else if (paymentStatus === false) {
            onClickPayNowModalHandler();
        } else {
            onPaymentStatusTrueHandler();
        }
    };

    const setNextAppointmentHandler = async (orderData) => {
        let setNextAppointmentDataArray = {};
        setNextAppointmentDataArray = {
            id: appointmentId,
            type: getAppointmentMode(appointmentMode),
            paymentsAppointmentsDTO: orderData,
            notificationId: notificationIdForPayment,
        };

        if (promoCodeApplied === true) {
            setNextAppointmentDataArray.couponId = couponIdState;
        }

        const paymentUrlToBeUsed = () => {
            if (promoCodeApplied === true) {
                return '/api/v2/appointments/payment/bulk/coupon';
            } else {
                return '/api/v2/appointments/payment/bulk';
            }
        };

        const paymentUrl = paymentUrlToBeUsed();
        paymentHandler(setNextAppointmentDataArray, paymentUrl);
    };

    const paymentHandler = async (paymentData, paymentUrl) => {
        const setNextApptApi = {
            method: 'post',
            mode: 'no-cors',
            data: paymentData,
            url: paymentUrl,
            headers: {
                Authorization: 'Bearer ' + LocalStorageService.getAccessToken(),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        };

        try {
            // await api call
            const newPaymentResponse = await axios(setNextApptApi);

            //success logic
            if (
                newPaymentResponse.status === 200 ||
                newPaymentResponse.status === 201
            ) {
                setClickModal(false);
                toast.success('Appointment has been set successfully', {
                    toastId: 'nextAppointmentSet',
                    hideProgressBar: true,
                    autoClose: 2000,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (err) {
            //error logic

            const errorMessage = err.response.data.message;
            const errorStatus = err.response.status;

            if (errorStatus === 500 && errorMessage) {
                setClickModal(false);
                toast.error(`${errorMessage}. Please try again.`);
            } else {
                setClickModal(false);
                toast.error(`Payment failed. Please try again.`);
            }
        }
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
        <div key={index} className="set-next-appt">
            <div
                className="notif-section"
                onClick={() => {
                    onClickHandler();
                    markAsReadFromNotificationMenuHandler();
                }}
            >
                <div className="profile-img col-md-3">
                    {notification.data.appointmentDetails?.doctor?.picture ? (
                        <img
                            alt="profile"
                            src={notification.data.appointmentDetails?.doctor.picture}
                            style={{
                                height: 50,
                                width: 50,
                                borderRadius: '50%',
                            }}
                        />
                    ) : (
                        <Avatar
                            round={true}
                            name={notification.data.appointmentDetails?.doctor.firstName}
                            size={60}
                            className="notifications-avatar"
                        />
                    )}
                </div>
                <div className="notif-section__message">
                    <div className="message-notif">
                        <span>
                            {notification.data.message}{' '}
                            {moment(notification.data.appointmentDetails.startTime).format(
                                'DD-MM-YYYY HH:mm'
                            )}{' '}
                            . Click here to pay now.
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
                    <img
                        src={rightIcon}
                        alt="right-icon"
                        style={{ marginRight: '15px' }}
                        className="ml-2"
                    />
                </div>
            </div>
            <hr />
            <Dialog
                onClose={() => setClickModal(false)}
                aria-labelledby="customized-dialog-title"
                open={clickModal}
            >
                <DialogTitle
                    id="customized-dialog-title"
                    onClose={() => setClickModal(false)}
                    style={{ textAlign: 'center' }}
                >
                    Pay Now
                </DialogTitle>
                <DialogContent dividers>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div
                                    style={{
                                        margin: '10% 0% 5% 0%',
                                    }}
                                >
                                    <div id="price-box">
                                        {promoCodeApplied ? (
                                            <span className="price">
                                                $
                                                {appointmentMode === 'First Consultation' ||
                                                    appointmentMode === 'FIRST_CONSULTATION' ||
                                                    appointmentMode === ''
                                                    ? discountApplied
                                                    : appointmentMode === 'Follow Up' ||
                                                        appointmentMode === 'FOLLOW_UP'
                                                        ? discountApplied
                                                        : ''}
                                            </span>
                                        ) : (
                                            <span className="price">
                                                $
                                                {appointmentMode === 'First Consultation' ||
                                                    appointmentMode === 'FIRST_CONSULTATION' ||
                                                    appointmentMode === ''
                                                    ? rate
                                                    : appointmentMode === 'Follow Up' ||
                                                        appointmentMode === 'FOLLOW_UP'
                                                        ? halfRate
                                                        : ''}
                                            </span>
                                        )}

                                        <br />
                                        <span>
                                            USD /{' '}
                                            {appointmentMode === 'First Consultation' ||
                                                appointmentMode === 'FIRST_CONSULTATION' ||
                                                appointmentMode === ''
                                                ? 'First Consultation'
                                                : appointmentMode === 'Follow Up' ||
                                                    appointmentMode === 'FOLLOW_UP'
                                                    ? 'Follow Up'
                                                    : ''}
                                        </span>
                                        <br />
                                        <span style={{ fontSize: 12 }}>
                                            100% Satisfaction Guaranteed
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {Object.keys(promoCodeObject).length > 0 && (
                                <PromoCodeForPatient
                                    onPromoCodeChange={handlePromoCodeStates}
                                    promoCodeData={promoCodeObject}
                                    onPromoCodeLoading={handlePromoCodeLoading}
                                />
                            )}
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    {/* <Col md={12}>
                        <Paypal
                            // appointmentId={appointmentId}
                            appointmentMode={appointmentMode}
                            bookappointment={setNextAppointmentHandler}
                            firstName={firstName}
                            lastName={lastName}
                            email={email}
                            userId={userId}
                            rate={rate}
                            halfRate={halfRate}
                        />
                    </Col> */}
                    {promoCodeEntered === 'HEALTHIERUAE' && (
                        <button
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                            onClick={() => {
                                if (promoCodeEntered === 'HEALTHIERUAE') {
                                    handleFreeCouponTransactions();
                                }
                                setLoading(true);
                            }}
                            disabled={loading}
                        >
                            Pay Now
                        </button>
                    )}
                    {!isPromoCodeLoading && promoCodeEntered !== 'HEALTHIERUAE' && (
                        <Col md={12} className="mt-4 text-center">
                            {/* <Paypal
                                appointmentMode={appointmentMode}
                                bookappointment={setNextAppointmentHandler}
                                firstName={firstName}
                                lastName={lastName}
                                email={email}
                                userId={userId}
                                rate={promoCodeApplied === true ? discountApplied : rate}
                                halfRate={
                                    promoCodeApplied === true ? discountApplied : halfRate
                                }
                            /> */}
                            <PaypalCheckoutButton
                                appointmentMode={appointmentMode}
                                bookappointment={setNextAppointmentHandler}
                                firstName={firstName}
                                lastName={lastName}
                                email={email}
                                userId={userId}
                                rate={promoCodeApplied === true ? discountApplied : rate}
                                halfRate={
                                    promoCodeApplied === true ? discountApplied : halfRate
                                }
                            />
                        </Col>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default NextAppointmentNotifications;
