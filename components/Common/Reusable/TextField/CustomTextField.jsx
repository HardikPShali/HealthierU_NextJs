import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const CustomTextField = ({ ...otherProps }) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField {...otherProps} />
    </Box>
  );
};
