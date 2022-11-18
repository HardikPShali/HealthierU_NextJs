import React, { useEffect, useState } from 'react'
import Questions from "./Questions"
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getHealthAssessment } from '../../../lib/service/FrontendApiServices'
import { useRouter } from 'next/router';

const HealthAssestmentReport = () => {
    const router = useRouter()
    const [answerData, setAnswerData] = useState(null);
    const [showDownload, setShowDownload] = useState(true)
    const [patientId, setPatientId] = useState(router.query.patientId)
    // const id = router.query.patientId
    const getAssessmentreport = async (patientId) => {
        const response = await getHealthAssessment(patientId).catch(err => {
            console.log(err);
            setShowDownload(false)
        });
        if (response) {
            const dataAnswers = response.data.data.selections;
            setAnswerData(dataAnswers);
        }
    }


    useEffect(() => {
        getAssessmentreport(patientId);
    }, [patientId]);


    return (
        <div>
            <Container>
                <Row>
                    <Col md={12}>
                        <Questions answers={answerData} enableDownload={showDownload} />
                    </Col>
                </Row>
            </Container>
        </div >
    )
}
export default HealthAssestmentReport