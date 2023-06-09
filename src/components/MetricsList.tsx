import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListProps,
  styled,
  Typography
} from "@mui/material";
import React from "react";
import { Metric } from "../types";
import { Delete } from "@mui/icons-material";

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
  metrics: Metric[],
  remove?: (id: string) => void
}

const MetricsList: React.FC<ListProps & ILightMetricsProps> = ({metrics, remove, ...props}) => {
  const listItems = metrics.map(metric =>
    <>
      <StyledListItem disablePadding key={ metric.id }>
        <StyledListItemButton>
          <ListItemText primary={ metric.redDelta }/>
          <ListItemText primary={ metric.greenDelta }/>
          <ListItemText primary={ new Date(metric.time).toLocaleTimeString() }/>
        </StyledListItemButton>
        <IconButton aria-label="delete" color="error" onClick={ () => remove && remove(metric.id) }>
          <Delete/>
        </IconButton>
      </StyledListItem>
    </>
  )

  return (
    <>
      { !listItems.length && <Box><Typography>No metrics</Typography></Box> }
      <StyledList { ...props }>
        { listItems }
      </StyledList>
    </>
  )
}

export default MetricsList
