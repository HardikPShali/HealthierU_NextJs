// import React from 'react';
// import Radio from '@mui/material/Radio';

// const CustomRadioField = ({ ...otherProps }) => {
//   return (
//     <div>
//       <Radio {...otherProps} />
//     </div>
//   );
// };

// export default CustomRadioField;

import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const CustomRadioField = ({
  label,
  options,
  name,
  value,
  style,
  ...otherProps
}) => {
  return (
    <FormControl style={style}>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        value={value}
        name={name}
        {...otherProps}
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option.value}
            label={option.label}
            control={<Radio />}
          />
        ))}
        {/* <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
      </RadioGroup>
    </FormControl>
  );
};
