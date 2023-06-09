import { Box, Card, LinearProgress, styled, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ELightColors, Light } from "../types";
import { TrafficLightsContext } from "../state/TrafficLightsContext";
import LightsList from "../components/LightsList";
import TrafficLightViewer from "../components/TrafficLightViewer";


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
  const {state} = useContext(TrafficLightsContext);

  const [lightId, setLightId] = useState<string | null>(null);
  const [light, setLight] = useState<Light | null>(null);
  const [currentLightColor, setCurrentLightColor] = useState<ELightColors>(ELightColors.RED); // Текущий цвет
  const [currentIntervalId, setCurrentIntervalId] = useState<number>(0);

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const createTrafficLightChecker = (light: Light) => {
    return window.setInterval(() => {
      const {color, timeLeft} = checkLightState(new Date(light.times[0]), light.redDelta, light.greenDelta);
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
  const calculateProgress = (light: Light, time: number, currentColor: ELightColors) => {
    const currentDelta = currentColor === ELightColors.RED ? light.redDelta : light.greenDelta;
    return (currentDelta - time) / currentDelta * 100;
  }

  useEffect(() => {
    if (!lightId) {
      return;
    }

    const light = state.trafficLights.byId[lightId];
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
            { progress }
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
      <LightsList lights={ state.trafficLights.allIds.map(id => state.trafficLights.byId[id]) }
                  select={ selectLightHandler }>
      </LightsList>
    </TrafficLightsRightCard>
  </>
}

export default LightsPage
