import { Card, styled, Typography } from "@mui/material";
import React from "react";
import TimesList from "../components/TimesList";
import { useAppSelector } from "../hooks/redux";
import { useParams } from "react-router-dom";


const TimesCard = styled(Card)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: 10,
  alignItems: 'center',
  width: '100%',
})

const TimesPage = () => {
  const { lightId } = useParams();
  const times = useAppSelector(state => state.timeReducer.byLightId[lightId!]?.map(id => state.timeReducer.byId[id]));

  return <TimesCard sx={ {
    boxShadow: 1,
      p: 1
  } }>
<Typography variant="h5" gutterBottom>
  Traffic light metrics
  </Typography>

    {times ? <TimesList times={times} /> : <Typography variant={"subtitle1"}>No times</Typography>}
</TimesCard>
}

export default TimesPage;
