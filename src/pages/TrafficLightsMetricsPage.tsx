import { Button, Card, styled, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { ActionTypes, TrafficLightsContext } from "../state/TrafficLightsContext";
import MetricsList from "../components/MetricsList";
import LightsList from "../components/LightsList";
import { useNavigate } from "react-router-dom";
import { Metric } from "../types";
import LightCreator from "../components/LightCreator";
import LightEditor from "../components/LightEditor";


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

const TrafficLightsMetricsPage = () => {
  const {state, dispatch} = useContext(TrafficLightsContext);
  const navigate = useNavigate();

  const [currentLightId, setCurrentLightId] = useState<string | null>(null);


  const selectLightHandler = (id: string) => {
    setCurrentLightId(id);
  }

  const removeLightHandler = (id: string) => {
    dispatch({
      type: ActionTypes.REMOVE_LIGHT,
      payload: {
        id
      }
    })
  }

  const removeMetricHandler = (id: string) => {
    dispatch({
      type: ActionTypes.REMOVE_METRIC,
      payload: {
        id
      }
    })
  }
  const metricsContainer = () => {
    const metrics = state.metrics.allIds.reduce<Metric[]>((acc, id) => {
      if (state.metrics.byId[id].lightId === currentLightId) {
        acc.push(state.metrics.byId[id]);
      }

      return acc;
    }, [])

    return currentLightId ? <>
      <MetricsList
        sx={ {flexGrow: 1} }
        metrics={ metrics }
        remove={ removeMetricHandler }
      ></MetricsList>
      <Button sx={ {width: '100%'} } variant="contained" onClick={ () => navigate('/traffic-meter/' + currentLightId) }>New
        metring</Button>
    </> : <Typography>Please, select traffic light</Typography>
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
        lights={ state.trafficLights.allIds.map(id => state.trafficLights.byId[id]) }
        select={ selectLightHandler }
        remove={ removeLightHandler }
      />
      <LightCreator/>
    </MeasurementsPageLeftCard>
    <MeasurementsPageRightCard sx={ {
      boxShadow: 1,
      p: 1
    } }>
      {currentLightId && <LightEditor id={currentLightId} />}
      <Typography variant="h6" gutterBottom>
        Metrics
      </Typography>
      { metricsContainer() }
    </MeasurementsPageRightCard>
  </>
}

export default TrafficLightsMetricsPage
