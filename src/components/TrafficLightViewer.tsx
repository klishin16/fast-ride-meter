import { Box, styled } from "@mui/material";
import { ELightColors } from "../types";
import React from "react";

const TrafficLightBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center'
})

interface ITrafficLightProps {
  lightColor: ELightColors
}

const TrafficLightViewer: React.FC<ITrafficLightProps> = ({ lightColor }) => {
  return <>
    <TrafficLightBox sx={{
      width: 100,
      height: 240,
      backgroundColor: '#797878',
      boxShadow: 3,
      borderRadius: 3
    }}>
      <Box sx={{
        borderRadius: '50%',
        backgroundColor: lightColor === ELightColors.RED ? 'error.light' : '#545454',
        width: 60,
        height: 60,
        boxShadow: 1,
      }}></Box>
      <Box sx={{
        borderRadius: '50%',
        backgroundColor: lightColor === ELightColors.YELLOW ? 'warning.light' : '#545454',
        width: 60,
        height: 60,
        boxShadow: 1,
      }}></Box>
      <Box sx={{
        borderRadius: '50%',
        backgroundColor: lightColor === ELightColors.GREEN ? 'success.light' : '#545454',
        width: 60,
        height: 60,
        boxShadow: 1,
      }}></Box>
    </TrafficLightBox>
  </>
}

export default TrafficLightViewer
