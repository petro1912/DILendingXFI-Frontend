import React from 'react';
import TextField from '@mui/material/TextField';

export default function UnderlineInput(props) {
  return (
    <TextField
      variant="standard"
      {...props}
      sx={{
        input: {
          fontSize: '24px',
          textAlign: 'right',
        },
        '& .MuiInput-underline:before': {
          borderBottom: '1px solid rgba(cc, cc, cc, 0.87)',
        },
        '& .MuiInput-underline:after': {
          borderBottom: '2px solid #00CFE8', // Underline when focused
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
          borderBottom: '2px solid rgba(cc, cc, cc, 0.87)', // Underline on hover
        },
      }}
    />
  );
}
