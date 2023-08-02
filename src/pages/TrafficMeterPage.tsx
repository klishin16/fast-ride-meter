import TrafficLightViewer from "../components/TrafficLightViewer";
import StartLight from "../components/LightMeter/StartLight";
import { Box, Button, Card, styled, Typography } from "@mui/material";
import LightMeasurements from "../components/LightMeter/LightMeasurements";
import MeasurementsProgress from "../components/LightMeter/MeasurementsProgress";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import { lightSlice } from "../store/reducers/LightSlice";
import { ELightColors } from "../models/ILight";
import { ISnapshot } from "../models/ISnapshot";
import { metricSlice } from "../store/reducers/MetricSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IMetric } from "../models/IMetric";
import { timeSlice } from "../store/reducers/TimeSlice";


const TrafficMeterLeftCard = styled(Card)({
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

function average(nums: number[]) {
  return nums.reduce((a, b) => (a + b)) / nums.length;
}

export default function TrafficMeterPage() {
  const { lightId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const light = useAppSelector(state => state.lightReducer.byId[lightId!])
  const lightMetrics = useAppSelector(state => state.metricReducer.allIds.reduce<IMetric[]>((acc, id) => {
    if (state.metricReducer.byId[id].lightId === lightId) {
      acc.push(state.metricReducer.byId[id]);
    }

    return acc;
  }, []))
  const { addMetric } = metricSlice.actions;
  const { patchLight } = lightSlice.actions;
  const { addTime } = timeSlice.actions;

  const [snapshots, setSnapshots] = React.useState<ISnapshot[]>([]);
  const [progress, setProgress] = React.useState<number>(0);
  const [startColor, setStartColor] = React.useState<ELightColors>(ELightColors.RED);
  const [currentColor, setCurrentColor] = React.useState<ELightColors>(ELightColors.RED)

  const addSnapshot = () => {
    const id = uuid()
    setSnapshots([
      ...snapshots,
      {
        id,
        color: currentColor,
        time: new Date()
      }
    ]);
    rotateCurrentColor();
  }

  const resetMeasurements = () => {
    setSnapshots([]);
  }

  const startColorHandler = (newColor: ELightColors) => {
    setStartColor(newColor);
  }

  const rotateCurrentColor = () => {
    setCurrentColor(currentColor === ELightColors.RED ? ELightColors.GREEN : ELightColors.RED)
  }

  const doneHandler = () => {
    const id = uuid()
    const times = snapshots.map(snapshot => snapshot.time);
    const redDelta = startColor === ELightColors.RED ? (times[2].getTime() - times[1].getTime()) : (times[1].getTime() - times[0].getTime())
    const greenDelta = startColor === ELightColors.GREEN ? (times[2].getTime() - times[1].getTime()) : (times[1].getTime() - times[0].getTime())
    const time = new Date((ELightColors.RED ? times[0] : times[1]));
    time.setMilliseconds(0);

    dispatch(
      addMetric({
        id,
        lightId: lightId ?? '1',
        time,
        redDelta: Math.floor(redDelta / 1000) * 1000,
        greenDelta: Math.floor(greenDelta / 1000) * 1000
      })
    )
    dispatch(
      patchLight({
        ...light,
        greenDelta: average(lightMetrics.map(metric => metric.greenDelta)),
        redDelta: average(lightMetrics.map(metric => metric.redDelta)),
      })
    )
    const timeId = uuid()
    dispatch(
      addTime({
        id: timeId,
        lightId: lightId!,
        date: time
      })
    )
    navigate('/measurements');
  }

  useEffect(() => {
    setProgress(Math.min(snapshots.length * 25, 100))
  }, [snapshots])

  useEffect(() => {
    setCurrentColor(startColor === ELightColors.RED ? ELightColors.GREEN : ELightColors.RED);
    resetMeasurements();
  }, [startColor])

  return <>

    <TrafficMeterLeftCard sx={ {
      boxShadow: 1,
      p: 1,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      justifyContent: 'space-around',
      alignItems: 'center'
    } }>
      <Box sx={ {
        display: 'flex',
        flexDirection: {
          sm: 'column'
        },
        alignItems: 'center',
        justifyContent: 'space-around',
        height: {
          xs: 1
        },
        width: {
          xs: 1
        }
      } }>
        <StartLight lightColor={ startColor } colorChange={ startColorHandler }/>
        <TrafficLightViewer lightColor={ currentColor }/>
      </Box>

      <Button variant="contained" sx={ {
        width: '100%'
      } } onClick={ addSnapshot }>Add metering</Button>
    </TrafficMeterLeftCard>
    <TrafficMeterRightCard sx={ {
      boxShadow: 1,
      p: 1,
      flex: {
        xs: 1,
        sm: 0.75
      }
    } }>
      <Typography variant="h5" gutterBottom>
        Measurements
      </Typography>
      <StyledLightMeasurements measurements={ snapshots }/>
      <MeasurementsProgress value={ progress }/>
      <Button
        variant="contained"
        sx={ {
          width: '100%'
        } }
        onClick={ resetMeasurements }
        disabled={ !snapshots.length }
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
