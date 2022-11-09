import React from 'react';
// import healthAssessmentBg from '../../../images/svg/health-assessment-bg__compressed.svg';
import Link from 'next/link';
import './TakeAssessmentCard.module.css';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../lib/redux/userSlice';

const TakeAssessmentCard = () => {
  const user = useSelector(selectUser);
  const currentUser = user?.currentUser;

  return (
    <div id="patient-card">
      <div className="patient-card_text col-md-6">
        <div className="patient-card_how-healthy-wrap">
          <h3 style={{ marginLeft: 15 }} className="mb-3">
            How healthy are you?
          </h3>
          {currentUser.questionCompleted === true ? (
            <Link
              href="/patient/questionnaire/existing"
              style={{ marginRight: 20 }}
            >
              <button
                type="button"
                className="btn btn-primary btn-block health-assessment-btn"
              >
                Take Assessment
              </button>
            </Link>
          ) : (
            <Link href="/patient/questionnaire/new" style={{ marginRight: 20 }}>
              <button
                type="button"
                className="btn btn-primary btn-block health-assessment-btn"
              >
                Take Assessment
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="col-md-6 text-center w-100">
        <div className="health-assess-bg__wrapper">
          {/* <Image
                        src={healthAssessmentBg}
                        alt="home-2"
                        className="health-assess-bg"
                        effect='blur'
                    /> */}
          {/* <img
                        src={healthAssessmentBg}
                        alt="home-2"
                        className="health-assess-bg"
                    /> */}
        </div>
      </div>
    </div>
  );
};

export default TakeAssessmentCard;
