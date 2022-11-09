import React, { useState } from 'react';
import { CustomTextField } from '../../../Common/Reusable/TextField/CustomTextField';

export const Text = ({ question, followQuestion, isError }) => {
  const [answers, setAnswer] = useState('');

  const handleChange = (e) => {
    setAnswer(e.target.value);
    question.answers = e.target.value;
    if (e.target.value) {
      question.isError = false;
    }
    followQuestion();
  };

  const onlyNumberKey = (evt) => {
    // Only ASCII character in that range allowed
    var theEvent = evt || window.event;
    // Handle paste
    if (theEvent.type === 'paste') {
      key = evt.clipboardData.getData('text/plain');
    } else {
      // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  };

  return (
    <div
      className={`form-group row mb-1 pb-2 input-div ${
        isError ? 'error-field' : ''
      }`}
    >
      <label htmlFor="description" className="col-sm-8 col-form-label">
        {question.questionTitle}
      </label>
      <div className="col-sm-8 input-place">
        <CustomTextField
          type="text"
          className="form-control"
          value={answers}
          onChange={handleChange}
          id={question.questionId}
          required
          maxLength={2}
          onKeyPress={onlyNumberKey}
        />
        {/* <span style={{ marginLeft: '20px' }}>Drinks</span> */}
      </div>
    </div>
  );
};
