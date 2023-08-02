import { Box, Button, Card, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import LightsList from "../components/LightsList";
import { useNavigate } from "react-router-dom";
import LightCreator from "../components/LightCreator";
import LightEditor from "../components/LightEditor";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { metricSlice } from "../store/reducers/MetricSlice";
import { lightSlice } from "../store/reducers/LightSlice";
import { v4 as uuid } from 'uuid';
import { ESnackbarType, uiSlice } from "../store/reducers/UISlice";
import { timeSlice } from "../store/reducers/TimeSlice";


const MeasurementsPageLeftCard = styled(Card)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: 10,
  alignItems: 'center',
  width: '100%',
})

const MeasurementsPageRightCard = styled(Card)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  alignItems: 'center',
  width: '100%'
})

const MeasurementsPage = () => {
  const {byId: lightsById, allIds: lightsAllIds} = useAppSelector(state => state.lightReducer);
  const {byId: metricById, allIds: metricsAllIds} = useAppSelector(state => state.metricReducer);
  const dispatch = useAppDispatch();
  const {removeLight} = lightSlice.actions;
  const {removeMetric} = metricSlice.actions;
  const {addTime} = timeSlice.actions;
  const { showSnackbar } = uiSlice.actions;
  const navigate = useNavigate();

  const [currentLightId, setCurrentLightId] = useState<string | null>(null);

  const selectLightHandler = (id: string) => {
    setCurrentLightId(id);
  }

  const addLightGreenTimeHandler = (lightId: string) => {
    dispatch(
      addTime({
        id: uuid(),
        lightId,
        date: new Date(),
      })
    );
    dispatch(showSnackbar({type: ESnackbarType.SUCCESS, message: 'Added light green time!'}))
  }

  return <>
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
        lights={ lightsAllIds.map(id => lightsById[id]) }
        select={ selectLightHandler }
        showRemoveButton
        remove={ (id) => dispatch(removeLight({id})) }
      />
      <LightCreator/>
    </MeasurementsPageLeftCard>
    <MeasurementsPageRightCard sx={ {
      boxShadow: 1,
      p: 1,
      display: 'flex',
      flexDirection: {xs: 'row', sm: 'column'}
    } }>
      { currentLightId ?
        <Box sx={ {display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1} }>
          <Box sx={ {flexGrow: 1} }>
            <LightEditor id={ currentLightId }/>
          </Box>
          <Button sx={ {width: 1} } variant="contained" onClick={ () => navigate('/times/' + currentLightId) }>
            TIMES
          </Button>
          <Button sx={ {width: 1} } variant="contained" onClick={ () => navigate('/metrics/' + currentLightId) }>
            METRICS
          </Button>
          <Button color={ "success" } sx={ {width: 1} } variant="contained" onClick={ () => addLightGreenTimeHandler(currentLightId) }>
            And now green time
          </Button>
          <Button color={ "secondary" } sx={ {width: 1} } variant="contained"
                  onClick={ () => navigate('/traffic-meter/' + currentLightId) }>
            New metring
          </Button>
        </Box> :
        <Typography>Please, select traffic light</Typography> }
    </MeasurementsPageRightCard>
  </>
}

export default MeasurementsPage
