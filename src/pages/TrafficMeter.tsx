import TrafficLight from "../components/TrafficLight";
import StartLight from "../components/StartLight";
import { Button, Card, styled, Typography } from "@mui/material";
import LightMeasurements from "../components/LightMeasurements";
import MeasurementsProgress from "../components/MeasurementsProgress";
import React, { useContext, useEffect } from "react";
import { ELightColors, Measurement } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { ActionTypes, TrafficLightsContext } from "../state/TrafficLightsContext";
import { v4 as uuid } from 'uuid';


const TrafficMeterLeftCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: 10,
  alignItems: 'center',
  width: '100%',
})

const TrafficMeterRightCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  alignItems: 'center',
  width: '100%'
})

const StyledLightMeasurements = styled(LightMeasurements)({
  flexGrow: 1,
})

export default function TrafficMeter() {
  const {lightId} = useParams();
  const navigate = useNavigate();
  const {dispatch} = useContext(TrafficLightsContext);

  const [measurements, setMeasurements] = React.useState<Measurement[]>([]);
  const [progress, setProgress] = React.useState<number>(0);
  const [startColor, setStartColor] = React.useState<ELightColors>(ELightColors.RED);
  const [currentColor, setCurrentColor] = React.useState<ELightColors>(ELightColors.RED)

  const addMeasurement = () => {
    setMeasurements([
      ...measurements,
      {
        id: '555',
        color: currentColor,
        time: new Date()
      }
    ]);
    rotateCurrentColor();
  }

  const resetMeasurements = () => {
    setMeasurements([]);
  }

  const startColorHandler = (newColor: ELightColors) => {
    setStartColor(newColor);
  }

  const rotateCurrentColor = () => {
    setCurrentColor(currentColor === ELightColors.RED ? ELightColors.GREEN : ELightColors.RED)
  }

  const doneHandler = () => {
    const id = uuid()
    const times = measurements.map(m => m.time);
    const redDelta = startColor === ELightColors.RED ? (times[2].getTime() - times[1].getTime()) : (times[1].getTime() - times[0].getTime())
    const greenDelta = startColor === ELightColors.GREEN ? (times[2].getTime() - times[1].getTime()) : (times[1].getTime() - times[0].getTime())

    dispatch({
      type: ActionTypes.ADD_METRIC,
      payload: {
        id,
        lightId: lightId ?? '1',
        time: startColor === ELightColors.RED ? times[0] : times[1], // TODO надо правильно подумать
        redDelta: Math.floor(redDelta / 1000) * 1000,
        greenDelta: Math.floor(greenDelta / 1000) * 1000
      }
    })
    navigate('/measurements');
  }

  useEffect(() => {
    setProgress(Math.min(measurements.length * 25, 100))
  }, [measurements])

  useEffect(() => {
    setCurrentColor(startColor === ELightColors.RED ? ELightColors.GREEN : ELightColors.RED);
    resetMeasurements();
  }, [startColor])

  useEffect(() => {
    console.log(lightId);
  }, [])

  return <>

    <TrafficMeterLeftCard sx={ {
      boxShadow: 1,
      p: 1,
      flex: 1
    } }>
      <StartLight lightColor={ startColor } colorChange={ startColorHandler }/>
      <TrafficLight lightColor={ currentColor }/>
      <Button variant="contained" sx={ {
        width: '100%'
      } } onClick={ addMeasurement }>Add metering</Button>
    </TrafficMeterLeftCard>
    <TrafficMeterRightCard sx={ {
      boxShadow: 1,
      p: 1,
      flex: 0.75
    } }>
      <Typography variant="h5" gutterBottom>
        Measurements
      </Typography>
      <StyledLightMeasurements measurements={ measurements }/>
      <MeasurementsProgress value={ progress }/>
      <Button
        variant="contained"
        sx={ {
          width: '100%'
        } }
        onClick={ resetMeasurements }
        disabled={ !measurements.length }
      >Reset</Button>
      <Button
        variant="contained"
        disabled={ progress < 100 }
        sx={ {
          width: '100%'
        } }
        onClick={ doneHandler }
      >Done</Button>
    </TrafficMeterRightCard>
  </>
}
