import React from 'react';
import moment from 'moment';
import { Row, Col } from 'react-bootstrap';
import {
    CardAppointmentStartTime,
    CardDetails,
    CardDetailsContent,
    CardDetailsHeading,
} from './ConsultationHistory.styles';

const ConsulatationHistoryCard = ({
    appointmentDetails,
    chief_complaint,
    present_illness,
    vital_signs,
    physical_exam,
    plan_assessment,
}) => {
    const appointmentStartTime = moment(appointmentDetails.startTime).format('DD MMMM YYYY');

    return (
        <Row>
            <Col md={12}>
                <CardDetails>
                    <CardAppointmentStartTime>{appointmentStartTime}</CardAppointmentStartTime>
                    <Row>
                        <Col md={4}>
                            <CardDetailsHeading>Chief Complaint</CardDetailsHeading>
                            <CardDetailsContent>{chief_complaint}</CardDetailsContent>
                        </Col>
                        <Col md={4}>
                            <CardDetailsHeading>Present Illness</CardDetailsHeading>
                            <CardDetailsContent>{present_illness}</CardDetailsContent>
                        </Col>
                        <Col md={4}>
                            <CardDetailsHeading>Vital Signs</CardDetailsHeading>
                            <CardDetailsContent>{vital_signs}</CardDetailsContent>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <CardDetailsHeading>Physical Exam</CardDetailsHeading>
                            <CardDetailsContent>{physical_exam}</CardDetailsContent>
                        </Col>
                        <Col md={6}>
                            <CardDetailsHeading>Plan Assessment</CardDetailsHeading>
                            <CardDetailsContent>{plan_assessment}</CardDetailsContent>
                        </Col>
                    </Row>
                </CardDetails>
            </Col>
        </Row>
    );
};

export default ConsulatationHistoryCard;
