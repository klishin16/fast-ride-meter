import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { ActionTypes, TrafficLightsContext } from "../state/TrafficLightsContext";
import useInput from "../hooks/useInput";

interface ILightEditorProps {
  id: string
}

const LightEditor: React.FC<ILightEditorProps> = ({id}) => {
  const {state, dispatch} = useContext(TrafficLightsContext);
  const {put: setTitle, ...title} = useInput('');
  const {put: setRedDelta, ...redDelta} = useInput(0);
  const {put: setGreenDelta, ...greenDelta} = useInput(0);

  useEffect(() => {
    const light = state.trafficLights.byId[id];
    setTitle(light.name)
    setRedDelta(light.redDelta / 1000);
    setGreenDelta(light.greenDelta / 1000);
  }, [id])

  const updateHandler = () => {
    dispatch({
      type: ActionTypes.PATCH_LIGHT,
      payload: {
        id,
        name: title.value,
        redDelta: redDelta.value * 1000,
        greenDelta: greenDelta.value * 1000,
        times: state.trafficLights.byId[id].times
      }
    })
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
