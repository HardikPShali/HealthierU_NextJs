import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import ConsultationHistoryComponent from './ConsultationHistorySection'
const ConsultationHistory = () => {
    return (

        <Container>
            <Row>
                <Col md={12}>
                    <ConsultationHistoryComponent />
                </Col>
            </Row>
        </Container>

    )
}
export default ConsultationHistory