import { Box, Button, Card, styled, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ActionTypes, TrafficLightsContext } from "../state/TrafficLightsContext";
import LightMetrics from "../components/LightMetrics";
import LightsList from "../components/LightsList";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";
import { Metric } from "../types";


const MeasurementsPageContainer = styled(Box)({
  display: 'flex',
  gap: 20
})

const MeasurementsPageLeftCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: 10,
  alignItems: 'center',
  width: '100%',
})

const MeasurementsPageRightCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  alignItems: 'center',
  width: '100%'
})

const TrafficLightsMetricsPage = () => {
  const {state, dispatch} = useContext(TrafficLightsContext);
  const navigate = useNavigate();

  const [currentLightId, setCurrentLightId] = useState<string | null>(null);

  const [newLight, setNewLight] = useState('');

  useEffect(() => {
    console.log(state)
  }, [])

  const addLightHandler = () => {
    const id = uuid();
    dispatch({
      type: ActionTypes.ADD_LIGHT,
      payload: {
        id,
        name: newLight
      }
    })
    setNewLight('');
  }
  const selectLightHandler = (id: string) => {
    setCurrentLightId(id);
  }
  const metricsContainer = () => {
    const metrics = state.metrics.allIds.reduce<Metric[]>((acc, id) => {
      if (state.metrics.byId[id].lightId === currentLightId) {
        acc.push(state.metrics.byId[id]);
      }

      return acc;
    }, [])

    return currentLightId ? <>
      <LightMetrics sx={{ flexGrow: 1 }} metrics={ metrics }></LightMetrics>
      <Button sx={{ width: '100%' }} variant="contained" onClick={ () => navigate('/traffic-meter/' + currentLightId) }>New metring</Button>
    </> : <Typography>Please, select traffic light</Typography>
  }

  return <>
    <MeasurementsPageContainer sx={ {
      width: {
        xs: 1,
        sm: 500
      },
      height: {
        xs: 1,
        sm: 450
      },
      boxShadow: 0,
      backgroundColor: 'primary.light',
      borderRadius: 3,
      p: 2,
    } }>
      <MeasurementsPageLeftCard sx={ {
        boxShadow: 1,
        p: 1
      } }>
        <Typography variant="h5" gutterBottom>
          Traffic lights
        </Typography>
        <LightsList
          sx={ {
            flexGrow: 1
          } }
          lights={ state.trafficLights.allIds.map(id => state.trafficLights.byId[id]) }
          select={ selectLightHandler }/>
        <Box sx={ {
          display: 'flex',
          gap: 1,
          maxHeight: 30
        } }>
          <TextField variant="standard" value={ newLight } onChange={ (v) => setNewLight(v.target.value) }/>
          <Button variant="contained" onClick={ addLightHandler } disabled={ !newLight.length }>Add</Button>
        </Box>
      </MeasurementsPageLeftCard>
      <MeasurementsPageRightCard sx={ {
        boxShadow: 1,
        p: 1
      } }>
        <Typography variant="h5" gutterBottom>
          Metrics
        </Typography>
        { metricsContainer() }
      </MeasurementsPageRightCard>
    </MeasurementsPageContainer>
  </>
}

export default TrafficLightsMetricsPage
