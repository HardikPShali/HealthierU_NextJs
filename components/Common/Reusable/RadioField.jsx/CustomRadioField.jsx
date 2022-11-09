import React from 'react';
import Radio from '@mui/material/Radio';

const CustomRadioField = ({ ...otherProps }) => {
  return (
    <div>
      <Radio {...otherProps} />
    </div>
  );
};

export default CustomRadioField;
