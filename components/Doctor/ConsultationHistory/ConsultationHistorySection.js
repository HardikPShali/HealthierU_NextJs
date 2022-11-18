import React, { useState } from 'react'
import ConsultationHistoryCard from './ConsultationHistoryCard'
import { consultationHistory } from '../../../lib/service/FrontendApiServices'
import { useEffect } from 'react'
import { CardHolder, ConsultationHistoryCardBox, ConsultationHistoryCardView, MainHeader } from './ConsultationHistory.styles.jsx'
import { Col } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { selectUser } from '../../../lib/redux/userSlice';
import { useRouter } from 'next/router';

const ConsulatationHistorySection = () => {
    const user = useSelector(selectUser);
    const profilepID = user?.profileDetails;;
    const router = useRouter()
    const pid = router.query.patientId
    const [notesData, setNotesData] = useState([])

    const getNotesData = async () => {
        const res = await consultationHistory(pid, profilepID.id);
        setNotesData(res.data.data)

    }
    useEffect(() => {
        getNotesData();
    }, []);

    return (
        <ConsultationHistoryCardBox>
            <MainHeader>Consultation History</MainHeader>
            <CardHolder>
                <ConsultationHistoryCardView>
                    {notesData.length > 0 ?
                        notesData.map(
                            (q, index) => {
                                return (
                                    <div key={index}>
                                        <ConsultationHistoryCard
                                            appointmentDetails={q.appointment}
                                            chief_complaint={q.chiefComplaint}
                                            present_illness={q.presentIllness}
                                            vital_signs={q.vitalSigns}
                                            physical_exam={q.physicalExam}
                                            plan_assessment={q.planAssessment}
                                        />
                                    </div>
                                )

                            }
                        )
                        :
                        <Col
                            md={12}
                            className="ml-2"
                            style={{ textShadow: 'none', color: '#3e4543' }}
                        >
                            <b>No Consultation Found</b>
                        </Col>
                    }
                </ConsultationHistoryCardView>
            </CardHolder>
        </ConsultationHistoryCardBox>
    )
}

export default ConsulatationHistorySection