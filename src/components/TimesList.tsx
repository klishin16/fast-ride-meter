import { IconButton, List, ListItem, ListItemButton, ListProps, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';
import React from "react";
import { ILight } from "../models/ILight";
import { ITime } from "../models/ITime";

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

interface ITimesListProps {
  times: ITime[],
  select?: (id: string) => void,
  showRemoveButton?: boolean,
  remove?: (id: string) => void
}


const TimesList: React.FC<ListProps & ITimesListProps> = ({
                                                                 times,
                                                                 select,
                                                                 showRemoveButton,
                                                                 remove,
                                                                 ...props
                                                               }) => {
  const listItems = times.map((time) =>
    <StyledListItem disablePadding key={ time.id } onClick={ () => select && select(time.id) }>
      <StyledListItemButton>
        { time.date.toLocaleString() }
      </StyledListItemButton>
      { showRemoveButton ?
        <IconButton aria-label="delete" color="error" onClick={ () => remove && remove(time.id) }>
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

export default TimesList;
