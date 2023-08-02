import { Box, Card, styled, Typography } from "@mui/material";
import React from "react";
import MetricsList from "../components/MetricsList";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { IMetric } from "../models/IMetric";
import MetricsTable from "../components/MetricsTable";

const MetricsCard = styled(Card)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: 10,
  alignItems: 'center',
  width: '100%',
})

const MetricsPage = () => {
  const { lightId } = useParams();
  const metrics = useAppSelector(state => state.metricReducer.allIds.reduce<IMetric[]>((acc, id) => {
    if (state.metricReducer.byId[id].lightId === lightId) {
      acc.push(state.metricReducer.byId[id]);
    }

    return acc;
  }, []))

  return <MetricsCard sx={ {
    boxShadow: 1,
    p: 1
  } }>
    <Typography variant="h5" gutterBottom>
      Traffic light metrics
    </Typography>

    <MetricsTable metrics={metrics} hideRemove />
  </MetricsCard>
}

export default MetricsPage;
