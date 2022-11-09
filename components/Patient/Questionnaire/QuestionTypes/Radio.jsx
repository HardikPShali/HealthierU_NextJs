import React, { useState } from 'react';
import CustomRadioField from '../../../Common/Reusable/RadioField.jsx/CustomRadioField';

const Radio = ({ question, followQuestion, isError }) => {
  const [answers, setAnswer] = useState('');

  const handleRadioChange = (e) => {
    setAnswer(e);
    question.answers = e;
    question.isError = false;
    followQuestion();
  };

  return (
    <>
      <div className={`form-check mb-1 pb-2  ${isError ? 'error-field' : ''}`}>
        <label className="form-check-label col-sm-12 col-form-label">
          {question.questionTitle}
        </label>

        {question.choices.map((choice, index) => (
          <div key={index} className="col-sm-12" style={{ marginLeft: '20px' }}>
            <CustomRadioField
              type="radio"
              className="form-check-input"
              id={question.questionTitle + index}
              value={answers}
              onChange={() => {
                handleRadioChange(choice);
              }}
              checked={answers === choice}
              required
            />
            <label
              htmlFor={question.questionTitle + index}
              className="form-check-label"
            >
              {choice}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default Radio;
