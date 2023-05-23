import { Box, Card, styled, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ELightColors, Light, Metric } from "../types";
import { TrafficLightsContext } from "../state/TrafficLightsContext";
import LightsList from "../components/LightsList";
import TrafficLight from "../components/TrafficLight";


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

const TrafficLightsPage = () => {
  const {state} = useContext(TrafficLightsContext);

  const [currentLightId, setCurrentLightId] = useState<string | null>(null);
  const [currentLight, setCurrentLight] = useState<Light | null>(null);
  const [currentLightColor, setCurrentLightColor] = useState<ELightColors>(ELightColors.RED); // Текущий цвет

  const [currentIntervalId, setCurrentIntervalId] = useState<number>(0);

  const [deltas, setDeltas] = useState({ redDelta: 0, greenDelta: 0 })
  const selectLightHandler = (id: string) => {
    setCurrentLightId(id);
  }
  const createTrafficLightChecker = (checkTime: Date, deltaRed: number, deltaGreen: number) => {
    return window.setInterval(() => {
      const newColor = checkLightState(checkTime, deltaRed, deltaGreen);
      setCurrentLightColor(newColor);
    }, 1000);
  }

  const checkLightState = (checkTime: Date, deltaRed: number, deltaGreen: number) => {
    console.log('checkLightState');
    const currentTime = new Date();
    const deltaTime = currentTime.getTime() - checkTime.getTime();
    const a = Math.floor((deltaTime) / (deltaRed + deltaGreen));
    const b = checkTime.getTime() + a * (deltaRed + deltaGreen);
    const c = currentTime.getTime() - b;
    return c <= deltaGreen ? ELightColors.GREEN : ELightColors.RED;
  }

  useEffect(() => {
    if (!currentLightId) {
      return;
    }

    const light = state.trafficLights.byId[currentLightId];
    setCurrentLight(light);
    const metrics = state.metrics.allIds.reduce<Metric[]>((acc, id) => {
      if (state.metrics.byId[id].lightId === currentLightId) {
        acc.push(state.metrics.byId[id]);
      }

      return acc;
    }, [])
    console.log('metrics', metrics);
    if (!metrics.length) {
      console.log('error: no metrics!');
      return;
    }

    if (!!currentIntervalId) {
      console.log('currentIntervalCleaner', currentIntervalId)
      window.clearInterval(currentIntervalId);
    }
    setCurrentIntervalId(createTrafficLightChecker(new Date(metrics[0].time), metrics[0].redDelta!, metrics[0].greenDelta!));

    setDeltas({ redDelta: metrics[0].redDelta!, greenDelta: metrics[0].greenDelta! })
  }, [currentLightId])

  const lightContainer = () => {
    return (
      <Box sx={ {flexGrow: 1} }>
        { currentLightId ? lightView() : <Typography>Please, select traffic light</Typography> }
      </Box>
    )
  }

  const lightView = () => {
    return (
      <Box sx={{ display: 'flex', flexDirection: { sm: 'column' } }}>
        <Box>
          <TrafficLight lightColor={ currentLightColor } />
        </Box>
        <Box>
          <Typography>{ currentLight?.name }</Typography>
          <Typography>Green delta: {deltas.greenDelta / 1000} s</Typography>
          <Typography>Red delta: {deltas.redDelta /1000} s</Typography>
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

export default TrafficLightsPage
