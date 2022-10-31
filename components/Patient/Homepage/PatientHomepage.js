import { Container, Row, Col } from 'react-bootstrap';
import UpcomingAppointments from '../../Common/UpcomingAppointments/UpcomingAppointments';

const PatientHomepage = () => {
    return (
        <div>
            <div>
                <br />
                <br />
                <h1>Homepage</h1>
                <Container>
                    <Row>
                        <Col md={6}>
                            {/* <TakeAssessmentCard /> */}
                        </Col>
                        <Col md={6}>
                            {/* <SpecialitiesSection /> */}
                        </Col>
                    </Row>
                </Container>
                <br />
                <br />
                <Container>
                    <Row>
                        <Col md={12}>
                            <UpcomingAppointments />
                        </Col>


                    </Row>
                    <br />
                    <Row>
                        <Col md={12}>
                            {/* <OurDoctors /> */}
                        </Col>
                    </Row>
                </Container>
                <br />
                <br />
                {/* <Footer /> */}
            </div>
        </div>
    )
}

export default PatientHomepage