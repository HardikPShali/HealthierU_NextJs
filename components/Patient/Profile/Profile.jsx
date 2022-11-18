import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ProfileImage from '../../Common/Profile/ProfileImage/ProfileImage';
import ProfileRow from '../../Common/Profile/ProfileRow/ProfileRow';
import { selectUser } from '../../../lib/redux/userSlice';
import moment from 'moment';
import { useState } from 'react';
import EditProfile from './EditProfile';

const Profile = () => {
  const user = useSelector(selectUser);
  const currentPatient = user?.profileDetails;

  const [toggleProfile, setToggleProfile] = useState({
    profile: false,
    editProfile: false,
  });

  const goBackToProfile = () => {
    setToggleProfile({ ...toggleProfile, editProfile: false });
  };

  const showBloodGroup = (bg) => {
    if (bg === 'APOS') {
      return 'A +ve';
    }
    if (bg === 'ANEG') {
      return 'A -ve';
    }
    if (bg === 'BPOS') {
      return 'B +ve';
    }
    if (bg === 'BNEG') {
      return 'B -ve';
    }
    if (bg === 'OPOS') {
      return 'O +ve';
    }
    if (bg === 'ONEG') {
      return 'O -ve';
    }
    if (bg === 'ABPOS') {
      return 'AB +ve';
    }
    if (bg === 'ABNEG') {
      return 'AB -ve';
    }
  };

  return (
    <div>
      {currentPatient && toggleProfile.editProfile === false && (
        <Container>
          <Row>
            <Col md={3}>
              <ProfileImage
                currentPatient={currentPatient}
                onEdit={() => {
                  setToggleProfile({ ...toggleProfile, editProfile: true });
                }}
              />
            </Col>
            <Col>
              <Row>
                <Col md={12}>
                  <div>
                    <h1>Profile Details</h1>
                    <div>
                      <h3>General</h3>
                      <div className="d-flex flex-column">
                        <ProfileRow
                          icon="/images/svg/call-icon.svg"
                          title="Phone Number"
                          value={currentPatient.phone}
                        />
                        <ProfileRow
                          icon="/images/svg/calender-beige.svg"
                          title="Date of Birth"
                          value={moment(currentPatient.dateOfBirth).format(
                            'DD/MM/YYYY'
                          )}
                        />
                        <ProfileRow
                          icon="/images/svg/marital-status-icon.svg"
                          title="Marital Status"
                          value={currentPatient.maritalStatus}
                        />
                        <ProfileRow
                          icon="/images/svg/nationality-icon.svg"
                          title="Nationality"
                          value={currentPatient.countryName}
                        />
                        <ProfileRow
                          icon="/images/svg/language-icon.svg"
                          title="Languages"
                          value={
                            currentPatient &&
                            currentPatient.languages &&
                            currentPatient.languages.map((language, index) => (
                              <li key={index}>{language.name}</li>
                            ))
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <h3>Medical</h3>
                      <div className="d-flex flex-column">
                        <ProfileRow
                          icon="/images/svg/blood-group-icon.svg"
                          title="Blood Group"
                          value={showBloodGroup(currentPatient.bloodGroup)}
                        />
                        <ProfileRow
                          icon="/images/svg/height-icon.svg"
                          title="Height (CM)"
                          value={currentPatient.height}
                        />
                        <ProfileRow
                          icon="/images/svg/weight-icon.svg"
                          title="Weight (KG)"
                          value={currentPatient.weight}
                        />
                        <ProfileRow
                          icon="/images/svg/blood-pressure-icon.svg"
                          title="Blood Pressure"
                          value={
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                              }}
                            >
                              <span style={{ marginRight: '30px' }}>
                                High (mmHg)
                                <br />
                                {currentPatient.highBp}
                              </span>

                              <span style={{ marginRight: '10px' }}>
                                Low (mmHg)
                                <br />
                                {currentPatient.lowBp}
                              </span>
                            </div>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
      {currentPatient && toggleProfile.editProfile === true && (
        <EditProfile
          currentPatient={currentPatient}
          toggleProfile={toggleProfile}
          goBack={goBackToProfile}
        />
      )}
    </div>
  );
};

export default Profile;
