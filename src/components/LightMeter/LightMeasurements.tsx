import { Box, Divider, List, ListItem, ListItemButton, ListItemText, ListProps, styled } from "@mui/material";
import React from "react";
import { ELightColors } from "../../models/ILight";
import { ISnapshot } from "../../models/ISnapshot";

const StyledList = styled(List)({
  width: '100%',
  overflowY: 'scroll'
}) as typeof List

const StyledListItem = styled(ListItem)({})

const StyledListItemButton = styled(ListItemButton)({
  display: 'flex',
  gap: 10,
  alignItems: 'center'
})

interface LightMeasurementsProps {
  measurements: ISnapshot[]
}

const getLightColor = (color: ELightColors) => {
  switch(color) {
    case ELightColors.RED:
      return 'error.light'
    case ELightColors.YELLOW:
      return 'warning.light'
    case ELightColors.GREEN:
      return 'success.light'
  }
}

const LightMeasurements: React.FC<ListProps & LightMeasurementsProps> = ({ measurements, ...props }) => {
  const listItems = measurements.map(measurement =>
    <div key={measurement.id}>
      <StyledListItem disablePadding>
        <StyledListItemButton>
          <Box sx={{
            borderRadius: '50%',
            backgroundColor: getLightColor(measurement.color),
            width: 30,
            height: 30,
            boxShadow: 1,
          }}></Box>
          <ListItemText primary={measurement.time.toLocaleTimeString()} />
        </StyledListItemButton>
      </StyledListItem>
      <Divider component="li" />
    </div>
  )

  return (
    <StyledList {...props}>
      {listItems}
    </StyledList>
  )
}

export default LightMeasurements
