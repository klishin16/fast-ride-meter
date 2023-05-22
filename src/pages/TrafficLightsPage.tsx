import { Box, Card, styled, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ELightColors, Metric } from "../types";
import { TrafficLightsContext } from "../state/TrafficLightsContext";
import LightsList from "../components/LightsList";
import TrafficLight from "../components/TrafficLight";


const TrafficLightsContainer = styled(Box)({
  display: 'flex',
  gap: 20
})

const TrafficLightsLeftCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: 10,
  alignItems: 'center',
  width: '70%',
})

const TrafficLightsRightCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  alignItems: 'center',
  width: '100%'
})

const TrafficLightsPage = () => {
  // const mockMetrics: Metric[] = [
  //   {
  //     id: '1',
  //     greenDelta: 10,
  //     redDelta: 15,
  //     measurements: []
  //   }
  // ]

  const {state, dispatch} = useContext(TrafficLightsContext);

  const [currentLightId, setCurrentLightId] = useState<string | null>(null);
  const [currentLightColor, setCurrentLightColor] = useState<ELightColors>(ELightColors.RED);
  const selectLightHandler = (id: string) => {
    setCurrentLightId(id);
  }

  const startTrafficLight = (checkTime: Date, deltaRed: number, deltaGreen: number) => {
    // TODO замыкания использовать
    const interval = setInterval(() => {
      const newColor = checkLightState(checkTime, deltaRed, deltaGreen);
      setCurrentLightColor(newColor);
    }, 1000);
  }

  const checkLightState = (checkTime: Date, deltaRed: number, deltaGreen: number) => {
    console.log('checkLightState');
    const currentTime = new Date();
    const deltaTime = currentTime.getTime() - checkTime.getTime();
    console.log('deltaTime', deltaTime)
    const a = Math.floor((deltaTime) / (deltaRed + deltaGreen));
    const b = checkTime.getTime() + a * (deltaRed + deltaGreen);
    const c = currentTime.getTime() - b;
    console.log('c', c)
    return c <= deltaRed ? ELightColors.GREEN : ELightColors.RED;
  }

  useEffect(() => {
    if (!currentLightId) {
      return;
    }

    const light = state.trafficLights.byId[currentLightId];
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
    startTrafficLight(metrics[0].time, metrics[0].redDelta!, metrics[0].greenDelta!); //TODO
  }, [currentLightId])

  const lightContainer = () => {
    return <Box sx={ {
      flexGrow: 1
    } }>
      { currentLightId ?
        <TrafficLight lightColor={ currentLightColor }/> : <Typography>Please, select traffic light</Typography> }
    </Box>
  }

  return <>
    <TrafficLightsContainer sx={ {
      width: 500,
      height: 450,
      boxShadow: 0,
      backgroundColor: 'primary.light',
      borderRadius: 3,
      p: 2,
    } }>
      <TrafficLightsLeftCard sx={ {
        boxShadow: 1,
        p: 1
      } }>
        <Typography variant="h5" gutterBottom>
          Current light
        </Typography>
        { lightContainer() }
      </TrafficLightsLeftCard>
      <TrafficLightsRightCard sx={ {
        boxShadow: 1,
        p: 1
      } }>
        <Typography variant="h5" gutterBottom>
          Traffic lights
        </Typography>
        <LightsList lights={ state.trafficLights.allIds.map(id => state.trafficLights.byId[id]) }
                    select={ selectLightHandler }>
        </LightsList>
      </TrafficLightsRightCard>
    </TrafficLightsContainer>
  </>
}

export default TrafficLightsPage
