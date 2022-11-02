import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { IconButton } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { ValidatorForm } from 'react-material-ui-form-validator';

const FilterBoxComponent = () => {
  const [filter, setFilter] = useState(false);

  const toggleFilterBox = () => {
    setFilter(filter ? false : true);
  };

  return (
    <div>
      <IconButton
        onClick={() => toggleFilterBox()}
        style={{
          backgroundColor: `#e4e4e4`,
          color: `#000`,
        }}
      >
        <TuneIcon />
      </IconButton>
    </div>
  );
};

export default FilterBoxComponent;
