import { Box, Button, TextField } from "@mui/material";
import React from "react";
import useInput from "../hooks/useInput";
import { v4 as uuid } from "uuid";
import { lightSlice } from "../store/reducers/LightSlice";
import { useAppDispatch } from "../hooks/redux";
import { ESnackbarType, uiSlice } from "../store/reducers/UISlice";

const LightCreator = () => {
  const { addLight } = lightSlice.actions;
  const { showSnackbar } = uiSlice.actions;
  const dispatch = useAppDispatch();
  const { reset: resetTitle, put: _, ...title } = useInput('');

  const addLightHandler = () => {
    const id = uuid();
    dispatch(
      addLight({
        id,
        name: title.value
      })
    )
    dispatch(showSnackbar({type: ESnackbarType.SUCCESS, message: 'Light added!'}));
    resetTitle();
  }

  return (
    <Box sx={ {
      display: 'flex',
      gap: 1,
      maxHeight: 30,
      width: 1
    } }>
      <TextField
        sx={{ flex: 1 }}
        variant="standard"
        {...title}
      />
      <Button
        sx={{ flex: 0.2 }}
        variant="contained"
        onClick={ addLightHandler }
        disabled={ !title.value.length }
      >Add</Button>
    </Box>
  )
}

export default LightCreator;
