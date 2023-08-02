import { Box, Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import useInput from "../hooks/useInput";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { lightSlice } from "../store/reducers/LightSlice";
import { ESnackbarType, uiSlice } from "../store/reducers/UISlice";
import { timeSlice } from "../store/reducers/TimeSlice";
import { v4 as uuid } from 'uuid';

interface ILightEditorProps {
  id: string
}

const LightEditor: React.FC<ILightEditorProps> = ({id}) => {
  const { byId } = useAppSelector(state => state.lightReducer);
  const { patchLight } = lightSlice.actions;
  const { showSnackbar } = uiSlice.actions;
  const dispatch = useAppDispatch();
  const {put: setTitle, reset: _, ...title} = useInput('');
  const {put: setRedDelta, reset: __, ...redDelta} = useInput(0);
  const {put: setGreenDelta, reset: ___, ...greenDelta} = useInput(0);

  useEffect(() => {
    const light = byId[id];
    setTitle(light.name)
    setRedDelta(light.redDelta / 1000);
    setGreenDelta(light.greenDelta / 1000);
  }, [id])

  const updateHandler = () => {
    dispatch(
      patchLight({
        id,
        name: title.value,
        redDelta: redDelta.value * 1000,
        greenDelta: greenDelta.value * 1000
      })
    )
    dispatch(showSnackbar({type: ESnackbarType.SUCCESS, message: 'Light updated!'}));
  }

  return <>
    <Box
      component="form"
      sx={ {
        display: 'flex',
        flexDirection: 'column',
        '& .MuiTextField-root': {width: 1, mb: 1},
      } }
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        id="standard-required"
        label="Title"
        defaultValue="Light"
        variant="standard"
        { ...title }
      />
      <TextField
        id="standard-number"
        label="Red delta, s"
        type="number"
        variant="standard"
        InputLabelProps={ {
          shrink: true,
        } }
        { ...redDelta }
      />
      <TextField
        id="standard-number"
        label="Green delta, s"
        type="number"
        variant="standard"
        InputLabelProps={ {
          shrink: true,
        } }
        { ...greenDelta }
      />
      <Button sx={ {width: 1} } variant="contained" onClick={ updateHandler }>
        Update
      </Button>
    </Box>
  </>
}

export default LightEditor;
