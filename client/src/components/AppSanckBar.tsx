import { Alert, Grow, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbarStore } from '../store/snackbar.store';

const AppSnackBar = () => {
  const open = useSnackbarStore((state) => state.open);
  const message = useSnackbarStore((state) => state.message);
  const handleClose = useSnackbarStore((state) => state.handleClose);
  const duration = useSnackbarStore((state) => state.duration);
  const severity = useSnackbarStore((state) => state.severity);
  return (
    <Snackbar
      onClick={handleClose}
      TransitionComponent={Grow}
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
    >
      <Alert
        severity={severity}
        sx={{
          py: 0,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {message}
        <IconButton aria-label="close" color="inherit" sx={{ pb: 1 }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Alert>
    </Snackbar>
  );
};

export default AppSnackBar;
