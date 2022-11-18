import React from 'react';
import download from '../../../public/images/icons used/download.svg';
import download1 from '../../../public/images/icons used/document icon@2x.png';
import pdf_filetype_icon from '../../../public/images/icons used/pdf_filetype_icon.svg';
import jpg_filetype_icon from '../../../public/images/icons used/jpg_filetype_icon.svg';
import download2 from '../../../public/images/icons used/textfile.png';
import deleteIcon from '../../../public/images/icons used/id_delete_doc.svg';
import moment from 'moment';
import Image from 'next/image'
const PrescriptionLabCardDoctor = (props) => {
    let imageExtensions = ["png", "jpg", "jpeg", "GIF", "TIFF", "JPEG", "JPG", "Jpeg", "PNG"]
    let docExtensions = ["doc", "docx", "PSD", "txt"]
    return (
        <div className="row align-items-start">
            <div className="col-md-2">
                <h5 className="prescription-lab-card__common-date1">
                    {' '}
                    <b>{moment(props.date).format('DD')}</b>
                </h5>
                <span className="prescription-lab-card__common-span1">
                    {moment(props.time).format('HH:mm A')}
                </span>
            </div>
            <div className="col-md-2">
                {props.filetype === 'txt' && (
                    <Image
                        width={70} height={70}
                        src={download2}
                        alt={download1}
                        className="prescription-lab-card__img-wrapper"
                    />
                )}

                {props.filetype === 'pdf' && (
                    <Image
                        width={70} height={70}
                        src={pdf_filetype_icon}
                        alt={download1}
                        className="prescription-lab-card__img-wrapper"
                    />
                )}

                {imageExtensions.map((a) => {
                    if (props.filetype === a) {
                        return (
                            <Image
                                src={jpg_filetype_icon}
                                width={70} height={70}
                                alt={download1}
                                className="prescription-lab-card__img-wrapper"
                            />
                        );
                    }
                })}
                {docExtensions.map((a) => {
                    if (props.filetype === a) {
                        return (
                            <Image
                                src={download1}
                                width={70} height={70}
                                alt={download1}
                                className="prescription-lab-card__img-wrapper"
                            />
                        );
                    }
                })}
            </div>
            <div className="col-md-4">
                <h5 className="prescription-lab-card__common-name1">
                    <b>{props.name}</b>
                </h5>
                <span className="prescription-lab-card__common-span1">
                    <b>{props.type === 'Treatment' ? 'APID : ' : 'Lab Name : '}</b>
                    {props.type === 'Treatment' ? props.apid : props.labname}
                </span>
            </div>
            <div
                style={{ textAlign: 'center', paddingTop: '15px' }}
                className="col-md-2"
            >
                <button
                    className="prescription-lab-card__download"
                    onClick={(e) => props.download(props.data)}
                >
                    <Image width={22} height={22} src={download} />
                </button>
            </div>
            <div
                style={{ textAlign: 'center', paddingTop: '15px' }}
                className="col-md-2"
            >
                <button
                    className="prescription-lab-card__download"
                    onClick={(e) => props.delete(props.data)}
                >
                    <Image width={22} height={22} src={deleteIcon} />
                </button>
            </div>
        </div>
    );
};

export default PrescriptionLabCardDoctor;
