import { Box, Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import useInput from "../hooks/useInput";
import { v4 as uuid } from "uuid";
import { ActionTypes, TrafficLightsContext } from "../state/TrafficLightsContext";

const LightCreator = () => {
  const { reset: resetTitle, ...title } = useInput('');
  const { dispatch } = useContext(TrafficLightsContext);

  const addLightHandler = () => {
    const id = uuid();
    dispatch({
      type: ActionTypes.ADD_LIGHT,
      payload: {
        id,
        name: title.value
      }
    })
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
