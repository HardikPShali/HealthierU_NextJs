import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const CustomSelectField = ({
  inputLabel,
  value,
  options,
  ...otherProps
}) => {
  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1, width: '100%' },
        minWidth: 120,
      }}
    >
      <FormControl fullWidth {...otherProps}>
        <InputLabel id="demo-simple-select-label">{inputLabel}</InputLabel>
        <Select label={inputLabel} value={value} {...otherProps}>
          {options.map((item, index) => (
            <MenuItem key={index} value={item.id ? item.id : item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
