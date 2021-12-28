import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = (props) => {

  if(props.message.error === true){
    return (
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={true} autoHideDuration={2000}>
          <Alert severity="error" sx={{ width: '100%' }}>
            {props.message.message}
          </Alert>
        </Snackbar>
      </Stack>
    );
  }
  else {
    return (
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={true} autoHideDuration={2000}>
          <Alert severity="success" sx={{ width: '100%' }}>
            {props.message.message}
          </Alert>
        </Snackbar>
      </Stack>
    );
  }
}

export default SnackBar;