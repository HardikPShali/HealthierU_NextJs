import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Modal } from 'react-bootstrap';
// import './doctor.css';
import Pagination from 'react-bootstrap/Pagination';
import { Tab, Tabs } from 'react-bootstrap';
// import 'react-tabs/style/react-tabs.css';
import moment from 'moment';
import {
    postLabDocument,
    getDocumentById,
    deleteDocument,
    getCurrentUserInfo,
    getGlobalMedicalRecordsSearch
} from '../../../lib/service/FrontendApiServices';
import PrescriptionLabCard from '../Prescription-Lab/PrescriptionLabCard';
import '../Prescription-Lab/PrescriptionLab.module.css'
import { useHistory } from 'react-router';
import SearchBarComponent from '../../Common/SearchAndFilter/SearchComponent';
import PrescriptionFilter from '../../Common/SearchAndFilter/PrescriptionFIlter'
import FilterComponentLabResult from '../../Common/SearchAndFilter/FilterComponentlabResult';
import { toast } from 'react-toastify';
import PrescriptionLabCardDoctor from '../Prescription-Lab/PrescriptionLabCardDoctor';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../lib/redux/userSlice';

const Healthassessment = (props) => {

    const router = useRouter()
    const { patientId, apId } = router.query
    const history = useHistory();
    const topicSet = new Set();
    const [questionnaire, setQuestionnaire] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [patient, setPatient] = useState(null);
    const [prescriptionDocumentUrl, setPrescriptionDocumentUrl] = useState('');
    const [showLabResultUpload, setShowLabResultUpload] = useState(false);
    const [showPrescriptionUpload, setShowPrescriptionUpload] = useState(false);

    const [labDocumentUrl, setLabDocumentUrl] = useState('');

    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const handleUploadLabResultClosed = () => setShowLabResultUpload(false);
    const handleUploadPrescriptionClosed = () => setShowPrescriptionUpload(false);

    const [presecriptionDocument, setPresecriptionDocument] = useState({
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
        documentsList: [],
    });

    const [labDocument, setLabDocument] = useState({
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
        documentsList: [],
    });

    const [labResult, setLabResult] = useState({
        name: '',
        duration: null,
        labName: '',
        decription: '',
        labResultDocument: null,
    });

    const [prescriptionResult, setPrescriptionResult] = useState({
        name: '',
        inputList: '',
        dose: '',
        duration: null,
        quantity: '',
        noOfDays: '',
        interval: '',
        prescriptionDocument: null,
    });
    const [inputList, setInputList] = useState([{ medicine: '' }]);
    const handleLabResultChange = (e) => {
        if (e.target.type === 'file') {
            const fileSize = e.target.files[0].size;
            const maxSize = 10000000;
            if (e.target.files[0].size <= maxSize) {
                setErrorMsg('');
                setLabResult({ ...labResult, labResultDocument: e.target.value });
            } else {
                document.getElementById('labResultDocument').value = '';
                setErrorMsg('Please upload PDF file with size less than 10mb.');
            }
        } else {
            setLabResult({ ...labResult, [e.target.name]: e.target.value });
        }
    };

    const handlePrescriptionChange = (e) => {
        if (e.target.type === 'file') {
            const fileSize = e.target.files[0].size;
            const maxSize = 10000000;
            if (e.target.files[0].size <= maxSize) {
                setErrorMsg('');
                setPrescriptionResult({
                    ...prescriptionResult,
                    prescriptionDocument: e.target.value,
                });
            } else {
                document.getElementById('prescriptionDocument').value = '';
                setErrorMsg('Please upload PDF file with size less than 10mb.');
            }
        } else {
            setPrescriptionResult({
                ...prescriptionResult,
                [e.target.name]: e.target.value,
            });
        }
    };
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };
    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };
    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { medicine: '' }]);
    };

    const showLabDocument = async (val) => {
        setLabDocumentUrl(val.documentUrl);
        const link = document.createElement("a");
        link.href = val.documentUrl;
        link.download = `${val.description}.${val.documentType}`;
        document.body.appendChild(link);
        window.open(link, '_blank', 'noopener,noreferrer');
    };

    useEffect(() => {
        loadDocuments();
    }, []);

    const showDocument = async (val) => {
        setPrescriptionDocumentUrl(val.documentUrl);
        const link = document.createElement("a");
        link.href = val.documentUrl;
        link.download = `${val.description}.${val.documentType}`;
        document.body.appendChild(link);
        window.open(link, '_blank', 'noopener,noreferrer');
    };

    const clickPagination = async (pageNumber) => {
        setCurrentPageNumber(pageNumber);
        let page = pageNumber - 1;
        let size = 3;
        let data;
        if (searchandFilterData) {
            data = searchandFilterData
        }
        else {
            data = {
                documentType: 'Prescription',
                doctorId: doctor.id,
                patientId: patient,
            }
        }
        const response = await getGlobalMedicalRecordsSearch(page, size, data)
        const res = []
        const prepData = response.data.data.documentsList.filter(re => re.documentsList.length)
        prepData.forEach((f) => {
            res.push(...f.documentsList)
        })
        setMedicalRecordData(res)

    };
    const clickPaginationForLab = async (pageNumber) => {
        setCurrentPageNumber(pageNumber);
        let page = pageNumber - 1;
        let size = 3;
        let data;
        if (searchandFilterData) {
            data = searchandFilterData
        }
        else {
            data = {
                documentType: 'LabResult',
                patientId: patient,
            }
        }
        const response = await getGlobalMedicalRecordsSearch(page, size, data)
        const res = []
        const prepData = response.data.data.documentsList.filter(re => re.documentsList.length)
        prepData.forEach((f) => {
            res.push(...f.documentsList)
        })
        setMedicalRecordLabData(res)
    };

    const handleEditModal = async (item) => {
        const payload = {
            id: item.id,
            patientId: null,
        };
        const res = await getDocumentById(payload);
        if (res && res.data) {
            if (res.data?.documentUrl !== '') {
                setEditDocument(true);
            } else {
                setEditDocument(false);
            }
            setPrescriptionResult(res.data);
            setDoctor(item.doctor);
            setPatient(item.patient);
            setShowPrescriptionUpload(true);
        }
    };

    const handleEditLabModal = async (item) => {
        const payload = {
            id: item.id,
            patientId: null,
        };
        const res = await getDocumentById(payload);
        if (res && res.data) {
            if (res.data?.documentUrl !== '') {
                setEditDocument(true);
            } else {
                setEditDocument(false);
            }
            setLabResult(res.data);
            setShowLabResultUpload(true);
        }
    };

    const [editDocument, setEditDocument] = useState(false);
    const [appointmentID, setAppointmentID] = useState(0);
    const [lenghtofData, setLenghtofData] = useState({});
    const [lenghtofLabData, setLenghtofLabData] = useState({});
    const user = useSelector(selectUser);
    const loadDocuments = async () => {
        const currentUser = await getCurrentUserInfo();
        const doctor = user?.profileDetails
        if (doctor) {
            setDoctor(doctor);
        }
        if (apId) {
            setAppointmentID(apId)
        }
        if (patientId) {
            setPatient(patientId);
        }
        let page = "0";
        let size = "3";
        const data = {
            documentType: "Prescription",
            doctorId: doctor.id,
            patientId: patientId,
        }
        const presecriptionDocument = await getGlobalMedicalRecordsSearch(page, size, data);
        if (presecriptionDocument.status === 200 || presecriptionDocument.status === 201) {
            const res = []
            const prepData = presecriptionDocument.data.data.documentsList.filter(re => re.documentsList.length)
            prepData.forEach((f) => {
                res.push(...f.documentsList)
            })
            setMedicalRecordData(res)
            setLenghtofData(presecriptionDocument.data.data)
        }
    };

    const handlePrescriptionUploadShow = () => {
        router.push({ pathname: `/doctor/addPrescription/${patientId}/${apId}` });
    };
    const handleUploadLabResultShow = () => {
        setShowLabResultUpload(true);
        setLabResult(null);
    };
    const [errorMsg, setErrorMsg] = useState('');
    const handleLabResultSubmission = async (event) => {
        event.preventDefault();
        setErrorMsg('');
        const data = new FormData(event.target);
        const response = await postLabDocument(data).catch((err) => {
            if (err.response.status === 400) {
                setErrorMsg('Please upalod the document in PDF format.');
            }
        });
        if (response) {
            setShowLabResultUpload(false);
        }
        const info = {
            documentType: "LabResult",
            patientId: patient,
            pageSize: 100,
            pageNo: 0
        }
        const labDocument = await getGlobalMedicalRecordsSearch(info);
        if (labDocument.status === 200 || labDocument.status === 201) {
            const res = []
            const prepData = labDocument.data.data.documentsList.filter(re => re.documentsList.length)
            prepData.forEach((f) => {
                res.push(...f.documentsList)
            })
            setMedicalRecordData(res)
        }
    };
    const clearAll = async () => {
        setMedicalRecordData([])
        setMedicalRecordLabData([])
        const info = {
            documentType: "LabResult",
            patientId: patient
        }
        const labDocument = await getGlobalMedicalRecordsSearch(info);
        if (labDocument.status === 200 || labDocument.status === 201) {
            const res = []
            const prepData = labDocument.data.data.documentsList.filter(re => re.documentsList.length)
            prepData.forEach((f) => {
                res.push(...f.documentsList)
            })
            setMedicalRecordLabData(res)
            setLenghtofLabData(labDocument.data.data)
        }
    }

    const clickTabEvent = async (event) => {
        let documents;
        if (event === "labResult") {
            let page = 0;
            let size = 3;
            const info = {
                documentType: "LabResult",
                patientId: patient
            }
            const labDocument = await getGlobalMedicalRecordsSearch(page, size, info);
            if (labDocument.status === 200 || labDocument.status === 201) {
                const res = []
                const prepData = labDocument.data.data.documentsList.filter(re => re.documentsList.length)
                prepData.forEach((f) => {
                    res.push(...f.documentsList)
                })
                setLenghtofLabData(labDocument.data.data)
                setMedicalRecordLabData(res)
            }
        }

        if (event === "prescription") {
            let page = 0;
            let size = 3;
            const data = {
                documentType: "Prescription",
                doctorId: doctor.id,
                patientId: patient,
            }
            const presecriptionDocument = await getGlobalMedicalRecordsSearch(page, size, data);
            if (presecriptionDocument.status === 200 || presecriptionDocument.status === 201) {
                const res = []
                const prepData = presecriptionDocument.data.data.documentsList.filter(re => re.documentsList.length)
                prepData.forEach((f) => {
                    res.push(...f.documentsList)
                })
                setMedicalRecordData(res)
            }
        }
        setPrescriptionDocumentUrl('');
        setLabDocumentUrl('');
        setCurrentPageNumber(1);
        setCurrentTab(event);
    };

    //Start and End Date

    const [date, setDate] = useState({
        DurationStartDate: '',
        DurationEndDate: '',
    });

    const { DurationStartDate, DurationEndDate } = date;


    // code to get the file extension

    function getFileExtension(filename) {
        const extension = filename.split('.').pop();
        return extension;
    }
    //Search
    const [search, setSearch] = useState('');
    const [medicalRecordData, setMedicalRecordData] = useState([]);
    const [medicalRecordLabData, setMedicalRecordLabData] = useState([]);
    const [searchandFilterData, setSearchandFilterData] = useState();
    const [currentDoctor, setCurrentDoctor] = useState("");
    const [loading, setLoading] = useState(true);
    const [isSearch, setIsSearch] = useState(false);
    const getGlobalPrescriptions = async (search, filter = {}) => {
        const currentDoctor = user?.profileDetails
        setCurrentDoctor({ ...currentDoctor, doctorId: currentDoctor.id });
        setPresecriptionDocument({ documentsList: null })
        const starttime = new Date();
        const endtime = new Date();
        const data = {
            doctorId: currentDoctor.id,
            patientId: patient,
            documentType: "Prescription",
        };
        let page = 0;
        let size = 3;
        if (search && search !== "") {
            data.doctorName = search
        }
        if (filter.startTime && filter.startTime !== '') {
            data.doctorName = ""
            data.startTime = filter.startTime;
        }
        if (filter.endTime && filter.endTime !== '') {
            data.doctorName = ""
            const endtime = new Date(filter.endTime);
            endtime.setHours(23, 59, 59);
            data.endTime = endtime.toISOString();
        }
        if (filter.resultType && filter.resultType !== '') {
            data.doctorName = ""
            data.resultType = filter.resultType;
        }
        setSearchandFilterData(data)
        const responseTwo = await getGlobalMedicalRecordsSearch(page, size, data).catch((err) => {
            if (err.responseTwo.status === 500 || err.responseTwo.status === 504) {
                setLoading(false);
            }
        });

        if (responseTwo.status === 200 || responseTwo.status === 201) {
            const res = []
            const prepData = responseTwo.data.data.documentsList.filter(re => re.documentsList.length)
            prepData.forEach((f) => {
                res.push(...f.documentsList)
            })
            if (res.length > 0) {
                setIsSearch(true)
            }
            setMedicalRecordData(res)
            setLenghtofData(responseTwo.data.data)
            setCurrentPageNumber(1);
        }
    };

    const getGlobalLabResults = async (search, filter = {}) => {
        const currentDoctor = user?.profileDetails
        setCurrentDoctor({ ...currentDoctor, doctorId: currentDoctor.id });
        setLabDocument({ documentsList: null })
        const starttime = new Date();
        const endtime = new Date();
        const data = {
            patientId: patient,
            documentType: "LabResult",
        };
        let page = 0;
        let size = 3;
        if (search && search !== "") {
            data.labName = search
        }
        if (filter.startTime && filter.startTime !== '') {
            data.labName = ""
            data.startTime = filter.startTime;
        }
        if (filter.endTime && filter.endTime !== '') {
            data.labName = ""
            const endtime = new Date(filter.endTime);
            endtime.setHours(23, 59, 59);
            data.endTime = endtime.toISOString();
        }
        if (filter.resultType && filter.resultType !== '') {
            data.labName = ""
            data.resultType = filter.resultType;
        }
        setSearchandFilterData(data)
        const responseTwo = await getGlobalMedicalRecordsSearch(page, size, data).catch((err) => {
            if (err.responseTwo.status === 500 || err.responseTwo.status === 504) {
                setLoading(false);
            }
        });
        if (responseTwo.status === 200 || responseTwo.status === 201) {
            const res = []
            const labData = responseTwo.data.data.documentsList.filter(re => re.documentsList.length)
            labData.forEach((f) => {
                res.push(...f.documentsList)
            })
            if (res.length > 0) {
                setIsSearch(true)
            }
            setMedicalRecordLabData(res)
            setLenghtofLabData(responseTwo.data.data)
            setCurrentPageNumber(1);
        }
    };
    const handleFilterChange = async (filter) => {
        getGlobalLabResults(search, filter);
    };
    const handleSearchInputChange = (searchValue) => {
        if (currentTab === "prescription") {
            getGlobalPrescriptions(searchValue);
        } else {
            getGlobalLabResults(searchValue);
        }
        if (searchValue != "") {
            setSearch(searchValue);
        }
    };

    const handleFilterChangePrescription = (filter) => {
        getGlobalPrescriptions(search, filter);
    };
    const handleSearchInputChangePrescription = (searchValue) => {
        if (searchValue === '') {
            getGlobalPrescriptions(searchValue)
        } else {
            getGlobalPrescriptions(searchValue);
            setSearch(searchValue);
        }
    };
    const [currentTab, setCurrentTab] = useState("prescription");
    const [documentId, setDocumentId] = useState(null);
    const [showDelete, setDeleteShow] = useState(false);
    const handleDeleteShow = () => setDeleteShow(true);
    const handleDeleteClose = () => setDeleteShow(false);
    const handleDeleteModal = (id) => {
        setDocumentId(id);
        setDeleteShow(true);
    };
    const handleDeleteDocumentSubmission = async (event) => {
        setPrescriptionDocumentUrl("");
        setLabDocumentUrl("");
        const resp = await deleteDocument(documentId);
        if (resp) {
            toast.success("Document successfully Deleted.");
            setDeleteShow(false);
        }
        let page = 0;
        let size = 3;
        const info = {
            documentType: "LabResult",
            patientId: patient
        }
        const labDocument = await getGlobalMedicalRecordsSearch(page, size, info);
        if (labDocument.status === 200 || labDocument.status === 201) {
            const res = []
            const prepData = labDocument.data.data.documentsList.filter(re => re.documentsList.length)
            prepData.forEach((f) => {
                res.push(...f.documentsList)
            })
            setMedicalRecordLabData(res)
            setLenghtofLabData(labDocument.data.data)
        }
        const data = {
            documentType: "Prescription",
            doctorId: doctor.id,
            patientId: patient,
        }
        const presecriptionDocument = await getGlobalMedicalRecordsSearch(page, size, data);
        if (presecriptionDocument.status === 200 || presecriptionDocument.status === 201) {
            const res = []
            const prepData = labDocument.data.data.documentsList.filter(re => re.documentsList.length)
            prepData.forEach((f) => {
                res.push(...f.documentsList)
            })
            setMedicalRecordData(res)
            setLenghtofData(presecriptionDocument.data.data)
        }
    };


    return (
        <>
            <div className="container">
                <div className="row mt-4">
                    <div className="col d-flex justify-content-start">
                        <SearchBarComponent updatedSearch={handleSearchInputChange} />
                        {currentTab === "prescription" ? (
                            <PrescriptionFilter updatedFilter={handleFilterChangePrescription} />
                        ) : (
                            <FilterComponentLabResult updatedFilter={handleFilterChange} />
                        )}
                    </div>
                </div>
                <br />
                <br />
                <Tabs className="justify-content-center record-tabs" defaultActiveKey="prescription" id="uncontrolled-tab-example"
                    onSelect={clickTabEvent}>
                    <Tab eventKey="prescription" title="Treatment">
                        <br />
                        <div className="d-flex justify-content-end">
                            <div className="col text-right">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    style={{ fontSize: '0.65rem' }}
                                    onClick={(e) => handlePrescriptionUploadShow()}
                                >
                                    Add Treatment
                                </button>
                            </div>
                        </div>
                        <br />
                        <div>
                            {lenghtofData.totalItems > 0 ? (
                                medicalRecordData.map((docData) => {
                                    return (
                                        <div className="prescription-lab__card-box">
                                            <h3 className="prescription-lab--month-header mb-3 mt-2">
                                                {moment(docData.docUploadTime).format("MMM")}
                                            </h3>
                                            <div className="card-holder">
                                                <div className="row">
                                                    <div style={{ cursor: 'pointer' }} className='prescription-lab-card'>
                                                        {console.log("docData1", docData)}
                                                        <PrescriptionLabCardDoctor
                                                            filetype={getFileExtension(docData.documentUrl)}
                                                            name={docData.name}
                                                            type={'Treatment'}
                                                            apid={appointmentID}
                                                            date={docData.docUploadTime}
                                                            time={docData.docUploadTime}
                                                            download={(e) => showDocument(docData)}
                                                            delete={(e) => handleDeleteModal(docData.id)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                }
                                )) : (
                                <div
                                    className="col-12 ml-2"
                                    style={{ textShadow: 'none', color: '#3e4543' }}
                                >
                                    No Documents
                                </div>
                            )
                            }
                        </div>
                        <br />
                        <div> <Pagination size="sm" style={{ float: 'right' }}>
                            {
                                lenghtofData.totalPages ?
                                    Array.from(Array(lenghtofData.totalPages), (e, i) => {
                                        return <Pagination.Item key={i + 1}
                                            active={i + 1 === currentPageNumber ? true : false}
                                            onClick={e => clickPagination(i + 1)}>
                                            {i + 1}
                                        </Pagination.Item>
                                    })
                                    : <span></span>

                            }
                        </Pagination>
                        </div>
                        <br />
                    </Tab>
                    <Tab eventKey="labResult" title="Lab Result" onSelect={clickTabEvent}>
                        <br />
                        <div className="row">
                            <div className="col-md-10">
                            </div>
                        </div>
                        <br />
                        <div>
                            {lenghtofLabData.totalItems > 0 ? (
                                medicalRecordLabData.map(
                                    (dataItem, subIndex) => {
                                        return (
                                            <div className="prescription-lab__card-box">
                                                <h3 className="prescription-lab--month-header mb-3 mt-2">
                                                    {moment(dataItem.docUploadTime).format("MMM")}
                                                </h3>
                                                <div className="card-holder">
                                                    <div className="row">

                                                        <div style={{ cursor: 'pointer' }} className='prescription-lab-card'>

                                                            <PrescriptionLabCard
                                                                filetype={getFileExtension(dataItem.documentUrl)}
                                                                name={dataItem.name}
                                                                labname={dataItem.labName}
                                                                date={dataItem.docUploadTime}
                                                                time={dataItem.docUploadTime}
                                                                download={(e) => showLabDocument(dataItem)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                )) : (
                                <div
                                    className="col-12 ml-2"
                                    style={{ textShadow: 'none', color: '#3e4543' }}
                                >
                                    No Documents
                                </div>
                            )
                            }
                        </div>
                        <div>
                            <br />
                            <Pagination size="sm" style={{ float: 'right' }}>
                                {
                                    lenghtofLabData?.totalPages ?
                                        Array.from(Array(lenghtofLabData.totalPages), (e, i) => {
                                            return <Pagination.Item key={i + 1} active={i + 1 === currentPageNumber}
                                                onClick={e => clickPaginationForLab(i + 1)}>
                                                {i + 1}
                                            </Pagination.Item>
                                        }) : <span></span>

                                }
                            </Pagination>
                        </div>
                    </Tab>
                </Tabs>
                <br />
                <br />
                <Modal show={showDelete} onHide={handleDeleteShow}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Document</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure to Delete the Document ?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleDeleteClose}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => handleDeleteDocumentSubmission()}
                        >
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default Healthassessment;
