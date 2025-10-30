import { Snackbar, Alert } from '@mui/material';

function Toast({ open, onClose, message, severity = 'error', duration = 3000 }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert 
        onClose={handleClose} 
        severity={severity}
        sx={{ 
          width: '100%',
          fontSize: '1rem',
          fontWeight: '500'
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
