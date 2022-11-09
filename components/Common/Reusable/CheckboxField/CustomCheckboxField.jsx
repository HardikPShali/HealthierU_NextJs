import Checkbox from '@mui/material/Checkbox';

const CustomCheckboxField = ({ ...otherProps }) => {
  return (
    <div>
      <Checkbox {...otherProps} />
    </div>
  );
};

export default CustomCheckboxField;
