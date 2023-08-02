import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { uiSlice } from "../store/reducers/UISlice";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from "react";
import { Snackbar } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarMessage = () => {
  const dispatch = useAppDispatch();

  const {snackbarType, snackbarMessage, snackbarOpen} = useAppSelector(state => state.uiReducer);
  const {clearSnackbar} = uiSlice.actions

  function handleClose() {
    dispatch(clearSnackbar());
  }

  return (
    <Snackbar
      open={ snackbarOpen }
      autoHideDuration={ 4000 }
      onClose={ handleClose }
    >
      <Alert onClose={handleClose} severity={snackbarType} sx={{ width: '100%' }}>
        { snackbarMessage }
      </Alert>
    </Snackbar>
  );
}

export default SnackbarMessage;
