import { Box, Card, LinearProgress, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LightsList from "../components/LightsList";
import TrafficLightViewer from "../components/TrafficLightViewer";
import { ELightColors, ILight } from "../models/ILight";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { ESnackbarType, uiSlice } from "../store/reducers/UISlice";
import { ITime } from "../models/ITime";


const TrafficLightsLeftCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: 10,
  alignItems: 'center',
  width: '100%',
})

const TrafficLightsRightCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  alignItems: 'center',
  width: '100%'
})

const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
  height: 25,
  borderRadius: 5
}));

const LightsPage = () => {
  const { byId: lightsById, allIds: lightsAllIds } = useAppSelector(state => state.lightReducer);
  const { byId: timesById, byLightId: timesByLightId } = useAppSelector(state => state.timeReducer);
  const dispatch = useAppDispatch();
  const { showSnackbar } = uiSlice.actions;

  const [lightId, setLightId] = useState<string | null>(null);
  const [light, setLight] = useState<ILight | null>(null);
  const [currentLightColor, setCurrentLightColor] = useState<ELightColors>(ELightColors.RED); // Текущий цвет
  const [currentIntervalId, setCurrentIntervalId] = useState<number>(0);
  const [baseGreenTime, setBaseGreenTime] = useState<Date>();

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const createTrafficLightChecker = (light: ILight) => {
    return window.setInterval(() => {
      const lightTimes = timesByLightId[light.id].map(timeId => timesById[timeId]);
      const greenTime = new Date(chooseNearestTime(lightTimes, new Date()).date);
      console.log('greenTime', greenTime);
      setBaseGreenTime(greenTime);
      const {color, timeLeft} = checkLightState(greenTime, light.redDelta, light.greenDelta);
      setCurrentLightColor(color);
      setTimeLeft(timeLeft);
      setProgress(calculateProgress(light!, timeLeft, color) ?? 0);
    }, 100);
  }

  /** PURE FUNCTIONS ZONE */
  const checkLightState = (checkTime: Date, deltaRed: number, deltaGreen: number) => {
    const currentTime = new Date();
    const deltaTime = currentTime.getTime() - checkTime.getTime();
    const a = Math.floor((deltaTime) / (deltaRed + deltaGreen));
    const b = checkTime.getTime() + a * (deltaRed + deltaGreen);
    const c = currentTime.getTime() - b;
    return {
      color: c <= deltaGreen ? ELightColors.GREEN : ELightColors.RED,
      timeLeft: c <= deltaGreen ? deltaGreen - c : deltaGreen + deltaRed - c
    };
  }
  const calculateProgress = (light: ILight, time: number, currentColor: ELightColors) => {
    const currentDelta = currentColor === ELightColors.RED ? light.redDelta : light.greenDelta;
    return (currentDelta - time) / currentDelta * 100;
  }

  const chooseNearestTime = (times: ITime[], now_time: Date) => {
    const nowDaySeconds = getDaySeconds(now_time);
    return times.reduce((best_time, current_time) => {
      if (Math.abs(getDaySeconds(new Date(current_time.date)) - nowDaySeconds) < Math.abs(getDaySeconds(new Date(best_time.date)) - nowDaySeconds)) {
        return current_time
      }

      return best_time
    }, times[0])
  }

  const getDaySeconds = (date: Date) => {
    return date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()
  }

  /** END PURE FUNCTIONS ZONE */

  useEffect(() => {
    if (!lightId) {
      return;
    }

    const light = lightsById[lightId];
    if (!timesByLightId[lightId]?.length) {
      dispatch(showSnackbar({type: ESnackbarType.ERROR, message: 'No green times!'}));
      return;
    }
    setLight(light);

    if (!!currentIntervalId) {
      window.clearInterval(currentIntervalId);
    }
    setCurrentIntervalId(createTrafficLightChecker(light));
  }, [lightId]);

  const selectLightHandler = (id: string) => {
    setLightId(id);
  }

  const lightContainer = () => {
    return (
      <Box sx={ {flexGrow: 1, width: 1} }>
        { lightId ? lightView() : <Typography>Please, select traffic light</Typography> }
      </Box>
    )
  }

  const lightView = () => {
    return (
      <Box sx={ {display: 'flex', flexDirection: {sm: 'column'}, alignItems: 'center', gap: 1, height: 1} }>
        <Box>
          <TrafficLightViewer lightColor={ currentLightColor }/>
        </Box>
        <Box sx={ {width: 1} }>
          { light && <>
              <Typography>{ light.name }</Typography>
              <Typography>Green delta: { light.greenDelta / 1000 } s</Typography>
              <Typography>Red delta: { light.redDelta / 1000 } s</Typography>
              <Typography>Time left: { Math.round(timeLeft / 100) / 10 } s</Typography>
              <Typography>Base green time: { baseGreenTime?.toLocaleTimeString() }</Typography>
              <BorderLinearProgress
                  color={ currentLightColor === ELightColors.RED ? 'error' : 'success' }
                  variant="determinate"
                  value={ progress }/>
          </> }

        </Box>
      </Box>
    )
  }

  return <>
    <TrafficLightsLeftCard sx={ {
      boxShadow: 1,
      p: 1,
      flex: 1
    } }>
      { lightContainer() }
    </TrafficLightsLeftCard>
    <TrafficLightsRightCard sx={ {
      boxShadow: 1,
      p: 1,
      flex: 1
    } }>
      <Typography variant="h5" gutterBottom>
        Traffic lights
      </Typography>
      <LightsList lights={ lightsAllIds.map(id => lightsById[id]) }
                  select={ selectLightHandler }>
      </LightsList>
    </TrafficLightsRightCard>
  </>
}

export default LightsPage
