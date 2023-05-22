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

const TrafficLight: React.FC<ITrafficLightProps> = ({ lightColor }) => {
  return <>
    <TrafficLightBox sx={{
      width: 120,
      height: 280,
      backgroundColor: '#797878',
      boxShadow: 3,
      borderRadius: 3
    }}>
      <Box sx={{
        borderRadius: '50%',
        backgroundColor: lightColor === ELightColors.RED ? 'error.light' : '#545454',
        width: 70,
        height: 70,
        boxShadow: 1,
      }}></Box>
      <Box sx={{
        borderRadius: '50%',
        backgroundColor: lightColor === ELightColors.YELLOW ? 'warning.light' : '#545454',
        width: 70,
        height: 70,
        boxShadow: 1,
      }}></Box>
      <Box sx={{
        borderRadius: '50%',
        backgroundColor: lightColor === ELightColors.GREEN ? 'success.light' : '#545454',
        width: 70,
        height: 70,
        boxShadow: 1,
      }}></Box>
    </TrafficLightBox>
  </>
}

export default TrafficLight
