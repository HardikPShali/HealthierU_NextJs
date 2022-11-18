import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import TransparentLoader from '../../Common/Loader/TransparentLoader';
import Loader from '../../Common/Loader/Loader';
import { Button, Modal } from 'react-bootstrap';
import FormControl from '@mui/material/FormControl';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
// import '../doctor.css';
// import 'react-tabs/style/react-tabs.css';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
    postDocumentAddPrescriptionLabResult
} from '../../../lib/service/FrontendApiServices';
import { toast } from 'react-toastify';
import CancelIcon from '@mui/icons-material/Cancel';
import './PrescriptionLab.module.css'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../lib/redux/userSlice';

const AddPrescription = (props) => {
    const [loading, setLoading] = useState(false);
    const [transparentLoading, setTransparentLoading] = useState(false);
    const router = useRouter()
    const { patientId, apId } = router.query
    const user = useSelector(selectUser);
    const [prescriptionResult, setPrescriptionResult] = useState({
        decription: '',
        prescriptionDocument: null,
    });
    const [date, setDate] = useState({
        DurationStartDate: '',
        DurationEndDate: '',
    });
    const [countOfDays, setcountOfDays] = useState(0);
    const [medicalInfo, setMedicalInfo] = useState([]);
    const [prescriptionList, setprescriptionList] = useState([{
        // name: '',
        medicineName: '',
        dose: '',
        duration: '',
        // quantity: '',
        numberOfDays: '',
        interval: '',
        // prescriptionDocument: null,
    }]);
    const [isSave, setIsSave] = useState(false);
    const [isSaveModal, setIsSaveModal] = useState(false);
    // handle input change
    const handleInputChange = (e, index) => {
        if (e.target.type === 'file') {
            const fileSize = e.target.files[0].size;
            const maxSize = 10000000;
            if (e.target.files[0].size <= maxSize) {
                setErrorMsg('');
                setprescriptionList({
                    ...prescriptionList,
                    prescriptionDocument: e.target.value,
                });

                // setShowPrescriptionUpload(true);
            } else {
                document.getElementById('prescriptionDocument').value = '';
                setErrorMsg('Please upload PDF file with size less than 10mb.');
            }
        } else {
            setprescriptionList({
                ...prescriptionList,
                [e.target.name]: e.target.value,

            });
        }
        // if (e.target.name === 'numberOfDays' && 'dose' && 'duration' && 'interval' && 'medicineName') {
        //     setIsSave(true);
        // }
        const { name, value } = e.target;
        const list = [...prescriptionList];
        list[index][name] = value;
        setprescriptionList(list);
    }



    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...prescriptionList];
        list.splice(index, 1);
        setprescriptionList(list);
    };
    // handle click event of the Add button
    const handleAddClick = () => {
        setprescriptionList([...prescriptionList, {
            // name: '',
            medicineName: '',
            dose: '',
            duration: null,
            // quantity: '',
            numberOfDays: '',
            interval: '',
            // prescriptionDocument: null,
        }]);
    };
    const handleUploadPrescriptionClosed = () => setShowPrescriptionUpload(false);
    const [editDocument, setEditDocument] = useState(false);
    const [presecriptionDocument, setPresecriptionDocument] = useState({
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
        documentsList: [],
    });
    const [doctor, setDoctor] = useState(null);
    const [patient, setPatient] = useState(null);

    const loadData = () => {
        const currentDoctor = user?.profileDetails
        if (currentDoctor) {
            setDoctor(currentDoctor);
        }
        const patientInfo = patientId;
        if (patientInfo) {
            setPatient(patientInfo);
        }

    }
    useEffect(() => {
        loadData();
    }, [patient]);
    const handlePrescriptionUploadShow = () => {
        // setDate(0);
        setShowPrescriptionUpload(true);
        setPrescriptionResult(null);
    }
    const [showPrescriptionUpload, setShowPrescriptionUpload] = useState(false);
    const { DurationStartDate, DurationEndDate } = date;
    const [errorMsg, setErrorMsg] = useState('');
    const handlePrescriptionSubmission = async (e) => {
        e.preventDefault();
        let medicineData;
        let doseData;
        let durationData;
        let noOfDaysData;
        let intervalData;
        setIsSaveModal(false)
        if (prescriptionList) {
            prescriptionList.forEach((p) => {
                medicineData = p.medicineName
                doseData = p.dose
                durationData = p.duration
                noOfDaysData = p.numberOfDays
                intervalData = p.interval
            })

            if (medicineData === '' || doseData === '' || noOfDaysData === '' || intervalData === '') {
                { !prescriptionResult.prescriptionDocument && toast.error("All Fields are Required!") }
                setTransparentLoading(false)
            }
            else {
                let isValidDays;
                // document.getElementById('prescriptionSave').disabled = true;
                var reg = new RegExp('^[0-9]{0,3}$');
                prescriptionList.forEach((p) => {
                    if (reg.test(p.numberOfDays) == false) {
                        setTransparentLoading(false)
                        toast.error('Please enter valid Days', {
                            position: "top-right",
                            autoClose: 5000,
                            toastId: 'isValidDaysToast'
                        });
                    }
                    else {
                        isValidDays = true
                    }
                })
                if (isValidDays === true) {
                    var medicalInfo = prescriptionList.map(function (a) { return a; });
                    const medicalDocumentInfo = {
                        documentType: "Prescription",
                        patientId: patient,
                        doctorId: doctor?.id,
                        decription: prescriptionResult?.decription
                    };
                    setErrorMsg('');
                    const formData = new FormData();
                    medicalInfo.map((a) => {
                        if (a.medicineName != '') {
                            formData.append("medicineInfoList", new Blob([JSON.stringify(medicalInfo)], {
                                type: "application/json"
                            }))
                        }
                    })
                    formData.append("medicalDocumentInfo", new Blob([JSON.stringify(medicalDocumentInfo)], {
                        type: "application/json"
                    }));
                    setTransparentLoading(true)
                    const response = await postDocumentAddPrescriptionLabResult(
                        formData
                    ).catch((err) => {
                        setTransparentLoading(false)
                        if (err.response.data.status === false) {
                            toast.error("Something went wrong! Please try again.");
                        }
                    });
                    if (response.status === true) {
                        setTransparentLoading(false)
                        toast.success("Document successfully Uploaded.");
                        const patientInfo = patientId;
                        const apID = apId;
                        window.scrollTo(0, 0)
                        router.push({ pathname: `/doctor/medicalrecord/${patientInfo}/${apID}` })
                    }
                }
            }
        }
        if (prescriptionResult.prescriptionDocument) {
            //Only Document
            const formData = new FormData();
            const medicalDocumentInfo = {
                documentType: "Prescription",
                patientId: patient,
                doctorId: doctor?.id,
                decription: prescriptionResult?.decription
            };
            formData.append("medicalDocumentInfo", new Blob([JSON.stringify(medicalDocumentInfo)], {
                type: "application/json"
            }));
            {
                prescriptionResult.prescriptionDocument &&
                    formData.append("file", (prescriptionResult?.prescriptionDocument))
            }
            setTransparentLoading(true)
            const response = await postDocumentAddPrescriptionLabResult(
                formData
            ).catch((err) => {
                setTransparentLoading(false)
                if (err.response.data.status === false) {
                    toast.error("Something went wrong! Please try again.");
                }
            });
            if (response) {
                setTransparentLoading(false)
                toast.success("Document successfully Uploaded.");
                const patientInfo = patientId;
                const apID = apId;
                window.scrollTo(0, 0)
                router.push({ pathname: `/doctor/medicalrecord/${patientInfo}/${apID}` })
            }
        }
    };
    const handlePrescriptionChange = (e) => {
        if (e.target.type === 'file') {
            const file = e.target.files[0]
            const fileSize = e.target.files[0].size;
            const maxSize = 10000000;
            if (e.target.files[0].size > maxSize) {
                document.getElementById('prescriptionDocument').value = '';
                setErrorMsg('Please upload PDF file with size less than 10mb.');
            } else if (!file.name.match(/\.(jpg|jpeg|png|PNG|JPG|JPEG|pdf|PDF)$/)) {
                setErrorMsg("Document must be PNG, JPG, JPEG or PDF");
                document.getElementById("prescriptionDocument").value = "";
            } else {
                setErrorMsg('');
                setPrescriptionResult({
                    ...prescriptionResult,
                    prescriptionDocument: e.target.files[0],
                });
                setIsSaveModal(true);
            }
        } else {
            setPrescriptionResult({
                ...prescriptionResult,
                [e.target.name]: e.target.value,
            });
        }
    };

    return (
        <div>
            {loading && <Loader />}
            {transparentLoading && <TransparentLoader />}
            <h3 className="prescription-lab--main-header mb-3 mt-2" style={{ paddingTop: '2%' }}>
                Add Treatment
            </h3>
            <div className="prescription-lab__card-box">
                <div className="card-holder">
                    <div className='row'>
                        {prescriptionList.map((x, i) => {
                            return (
                                <div className="col-md-4 mb-2 mt-2 cursor-pointer">
                                    <ValidatorForm>
                                        <div className="prescription-lab-card">
                                            <div>
                                                <input
                                                    hidden={true}
                                                    id="id"
                                                    name="id"
                                                    value={x.id}
                                                    onChange={(e) => handleInputChange(e, i)}
                                                ></input>
                                                <div className="form-group row">
                                                    <label htmlFor="topic" style={{ paddingTop: '10px' }} className="col-sm-3 prescription-lab-card__common-name">
                                                        Medicine
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <TextValidator type="text"
                                                            id="medicineName"
                                                            name="medicineName"
                                                            className="form-control"
                                                            onChange={(e) => handleInputChange(e, i)}
                                                            value={x.medicineName}
                                                            placeholder="Medicine Name"
                                                            required
                                                            variant="filled"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="topic" style={{ paddingTop: '10px' }} className="col-sm-3 prescription-lab-card__common-name">
                                                        Duration
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <TextValidator
                                                            type="text"
                                                            id="duration"
                                                            name="duration"
                                                            className="form-control"
                                                            onChange={(e) => handleInputChange(e, i)}
                                                            value={x.duration}
                                                            placeholder="Duration(Week/Month)"
                                                            required
                                                            variant="filled"
                                                        />
                                                    </div>
                                                    <br />
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="topic" style={{ paddingTop: '10px' }} className="col-sm-3 prescription-lab-card__common-name">
                                                        Dose
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <TextValidator
                                                            type="text"
                                                            id="dose"
                                                            name="dose"
                                                            className="form-control"
                                                            onChange={(e) => handleInputChange(e, i)}
                                                            value={x.dose}
                                                            placeholder="Dose"
                                                            required
                                                            variant="filled"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="topic" style={{ paddingTop: '10px' }} className="col-sm-3 prescription-lab-card__common-name">
                                                        Days
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <TextValidator
                                                            type="text"
                                                            id="numberOfDays"
                                                            name="numberOfDays"
                                                            className="form-control"
                                                            onChange={(e) => handleInputChange(e, i)}
                                                            value={x.numberOfDays || ""}
                                                            placeholder="Number Of Days"
                                                            required
                                                            variant="filled"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="topic" style={{ paddingTop: '10px' }} className="col-sm-3 prescription-lab-card__common-name">
                                                        Interval
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <FormControl>
                                                            <Select
                                                                id="demo-controlled-open-select"
                                                                variant="filled"
                                                                name="interval"
                                                                value={x.interval}
                                                                onChange={(e) => handleInputChange(e, i)}
                                                                displayEmpty
                                                                required
                                                                style={{ textShadow: 'none' }}
                                                            >
                                                                <MenuItem value="">
                                                                    <em>Select Interval</em>
                                                                </MenuItem>
                                                                <MenuItem value="Daily">
                                                                    <em>Daily</em>
                                                                </MenuItem>
                                                                <MenuItem value="2x Day">
                                                                    <em>2x Day</em>
                                                                </MenuItem>
                                                                <MenuItem value="3x Day">
                                                                    <em>3x Day</em>
                                                                </MenuItem>
                                                                {/* <MenuItem value="1-0-1">
                                                                    <em>1-0-1</em>
                                                                </MenuItem>
                                                                <MenuItem value="1-1-1">
                                                                    <em>1-1-1</em>
                                                                </MenuItem> */}
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="btn-box">
                                                    {prescriptionList.length !== 1 && (
                                                        <Button
                                                            className="medicineRemoveButton"
                                                            variant="secondary"
                                                            onClick={() => handleRemoveClick(i)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    )}
                                                    {prescriptionList.length - 1 === i && (
                                                        <Button
                                                            className="medicineButton"
                                                            variant="primary"
                                                            onClick={handleAddClick}
                                                        >
                                                            Add Medicine
                                                        </Button>
                                                    )}
                                                </div>
                                                <h3 className="prescription-lab--main-header mb-3 mt-2">
                                                    OR
                                                </h3>
                                                <Button
                                                    className="medicineButtonPrescription"
                                                    variant="primary"
                                                    onClick={(e) => handlePrescriptionUploadShow()}
                                                >
                                                    Upload Image/Document
                                                </Button>
                                                <br />

                                            </div>
                                            <br />
                                            <div className="container">
                                                <div className="row"></div>
                                            </div>
                                        </div>

                                    </ValidatorForm>
                                </div>

                            );
                        })
                        }
                    </div>
                    <div className='submitClass'>
                        <Button
                            onClick={(e) => handlePrescriptionSubmission(e)}
                            type='submit'
                            variant="primary"
                        >
                            Save
                        </Button>
                    </div>

                    <Modal show={showPrescriptionUpload} onHide={handleUploadPrescriptionClosed}>
                        <form onSubmit={(e) => handlePrescriptionSubmission(e)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Treatment</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <input
                                    hidden={true}
                                    id="id"
                                    name="id"
                                    value={prescriptionResult?.id}
                                    onChange={(e) => handlePrescriptionChange(e)}
                                ></input>
                                {/* <div className="form-group row">
                                    <label htmlFor="description" className="col-sm-3 col-form-label">
                                        Description
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            id="decription"
                                            name="decription"
                                            className="form-control"
                                            onChange={(e) => handlePrescriptionChange(e)}
                                            value={prescriptionResult?.decription}
                                            placeholder="Description"
                                            required
                                        ></input>
                                    </div>
                                </div> */}
                                <div className="form-group row">
                                    <label
                                        htmlFor="prescriptionDocument"
                                        className="col-sm-3 col-form-label"
                                    >
                                        Document
                                    </label>
                                    <div className="col-sm-9">
                                        {errorMsg && (
                                            <label
                                                style={{ fontSize: 12, color: '#ff9393', margin: '5px 0' }}
                                                className="left"
                                            >
                                                {errorMsg}
                                            </label>
                                        )}
                                        {!prescriptionResult?.id && (
                                            <input
                                                style={{ padding: '3px' }}
                                                type="file"
                                                id="prescriptionDocument"
                                                name="prescriptionDocument"
                                                className="form-control"
                                                onChange={(e) => handlePrescriptionChange(e)}
                                                placeholder="Document"
                                                accept="application/pdf"
                                                required={prescriptionResult?.id ? false : true}
                                            ></input>
                                        )}
                                        {prescriptionResult?.id && !editDocument && (
                                            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                                <IconButton onClick={() => setEditDocument(true)}>
                                                    <CancelIcon style={{ color: 'red' }} />
                                                </IconButton>
                                                <input
                                                    type="file"
                                                    id="prescriptionDocument"
                                                    name="prescriptionDocument"
                                                    className="form-control"
                                                    onChange={(e) => handlePrescriptionChange(e)}
                                                    placeholder="Document"
                                                    accept="application/pdf"
                                                    required={prescriptionResult?.id ? false : true}
                                                ></input>
                                            </div>
                                        )}
                                        {prescriptionResult?.id && editDocument && (
                                            <>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary mr-2"
                                                    onClick={() => setEditDocument(false)}
                                                >
                                                    Edit
                                                </button>
                                                <a
                                                    href={prescriptionResult?.documentUrl}
                                                    download
                                                    className="btn btn-primary"
                                                >
                                                    Download
                                                </a>
                                            </>
                                        )}
                                    </div>
                                </div>
                                {/* <div className="form-group row">
                                    <label htmlFor="doctorEmail" className="col-sm-3 col-form-label">
                                        Doctor Email
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="email"
                                            id="doctorEmail"
                                            name="doctorEmail"
                                            className="form-control"
                                            value={doctor?.email}
                                            placeholder="Doctor Email"
                                            readOnly
                                        ></input>
                                        {doctor?.id ? (
                                            <span>
                                                Doctor Name:{' '}
                                                <b>
                                                    {doctor?.firstName + ' ' + doctor?.lastName}
                                                    <input
                                                        hidden={true}
                                                        id="doctorId"
                                                        name="doctorId"
                                                        value={doctor?.id}
                                                    />
                                                </b>
                                            </span>
                                        ) : (
                                            <span>No Doctor Found</span>
                                        )}
                                    </div>
                                </div> */}

                                {/* <div className="form-group row">
                                    <label htmlFor="patientEmail" className="col-sm-3 col-form-label">
                                        Patient Email
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="email"
                                            id="patientEmail"
                                            name="patientEmail"
                                            className="form-control"
                                            value={patient?.email}
                                            required={true}
                                            placeholder="Patient Email"
                                            readOnly={patient?.email ? true : false}
                                        ></input>
                                        {patient?.id ? (
                                            <span>
                                                Patient Name:{' '}
                                                <b>
                                                    {patient?.firstName + ' ' + patient?.lastName}
                                                    <input
                                                        hidden={true}
                                                        id="patientId"
                                                        name="patientId"
                                                        value={patient?.id}
                                                    />
                                                </b>
                                            </span>
                                        ) : (
                                            <span>No Patient found</span>
                                        )}
                                    </div>
                                </div> */}

                                <div className="container">
                                    <div className="row"></div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="secondary"
                                    onClick={handleUploadPrescriptionClosed}
                                >
                                    Close
                                </Button>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={
                                        isSaveModal == false
                                    }
                                >
                                    Save
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal>
                </div>
            </div >
        </div >

    )
}

export default AddPrescription;