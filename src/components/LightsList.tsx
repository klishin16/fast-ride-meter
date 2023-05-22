import { Box, Divider, List, ListItem, ListItemButton, ListItemText, ListProps, styled } from "@mui/material";
import React from "react";
import { ELightColors, Light, Measurement } from "../types";

const StyledList = styled(List)({
  width: '100%'
}) as typeof List

const StyledListItem = styled(ListItem)({})

const StyledListItemButton = styled(ListItemButton)({
  display: 'flex',
  gap: 10,
  alignItems: 'center'
})

interface ILightsProps {
  lights: Light[],
  select: (id: string) => void
}


const LightMeasurements: React.FC<ListProps & ILightsProps> = ({ lights, select, ...props }) => {
  const listItems = lights.map(light =>
    <>
      <StyledListItem disablePadding key={light.id}>
        <StyledListItemButton onClick={() => select(light.id)}>
          {light.name}
        </StyledListItemButton>
      </StyledListItem>
    </>
  )

  return (
    <StyledList {...props}>
      {listItems}
    </StyledList>
  )
}

export default LightMeasurements
