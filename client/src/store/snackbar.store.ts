import { AlertColor } from '@mui/material';
import create from 'zustand';

type SnackBarArgs = {
  message?: string;
  severity?: AlertColor;
  duration?: number;
  open?: boolean;
};

type SnackbarState = {
  open: boolean;
  message: string;
  severity: AlertColor;
  duration?: number;
  handleOpen: (props: SnackBarArgs) => void;
  handleClose: () => void;
};

const initialSnackBarArgs: SnackBarArgs = {
  message: '',
  severity: 'info',
  duration: 4000,
  open: false,
};

export const useSnackbarStore = create<SnackbarState>((set) => ({
  open: false,
  message: '',
  severity: 'success',
  duration: 4000,
  handleOpen: (props: SnackBarArgs) => set({ ...initialSnackBarArgs, ...props, open: true }),
  handleClose: () => set({ ...initialSnackBarArgs }),
}));