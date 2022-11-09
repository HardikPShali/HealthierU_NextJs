import { useState, useEffect } from 'react';
import quesJson from './questions.json';
import { Container, Row, Col } from 'react-bootstrap';
import { Questions } from './Questions';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../lib/redux/userSlice';
import { useRouter } from 'next/router';

const Questionnaire = () => {
  const router = useRouter();

  const user = useSelector(selectUser);
  const patientID = user.profileDetails.id;

  const [questions, setQuestions] = useState([]);
  const isNew = router.query.new;

  const [continueClick, setContinueClick] = useState(false);
  const [totalscore, settotalScore] = useState(0);
  const [healthAssess, setHealthAssess] = useState('');

  const isAnswerEmpty = (question) => {
    let isInvalid;
    if (question.type === 'checkbox') {
      isInvalid = question.answers.length == 0;
    } else {
      isInvalid = question.answers === '';
    }

    if (isInvalid) {
      question.isError = true;
    } else {
      question.isError = false;
    }

    return isInvalid;
  };

  const handleValidation = () => {
    questions.forEach((question) => {
      if (question.condition) {
        const previousQuestion = questions.find(
          (q) => q.questionId === question.condition.questionId
        );

        if (previousQuestion.answers === question.condition.answer) {
          question.isError = false;
          return false;
        } else {
          isAnswerEmpty(question);
        }
      } else {
        isAnswerEmpty(question);
      }
    });

    setQuestions([...questions]);
    return questions.some((question) => question.isError);
  };

  const handleAssessmentSubmit = async () => {
    const submitData = {
      selections: questions.map((question) => {
        if (!Array.isArray(question.answers)) {
          question.answers = [question.answers];
        }
        let score = 0;

        question.answers.forEach((answer) => {
          let choiceIndex = question.choices.indexOf(answer);
          if (choiceIndex > -1) {
            score += question.mapScore[choiceIndex];
          }

          // score += question.mapScore[choiceIndex]
        });

        question.score = score;
        return question;
      }),
      totalScore: questions.reduce(
        (total, question) => total + question.score,
        0
      ),
    };
    const response = await postHealthAssessment(
      isNew === 'new' ? 'post' : 'put',
      submitData,
      patientID
    ).catch((err) => {
      console.log(err);
    });
    settotalScore(submitData.totalScore);
  };

  const healthBehaviorOnScore = (score) => {
    setHealthAssess('');
    if (score === 0) {
      setHealthAssess('');
      return healthAssess;
    } else if (score > 0 && score <= 3) {
      setHealthAssess('not Healthy');
      return healthAssess;
    } else if (score > 3 && score <= 7) {
      setHealthAssess('moderately Healthy');
      return healthAssess;
    } else {
      setHealthAssess('Healthy');
      return healthAssess;
    }
  };

  const onContinue = async () => {
    const isInvalid = handleValidation();
    if (isInvalid) {
      window.scrollTo(0, 0);
      toast.error('Please answer all the questions', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (questions.length > 0) {
      handleAssessmentSubmit();
      setContinueClick(true);
    } else {
      toast.error('Please fill the form!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      history.reload();
    }
  };

  const handleFollowQuestionsCondition = () => {
    questions.forEach((question) => {
      if (question.condition) {
        const previousQuestion = questions.find(
          (q) => q.questionId === question.condition.questionId
        );
        if (previousQuestion.answers) {
          if (previousQuestion.answers === question.condition.answer) {
            question.hidden = true;
          } else {
            question.hidden = false;
          }
          setQuestions([...questions]);
        }
      }
    });
  };

  const closeDialog = () => {
    setContinueClick(false);
    if (isNew === 'new') {
      history.push('/patient');
    } else {
      history.push('/patient/mydoctor');
    }
  };

  useEffect(() => {
    questions.forEach((question) => {
      question.isError = false;
    });
  }, [questions]);

  useEffect(() => {
    setTimeout(() => {
      healthBehaviorOnScore(totalscore);
    }, 2000);
  }, [totalscore]);

  useEffect(() => {
    setQuestions(quesJson);
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <div>
            {questions &&
              questions.map((question) => (
                <Questions
                  isError={question.isError}
                  followQuestion={handleFollowQuestionsCondition}
                  key={question.questionId}
                  question={question}
                />
              ))}
          </div>
          {/* <div className="questionnaire-continue-button">
            <Button
              type="submit"
              variant="primary"
              className="w-100 Questionnaire-Continue-Button"
              onClick={onContinue}
            >
              Continue
            </Button>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div> */}
        </Col>
      </Row>
    </Container>
  );
};

export default Questionnaire;
