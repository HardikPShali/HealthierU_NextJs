import React, { useState, useEffect } from "react";
// import "./doctor.css";
import Availability from "./Availability";
import Image from 'next/image';
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Chip from "@mui/material/Chip";
import { makeStyles } from "@mui/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import Loader from "../../Common/Loader/Loader";
import TransparentLoader from "../../Common/Loader/transparentloader";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Avatar from "react-avatar";
import { Link } from "next/link";
import {
  createAppointment,
  deleteAvailableAppointment,
  deleteBookedAppointment,
  getDoctorAppointment,
  getPaymentInfoForDoctor,
  getGlobalAppointmentsSearch,
  getAppointmentsForHomepage
} from "../../../lib/service/FrontendApiServices";
import momentTz from "moment-timezone";
// import { firestoreService } from "../../util";
import rightIcon from "../../../public/images/svg/right-icon.svg";
import HealthAssessment from "../../../public/images/icons used/Component 16.svg";
import MedicalRecord from "../../../public/images/icons used/Component 17.svg";
import calendarIcon from "../../../public/images/svg/calendar-green.svg";
import timeBig from "../../../public/images/svg/time-big-icon.svg";
import dollarIcon from "../../../public/images/svg/dollar-icon.svg";
import creditCardIcon from "../../../public/images/svg/credit-card-icon.svg";
import chatButtonIcon from "../../../public/images/svg/chat-button-icon.svg";
import callButtonIcon from "../../../public/images/svg/video-call-icon.svg";
import { toast } from "react-toastify";
import infoIcon from '../../../public/images/svg/info-i-icon.svg';
import bloodGroupIcon from "../../../public/images/svg/blood-group-icon.svg";
import heightIcon from "../../../public/images/svg/height-icon.svg";
import weightIcon from "../../../public/images/svg/weight-icon.svg";
import bloodPressureIcon from "../../../public/images/svg/blood-pressure-icon.svg";
import { useSelector } from 'react-redux';
import { selectUser } from '../../../lib/redux/userSlice';
import { useRouter } from 'next/router';
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    // "& > *": {
    //   margin: theme.spacing(0.5),
    // },
    padding: "10px",
  },
}));
const Myappointment = (props) => {
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const timeZone = momentTz.tz.guess();
  const { timeZone: currentTimezone, currentDoctor = user?.profileDetails } = props;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const eventStyleGetter = (event) => {
    let backgroundColor;
    let color;
    var res = event.unifiedAppointment && event.unifiedAppointment.split("#");
    if (
      event.startTime >= new Date(moment(new Date()).subtract(25, "minutes")) &&
      event.status === "AVAILABLE"
    ) {
      backgroundColor = "#00D1CD";
      color = "#fff";
    } else if (
      event.startTime >= new Date() &&
      event.status === "ACCEPTED" &&
      res !== "First Consultation"
    ) {
      backgroundColor = "#4f80e2";
      color = "#fff";
    } else if (
      event.startTime <= new Date(moment(new Date()).subtract(25, "minutes"))
    ) {
      backgroundColor = "#a5a5a5";
      color = "#fff";
      var borderColor = "#696969";
      var pointerEvents = "none";
    } else if (res === "First Consultation") {
      backgroundColor = "#3157a3";
      color = "#fff";
    }
    var style = {
      backgroundColor: backgroundColor,
      color: color,
      borderColor: borderColor,
      pointerEvents: pointerEvents,
      height: "25px",
      padding: "0px 5px",
    };
    return {
      style: style,
    };
  };

  const slotStyleGetter = (slot) => {
    let cursor;
    let title;
    let slotClass;
    if (slot >= new Date(moment(new Date()).subtract(25, "minutes"))) {
      cursor = "pointer";
      slotClass = "active";
    }
    if (slot <= new Date(moment(new Date()).subtract(25, "minutes"))) {
      cursor = "default";
      title = "You cannot book an appointment on past time.";
    }
    var style = {
      cursor: cursor,
    };
    var className = slotClass;
    var slotTitle = title;
    return {
      style: style,
      className: className,
      title: slotTitle,
    };
  };

  const classes = useStyles();
  const [state, setState] = useState([]);

  const [warningMsg, setWarningMsg] = useState({
    message: "",
  });
  const { message } = warningMsg;

  const [loading, setLoading] = useState(true);
  const [transparentLoading, setTransparentLoading] = useState(false);
  const [serverError] = useState(false);
  const [acceptedAppointment, setAcceptedAppointment] = useState([]);
  const [todayAppointment, setTodayAppointment] = useState([]);
  const [tomorrowAppointment, setTomorrowAppointment] = useState([]);

  const [selectedAppointment, setSelectedAppointment] = useState();
  const [openAppointmentInfo, setopenAppointmentInfo] = useState(false);

  const handleAppointmentInfoOpen = async (eventData, eventEndTime) => {
    if (eventEndTime) {
      eventData.endTime = eventEndTime;
      setSelectedAppointment(eventData);
      setopenAppointmentInfo(true);
    } else {
      setSelectedAppointment(eventData);
      setopenAppointmentInfo(true);
    }
    const response = await getPaymentInfoForDoctor(eventData.id).catch(
      (err) => {
        if (err.response.status === 500 || err.response.status === 504) {
          setLoading(false);
        }
      }
    );
    if (response.status === 200 || response.status === 201) {
      if (response && response.data) {
        setAppointment(response.data.data)
      }
    }
  };

  const handleAppointmentInfoClose = () => {
    setopenAppointmentInfo(false);
  };

  // Dialog for Delete Booked operation
  const [openDelete, setOpenDelete] = useState(false);
  const handleDeleteOpen = (selectedAppointmentData) => {
    setSelectedAppointment(selectedAppointmentData);
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  // Dialog for Delete Available operation
  const [openAvailableDelete, setOpenAvailableDelete] = useState(false);
  const handleAvailableDeleteOpen = (selectedAppointmentData) => {
    setSelectedAppointment(selectedAppointmentData);
    setOpenAvailableDelete(true);
  };
  const handleAvailableDeleteClose = () => {
    setOpenAvailableDelete(false);
  };

  const [confirmVideo, setConfirmVideo] = useState(false);
  const [alertVideo, setAlertVideo] = useState(false);

  const handleConfirmVideo = () => {
    setConfirmVideo(true);
  };
  const confirmVideoClose = () => {
    setConfirmVideo(false);
  };
  const handleAlertVideo = () => {
    setAlertVideo(true);
  };
  const alertVideoClose = () => {
    setAlertVideo(false);
  };

  const handleVideoCall = (appointmentStartTime) => {
    const AppointmnetBeforeTenMinutes = new Date(
      appointmentStartTime.getTime() - 2 * 60000
    );
    const AppointmnetAfter70Minutes = new Date(
      appointmentStartTime.getTime() + 70 * 60000
    );
    if (
      new Date().toISOString() >= AppointmnetBeforeTenMinutes.toISOString() &&
      new Date().toISOString() <= AppointmnetAfter70Minutes.toISOString()
    ) {
      handleConfirmVideo();
    } else {
      handleAlertVideo();
    }
  };
  const [upcomingAppointment, setUpcomingAppointment] = useState([])
  const clickTabEvent = async (event, startTime, endTime, doctorId) => {
    const today = new Date();
    const docId = user?.profileDetails;;
    // to return the date number(1-31) for the specified date
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0);
    //returns the tomorrow date
    let tomoEndTime = new Date();
    tomoEndTime.setDate(today.getDate() + 1);
    tomoEndTime.setHours(23, 59, 59);
    //  Today
    const starttime = new Date();
    starttime.setHours(0, 0, 0);

    const endtime = new Date();
    endtime.setHours(23, 59, 59);
    if (event === "tomorrow") {
      const TomorrowData = {
        startTime: new Date(tomorrow).toISOString(),
        endTime: new Date(tomoEndTime).toISOString(),
        doctorId: docId.id,
        status: "ACCEPTED",
      };
      const resTomorrow = await getAppointmentsForHomepage(startTime = new Date(tomorrow).toISOString(), endTime = new Date(tomoEndTime).toISOString(), doctorId = docId.id).catch(
        (err) => {
          if (err.response.status === 500 || err.response.status === 504) {
            setLoading(false);
            setTransparentLoading(false);
          }
        }
      );
      if (resTomorrow && resTomorrow.data.data.appointmentsBetweenGivenDates) {
        setTransparentLoading(false);
        const tomoArray = [];
        resTomorrow.data.data.appointmentsBetweenGivenDates.map((value, index) => {
          if (
            value.status === "ACCEPTED"
          ) {
            tomoArray.push({
              id: value.id,
              startTime: new Date(value.startTime),
              endTime: new Date(value.endTime),
              remarks: value.remarks,
              status: value.status,
              doctorId: value.doctorId,
              patientId: value.patientId,
              patient: value.patient,
              appointmentMode: value.appointmentMode,
              unifiedAppointment: value.unifiedAppointment,
            });
          }
          return value;
        });
        setTomorrowAppointment(tomoArray);
        setTransparentLoading(false);
      }
    }
    if (event === "today") {
      const TodayData = {
        startTime: new Date(starttime).toISOString(),
        endTime: new Date(endtime).toISOString(),
        doctorId: docId.id,
        status: "ACCEPTED",
      };
      const resToday = await getAppointmentsForHomepage(startTime = new Date(starttime).toISOString(),
        endTime = new Date(endtime).toISOString(),
        doctorId = docId.id).catch(
          (err) => {
            if (err.response.status === 500 || err.response.status === 504) {
              setLoading(false);
              setTransparentLoading(false);
            }
          }
        );
      if (resToday && resToday.data.data.appointmentsBetweenGivenDates) {
        setTransparentLoading(false);
        const todayArray = [];
        resToday.data.data.appointmentsBetweenGivenDates.map((value, index) => {
          if (
            value.status === "ACCEPTED"
          ) {
            todayArray.push({
              id: value.id,
              startTime: new Date(value.startTime),
              endTime: new Date(value.endTime),
              remarks: value.remarks,
              status: value.status,
              doctorId: value.doctorId,
              patientId: value.patientId,
              patient: value.patient,
              appointmentMode: value.appointmentMode,
              unifiedAppointment: value.unifiedAppointment,
            });
          }
          return value;
        });
        setTodayAppointment(todayArray);
        setTransparentLoading(false);
      }
    }
    if (event === "upcoming") {
      const starttime = new Date();
      starttime.setDate(new Date().getDate() + 2)
      starttime.setHours(0, 0, 0)
      const data = {
        startTime: new Date(starttime).toISOString(),
        doctorId: docId.id,
        status: "ACCEPTED",
      };
      const resupcoming = await getAppointmentsForHomepage(startTime = new Date(starttime).toISOString(), endTime = new Date(newEndDate).toISOString(),
        doctorId = docId.id).catch((err) => {
          if (err.responseTwo.status === 500 || err.responseTwo.status === 504) {
            setLoading(false);
          }
        });
      if (resupcoming && resupcoming.data.data.appointmentsBetweenGivenDates) {
        const upcomingArray = [];
        resupcoming.data.data.appointmentsBetweenGivenDates.map((value, index) => {
          if (
            value.status === "ACCEPTED"
          ) {
            upcomingArray.push({
              id: value.id,
              startTime: new Date(value.startTime),
              endTime: new Date(value.endTime),
              remarks: value.remarks,
              status: value.status,
              doctorId: value.doctorId,
              patientId: value.patientId,
              patient: value.patient,
              appointmentMode: value.appointmentMode,
              unifiedAppointment: value.unifiedAppointment,
            });
          }
          return value;
        });
        setUpcomingAppointment(upcomingArray);
        setTransparentLoading(false);
      }
    }
  }
  useEffect(() => {
    loadAppointment();
  }, []);
  useEffect(() => {
    clickTabEvent();
  }, [tomorrowAppointment]);
  const newStartDate = new Date().setDate(new Date().getDate() - 30);
  const newEndDate = new Date().setDate(new Date().getDate() + 28);
  const loadAppointment = async (startTime, endTime, doctorId) => {
    const docId = user?.profileDetails;
    setTransparentLoading(true);
    const today = new Date();
    // to return the date number(1-31) for the specified date
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0);
    //returns the tomorrow date
    let tomoEndTime = new Date();
    tomoEndTime.setDate(today.getDate() + 1);
    tomoEndTime.setHours(23, 59, 59);
    //  Today
    const starttime = new Date();
    starttime.setHours(0, 0, 0);

    const endtime = new Date();
    endtime.setHours(23, 59, 59);
    const TodayData = {
      startTime: new Date(starttime).toISOString(),
      endTime: new Date(endtime).toISOString(),
      doctorId: docId.id,
      status: null,
    };

    const dataForSelectedDay = {
      startTime: new Date(newStartDate).toISOString(),
      endTime: new Date(newEndDate).toISOString(),
      doctorId: docId.id,
      status: null,
    };
    const res = await getDoctorAppointment(dataForSelectedDay).catch((err) => {
      if (err.response.status === 500 || err.response.status === 504) {
        setLoading(false);
        setTransparentLoading(false);
      }
    });
    const resToday = await getAppointmentsForHomepage(startTime = new Date(starttime).toISOString(),
      endTime = new Date(endtime).toISOString(),
      doctorId = docId.id).catch((err) => {
        if (err.response.status === 500 || err.response.status === 504) {
          setLoading(false);
          setTransparentLoading(false);
        }
      });
    if (res && res.data) {
      setLoading(false);
      setTransparentLoading(false)
      const updateArray = [];
      const acceptedArray = [];
      res.data.reverse();
      //console.log("res.data : ", res.data);
      res.data.map((value, index) => {
        if (value.status === "ACCEPTED" || value.status === "AVAILABLE") {
          updateArray.push({
            id: value.id,
            startTime: new Date(value.startTime),
            endTime: new Date(value.endTime),
            title:
              value.status === "AVAILABLE"
                ? "Slot Available"
                : `${value?.patient?.firstName}`, // have ${value.urgency ? value.urgency : "no"} urgency, comments : ${value.remarks ? value.remarks : "no comments"
            remarks: value.remarks,
            status: value.status,
            doctorId: value.doctorId,
            patientId: value.patientId,
            patientFirstName: value && value.patient && value.patient.firstName,
            patientLastName: value && value.patient && value.patient.lastName || "",
            unifiedAppointment: value.unifiedAppointment,
            appointmentMode: value.appointmentMode,
            patient: value?.patient && value.patient,
          });
        }
        if (
          value.status === "ACCEPTED" &&
          new Date(value.endTime) >= new Date()
        ) {
          acceptedArray.push({
            id: value.id,
            startTime: new Date(value.startTime),
            endTime: new Date(value.endTime),
            remarks: value.remarks,
            status: value.status,
            doctorId: value.doctorId,
            patientId: value.patientId,
            patient: value.patient,
            appointmentMode: value.appointmentMode,
            unifiedAppointment: value.unifiedAppointment,
          });
        }
        return value;
      });
      setState(updateArray);
      setAcceptedAppointment(acceptedArray);
    }
    if (resToday && resToday.data.data.appointmentsBetweenGivenDates) {
      setLoading(false);
      setTransparentLoading(false)
      const todayArray = [];
      resToday.data.data.appointmentsBetweenGivenDates.map((value, index) => {
        if (
          value.status === "ACCEPTED"
        ) {
          todayArray.push({
            id: value.id,
            startTime: new Date(value.startTime),
            endTime: new Date(value.endTime),
            remarks: value.remarks,
            status: value.status,
            doctorId: value.doctorId,
            patientId: value.patientId,
            patient: value.patient,
            appointmentMode: value.appointmentMode,
            unifiedAppointment: value.unifiedAppointment,
          });
        }
        return value;
      });
      setTodayAppointment(todayArray);
    }
  };
  const [currentView, setCurrentView] = useState("")
  const handleMonthView = (targetDate, currentViewName, configuredViewNames) => {
    setCurrentView(currentViewName)
  }
  const handleSelect = async ({ slots }) => {
    let slotStartTime;
    let slotEndTime;
    if (slots.length === 2) {
      slotStartTime = slots[0];
      slotEndTime = slots[1];
    } else if (slots.length === 1) {
      slotStartTime = slots[0];
      slotEndTime = new Date(moment(slots[0]).add(30, "minutes"));
    }
    const slotTime = moment(new Date()).subtract(25, "minutes");
    if (new Date(slots[0]) >= new Date(slotTime)) {
      var duplicateFlag = 0;
      state &&
        state.map((existingEvnts) => {
          if (
            existingEvnts.startTime.toISOString() === slots[0].toISOString()
          ) {
            duplicateFlag = 1;
            setWarningMsg({
              ...warningMsg,
              message: "You cannot create the slots twice for the same time!",
            });
          }
          return existingEvnts;
        });
      if (
        slots[0].toISOString() >
        new Date(new Date().setDate(new Date().getDate() + 28)).toISOString()
      ) {
        duplicateFlag = 1;
        setWarningMsg({
          ...warningMsg,
          message:
            "You cannot make the slots available for booking more than 28 days from current day!",
        });
      }
      if (duplicateFlag === 0) {
        setTransparentLoading(true);
        if (currentView === "week" || currentView === "day") {
          const payload = {
            doctorId: currentDoctor.id,
            type: "DR",
            status: "AVAILABLE",
            remarks: null,
            startTime: new Date(slotStartTime).toISOString(),
            endTime: new Date(slotEndTime).toISOString(),
            timeZone: timeZone,
          };
          const res = await createAppointment(payload).catch((err) => {
            if (err.response?.status === 400) {
              setTransparentLoading(false);
              setWarningMsg({
                ...warningMsg,
                message: "You cannot create the slots twice for the same time!",
              });
              handleClickOpen();
            }
            if (err.response?.status === 500 || err.response.status === 504) {
              setTransparentLoading(false);
            }
          });
          if (res && (res.status === 200 || res.status === 201)) {
            duplicateFlag = 0;
            loadAppointment(currentDoctor.id);
          }
        }
        else {
          setTransparentLoading(false);
          toast.error("You cannot make slot in month view")
        }
      }
      else if (duplicateFlag === 1) {
        handleClickOpen();
      }
    }
  };

  // Deletion of Available Appointments
  const deleteAvailableAppointments = async (selectedAppointmentData) => {
    setLoading(true);
    handleAvailableDeleteClose();
    const payload = {
      id: selectedAppointmentData.id,
      doctorId: currentDoctor.id,
      type: "DR",
      status: "UNAVAILABLE",
      remarks: selectedAppointmentData.remarks,
      startTime: null,
      endTime: null,
      timeZone: timeZone,
    };
    const res = await deleteAvailableAppointment(payload).catch((err) => {
      if (err.response.status === 500 || err.response.status === 504) {
        setLoading(false);
      }
    });
    if (res.status === 200 || res.status === 201) {
      loadAppointment(currentDoctor.id);
    }
  };
  const router = useRouter()
  const handleMyAppointmentOpen = (app) => {
    if (app.appointmentMode === "Follow Up") {
      router.push(`/doctor/myappointments?APID=${app.id}`);
    }
    else {
      router.push(`/doctor/myappointments?APID=${app.id}`);
    }

  }

  // Deletion of Booked Appointments
  const handleDelete = async (selectedAppointmentData) => {
    setLoading(true);
    handleDeleteClose();
    const payload = {
      id: selectedAppointmentData.id,
      patientId: selectedAppointmentData.patientId,
      doctorId: currentDoctor.id,
      type: "DR",
      status: "CANCELLED_BY_DOCTOR",
      remarks: selectedAppointmentData.remarks,
      startTime: new Date(selectedAppointmentData.startTime).toISOString(),
      endTime: new Date(selectedAppointmentData.endTime).toISOString(),
      timeZone: timeZone,
    };
    const res = await deleteBookedAppointment(payload).catch((err) => {
      if (err.response.status === 500 || err.response.status === 504) {
        setLoading(false);
      }
    });
    if (res.status === 200 || res.status === 201) {
      loadAppointment(currentDoctor.id);
      firestoreService.sendCancelAppointmentToFirestoreMessage(
        selectedAppointmentData,
        "doctor",
        currentDoctor
      );
    }
  };
  const handleSlotInfo = (event) => {
    console.log("event", event);
    if (event.status === "ACCEPTED") {
      handleAppointmentInfoOpen(event);
      getPaymentInfo(event)
    }
  };
  const [appointment, setAppointment] = useState([]);
  const getPaymentInfo = async (data) => {
    const response = await getPaymentInfoForDoctor(data.id).catch(
      (err) => {
        if (err.response.status === 500 || err.response.status === 504) {
          setLoading(false);
        }
      }
    );
    if (response.status === 200 || response.status === 201) {
      if (response && response.data) {
        setAppointment(response.data.data)
      }
    }
  }
  useEffect(() => {
    getGlobalAppointments()
  }, [])
  const [appointmentDets, setAppointmentDets] = useState([]);
  const getGlobalAppointments = async () => {
    const starttime = new Date();
    starttime.setDate(new Date().getDate() + 2)
    starttime.setHours(0, 0, 0)
    const data = {
      doctorId: currentDoctor.id,
      status: "ACCEPTED",
      startTime: starttime.toISOString(),
    };
    const responseTwo = await getGlobalAppointmentsSearch(data).catch((err) => {
      if (err.responseTwo.status === 500 || err.responseTwo.status === 504) {
        setLoading(false);
      }
    });
    if (responseTwo.status === 200 || responseTwo.status === 201) {
      if (responseTwo && responseTwo.data) {
        setLoading(false);
        const appointmentDetails = responseTwo.data.data;
        const reversedAppointments = appointmentDetails.reverse();
        const updateArray = [];
        reversedAppointments.map((value, index) => {
          if (value.status === "ACCEPTED") {
            if (
              value.unifiedAppointment ===
              (reversedAppointments[index + 1] &&
                reversedAppointments[index + 1].unifiedAppointment)
            ) {
              updateArray.push({
                id: value.id,
                patientId: value.patientId,
                doctorId: value.doctorId,
                doctor: value.doctor,
                title: `Appointment booked with Dr. ${value?.doctor?.firstName}`,
                startTime: new Date(value.startTime),
                endTime: new Date(reversedAppointments[index + 1].endTime),
                remarks: value.remarks,
                status: value.status,
                appointmentId: value.appointmentId,
                appointmentMode: value.appointmentMode,
                unifiedAppointment: value.unifiedAppointment,
                patient: value.patient,
              });
            } else if (
              value.unifiedAppointment !==
              (reversedAppointments[index + 1] &&
                reversedAppointments[index + 1].unifiedAppointment) &&
              value.unifiedAppointment ===
              (responseTwo[index - 1] &&
                responseTwo[index - 1].unifiedAppointment)
            ) {
              return false;
            } else if (
              value.unifiedAppointment !==
              (reversedAppointments[index + 1] &&
                reversedAppointments[index + 1].unifiedAppointment) &&
              value.unifiedAppointment !==
              (reversedAppointments[index - 1] &&
                reversedAppointments[index - 1].unifiedAppointment)
            ) {
              updateArray.push({
                id: value.id,
                patientId: value.patientId,
                doctorId: value.doctorId,
                doctor: value.doctor,
                startTime: new Date(value.startTime),
                endTime: new Date(value.endTime),
                remarks: value.remarks,
                status: value.status,
                appointmentMode: value.appointmentMode,
                appointmentId: value.appointmentId,
                unifiedAppointment: value.unifiedAppointment,
                patient: value.patient,
              });
            }
          }
        });
        setAppointmentDets(updateArray);
      }

    }
  };
  const localizer = momentLocalizer(moment);

  const TouchCellWrapper = ({ children, value, handleSelect }) =>
    React.cloneElement(React.Children.only(children), {
      onTouchEnd: () => handleSelect({ slots: [value] }),
    });

  const handleTabSelection = (event) => {
    // loadAppointment();
  };
  //More Info about Patient
  const [morePatientInfo, setMorePatientInfo] = useState(false);
  const openMorePatientInfo = () => {
    setMorePatientInfo(true);
  };

  const closeMorePatientInfo = () => {
    setMorePatientInfo(false);
  };
  const showBloodGroup = (bg) => {
    if (bg === "APOS") {
      return "A +ve";
    }
    if (bg === "ANEG") {
      return "A -ve";
    }
    if (bg === "BPOS") {
      return "B +ve";
    }
    if (bg === "BNEG") {
      return "B -ve";
    }
    if (bg === "OPOS") {
      return "O +ve";
    }
    if (bg === "ONEG") {
      return "O -ve";
    }
    if (bg === "ABPOS") {
      return "AB +ve";
    }
    if (bg === "ABNEG") {
      return "AB -ve";
    }
  };
  return (
    <div>
      {loading && <Loader />}
      {transparentLoading && <TransparentLoader />}
      {serverError && (
        <>
          <center>
            <h2>Something went wrong. Try again after some time!</h2>
            <p>You will be redirected to HomePage in 5 sec.</p>
          </center>
        </>
      )}
      {!loading && (
        <>
          <br />
          <br />
          <Container>
            <Tabs
              defaultActiveKey="availabilityPerDate"
              id="uncontrolled-tab-example"
              className="record-tabs mb-3"
              onSelect={handleTabSelection}
            >
              <Tab eventKey="availabilityPerDate" title="Set Availability Per Date">
                <Row>
                  <Col>
                    <div className="calender_container bg-white mt-0">
                      <Calendar
                        components={{
                          dateCellWrapper: (props) => (
                            <TouchCellWrapper
                              onSelectSlot={handleSelect}
                              {...props}
                            />
                          ),
                        }}
                        views={["month", "week", "day"]}
                        selectable={true}
                        localizer={localizer}
                        events={state}
                        defaultView={Views.WEEK}
                        getDrilldownView={(targetDate, currentViewName, configuredViewNames) => handleMonthView(targetDate, currentViewName, configuredViewNames)}
                        startAccessor="startTime"
                        endAccessor="endTime"
                        titleAccessor="title"
                        style={{ height: 500 }}
                        timeslots={1}
                        step={30}
                        onSelecting={(slot) => false}
                        onSelectEvent={(event) => handleSlotInfo(event)}
                        onSelectSlot={handleSelect}
                        eventPropGetter={(event) => eventStyleGetter(event)}
                        slotPropGetter={(event) => slotStyleGetter(event)}
                        messages={{
                          previous: "Previous",
                          next: "Next",
                          today: "Today",
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <br />
                <div className="calendar-color">
                  <span className="consultationColor">
                    Available Slots
                  </span>
                  <span className="availableColor">Consultation/Follow Up Appointments</span>
                  <br />
                </div>
                <hr />
                {/* List of Appointments */}
                <Row className="mt-3 mx-1 bg-white p-5 rounded shadow">
                  <Col md={12}>
                    <div className="appointment-slot-list available">
                      <h2 className="mb-3 text-center font-weight-bold">
                        Available Slots for Appointments
                      </h2>
                      {state && (
                        <div className={classes.root}>
                          {state.map((appointment, index) => {
                            if (
                              appointment.status &&
                              new Date(appointment.startTime) >=
                              new Date(
                                moment(new Date()).subtract(25, "minutes")
                              ) &&
                              appointment.status === "AVAILABLE"
                            ) {
                              return (
                                <Chip
                                  key={index}
                                  label={
                                    moment(appointment.startTime).format(
                                      "MMM, DD YYYY"
                                    ) +
                                    "  ( " +
                                    moment(appointment.startTime).format(
                                      "h:mm A"
                                    ) +
                                    " - " +
                                    moment(appointment.endTime).format(
                                      "h:mm A"
                                    ) +
                                    " )  "
                                  }
                                  clickable
                                  className="available"
                                  onDelete={() =>
                                    handleAvailableDeleteOpen(appointment)
                                  }
                                  deleteIcon={<CancelIcon />}
                                />
                              );
                            }
                          })}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
                {/* List of Appointments End */}
                <br />
              </Tab>
              <Tab eventKey="setAvailability" title="Set Recurring Availability">
                <Availability />
              </Tab>
              <Tab eventKey="bookedappointments" title="View Booked Appointments">
                <Row className="mt-3 mx-1 bg-white p-5 rounded shadow">
                  <Col md={12}>
                    <div className="appointment-slot-list available">
                      <div className="tab-view-app">
                        <Tabs
                          defaultActiveKey="today"
                          id="uncontrolled-tab-example"
                          className="record-tabs mb-3"
                          onSelect={clickTabEvent}
                        >

                          <Tab eventKey="today" title="Today">
                            <div>

                              {todayAppointment.length > 0 ? (
                                <div className="tab-view-app__list-disp row">
                                  {todayAppointment.map(
                                    (appointment, index) => {
                                      if (
                                        appointment.status &&
                                        appointment.status === "ACCEPTED"
                                      ) {
                                        return (
                                          <div
                                            className="col-md-6 mb-2 mt-2 cursor-pointer"
                                            key={index}
                                          >
                                            <div
                                              className="patient-list__card"
                                              onClick={() => {
                                                handleMyAppointmentOpen(appointment)
                                              }}
                                            >
                                              <div className="row align-items-start py-1 mobile-resp">
                                                <div className="col-md-2  d-flex flex-column mt-3 ml-3">
                                                  <h5 className="patient-list__common-date">

                                                    <b>
                                                      {moment(
                                                        appointment.startTime
                                                      ).format("DD")}
                                                    </b>
                                                  </h5>
                                                  <span className="patient-list__common-span">
                                                    {moment(
                                                      appointment.startTime
                                                    ).format("hh:mm A")}
                                                  </span>
                                                </div>
                                                <div className="col-md-3  ml-3 mt-2 pb-2">
                                                  {appointment.patient
                                                    .picture ? (
                                                    <Image
                                                      src={
                                                        appointment.patient
                                                          .picture
                                                      }
                                                      width={150}
                                                      height={150}
                                                      alt="profile"
                                                      className="patient-list__img-circle "
                                                    />
                                                  ) : (
                                                    <Avatar
                                                      round={true}
                                                      name={
                                                        appointment.patient
                                                          .firstName +
                                                        " " +
                                                        (appointment.patient
                                                          .lastName || "")
                                                      }
                                                      size={60}
                                                      className="my-appointment-avatar"
                                                    />
                                                  )}
                                                </div>
                                                <div className="col-md-6  d-flex flex-column mt-3">
                                                  <h5 className="patient-list__common-name">
                                                    <b>
                                                      {appointment.patient
                                                        .firstName +
                                                        " " +
                                                        (appointment.patient
                                                          .lastName || "")}
                                                    </b>
                                                  </h5>
                                                  <span className="patient-list__common-span">
                                                    {appointment.appointmentMode}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    }
                                  )}
                                </div>
                              ) : (
                                <div
                                  className="col-12 ml-2"
                                  style={{ textShadow: "none", color: "#3e4543", textAlign: 'center', marginTop: '15%' }}
                                >
                                  No Appointments For Today
                                </div>
                              )}
                            </div>
                          </Tab>
                          <Tab eventKey="tomorrow" title="Tomorrow">
                            <div>
                              {tomorrowAppointment.length > 0 ? (
                                <div className="tab-view-app__list-disp row">
                                  {tomorrowAppointment.map(
                                    (appointment, index) => {
                                      if (
                                        appointment.status &&
                                        appointment.status === "ACCEPTED"
                                      ) {
                                        return (
                                          <div
                                            className="col-md-6 mb-2 mt-2 cursor-pointer"
                                            key={index}
                                          >
                                            <div
                                              className="patient-list__card"
                                              onClick={() => {
                                                handleMyAppointmentOpen(appointment)
                                              }}
                                            >
                                              <div className="row align-items-start py-1 mobile-resp">
                                                <div className="col-md-2  d-flex flex-column mt-3 ml-3">
                                                  <h5 className="patient-list__common-date">

                                                    <b>
                                                      {moment(
                                                        appointment.startTime
                                                      ).format("DD")}
                                                    </b>
                                                  </h5>
                                                  <span className="patient-list__common-span">
                                                    {moment(
                                                      appointment.startTime
                                                    ).format("hh:mm A")}
                                                  </span>
                                                </div>
                                                <div className="col-md-3  ml-3 mt-2 pb-2">
                                                  {appointment.patient
                                                    .picture ? (
                                                    <Image
                                                      src={
                                                        appointment.patient
                                                          .picture
                                                      }
                                                      width={150}
                                                      height={150}
                                                      alt="profile"
                                                      className="patient-list__img-circle "
                                                    />
                                                  ) : (
                                                    <Avatar
                                                      round={true}
                                                      name={
                                                        appointment.patient
                                                          .firstName +
                                                        " " +
                                                        (appointment.patient
                                                          .lastName || "")
                                                      }
                                                      size={60}
                                                      className="my-appointment-avatar"
                                                    />
                                                  )}
                                                </div>
                                                <div className="col-md-6  d-flex flex-column mt-3">
                                                  <h5 className="patient-list__common-name">
                                                    <b>
                                                      {appointment.patient
                                                        .firstName +
                                                        " " +
                                                        (appointment.patient
                                                          .lastName || "")}
                                                    </b>
                                                  </h5>
                                                  <span className="patient-list__common-span">
                                                    {appointment.appointmentMode}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    }
                                  )}
                                </div>
                              ) : (
                                <div
                                  className="col-12 ml-2"
                                  style={{ textShadow: "none", color: "#3e4543", textAlign: 'center', marginTop: '15%' }}
                                >
                                  No Appointments For Tomorrow
                                </div>
                              )}
                            </div>
                          </Tab>
                          {/* upcoming tab */}
                          <Tab eventKey="upcoming" title="Upcoming">
                            <div>
                              {upcomingAppointment.length > 0 ? (
                                <div className="tab-view-app__list-disp row">
                                  {upcomingAppointment.map(
                                    (appointment, index) => {

                                      if (
                                        appointment.status &&
                                        appointment.status === "ACCEPTED"
                                      ) {
                                        return (
                                          <div
                                            className="col-md-6 mb-2 mt-2 cursor-pointer"
                                            key={index}
                                          >
                                            <div
                                              className="patient-list__card"
                                              onClick={() => {
                                                handleMyAppointmentOpen(appointment)
                                              }}
                                            >
                                              <div className="row align-items-start py-1 mobile-resp">
                                                <div className="col-md-2  d-flex flex-column mt-3 ml-3">
                                                  <h5 className="patient-list__common-date">

                                                    <b>
                                                      {moment(
                                                        appointment.startTime
                                                      ).format("DD")}
                                                    </b>
                                                  </h5>
                                                  <span className="patient-list__common-span">
                                                    {moment(
                                                      appointment.startTime
                                                    ).format("hh:mm A")}
                                                  </span>
                                                </div>
                                                <div className="col-md-3  ml-3 mt-2 pb-2">
                                                  {appointment.patient
                                                    .picture ? (
                                                    <Image
                                                      src={
                                                        appointment.patient
                                                          .picture
                                                      }
                                                      width={150}
                                                      height={150}
                                                      alt="profile"
                                                      className="patient-list__img-circle "
                                                    />
                                                  ) : (
                                                    <Avatar
                                                      round={true}
                                                      name={
                                                        appointment.patient
                                                          .firstName +
                                                        " " +
                                                        (appointment.patient
                                                          .lastName || "")
                                                      }
                                                      size={60}
                                                      className="my-appointment-avatar"
                                                    />
                                                  )}
                                                </div>
                                                <div className="col-md-6  d-flex flex-column mt-3">
                                                  <h5 className="patient-list__common-name">
                                                    <b>
                                                      {appointment.patient
                                                        .firstName +
                                                        " " +
                                                        (appointment.patient
                                                          .lastName || "")}
                                                    </b>
                                                  </h5>
                                                  <span className="patient-list__common-span">
                                                    {appointment.appointmentMode}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    }
                                  )}
                                </div>
                              ) : (
                                <div
                                  className="col-12 ml-2"
                                  style={{ textShadow: "none", color: "#3e4543", textAlign: 'center', marginTop: '15%' }}
                                >
                                  No Upcoming Appointments
                                </div>
                              )}
                            </div>
                          </Tab>
                        </Tabs>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </Container>
          <Dialog
            onClose={handleAppointmentInfoClose}
            aria-labelledby="customized-dialog-title"
            open={openAppointmentInfo}
          >
            <DialogTitle
              id="customized-dialog-title"
              onClose={handleAppointmentInfoClose}
              style={{ textAlign: "center" }}
            >
              Appointment Details
            </DialogTitle>
            <DialogContent dividers>
              {selectedAppointment && selectedAppointment.patient && (
                <div className="details-container">
                  <div className="details-wrapper">
                    <div className="details-content">
                      {selectedAppointment.patient.picture ? (
                        <Image src={selectedAppointment.patient.picture} alt="" width={150}
                          height={150} />
                      ) : (
                        <Avatar
                          name={
                            selectedAppointment.patient.firstName +
                            " " +
                            (selectedAppointment.patient.lastName || "")
                          }
                          className="my-patient-modal__avatar"
                        />
                      )}
                      <h2>
                        {selectedAppointment.patient.firstName}{" "}
                        {selectedAppointment.patient.lastName || ""}
                      </h2>
                      <span className="details-content__app-type">
                        {selectedAppointment.appointmentMode}
                      </span>
                    </div>
                    <div className="details-body">
                      <span>Appointment on</span>

                      <div className="details-body__appointment">
                        <div className="details-body__appointment-time-row">
                          <Image
                            src={calendarIcon}
                            className="details-body__appointment-time-row-image"
                            width={150}
                            height={150}
                          />
                          <span className="details-body__common-span">
                            {moment(selectedAppointment.startTime).format(
                              "DD/MM/YY"
                            )}
                          </span>
                        </div>
                        <div className="details-body__appointment-time-row">
                          <Image
                            src={timeBig}
                            className="details-body__appointment-time-row-image"
                            width={150}
                            height={150}
                          />
                          <span className="details-body__common-span">
                            {moment(selectedAppointment.startTime).format(
                              "hh:mm A"
                            )}
                          </span>
                        </div>
                      </div>
                      <br />
                      <span>Appointment Fee and Payment method</span>

                      <div className="details-body__payment">
                        <div className="details-body__appointment-time-row">
                          <Image
                            src={dollarIcon}
                            className="details-body__appointment-time-row-image"
                            width={150}
                            height={150}
                          />
                          <span className="details-body__common-span">{appointment.appointmentFee}</span>
                        </div>
                        <div className="details-body__appointment-time-row">
                          <Image
                            src={creditCardIcon}
                            className="details-body__appointment-time-row-image"
                            width={150}
                            height={150}
                          />
                          <span className="details-body__common-span">
                            {appointment.paymentMethod}
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="details-links">
                      <Link
                        href={{
                          pathname: `/doctor/healthassesment-report/${selectedAppointment?.patient?.id}`,
                          query: selectedAppointment?.patient,
                        }}
                      >
                        <div className="firefox-helper" style={{ display: "flex", alignItem: "center" }}>
                          <div style={{ width: "100%" }}>
                            <Image
                              width={150}
                              height={150}
                              src={HealthAssessment}
                              alt=""
                              style={{ marginLeft: "5%", marginRight: "5%" }}
                            />
                            Health Assessment Report
                          </div>
                          <Image
                            src={rightIcon}
                            alt="right-icon"
                            style={{ marginRight: "15px" }}
                            width={150}
                            height={150}
                          />
                        </div>
                      </Link>
                      <Link
                        href={{
                          pathname: `/doctor/medicalrecord/${selectedAppointment?.patient?.id}/${selectedAppointment?.id}`,
                          query: selectedAppointment?.patient,
                        }}
                      >
                        <div className="firefox-helper" style={{ display: "flex", alignItem: "center" }}>
                          <div style={{ width: "100%" }}>
                            <Image
                              width={150}
                              height={150}
                              src={MedicalRecord}
                              alt=""
                              style={{ marginLeft: "5%", marginRight: "5%" }}
                            />
                            Medical Record
                          </div>
                          <Image
                            src={rightIcon}
                            alt="right-icon"
                            style={{ marginRight: "15px" }}
                            width={150}
                            height={150}
                          />
                        </div>
                      </Link>
                      <div style={{ display: "flex", alignItem: "center", cursor: 'pointer' }}>
                        <div style={{ width: "100%" }} onClick={() => openMorePatientInfo()}>
                          <Image
                            width={150}
                            height={150}
                            src={infoIcon}
                            alt=""
                            style={{ marginLeft: "5%", marginRight: "5%" }}
                          />
                          More Info About Patient
                        </div>
                        <Image
                          src={rightIcon}
                          alt="right-icon"
                          style={{ marginRight: "15px" }}
                          width={150}
                          height={150}
                        />
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              )}
            </DialogContent>
            <DialogActions id="chat-buttons">
              <div className="modal-button-wrapper">
                <div>
                  <Link
                    href={`/doctor/chat?chatgroup=P${selectedAppointment?.patient?.id}_D${currentDoctor.id}`}
                    title="Chat"
                  >
                    <button autoFocus className="btn btn-primary">
                      <Image
                        src={chatButtonIcon}
                        alt="chat-button-icon"
                        style={{ marginRight: 5 }}
                        width={150}
                        height={150}
                      />
                      Chat
                    </button>
                  </Link>
                </div>

                <button
                  autoFocus
                  onClick={() => handleVideoCall(selectedAppointment.startTime)}
                  className="btn btn-primary"
                >
                  <Image
                    src={callButtonIcon}
                    alt="chat-button-icon"
                    style={{ marginRight: 5 }}
                    width={150}
                    height={150}
                  />
                  Call
                </button>
              </div>
            </DialogActions>
          </Dialog>
          <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              {message}
            </DialogTitle>
            <DialogActions>
              <button
                autoFocus
                onClick={handleClose}
                className="btn btn-primary"
                id="close-btn"
              >
                OK
              </button>
            </DialogActions>
          </Dialog>
          <Dialog
            onClose={handleDeleteClose}
            aria-labelledby="customized-dialog-title"
            open={openDelete}
          >
            <DialogTitle
              id="customized-dialog-title"
              onClose={handleDeleteClose}
            >
              Are you sure to cancel the booked appointment!
            </DialogTitle>
            <DialogActions>
              <button
                autoFocus
                onClick={() => handleDelete(selectedAppointment)}
                className="btn btn-primary"
                id="close-btn"
              >
                OK
              </button>
              <button
                autoFocus
                onClick={handleDeleteClose}
                className="btn btn-secondary"
                id="close-btn"
              >
                Close
              </button>
            </DialogActions>
          </Dialog>
          <Dialog
            onClose={handleAvailableDeleteClose}
            aria-labelledby="customized-dialog-title"
            open={openAvailableDelete}
          >
            <DialogTitle
              id="customized-dialog-title"
              onClose={handleAvailableDeleteClose}
            >
              Are you sure you want to remove this slot ?
            </DialogTitle>
            <DialogActions>
              <button
                autoFocus
                onClick={() => deleteAvailableAppointments(selectedAppointment)}
                className="btn btn-primary"
                id="close-btn"
              >
                OK
              </button>
              <button
                autoFocus
                onClick={handleAvailableDeleteClose}
                className="btn btn-secondary"
                id="close-btn"
              >
                Close
              </button>
            </DialogActions>
          </Dialog>
          <Dialog
            onClose={confirmVideoClose}
            aria-labelledby="customized-dialog-title"
            open={confirmVideo}
          >
            <DialogTitle
              id="customized-dialog-title"
              onClose={confirmVideoClose}
            >
              Do you want to Start Video Call
            </DialogTitle>
            <DialogActions>
              <Link
                href={`/doctor/chat?chatgroup=P${selectedAppointment?.patientId}_D${selectedAppointment?.doctorId}&openVideoCall=true`}
              >
                <button
                  autoFocus
                  className="btn btn-primary"
                  id="close-btn"
                >
                  Yes
                </button>
              </Link>
              <button
                autoFocus
                onClick={confirmVideoClose}
                className="btn btn-primary"
                id="close-btn"
              >
                No
              </button>
            </DialogActions>
          </Dialog>
          <Dialog
            onClose={alertVideoClose}
            aria-labelledby="customized-dialog-title"
            open={alertVideo}
          >
            <DialogTitle id="customized-dialog-title" onClose={alertVideoClose}>
              Video call is possible only 5 minutes before the appointment time and 10 minutes after the appointment end time.
            </DialogTitle>
            <DialogActions>
              <button
                autoFocus
                onClick={alertVideoClose}
                className="btn btn-primary"
                id="close-btn"
              >
                OK
              </button>
            </DialogActions>
          </Dialog>

          {/* More Info about Patient */}
          <Dialog
            onClose={closeMorePatientInfo}
            aria-labelledby="customized-dialog-title"
            open={morePatientInfo}
            style={{ width: "100%" }}
          >
            <DialogTitle
              id="customized-dialog-title"
              onClose={closeMorePatientInfo}
            >
              Patient Info
            </DialogTitle>
            <DialogContent dividers>
              {selectedAppointment && selectedAppointment.patient && (
                <div className="details-container">
                  <div className="details-wrapper">
                    <div className="details-content">
                      {selectedAppointment.patient.picture ? (
                        <Image src={selectedAppointment.patient.picture} alt="" width={150}
                          height={150} />
                      ) : (
                        <Avatar
                          name={
                            selectedAppointment.patient.firstName +
                            " " +
                            (selectedAppointment.patient.lastName || "")
                          }
                          className="my-patient-modal__avatar"
                        />
                      )}
                      <h2>
                        {selectedAppointment.patient.firstName}{" "}
                        {selectedAppointment.patient.lastName || ""}
                      </h2>
                    </div>
                    <div className="details-body">
                      <span>Medical</span>


                      <div className="details-body__appointment">
                        <div className="details-body__appointment-time-row" style={{ marginRight: '50px' }}>
                          <Image
                            src={heightIcon}
                            className="details-body__appointment-time-row-image"
                            width={150}
                            height={150}
                          />
                          <span className="details-body__common-span">
                            <b> Height (CM) : </b>{selectedAppointment.patient.height}
                          </span>
                        </div>
                        <div className="details-body__appointment-time-row">
                          <Image
                            src={weightIcon}
                            className="details-body__appointment-time-row-image"
                            width={150}
                            height={150}
                          />
                          <span className="details-body__common-span">
                            <b> Weight (KG) : </b>{selectedAppointment.patient.weight}
                          </span>
                        </div>
                      </div>
                      <br />
                      <div className="details-body__appointment">
                        <div className="details-body__appointment-time-row">
                          <Image
                            src={bloodGroupIcon}
                            className="details-body__appointment-time-row-image"
                            width={150}
                            height={150}
                          />
                          <span className="details-body__common-span">
                            <b> Blood Group : </b> {showBloodGroup(selectedAppointment.patient.bloodGroup) || "No data found"}
                          </span>
                        </div>
                      </div>

                      <br />
                      <span>Blood Pressure</span>
                      <div className="details-body__payment">
                        <div className="details-body__appointment-time-row" style={{ marginRight: '50px' }}>
                          <Image
                            src={bloodPressureIcon}
                            className="details-body__appointment-time-row-image"
                            width={150}
                            height={150}
                          />
                          <span className="details-body__common-span"><b> High (mmHg) : </b>{selectedAppointment.patient.highBp}</span>
                        </div>
                        <div className="details-body__appointment-time-row">
                          <Image
                            src={bloodPressureIcon}
                            className="details-body__appointment-time-row-image"
                            width={150}
                            height={150}
                          />
                          <span className="details-body__common-span">
                            <b> Low (mmHg) : </b> {selectedAppointment.patient.lowBp}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <button
                onClick={closeMorePatientInfo}
                className="btn btn-primary"
                id="close-btn"
                style={{
                  alignSelf: 'center',
                }}
              >
                OK
              </button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};
export default Myappointment;
