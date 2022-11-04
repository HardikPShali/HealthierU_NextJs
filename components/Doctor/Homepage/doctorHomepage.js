import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import AppoitmentCountsSection from '../Homepage/AppointmentCount'
import UpcomingAppointment from '../../Common/UpcomingAppointments/UpcomingAppointments'
const doctorHomepage = () => {
    return (
        <div>
            <br />
            <br />
            <Container>
                <Row>
                    <Col md={12}>
                        <AppoitmentCountsSection />
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col md={12}>
                        <UpcomingAppointment />
                    </Col>
                </Row>
            </Container>
            {/* <Footer /> */}
        </div>
    )
}

export default doctorHomepage
