import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../lib/redux/userSlice';
import { getHealthAssessment } from '../../../lib/service/FrontendApiServices';
import {
  AnswersCard,
  AnswersCardBox,
  AnswersCardDetails,
  AnswersCardHolder,
  AnswersCardQuestionAnswer,
  AnswersCardQuestionTitle,
  MainHeader,
} from './HealthAssessmentReport.styles';

const HealthAssessmentReport = () => {
  const user = useSelector(selectUser);
  const currentUser = user?.currentUser;

  const currentLoggedInUserId = user?.profileDetails.id;

  const [answers, setAnswers] = useState(null);

  const getHealthAssessmentReport = async (id) => {
    const response = await getHealthAssessment(id).catch((err) => {
      console.log(err);
    });
    if (response) {
      const dataAnswers = response.data.data.selections;
      setAnswers(dataAnswers);
    }
  };

  useEffect(() => {
    getHealthAssessmentReport(currentLoggedInUserId);
  }, [currentLoggedInUserId]);

  if (!user) {
    return null;
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <AnswersCardBox>
            <MainHeader>Health Assessment Report</MainHeader>
            <AnswersCardHolder>
              <AnswersCard>
                <Row>
                  <Col md={12}>
                    {answers ? (
                      answers.map(
                        (answer, index) =>
                          answer.answers.length > 0 &&
                          answer.answers.every(
                            (ans) =>
                              ans != undefined && ans != null && ans !== ''
                          ) == true && (
                            <AnswersCardDetails key={index + 1}>
                              <AnswersCardQuestionTitle>
                                {answer.questionTitle
                                  .split(' ')
                                  .slice(0, 10)
                                  .join(' ')}{' '}
                                <span style={{ fontWeight: 400 }}>
                                  {answer.questionTitle.substring(57, 200)}
                                </span>
                              </AnswersCardQuestionTitle>
                              {answer.answers.map((answer, index) => (
                                <AnswersCardQuestionAnswer key={index}>
                                  {answer}
                                </AnswersCardQuestionAnswer>
                              ))}
                            </AnswersCardDetails>
                          )
                      )
                    ) : currentUser.questionCompleted === false ? (
                      <Col
                        md={12}
                        className="ml-2"
                        style={{ textShadow: 'none', color: '#3e4543' }}
                      >
                        No Data Found
                      </Col>
                    ) : (
                      <Col
                        md={12}
                        className="ml-2"
                        style={{ textShadow: 'none', color: '#3e4543' }}
                      >
                        Loading...
                      </Col>
                    )}
                  </Col>
                </Row>
              </AnswersCard>
            </AnswersCardHolder>
          </AnswersCardBox>
        </Col>
      </Row>
    </Container>
  );
};

export default HealthAssessmentReport;
