import React from "react";
import { Box, styled, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { ELightColors } from "../../types";

const StartLightContainer = styled(Box)({
  minWidth: 140
})

interface IStartLightProps {
  lightColor: ELightColors,
  colorChange: (newColor: ELightColors) => any
}
const StartLight: React.FC<IStartLightProps> = ({ lightColor, colorChange }) => {

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newColor: ELightColors,
  ) => {
    colorChange(newColor);
  };

  return <>
    <StartLightContainer>
      <Typography variant="h5" gutterBottom>
        Select start with
      </Typography>

      <ToggleButtonGroup
        color="primary"
        value={lightColor}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{
          width: '100%'
        }}
      >
        <ToggleButton value={ELightColors.RED} sx={{
          width: '50%'
        }}>Red</ToggleButton>
        {/*<ToggleButton value="yellow">Yellow</ToggleButton>*/}
        <ToggleButton value={ELightColors.GREEN} sx={{
          width: '50%'
        }}>Green</ToggleButton>
      </ToggleButtonGroup>
    </StartLightContainer>
  </>
}

export default StartLight
