import React, { useState, useEffect } from 'react';
import moment from 'moment';
import MuiPhoneNumber from 'material-ui-phone-number';
import { Container, Row, Col } from 'react-bootstrap';
import { CustomTextField } from '../../Common/Reusable/TextField/CustomTextField';
import { CustomRadioField } from '../../Common/Reusable/RadioField/CustomRadioField';
import { CustomSelectField } from '../../Common/Reusable/SelectField/CustomSelectField';
import {
  getCountryList,
  getLanguageList,
} from '../../../lib/service/FrontendApiServices';
import { CustomMultiSelectField } from '../../Common/Reusable/SelectField/CustomMultiSelectField';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../../lib/redux/userSlice';

const EditProfile = ({ currentPatient, toggleProfile, goBack }) => {
  const dispatch = useDispatch();

  const [currentPatientDetails, setCurrentPatientDetails] =
    useState(currentPatient);

  const {
    firstName,
    lastName = '',
    address,
    phone,
    dateOfBirth,
    gender,
    countryId,
    maritalStatus,
    languages,
    bloodGroup,
    weight,
    height,
    highBp,
    lowBp,
  } = currentPatientDetails;

  //COUNTRY OPTIONS
  const [options, setOption] = useState({
    countryList: [],
  });

  const { countryList } = options;

  const loadCountryOptions = async () => {
    const res = await getCountryList().catch((err) => {
      if (err.response.status === 500 || err.response.status === 504) {
        // setLoading(false);
      }
    });
    if (res && res.data.data && res.data.data.length > 0) {
      setOption({ countryList: res.data.data });
      // setTimeout(() => setLoading(false), 1000);
    }
  };

  // LANGUAGE OPTIONS
  const [language, setLanguage] = useState({
    languageOptions: [],
  });
  const { languageOptions } = language;

  const loadLanguage = async () => {
    const res = await getLanguageList().catch((err) => {
      if (err.response.status === 500 || err.response.status === 504) {
        // setLoading(false);
      }
    });
    if (res && res.data) {
      setLanguage({ languageOptions: res.data.data });
      // setTimeout(() => setLoading(false), 1000);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setCurrentPatientDetails({
      ...currentPatient,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (e) => {
    const d = new Date(e.target.value);
    const isoDate = d.toISOString();

    const dateBefore18Years = moment(isoDate).isBefore(
      moment().subtract(18, 'years')
    );

    if (dateBefore18Years === false) {
      toast.error('Your age entered must be 18 years and above.', {
        toastId: 'ageError',
      });
    } else {
      setCurrentPatientDetails({
        ...currentPatientDetails,
        dateOfBirth: isoDate,
      });
    }
  };

  const handlePhone = (e) => {
    const appendPlus = '+' + e;
    setCurrentPatientDetails({ ...currentPatientDetails, phone: appendPlus });
  };

  const handleCountry = (e) => {
    setCurrentPatientDetails({
      ...currentPatientDetails,
      countryId: e.target.value,
    });
  };

  const handleLanguages = (selectedList, selectedItem) => {
    // e.preventDefault()
    // languages.push({ name: selectedItem.name });
    console.log(selectedItem);
  };

  const now = new Date();
  const newDate = now.setDate(now.getDate() - 1);
  const maxDate = {
    max: moment(newDate).format('YYYY-MM-DD'),
    min: moment(now).subtract(100, 'years').format('YYYY-MM-DD'),
  };

  const handleDetails = async (e) => {
    // setTransparentLoading(true);
    e.preventDefault();
    var bodyFormData = new FormData();
    const reqData = { ...currentPatient };
    reqData.lastName = '';
    bodyFormData.append('profileData', JSON.stringify(reqData));
    bodyFormData.append('profilePicture', profilePicture);
    const response = await updatePatientData(bodyFormData).catch((err) => {
      // setTransparentLoading(false);
      if (err.response.status === 500 || err.response.status === 504) {
        toast.error('Something went wrong. Please try again.');
      }
    });
    if (response.status === 200 || response.status === 201) {
      dispatch(updateProfile(response.data));

      toast.success('Profile updated successfully');

      setTimeout(() => {
        history.go(0);
      }, 1000);
    }
  };

  useEffect(() => {
    loadCountryOptions();
    loadLanguage();
  }, []);

  return (
    toggleProfile.editProfile === true && (
      <Container>
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <div>
              <h3>Edit Profile</h3>
              <div>
                <h5>General</h5>
                <Row>
                  <Col md={12}>
                    <CustomTextField
                      variant="outlined"
                      label="Full Name"
                      fullWidth
                      required
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => handleInputChange(e)}
                      //   autoFocus={false}
                      // error={emailError || emailLengthError}
                      // helperText={
                      //   emailError
                      //     ? 'Please enter a valid email'
                      //     : emailLengthError
                      //     ? 'Email should not be greater than 50 characters'
                      //     : ''
                      // }
                    />
                  </Col>
                  <Col md={6}>
                    <CustomTextField
                      variant="outlined"
                      label="Date of Birth"
                      fullWidth
                      required
                      type="date"
                      name="dateOfBirth"
                      value={moment(dateOfBirth).format('YYYY-MM-DD')}
                      inputProps={maxDate}
                      onChange={(e) => handleDateChange(e)}
                      onKeyDown={(e) => e.preventDefault()}
                    />
                  </Col>
                  <Col md={6}>
                    <MuiPhoneNumber
                      inputProps={{
                        name: 'phone',
                        required: true,
                        maxLength: 20,
                        minLength: 12,
                      }}
                      fullWidth
                      country={'us'}
                      value={phone}
                      onChange={(e) => handlePhone(e)}
                      variant="outlined"
                      label="Phone Number"
                      style={{ marginTop: '7.8px', marginLeft: '8px' }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <CustomRadioField
                      label="Gender"
                      variant="outlined"
                      options={[
                        { value: 'MALE', label: 'Male' },
                        { value: 'FEMALE', label: 'Female' },
                      ]}
                      value={gender}
                      name="gender"
                      style={{
                        marginLeft: '7.8px',
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <CustomTextField
                      variant="outlined"
                      label="Address"
                      fullWidth
                      required
                      type="text"
                      name="address"
                      value={address}
                      onChange={(e) => handleInputChange(e)}
                      //   autoFocus={false}
                      // error={emailError || emailLengthError}
                      // helperText={
                      //   emailError
                      //     ? 'Please enter a valid email'
                      //     : emailLengthError
                      //     ? 'Email should not be greater than 50 characters'
                      //     : ''
                      // }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <CustomSelectField
                      name="countryId"
                      inputLabel="Nationality"
                      onChange={(e) => handleCountry(e)}
                      value={countryId}
                      options={countryList}
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <CustomSelectField
                      name="maritalStatus"
                      inputLabel="Marital Status"
                      onChange={(e) => handleInputChange(e)}
                      value={maritalStatus}
                      options={[
                        { value: 'SINGLE', name: 'Single' },
                        { value: 'MARRIED', name: 'Married' },
                        { value: 'DIVORCED', name: 'Divorced' },
                        { value: 'WIDOWED', name: 'Widowed' },
                        { value: 'OTHER', name: 'Other' },
                      ]}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <CustomMultiSelectField
                      name="languages"
                      inputLabel="Languages"
                      onChange={(e) => handleLanguages(e)}
                      value={languages}
                      options={languageOptions}
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <CustomSelectField
                      name="bloodGroup"
                      inputLabel="Blood Group"
                      onChange={(e) => handleInputChange(e)}
                      value={bloodGroup}
                      options={[
                        { value: 'APOS', name: 'A+ve' },
                        { value: 'ANED', name: 'A-ve' },
                        { value: 'BPOS', name: 'B+ve' },
                        { value: 'BNEG', name: 'B-ve' },
                        { value: 'OPOS', name: 'O+ve' },
                        { value: 'ONEG', name: 'Ovve' },
                        { value: 'ABPOS', name: 'AB+ve' },
                        { value: 'ABNEG', name: 'AB-ve' },
                      ]}
                      required
                    />
                  </Col>
                </Row>
              </div>
              <div>
                <h5>Medical</h5>
                <Row>
                  <Col md={6}>
                    <CustomTextField
                      label="Weight"
                      type="number"
                      name="weight"
                      onChange={(e) => handleInputChange(e)}
                      value={weight}
                      inputProps={{
                        min: 5.0,
                        max: 999.0,
                        step: 0.1,
                      }}
                      variant="outlined"
                    />
                  </Col>
                  <Col md={6}>
                    <CustomTextField
                      label="Height"
                      type="number"
                      name="height"
                      onChange={(e) => handleInputChange(e)}
                      value={height}
                      inputProps={{
                        min: 30,
                        max: 250,
                        step: 0.1,
                      }}
                      variant="outlined"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <CustomTextField
                      label="High BP(in mmHg)"
                      type="number"
                      name="highBp"
                      onChange={(e) => handleInputChange(e)}
                      value={highBp}
                      inputProps={{
                        min: 30,
                        max: 300,
                        step: 0.1,
                      }}
                      variant="outlined"
                    />
                  </Col>
                  <Col md={6}>
                    <CustomTextField
                      label="Low BP(in mmHg)"
                      type="number"
                      name="lowBp"
                      onChange={(e) => handleInputChange(e)}
                      value={lowBp}
                      inputProps={{
                        min: 30,
                        max: 200,
                        step: 0.1,
                      }}
                      variant="outlined"
                    />
                  </Col>
                </Row>
              </div>
              <div className="btnWrapper">
                <button onClick={goBack}>GO BACK</button>
                <button
                  className="btn btn-primary continue-btn-profile"
                  type="button"
                  onClick={handleDetails}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default EditProfile;
