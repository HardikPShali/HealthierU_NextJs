import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
// import "./doctor.css";
import { toast } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";
import Cookies from "universal-cookie";
import Loader from "../Common/Loader/Loader";
// import "react-tabs/style/react-tabs.css";
import moment from "moment";
import Avatar from "react-avatar";
import ChatIcon from "@mui/icons-material/Chat";
import VideocamIcon from "@mui/icons-material/Videocam";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import SearchBarComponent from "../Common/SearchAndFilter/SearchComponent";
import FilterComponent from "../Common/SearchAndFilter/FilterComponent";
import {
  rescheduleAppointmentDoctor,
  getPaymentInfoForDoctor,
  getGlobalAppointmentsSearchNew
} from "../../lib/service/FrontendApiServices";
import rightIcon from "../../public/images/svg/right-icon.svg";
import calendar from "../../public/images/icons used/Component 12.svg";
import conHistory from "../../public/images/icons used/Component 15.svg";
import HealthAssessment from "../../public/images/icons used/Component 16.svg";
import MedicalRecord from "../../public/images/icons used/Component 17.svg";
import calendarSmall from "../../public/images/svg/calendar-small.svg";
import timeSmall from "../../public/images/svg/time-small.svg";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectUser } from '../../lib/redux/userSlice';
// import { getInbox } from "../../service/chatService";
// import { videoEnableCheck } from "../../util/chatAndCallValidations";
const MyAppointments = (props) => {
  let router = useRouter()
  const [openReschedule, setOpenReschedule] = useState(false);
  const [rescheduleID, setRescheduleID] = useState("");
  const handleRescheduleOpen = (id) => {
    setRescheduleID(id);
    setOpenReschedule(true);
  };
  const handleRescheduleClose = () => {
    setOpenReschedule(false);
  };
  const [activeAppointments, setActiveAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const cookies = new Cookies();
  const [SelectedPatient, setSelectedPatient] = useState();
  const [currentDoctor, setCurrentDoctor] = useState({
    doctorId: "",
  });
  // const currentDoctor = user?.profileDetails;;
  const { doctorId } = currentDoctor;
  const [age, setAge] = useState(0);
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

  const handleVideoCall = (selectedPatient) => {
    const isVideoEnabled = videoEnableCheck(selectedPatient);
    if (
      isVideoEnabled
    ) {
      handleConfirmVideo();
    } else {
      handleAlertVideo();
    }
  };
  const [appointment, setAppointment] = useState([]);
  const [apptId, setApptId] = useState(0);
  useEffect(() => {
    getGlobalAppointments();
    getApptId()
  }, [apptId]);
  const getApptId = () => {
    setApptId(router.query)
    // setApptId(props.location.search.split("=")[1])
  }

  const calculate_age = (dob) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference);

    setAge(Math.abs(age.getUTCFullYear() - 1970));
  };

  const handleConsultationClick = async (slot, slot1EndTime) => {
    slot.endTime = slot1EndTime;
    setSelectedPatient(slot);
  };

  //NEW DESIGN CODE
  const [search, setSearch] = useState("");
  const [appointmentDets, setAppointmentDets] = useState([]);

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
  const [autoselectAppointment, setAutoselectAppointment] = useState({})
  const user = useSelector(selectUser);
  const getGlobalAppointments = async (search, filter = {}) => {
    const docId = user?.profileDetails;;
    setCurrentDoctor({ ...currentDoctor, doctorId: docId.id });
    const starttime = new Date();
    const data = {
      doctorId: docId.id,
      status: "ACCEPTED",
      startTime: starttime.toISOString(),
    };

    if (search && search !== "") {
      data.patientName = search
    }

    if (filter.patientSlot && filter.patientSlot !== "") {
      data.unifiedAppointment = filter.patientSlot;
    }
    if (filter.patientStartTime && filter.patientStartTime !== "") {
      data.startTime = filter.patientStartTime;
    }
    if (filter.patientEndTime && filter.patientEndTime !== "") {
      const endtime = new Date(filter.patientEndTime);
      endtime.setHours(23, 59, 59);
      data.endTime = endtime.toISOString();
    }
    const responseTwo = await getGlobalAppointmentsSearchNew(data).catch((err) => {
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
          updateArray.push({
            id: value.id,
            patientId: value.patientId,
            doctorId: value.doctorId,
            doctor: value.doctor,
            startTime: new Date(value.startTime),
            endTime: new Date(value.endTime),
            remarks: value.remarks,
            status: value.status,
            appointmentId: value.appointmentId,
            appointmentMode: value.appointmentMode,
            unifiedAppointment: value.unifiedAppointment,
            patient: value.patient,
          });
        });
        setAppointmentDets(updateArray.reverse());
        updateArray.find((app) => {
          if (apptId == app.id) {
            const birthDate = new Date(app.patient.dateOfBirth);
            const difference = Date.now() - birthDate.getTime();
            const age = new Date(difference);
            setAge(Math.abs(age.getUTCFullYear() - 1970));
            setSelectedPatient({
              id: app.id,
              patientId: app.patientId,
              doctorId: app.doctorId,
              doctor: app.doctor,
              startTime: new Date(app.startTime),
              endTime: new Date(app.endTime),
              remarks: app.remarks,
              status: app.status,
              appointmentMode: app.appointmentMode,
              appointmentId: app.appointmentId,
              unifiedAppointment: app.unifiedAppointment,
              patient: app.patient,
            })
            getPaymentInfo(app)
          }
        })
      }

    }
  };
  const handleSearchInputChange = async (searchValue) => {
    if (searchValue === "") {
      getGlobalAppointments(searchValue);
    } else {
      getGlobalAppointments(searchValue);
      setSearch(searchValue);
    }
  };

  const handleFilterChange = (filter) => {
    getGlobalAppointments(search, filter);
  };
  const rescheduleAppointment = async (id) => {
    handleRescheduleClose()
    const apID = id;
    let docID;
    let aID;
    appointmentDets.map((a, i) => {
      if (a.id == apID) {
        docID = a.doctorId;
        aID = a.id;
      }
    });
    const data = {
      id: aID,
      doctorId: docID,
    };
    const res = await rescheduleAppointmentDoctor(data).catch((err) => {
      if (err.res.status === 500 || err.res.status === 504) {
        setLoading(false);
      }
    });
    if (res) {
      toast.success("Update sent to patient for rescheduling.");
      router.reload(window.location.pathname)
    }
  };
  const setNextAppointment = (id) => {
    const apID = id;
    let stateData = [];
    let aID;
    appointmentDets.map((a, i) => {
      if (a.id == apID) {
        aID = a.id;
        stateData = a;

        setTimeout(
          () =>
            router.push({
              pathname: `/doctor/setNextAppointment`,
              state: stateData,
            }),
          500
        );
      }
    });
  };
  const consultationHistory = (id) => {
    setTimeout(
      () =>
        router.push({
          pathname: `/doctor/consultationhistory/${id}`,
        },),
      500
    );
  };

  //video call code
  let queryChannelId;

  const videoClickHandler = async (channelId = null) => {
    const result = await getInbox();
    const patientId = SelectedPatient.patientId;
    const inbox = result.data.data.filter((item) => {
      return item.patientInfo.id === patientId;
    })
    queryChannelId = inbox[0].id;
    router.push(`/doctor/chat?channelId=${queryChannelId}&openVideo=${true}`);
  };

  const chatClickHandler = async (channelId = null) => {
    const result = await getInbox();
    const patientId = SelectedPatient.patientId;
    const inbox = result.data.data.filter((item) => {
      return item.patientInfo.id === patientId;
    })
    queryChannelId = inbox[0].id;
    router.push(`/doctor/chat?channelId=${queryChannelId}`);
  };

  return (
    <div className="bg-grey">
      {loading && <Loader />}
      <Container>
        <Row>
          <Col lg={6} md={6} id="col">
            <div id="patient-col-1">
              <div id="patient-heading">My Appointments</div>
              <div className="d-flex mt-2">
                <SearchBarComponent updatedSearch={handleSearchInputChange} />
                <FilterComponent updatedFilter={handleFilterChange} />
              </div>
              <div id="patient-list">
                <div className="patient-list__card-box scroller-cardlist">
                  <div className="patient-list__card-holder">
                    <div className="row">
                      {/* MAP HERE */}
                      {appointmentDets.length !== 0 ? (
                        appointmentDets.map((details, index) => {
                          if (
                            details.unifiedAppointment ===
                            (activeAppointments[index + 1] &&
                              activeAppointments[index + 1].unifiedAppointment)
                          ) {
                            if (details && details.patient) {
                              return (
                                <div
                                  className="col-md-12 mb-2 mt-2 cursor-pointer"
                                  key={index}
                                >
                                  <div
                                    className="patient-list__card"
                                    onClick={async () => {
                                      handleConsultationClick(
                                        details,
                                        activeAppointments[index + 1].endTime
                                      );
                                      Object.keys(details.patient).map(
                                        (patientData) => {
                                          return calculate_age(
                                            details.patient.dateOfBirth &&
                                            details.patient.dateOfBirth
                                          );
                                        }
                                      );
                                    }}
                                  >
                                    <div className="row align-items-start py-1">
                                      <div className="col-md-2  d-flex flex-column mt-3 ml-3">
                                        <h5 className="patient-list__common-date">
                                          <b>
                                            {moment(details.startTime).format(
                                              "DD"
                                            )}
                                          </b>
                                        </h5>
                                        <span className="patient-list__common-span">
                                          {moment(details.startTime).format(
                                            "hh:mm A"
                                          )}
                                        </span>
                                      </div>
                                      <div className="col-md-3  ml-3 mt-2 pb-2">
                                        {details.patient.picture ? (
                                          <Image
                                            src={details.patient.picture}
                                            alt="profile"
                                            className="patient-list__img-circle "
                                            width={150}
                                            height={150}
                                          />
                                        ) : (
                                          <Avatar
                                            round={true}
                                            name={
                                              details.patient.firstName +
                                              " " +
                                              (details.patient.lastName || "")
                                            }
                                            size={60}
                                            className="my-appointment-avatar"
                                          />
                                        )}
                                      </div>
                                      <div className="col-md-7  d-flex flex-column mt-3">
                                        <h5 className="patient-list__common-name">
                                          <>
                                            {details.patient.firstName +
                                              " " +
                                              (details.patient.lastName || "")}
                                          </>
                                        </h5>
                                        <span className="patient-list__common-span-consult">
                                          {details.appointmentMode}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          } else if (
                            details.unifiedAppointment !==
                            (activeAppointments[index + 1] &&
                              activeAppointments[index + 1]
                                .unifiedAppointment) &&
                            details.unifiedAppointment ===
                            (activeAppointments[index - 1] &&
                              activeAppointments[index - 1]
                                .unifiedAppointment)
                          ) {
                            if (details && details.patient) {
                              return false;
                            }
                          } else if (
                            details.unifiedAppointment !==
                            (activeAppointments[index + 1] &&
                              activeAppointments[index + 1]
                                .unifiedAppointment) &&
                            details.unifiedAppointment !==
                            (activeAppointments[index - 1] &&
                              activeAppointments[index - 1]
                                .unifiedAppointment)
                          ) {
                            if (details && details.patient) {
                              return (
                                <div
                                  className="col-md-12 mb-2 mt-2 cursor-pointer"
                                  key={index}
                                >

                                  <div
                                    className="patient-list__card"
                                    onClick={async () => {
                                      setSelectedPatient(details);
                                      getPaymentInfo(details)
                                      Object.keys(details.patient).map(
                                        (patientData) => {
                                          return calculate_age(
                                            details.patient.dateOfBirth &&
                                            details.patient.dateOfBirth
                                          );
                                        }
                                      );
                                    }}
                                  >
                                    <div className="row align-items-start py-1">
                                      <div className="col-md-2  d-flex flex-column mt-3 ml-3">
                                        <h5 className="patient-list__common-date">
                                          <b>
                                            {moment(details.startTime).format(
                                              "DD"
                                            )}
                                          </b>
                                        </h5>
                                        <span className="patient-list__common-span">
                                          {moment(details.startTime).format(
                                            "hh:mm A"
                                          )}
                                        </span>
                                      </div>
                                      <div className="col-md-2  ml-3 mt-2 pb-2">
                                        {details.patient.picture ? (
                                          <Image
                                            src={details.patient.picture}
                                            alt="profile"
                                            className="patient-list__img-circle "
                                            width={150}
                                            height={150}
                                          />
                                        ) : (
                                          <Avatar
                                            round={true}
                                            name={
                                              details.patient.firstName +
                                              " " +
                                              (details.patient.lastName || "")
                                            }
                                            size={60}
                                            className="my-appointment-avatar"
                                          />
                                        )}
                                      </div>
                                      <div className="col-md-7  d-flex flex-column mt-3">
                                        <h5 className="patient-list__common-name">
                                          <>
                                            {details.patient.firstName +
                                              " " +
                                              (details.patient.lastName || "")}
                                          </>
                                        </h5>
                                        <span className="patient-list__common-span-consult">
                                          {details.appointmentMode}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          }
                        })
                      ) : (
                        <div
                          className="col-12 ml-2"
                          style={{ textShadow: "none", color: "#3e4543" }}
                        >
                          No Upcoming Appointments
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} md={6} id="col">
            {!dataLoading && (
              <>
                {SelectedPatient ? (
                  <>
                    <div id="request-box">
                      <div id="appointment-request">
                        <Row>
                          <Col xs={8}>
                            <div id="req-name">
                              <b style={{ fontSize: "16px" }}>
                                APID : {SelectedPatient.id} |{" "}
                                {SelectedPatient.appointmentMode}
                              </b>
                            </div>
                          </Col>
                          <Col xs={4} className="text-right">
                            <button
                              className={
                                "btn btn-primary " + SelectedPatient.urgency
                              }
                            >
                              {SelectedPatient.urgency}
                            </button>
                            <br />
                            <br />
                          </Col>
                        </Row>
                        <Row style={{ alignItems: "center" }}>
                          <Col xs={3}>
                            {SelectedPatient &&
                              SelectedPatient.patient &&
                              (SelectedPatient.patient.picture ? (
                                <div
                                  className="img-box"
                                  style={{
                                    background: `url(${SelectedPatient.patient.picture})`,
                                  }}
                                >
                                </div>
                              ) : (
                                <Avatar
                                  name={
                                    SelectedPatient.patient.firstName +
                                    " " +
                                    (SelectedPatient.patient.lastName || "")
                                  }
                                  size="113"
                                  className="my-patient-avatar"
                                />
                              ))}
                          </Col>
                          <Col xs={9} style={{ textAlign: "center" }}>
                            <b>
                              <p className="pclass">Upcoming Appointment</p>
                            </b>

                            <div className="my-patient-card__card-details--date-div">
                              <div className="my-patient-card__card-time-row">
                                <Image src={calendarSmall} width={50}
                                  height={50} />
                                <span className="my-patient-card__common-span">
                                  {moment(SelectedPatient.startTime).format(
                                    "DD/MM/YY"
                                  )}
                                </span>
                              </div>
                              <div className="my-patient-card__card-time-row ml-4">
                                <Image src={timeSmall} width={50}
                                  height={50} />
                                <span className="my-patient-card__common-span">
                                  {moment(SelectedPatient.startTime).format(
                                    "hh:mm A"
                                  )}
                                </span>
                              </div>
                            </div>
                          </Col>


                        </Row>
                        <Row style={{ alignItems: "center", marginTop: "5px" }}>
                          <Col xs={4} style={{ textAlign: "center" }}>
                            <div id="req-name">
                              <b>
                                {SelectedPatient &&
                                  SelectedPatient.patient &&
                                  SelectedPatient.patient.firstName +
                                  " " +
                                  (SelectedPatient.patient.lastName || "")}
                              </b>
                              <br />
                              {age} Years Old
                            </div>
                          </Col>
                          <Col xs={4}>
                            <div id="req-name">
                              <b className="pclass1">Fee & Payment Method</b>
                              <br />
                              {appointment.appointmentFee
                              } &nbsp;
                              {appointment.paymentMethod
                              }
                            </div>
                          </Col>

                          <Col
                            xs={4}
                            className="patient-video-button"
                          >

                            <IconButton onClick={() => chatClickHandler()}>


                              <ChatIcon id="active-video-icon" />


                            </IconButton>

                            <IconButton
                              onClick={() =>
                                handleVideoCall(SelectedPatient)
                              }
                            >
                              <VideocamIcon id="active-video-icon" />
                            </IconButton>
                          </Col>
                        </Row>
                      </div>
                      <div id="req-info">
                        <Link
                          href={{
                            pathname: `/doctor/consultationhistory/${SelectedPatient.patientId}`,
                          }}
                        >
                          {/* <a onClick={(e) =>
                          consultationHistory(SelectedPatient.patientId)
                        } */}
                          {/* > */}
                          <div style={{ display: "flex", alignItem: "center" }}>
                            <div style={{ width: "100%" }}>
                              <Image
                                width={50}
                                height={50}
                                fontWeight="300"
                                src={conHistory}
                                alt=""
                                style={{ marginLeft: "5%", marginRight: "5%" }}
                              />
                              Consultation History
                            </div>
                            <Image
                              src={rightIcon}
                              alt="right-icon"
                              style={{ marginRight: "35px" }}
                              width={50}
                              height={50}
                            />
                          </div>
                          {/* </a> */}
                        </Link>
                        <Link
                          href={{
                            pathname: `/doctor/healthassesment-report/${SelectedPatient.patientId}`,
                            state: SelectedPatient.patient,
                          }}
                        >
                          <div style={{ display: "flex", alignItem: "center" }}>
                            <div style={{ width: "100%" }}>
                              <Image
                                width={50}
                                height={50}
                                src={HealthAssessment}
                                alt=""
                                style={{ marginLeft: "5%", marginRight: "5%" }}
                              />
                              Health Assessment Report
                            </div>
                            <Image
                              src={rightIcon}
                              alt="right-icon"
                              style={{ marginRight: "35px" }}
                              width={50}
                              height={50}
                            />
                          </div>
                        </Link>

                        <Link
                          href={{
                            pathname: `/doctor/medicalrecord/${SelectedPatient.patientId}/${SelectedPatient.id}`

                          }}
                        >
                          <div style={{ display: 'flex', alignItem: 'center' }}>
                            <div style={{ width: '100%' }}>
                              <Image
                                width={50}
                                height={50}
                                src={MedicalRecord}
                                alt=""
                                style={{ marginLeft: '5%', marginRight: '5%' }}
                              />
                              Medical Record
                            </div>
                            <Image
                              src={rightIcon}
                              alt="right-icon"
                              style={{ marginRight: '35px' }}
                              width={50}
                              height={50}
                            />
                          </div>
                        </Link>
                        <a
                          onClick={(e) =>
                            setNextAppointment(SelectedPatient.id)
                          }
                          className="set-next"
                        >
                          <div style={{ display: "flex", alignItem: "center" }}>
                            <div style={{ width: "100%" }}>
                              <Image
                                width={50}
                                height={50}
                                src={calendar}
                                alt=""
                                style={{ marginLeft: "5%", marginRight: "5%" }}
                              />
                              Set Next Appointment
                            </div>
                            <Image
                              src={rightIcon}
                              alt="right-icon"
                              style={{ marginRight: "35px" }}
                              width={50}
                              height={50}
                            />
                          </div>
                        </a>

                      </div>
                      <Row>
                        <Col className="profile-btn">
                          {moment().isBefore(moment(SelectedPatient.startTime)) && <button
                            className="btn btn-primary view-btn"
                            onClick={() =>
                              handleRescheduleOpen(SelectedPatient.id)
                            }
                          >
                            Reschedule
                          </button>}
                        </Col>
                      </Row>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      id="request-box"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <p className="text-center">
                        No Patient Data card Selected ...
                      </p>
                    </div>
                  </>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
      {/* <Footer /> */}
      <Dialog
        onClose={confirmVideoClose}
        aria-labelledby="customized-dialog-title"
        open={confirmVideo}
      >
        <DialogTitle id="customized-dialog-title" onClose={confirmVideoClose}>
          Do you want to Start Video Call
        </DialogTitle>
        <DialogActions>

          <button
            autoFocus
            onClick={() => videoClickHandler()}
            className="btn btn-primary"
            id="close-btn"
          >
            Yes
          </button>

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
      <Dialog
        onClose={handleRescheduleClose}
        aria-labelledby="customized-dialog-title"
        open={openReschedule}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleRescheduleClose}
        >
          Are you sure you want to reschedule this patient's slot?
        </DialogTitle>
        <DialogActions>
          <button
            className="btn btn-primary"
            onClick={(e) =>
              rescheduleAppointment(SelectedPatient.id)
            }
          >
            Reschedule
          </button>
          <button
            autoFocus
            onClick={handleRescheduleClose}
            className="btn btn-secondary"
            id="close-btn"
          >
            Close
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyAppointments;
