import { useState, useCallback } from 'react';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { Alert, AlertColor, Grow } from '@mui/material';

function useSnackbar() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>();

  const handleClick = useCallback((msg: string, severity?: AlertColor) => {
    setOpen(true);
    setMessage(msg);
    if (severity) setSeverity(severity);
  }, []);

  const handleClose = useCallback((_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }, []);

  const SnackbarComponent = (props: SnackbarProps & { severity: 'info' | 'error' | 'success' }) => (
    <Snackbar
      onClick={handleClose}
      TransitionComponent={Grow}
      open={open}
      autoHideDuration={props.autoHideDuration || 4000}
      onClose={handleClose}
    >
      <Alert
        severity={severity?.length ? severity : props.severity}
        sx={{
          py: 0,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {message?.length ? message : props.message}
        <IconButton aria-label="close" color="inherit" sx={{ pb: 1 }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Alert>
    </Snackbar>
  );

  return { handleClick, SnackbarComponent, open };
}

export { useSnackbar };
