import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import PhoneInput from 'react-phone-input-2';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogContent from '@mui/material/DialogContent';
import { toast } from 'react-toastify';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {
    uploadDoctorDocument,
    getDoctorDocument,
    updateDoctorDocumentStatus,
    deleteDoctorDocument,
    updateDoctorDocument,
    updateDoctorDocumentNew,
    getDoctorDocumentUrlForAdmin
} from "../../../lib/service/FrontendApiServices";
import TransparentLoader from "../Loader/TransparentLoader";
import GetApp from '@mui/icons-material/GetApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "../DoctorDocument/pdfViewer.module.css";
import { useHistory } from "react-router";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const DoctorDocumentUpload = ({ currentDoctor, isDoctor, setDocumentinfo, setDocumentUpdateFile, documentInfo }) => {
    const [documentData, setDocumentData] = useState([])
    const [currentdocumentData, setCurrentDocumentData] = useState([])
    const [documentName, setDocumentName] = useState();
    const [documentFile, setDocumentFile] = useState();
    const [loading, setLoading] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState();
    const [selectedDocumentUrl, setSelectedDocumentUrl] = useState();
    const [viewDocument, setViewDocument] = useState(false);
    const [documentError, setDocumentError] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [updateInfo, setUpdateInfo] = useState()
    const history = useHistory();
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }
    const [page, setPage] = useState(0)
    useEffect(() => {
        if (currentDoctor?.id) {
            loadDoctorDocument(currentDoctor);
        }
    }, [currentDoctor]);
    useEffect(() => {
    }, [page]);
    const loadDoctorDocument = async (doc) => {
        const doctorId = doc.id;
        const res = await getDoctorDocument(doctorId, 0);
        if (res && res.status === 200) {
            setPage(res.data)
            setDocumentData(res.data.documentsDocumentsList);
            const firstData = res.data.documentsDocumentsList
            const reverse = firstData.reverse()
            setCurrentDocumentData(reverse[0])
            setDocumentinfo(res.data.documentsDocumentsList[0])
            setLoading(false);
        }
        else if (res && res.status === 204) {
            setDocumentData([]);
            setLoading(false);
        }
    }

    const handleDocnameChange = (e) => {
        setDocumentName(e.target.value);
    }

    const [uploadOpen, setUploadOpen] = useState(false);

    const handleUploadClose = () => {
        setUploadOpen(false);
        setDocumentFile("")
        setDocumentUpdateFile("")
        setErrorMsg("");
    }

    const handleUpdateClick = (doc) => {
        setSelectedDocument(doc);
        setUpdateOpen(true);
    }

    const handleUpdateDocnameChange = (e) => {
        setSelectedDocument({ ...selectedDocument, documentName: e.target.value });
    }

    const [updateOpen, setUpdateOpen] = useState(false);

    const handleUpDateClose = () => {
        setSelectedDocument();
        setUpdateOpen(false);
        setErrorMsg("");
    }

    const handleFileChange = (e) => {
        const file = e.target.files;
        for (let i = 0; i < file.length; i++) {
            if (file[i] && file[i].size > 10000000) {
                setDocumentError("Document must be less than 10mb");
                document.getElementById("uploadForm").reset();
            }
            if (file.length > 0) {
                setDocumentError("")
                if (!file[i].name.match(/\.(jpg|jpeg|png|PNG|JPG|JPEG|pdf|PDF)$/)) {
                    // setDocumentError("Document must be PNG, JPG, JPEG or PDF");
                    toast.error("Document must be PNG, JPG, JPEG or PDF", {
                        position: "top-right",
                        autoClose: 5000,
                        toastId: 'handleFileChange'
                    })
                    document.getElementById("uploadForm").reset();
                }
                else {
                    setDocumentError("");
                    setDocumentFile(e.target.files);
                    setDocumentUpdateFile(e.target.files)
                }
            }
        }
    }
    const [error, SetError] = useState("")
    const [errorLicense, SetErrorLicense] = useState("")
    const [errorCertiBody, SetErrorCertiBody] = useState("")
    const [isValidlicense, setIsValidlicense] = useState(false)
    const [isValidcertifyingBody, setIsValidcertifyingBody] = useState(false)
    const handleUpload = async (e) => {
        e.preventDefault();
        const info = {
            doctorId: currentDoctor.id,
            doctor_email: currentDoctor.email,
            licenseNumber: state.licenseNumber,
            referencePhoneNumber: state.referencePhoneNumber,
            certifyingBody: state.certifyingBody
        }
        const updateInfo = {
            doctorId: currentDoctor.id,
            licenseNumber: state.licenseNumber,
            referencePhoneNumber: state.referencePhoneNumber,
            certifyingBody: state.certifyingBody
        }
        var regLicenseNo = new RegExp('^[a-zA-Z0-9 /-]+$');
        var regCertifyingBody = new RegExp('^[a-zA-Z0-9 {}]+$');
        let isValidLicense, isvalidCertyBody
        if (regLicenseNo.test(state.licenseNumber) == false) {
            setLoading(false);
            setUploadOpen(false)
            toast.error('Please enter valid license number', {
                position: "top-right",
                autoClose: 5000,
                toastId: 'isValidlicense'
            });
            return false;
        }
        else {
            isValidLicense = true
        }
        if (regCertifyingBody.test(state.certifyingBody) == false) {
            setLoading(false);
            setUploadOpen(false)
            toast.error('Please enter valid certifying Body', {
                position: "top-right",
                autoClose: 5000,
                toastId: 'isValidcertifyingBody'
            });
            return false;
        }
        else {
            isvalidCertyBody = true
        }
        if (!documentFile) {
            setLoading(false);
            toast.error("Please select file before uploading!", {
                position: "top-right",
                autoClose: 5000,
                toastId: 'documentFile'
            })
            SetError("")
            SetErrorLicense("")
            SetErrorCertiBody("")
            setPhoneError("")
        }
        if (isValidLicense == true && isvalidCertyBody == true) {
            if (documentFile && info.licenseNumber !== null && info.referencePhoneNumber !== null && info.certifyingBody !== null) {
                SetError("")
                SetErrorLicense("")
                SetErrorCertiBody("")
                setPhoneError("")
                if (info.licenseNumber !== "" && info.referencePhoneNumber !== "" && info.certifyingBody !== "") {
                    SetError("")
                    SetErrorLicense("")
                    SetErrorCertiBody("")
                    setPhoneError("")
                    if (info.licenseNumber && info.certifyingBody && info.referencePhoneNumber) {
                        SetError("")
                        SetErrorLicense("")
                        SetErrorCertiBody("")
                        setPhoneError("")
                        setLoading(true);
                        const res = await uploadDoctorDocument(documentFile, info).catch(err => {
                            toast.error("Something went wrong. Please try again!")
                            history.push(0)
                            setLoading(false);
                        });
                        if (res && res.status === 201) {
                            toast.success("Document Successfully Uploaded.");
                            const existingDoc = documentData;
                            existingDoc.push(res.data.data);
                            setDocumentData(existingDoc);
                            setUploadOpen(false);
                            setLoading(false)
                            const res1 = await getDoctorDocument(currentDoctor.id, 0);
                            if (res1 && res1.status === 200) {
                                setPage(res1.data)
                                setDocumentData(res1.data.documentsDocumentsList);
                                setCurrentDocumentData(res1.data.documentsDocumentsList[0])
                                setDocumentinfo(res1.data.documentsDocumentsList[0])
                                setDocumentFile("")
                                setLoading(false);
                            }
                            else if (res1 && res1.status === 204) {
                                setDocumentData([]);
                                setDocumentFile("")
                                setLoading(false);
                            }
                            const res2 = await updateDoctorDocumentNew(updateInfo).catch(err => {
                                if (err.response.status === 500 || err.response.status === 504) {
                                    setLoading(false);
                                }
                            });
                        }
                    }
                    else if (!info.referencePhoneNumber) {
                        setLoading(false);
                        setUploadOpen(false)
                        SetError("")
                        SetErrorLicense("")
                        SetErrorCertiBody("")
                        setDocumentFile("")
                        setPhoneError("Required for document uploading!")
                    }
                    else if (!info.licenseNumber) {
                        setLoading(false);
                        setUploadOpen(false)
                        SetError("")
                        SetErrorLicense("Required for document uploading!")
                        SetErrorCertiBody("")
                        setDocumentFile("")
                        setPhoneError("")
                    }
                    else if (!info.certifyingBody) {
                        setLoading(false);
                        setUploadOpen(false)
                        SetError("")
                        SetErrorLicense("")
                        SetErrorCertiBody("Required for document uploading!")
                        setDocumentFile("")
                        setPhoneError("")
                    }
                    else {
                        setLoading(false);
                        setUploadOpen(false)
                        setDocumentFile("")
                        SetErrorLicense("Required for document uploading!")
                        SetErrorCertiBody("Required for document uploading!")
                        SetError("Required for document uploading!")
                    }
                }
                else if (info.referencePhoneNumber == "") {
                    setLoading(false);
                    setUploadOpen(false)
                    SetError("")
                    SetErrorLicense("")
                    SetErrorCertiBody("")
                    setDocumentFile("")
                    setPhoneError("Required for document uploading!")
                }
                else if (info.licenseNumber == "") {
                    setLoading(false);
                    setUploadOpen(false)
                    SetError("")
                    SetErrorLicense("Required for document uploading!")
                    SetErrorCertiBody("")
                    setDocumentFile("")
                    setPhoneError("")
                }
                else if (info.certifyingBody == "") {
                    setLoading(false);
                    setUploadOpen(false)
                    SetError("")
                    SetErrorLicense("")
                    SetErrorCertiBody("Required for document uploading!")
                    setDocumentFile("")
                    setPhoneError("")
                }
                else {
                    setLoading(false);
                    setUploadOpen(false)
                    setDocumentFile("")
                    SetError("Required for document uploading!")
                    SetErrorLicense("Required for document uploading!")
                    SetErrorCertiBody("Required for document uploading!")
                }
            }
            else if (info.referencePhoneNumber == null) {
                setLoading(false);
                setUploadOpen(false)
                SetError("")
                SetErrorLicense("")
                SetErrorCertiBody("")
                setDocumentFile("")
                setPhoneError("Required for document uploading!")
            }
            else if (info.licenseNumber == null) {
                setLoading(false);
                setUploadOpen(false)
                SetError("")
                SetErrorLicense("Required for document uploading!")
                SetErrorCertiBody("")
                setDocumentFile("")
                setPhoneError("")
            }
            else if (info.certifyingBody == null) {
                setLoading(false);
                setUploadOpen(false)
                SetError("")
                SetErrorLicense("")
                SetErrorCertiBody("Required for document uploading!")
                setDocumentFile("")
                setPhoneError("")
            }
        }
        else {
            if (info.licenseNumber === null && info.referencePhoneNumber === null && info.certifyingBody === null) {
                SetError("Required for document uploading!")
                SetErrorLicense("Required for document uploading!")
                SetErrorCertiBody("Required for document uploading!")
                setUploadOpen(false)
                setDocumentFile("")
                setPhoneError("Required for document uploading!")
            }
            if (!info.licenseNumber && !info.certifyingBody && !info.referencePhoneNumber) {
                setLoading(false);
                setDocumentFile("")
                SetError("Required for document uploading!")
                SetErrorLicense("Required for document uploading!")
                SetErrorCertiBody("Required for document uploading!")
                setUploadOpen(false)
                setPhoneError("Required for document uploading!")
            }
            setLoading(false);
        }
    }

    const handleUpdate = async (e) => {
        setLoading(true);
        let info;
        if (!isDoctor) {
            info = {
                id: selectedDocument.id,
                doctorId: selectedDocument.doctorId,
                doctor_email: selectedDocument.doctor_email,
                documentKey: selectedDocument.documentKey,
                documentName: documentFile[0].name,
                documentType: documentFile[0].type,
                licenseNumber: state.licenseNumber,
                referencePhoneNumber: state.referencePhoneNumber,
                certifyingBody: state.certifyingBody,
                documentStatus: "UNAPPROVED"
            }
        }
        else if (isDoctor) {
            info = {
                id: selectedDocument.id,
                doctorId: selectedDocument.doctorId,
                doctor_email: selectedDocument.doctor_email,
                documentKey: selectedDocument.documentKey,
                documentName: documentFile[0].name,
                documentType: documentFile[0].type,
                licenseNumber: state.licenseNumber,
                referencePhoneNumber: state.referencePhoneNumber,
                certifyingBody: state.certifyingBody,
            }
        }
        const files = documentFile[0];
        const res = await updateDoctorDocument(files, info).catch(err => {
            toast.error("Something went wrong. Please try again!")
            setLoading(false);
        });
        if (res && res.status === 200) {
            history.go(0);
            setLoading(false);
        }
    }

    const showDocument = async (data) => {
        setLoading(true);
        setSelectedDocument(data);
        const res = await getDoctorDocumentUrlForAdmin(data);
        if (res && res.status === 200) {
            setSelectedDocumentUrl(res.data.documentsDocumentsList[0].document);
            setViewDocument(true);
            setLoading(false);
        }
    }

    const handleViewClose = () => {
        setSelectedDocument({});
        setSelectedDocumentUrl("");
        setViewDocument(false);
    }

    const approveDocument = async (doc) => {
        setLoading(true);
        const payloadData = {
            id: doc.id,
            doctorId: doc.doctorId,
            doctor_email: doc.doctor_email,
            document: doc.document,
            documentKey: doc.documentKey,
            documentName: doc.documentName,
            documentType: doc.documentType,
            licenseNumber: state.licenseNumber,
            referencePhoneNumber: state.referencePhoneNumber,
            certifyingBody: state.certifyingBody,
            documentStatus: "APPROVED"
        }

        const res = await updateDoctorDocumentStatus(payloadData);
        if (res && res.status === 200) {
            history.go(0);
        }
    }

    const unapproveDocument = async (doc) => {
        setLoading(true);
        const payloadData = {
            id: doc.id,
            doctorId: doc.doctorId,
            document: doc.document,
            doctor_email: doc.doctor_email,
            documentKey: doc.documentKey,
            documentName: doc.documentName,
            documentType: doc.documentType,
            licenseNumber: state.licenseNumber,
            referencePhoneNumber: state.referencePhoneNumber,
            certifyingBody: state.certifyingBody,
            documentStatus: "UNAPPROVED"
        }

        const res = await updateDoctorDocumentStatus(payloadData);
        if (res && res.status === 200) {
            history.go(0);
        }
    }

    const downloadDocument = async (data) => {
        setLoading(true);
        const res = await getDoctorDocumentUrlForAdmin(data);
        if (res && res.status === 200) {
            const link = document.createElement("a");
            link.href = res.data.documentsDocumentsList[0].document;
            link.download = `${res.data.documentsDocumentsList[0].documentName}.${res.data.documentsDocumentsList[0].documentType}`;
            document.body.appendChild(link);
            window.open(link, '_blank', 'noopener,noreferrer');
            setLoading(false);
        }
    }

    const deleteDocument = async (docId) => {
        setLoading(true);
        const res = await deleteDoctorDocument(docId);
        if (res && res.status === 204) {
            history.go(0);
        }
    }
    const [disableRefPhone, setDisableRefPhone] = useState(false)
    //Tell-Us-More-About-You Page
    const [state, setstate] = useState({
        licenseNumber: (currentdocumentData && currentdocumentData.licenseNumber) || "",
        referencePhoneNumber: (currentdocumentData && currentdocumentData.referencePhoneNumber) || "",
        certifyingBody: (currentdocumentData && currentdocumentData.certifyingBody) || ""
    });
    useEffect(() => {
        setstate({
            licenseNumber: currentdocumentData.licenseNumber,
            referencePhoneNumber: currentdocumentData.referencePhoneNumber,
            certifyingBody: currentdocumentData.certifyingBody
        })
    }, [currentdocumentData]);
    const [phoneError, setPhoneError] = useState();
    const handleInputChange = (e) => {
        e.preventDefault()
        setstate({ ...state, [e.target.name]: e.target.value });
        setDocumentinfo({ ...documentInfo, [e.target.name]: e.target.value })
    };

    const handlePhone = (e) => {
        const appendPlus = "+" + e
        setstate({ ...state, referencePhoneNumber: appendPlus });
        setDocumentinfo({ ...documentInfo, referencePhoneNumber: appendPlus })
    };
    const { id, licenseNumber, referencePhoneNumber, certifyingBody } = state;
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const clickPagination = async (pageNumber) => {
        setCurrentPageNumber(pageNumber);
        let page = pageNumber - 1;
        const res = await getDoctorDocument(currentDoctor.id, page);
        if (res && res.status === 200) {
            setDocumentData(res.data.documentsDocumentsList);
            setCurrentDocumentData(res.data.documentsDocumentsList[0])
            setDocumentinfo(res.data.documentsDocumentsList[0])
            setLoading(false);
        }
        else if (res && res.status === 204) {
            setDocumentData([]);
            setLoading(false);
        }
    };

    const customInputStyle = {
        whiteSpace: "nowrap",
        width: "300px",
        overflow: "hidden",
        textOverflow: "ellipsis"
    }

    return (
        <>
            {loading && (
                <TransparentLoader />
            )}
            <ValidatorForm onSubmit={(e) => handleUpload(e)} onError={(err) => console.log(err)}>
                <Row>
                    <Col md={6}>
                        <p>License Number<sup>*</sup></p>
                        <TextValidator id="uploadlicence" type="text" name="licenseNumber"
                            onChange={(e) => handleInputChange(e)}
                            value={licenseNumber}
                            validators={[
                                "required",
                                "matchRegexp:(^[a-zA-Z0-9  /-]+$)",
                            ]}
                            errorMessages={['This field is required',
                                "Please Enter Valid License Number"]}
                            variant="filled"
                            required
                            placeholder='License Number' />
                        {errorLicense && (<span style={{ color: "red", fontSize: "11px" }}>{errorLicense}</span>)}
                    </Col>
                    <Col md={6}>
                        <p>Certifying Body<sup>*</sup></p>
                        <TextValidator id="uploadcerty" type="text" name="certifyingBody"
                            onChange={(e) => handleInputChange(e)}
                            value={certifyingBody}
                            validators={[
                                "required",
                                "matchRegexp:(^[a-zA-Z0-9 {}]+$)",
                            ]}
                            errorMessages={['This field is required',
                                "Please Enter Valid Certifying Body"]}
                            variant="filled"
                            required
                            placeholder='Certifying Body' />
                        {errorCertiBody && (<span style={{ color: "red", fontSize: "11px" }}>{errorCertiBody}</span>)}
                    </Col>

                </Row>
                <br />
                <Row>
                    <Col md={12}>
                        <p>Reference Phone Number<sup>*</sup></p>
                        <PhoneInput
                            id="uploadrefphone"
                            inputProps={{
                                name: 'referencePhoneNumber',
                                required: true,
                                maxLength: 20,
                                minLength: 12
                            }}
                            country={'us'}
                            value={referencePhoneNumber}
                            onChange={e => handlePhone(e)}
                            variant="filled"
                            required
                        />
                        {phoneError && (<span style={{ color: "red", fontSize: "11px" }}>{phoneError}</span>)}
                    </Col>
                </Row>
            </ValidatorForm>
            <br /><br />
            <Row style={{ alignItems: "center" }}>
                <Col md={6} className="col-xs-6" style={{ textAlign: "left" }}>
                    <span style={{ fontSize: "15px" }}>Total Documents: {page?.totalItems}</span>
                </Col>
                <Col md={6} className="col-xs-6" style={{ textAlign: "right" }}>
                    <button
                        className="btn btn-primary"
                        onClick={() => setUploadOpen(true)}
                        type="button"
                    >
                        Upload Documents
                    </button>
                </Col>
            </Row>
            <br />
            {isDoctor && (<br />)}
            <div className="doc-table-scroll">
                <table className="table table-bordered table-striped table-hover doc-table">
                    <thead>
                        <tr>
                            <th>Document Name</th>
                            <th>Document Type</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documentData && documentData.length > 0 ? documentData.map((doc, index) => (
                            <tr key={index}>
                                <td>{doc.documentName}</td>
                                <td>{doc.documentType}</td>
                                <td>
                                    {doc.documentStatus === "APPROVAL_PENDING" ? "Approval Pending"
                                        : doc.documentStatus === "APPROVED" ? "Approved"
                                            : doc.documentStatus === "UNAPPROVED" ? "Unapproved"
                                                : "N/A"}
                                </td>
                                <td className='mobile-css-helper'>
                                    {isDoctor ? (<>
                                        {doc.documentStatus === "UNAPPROVED" && (<>
                                            <IconButton color="primary" className="mr-2 p-0" onClick={() => handleUpdateClick(doc)}>
                                                <CreateIcon />
                                            </IconButton>
                                        </>)}
                                        <IconButton color="primary" className="mr-2 p-0" data-title="View" onClick={() => showDocument(doc)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton color="primary" className="mr-2 p-0" data-title="Download" onClick={() => downloadDocument(doc)}>
                                            <GetApp />
                                        </IconButton>
                                        {doc.documentStatus === "UNAPPROVED" && (<>
                                            <IconButton color="secondary" className="mr-2 p-0" onClick={() => deleteDocument(doc.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </>)}
                                    </>) : (<>
                                        {doc.documentStatus === "UNAPPROVED" && (<>
                                            <IconButton color="primary" className="mr-2 p-0" onClick={() => handleUpdateClick(doc)}><CreateIcon /></IconButton>
                                        </>)}
                                        <IconButton color="primary" className="mr-2 p-0" data-title="View" onClick={() => showDocument(doc)}><VisibilityIcon /></IconButton>
                                        <IconButton color="primary" className="mr-2 p-0" data-title="Download" onClick={() => downloadDocument(doc)}><GetApp /></IconButton>
                                        {doc.documentStatus === "APPROVAL_PENDING" && (<>
                                            <IconButton className="text-success mr-2 p-0" data-title="Approve" onClick={() => approveDocument(doc)}><CheckCircleIcon /></IconButton>
                                            <IconButton className="text-danger mr-2 p-0" data-title="Unapprove" onClick={() => unapproveDocument(doc)}><CancelIcon /></IconButton>
                                        </>)}
                                        {doc.documentStatus === "APPROVED" && (<>
                                            <IconButton className="text-danger mr-2 p-0" data-title="Unapprove" onClick={() => unapproveDocument(doc)}><CancelIcon /></IconButton>
                                        </>)}
                                        {doc.documentStatus === "UNAPPROVED" && (<>
                                            <IconButton className="text-success mr-2 p-0" data-title="Approve" onClick={() => approveDocument(doc)}><CheckCircleIcon /></IconButton>
                                        </>)}
                                        <IconButton color="secondary" className="mr-2 p-0" data-title="Delete" onClick={() => deleteDocument(doc.id)}><DeleteIcon /></IconButton>
                                    </>)}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center" }}>No document found...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div style={{ marginRight: "3%" }}> <Pagination size="sm" style={{ float: 'right' }}>
                    {
                        page.totalPages ?
                            Array.from(Array(page.totalPages), (e, i) => {
                                return <Pagination.Item key={i + 1}
                                    active={i + 1 === currentPageNumber ? true : false}
                                    onClick={e => clickPagination(i + 1)}>
                                    {i + 1}
                                </Pagination.Item>
                            })
                            : <span></span>

                    }
                </Pagination>
                    <br />
                </div>
            </div>

            <Dialog aria-labelledby="customized-dialog-title" open={uploadOpen}>
                <DialogTitle id="customized-dialog-title">
                    Upload Document
                </DialogTitle>
                <ValidatorForm onSubmit={(e) => console.log(e)} id="uploadForm">
                    <DialogContent dividers>
                        <Row className="align-items-center">
                            <Col md={4}>
                                <b>Choose Document:</b>
                            </Col>
                            <Col md={8}>
                                <input
                                    id="docFile"
                                    variant="filled"
                                    name="doctorDocumentFile"
                                    type="file"
                                    accept="application/pdf"
                                    inputProps={{
                                        required: true,
                                    }}
                                    multiple
                                    onChange={(e) => handleFileChange(e)}
                                    style={customInputStyle}
                                />
                                <br />
                                {documentError && (<span style={{ color: "red", fontSize: "12px" }}>{documentError}</span>)}
                            </Col>
                        </Row>
                        <br />
                        {errorMsg && (<span style={{ color: "red", fontSize: "11px" }}>{errorMsg}</span>)}
                        <br />
                    </DialogContent>
                    <DialogActions>
                        <button
                            onClick={handleUploadClose}
                            className="btn btn-danger text-light"
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary text-light"
                            type="button"
                            id="uploadBtn"
                            onClick={(e) => handleUpload(e)}
                        >
                            Upload
                        </button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>

            {/* Edit Document Form */}

            <Dialog aria-labelledby="customized-dialog-title" open={updateOpen}>
                <DialogTitle id="customized-dialog-title">
                    Upload Document
                </DialogTitle>
                <ValidatorForm onSubmit={(e) => console.log(e)} id="uploadForm">
                    <DialogContent dividers>
                        <Row className="align-items-center">
                            <Col md={4}>
                                <b>Choose Document:</b>
                            </Col>
                            <Col md={8}>
                                {/* <div> */}
                                <input
                                    id="docFile"
                                    variant="filled"
                                    name="doctorDocumentFile"
                                    type="file"
                                    accept="application/pdf"
                                    inputProps={{
                                        required: true,
                                    }}
                                    multiple
                                    onChange={(e) => handleFileChange(e)}
                                />
                                <br />
                                {documentError && (<span style={{ color: "red", fontSize: "12px" }}>{documentError}</span>)}
                            </Col>
                        </Row>
                        <br />
                        {errorMsg && (<span style={{ color: "red", fontSize: "11px" }}>{errorMsg}</span>)}
                        <br />
                    </DialogContent>
                    <DialogActions>
                        <button
                            onClick={handleUpDateClose}
                            className="btn btn-danger text-light"
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary text-light"
                            type="button"
                            onClick={(e) => handleUpdate(e)}
                        >
                            Upload
                        </button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>

            <Dialog aria-labelledby="customized-dialog-title" open={viewDocument} fullWidth={true} maxWidth={"md"} scroll="paper">
                <DialogTitle id="customized-dialog-title">
                    View Document
                </DialogTitle>
                <DialogContent dividers>
                    {(selectedDocument?.documentType === "png" || selectedDocument?.documentType === "jpg" || selectedDocument?.documentType === "jpeg") && (
                        <div className="row">
                            <img alt="" src={selectedDocumentUrl} frameBorder="0" height="100%" width="100%" />
                        </div>
                    )}
                    {selectedDocument?.documentType === "pdf" && (
                        <div className="row">
                            <div className="pdf-viewer">
                                <Document
                                    file={selectedDocumentUrl}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                >
                                    <Page pageNumber={pageNumber} />
                                </Document>
                                <br />
                                {numPages && (
                                    <div class="page-controls">
                                        <button
                                            disabled={pageNumber === 1 ? true : false}
                                            type="button"
                                            onClick={() => setPageNumber(pageNumber - 1)}
                                        >‹</button>
                                        <span>{pageNumber} of {numPages}</span>
                                        <button
                                            disabled={pageNumber === numPages ? true : false}
                                            type="button"
                                            onClick={() => setPageNumber(pageNumber + 1)}
                                        >›</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <br />
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => handleViewClose()}
                        className="btn btn-danger text-light"
                        type="button"
                    >
                        Cancel
                    </button>
                    {!isDoctor && (<>
                        <button
                            className="btn btn-success text-light"
                            type="button"
                            onClick={() => approveDocument(selectedDocument)}
                        >
                            Approve
                        </button>
                        <button
                            className="btn btn-danger text-light"
                            type="button"
                            onClick={() => unapproveDocument(selectedDocument)}
                        >
                            Unapprove
                        </button>
                    </>)}
                </DialogActions>
            </Dialog>
        </ >
    )
}

export default DoctorDocumentUpload;
