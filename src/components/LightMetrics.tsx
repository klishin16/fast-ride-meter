import { Divider, List, ListItem, ListItemButton, ListItemText, ListProps, styled, Typography } from "@mui/material";
import React from "react";
import { Metric } from "../types";

const StyledList = styled(List)({
  width: '100%'
}) as typeof List

const StyledListItem = styled(ListItem)({})

const StyledListItemButton = styled(ListItemButton)({
  display: 'flex',
  gap: 10,
  alignItems: 'center'
})

interface ILightMetricsProps {
  metrics: Metric[]
}

const LightMetrics: React.FC<ListProps & ILightMetricsProps> = ({ metrics, ...props }) => {
  const listItems = metrics.map(metric =>
    <>
      <StyledListItem disablePadding key={metric.id}>
        <StyledListItemButton>
          <ListItemText primary={metric.redDelta} />
          <ListItemText primary={metric.greenDelta} />
          <ListItemText primary={metric.time.toLocaleTimeString()} />
        </StyledListItemButton>
      </StyledListItem>
    </>
  )

  return (
    <>
      {!listItems.length && <Typography>No metrics</Typography>}
      <StyledList {...props}>
        {listItems}
      </StyledList>
    </>
  )
}

export default LightMetrics
