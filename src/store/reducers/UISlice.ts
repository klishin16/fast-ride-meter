import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export enum ESnackbarType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info'
}
interface IUIState {
  snackbarOpen: boolean;
  snackbarType: ESnackbarType;
  snackbarMessage: string;
}

const initialState: IUIState = {
  snackbarOpen: false,
  snackbarType: ESnackbarType.INFO,
  snackbarMessage: ''
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showSnackbar(state, action: PayloadAction<{ type: ESnackbarType, message: string }>) {
      state.snackbarType = action.payload.type;
      state.snackbarMessage = action.payload.message;
      state.snackbarOpen = true;
    },
    clearSnackbar(state) {
      state.snackbarOpen = false;
    }
  }
})

export default uiSlice.reducer
