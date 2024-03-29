import { IconButton, List, ListItem, ListItemButton, ListProps, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';
import React from "react";
import { ILight } from "../models/ILight";

const StyledList = styled(List)({
  width: '100%',
  overflowY: "scroll"
}) as typeof List

const StyledListItem = styled(ListItem)({})

const StyledListItemButton = styled(ListItemButton)({
  display: 'flex',
  gap: 10,
  alignItems: 'center'
})

interface ILightsProps {
  lights: ILight[],
  select: (id: string) => void,
  showRemoveButton?: boolean,
  remove?: (id: string) => void
}


const LightMeasurements: React.FC<ListProps & ILightsProps> = ({
                                                                 lights,
                                                                 select,
                                                                 showRemoveButton,
                                                                 remove,
                                                                 ...props
                                                               }) => {
  const listItems = lights.map(light =>
      <StyledListItem disablePadding key={ light.id }>
        <StyledListItemButton onClick={ () => select(light.id) }>
          { light.name }
        </StyledListItemButton>
        { showRemoveButton ?
          <IconButton aria-label="delete" color="error" onClick={ () => remove && remove(light.id) }>
            <Delete/>
          </IconButton> :
          null }
      </StyledListItem>
  )

  return (
    <StyledList { ...props }>
      { listItems }
    </StyledList>
  )
}

export default LightMeasurements
