import React from 'react'
import download from '../../../images/icons used/download.svg'
import download1 from '../../../images/icons used/document icon@2x.png'
import pdf_filetype_icon from '../../../images/icons used/pdf_filetype_icon.svg'
import jpg_filetype_icon from '../../../images/icons used/jpg_filetype_icon.svg'
import download2 from '../../../images/icons used/textfile.png'
import Image from 'next/image'
import moment from "moment";

const PatientPrescriptionCard = (props) => {
    let imageExtensions = ["png", "jpg", "jpeg", "GIF", "TIFF"]
    let docExtensions = ["doc", "docx", "PSD"]
    return (
        <div className="row align-items-start">

            <div className='col-md-3'>
                <h5 className='prescription-lab-card__common-date1'> <b>{moment(props.date).format("DD")}</b></h5>
                <span className='prescription-lab-card__common-span1'>{moment(props.time).format("HH:mm A")}</span>

            </div>
            <div className='col-md-3'>

                {props.filetype === "txt" && <Image width={70} height={70} src={download2} alt={download1} className='prescription-lab-card__img-wrapper' />}

                {props.filetype === "pdf" && <Image width={70} height={70} src={pdf_filetype_icon} alt={download1} className='prescription-lab-card__img-wrapper' />}

                {imageExtensions.map((a) => {
                    if (props.filetype === a) {
                        return <Image src={jpg_filetype_icon} width={70} height={70} alt={download1} className='prescription-lab-card__img-wrapper' />
                    }
                })
                }
                {docExtensions.map((a) => {
                    if (props.filetype === a) {
                        return <Image src={download1} width={70} height={70} alt={download1} className='prescription-lab-card__img-wrapper' />
                    }
                })
                }
            </div>
            <div className='col-md-3'>
                <h5 className='prescription-lab-card__common-name1'><b>{props.name}</b></h5>
                <span className='prescription-lab-card__common-span1'><b>{props.salutation} {props.docName}</b></span>

            </div>
            <div style={{ textAlign: "center", paddingTop: '15px' }} className='col-md-3'>

                <button className='prescription-lab-card__download' onClick={(e) => props.download(props.data)}><Image width={22} height={22} src={download} /></button>
            </div>

        </div>

    )
}

export default PatientPrescriptionCard