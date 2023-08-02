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
import { Delete } from "@mui/icons-material";
import { IMetric } from "../models/IMetric";

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
  metrics: IMetric[],
  remove?: (id: string) => void,
  hideRemove?: boolean,
}

const MetricsList: React.FC<ListProps & ILightMetricsProps> = ({metrics, remove, hideRemove,...props}) => {
  const listItems = metrics.map(metric =>
    <StyledListItem disablePadding key={ metric.id }>
      <StyledListItemButton>
        <ListItemText primary={ metric.redDelta }/>
        <ListItemText primary={ metric.greenDelta }/>
        <ListItemText primary={ new Date(metric.time).toLocaleTimeString() }/>
      </StyledListItemButton>
      { !hideRemove && <IconButton aria-label="delete" color="error" onClick={ () => remove && remove(metric.id) }>
          <Delete/>
      </IconButton> }
    </StyledListItem>
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
