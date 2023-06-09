import { Box, LinearProgress, linearProgressClasses, styled } from "@mui/material";
import React from "react";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 30,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

interface MeasurementsProgressProps {
  value: number
}

const MeasurementsProgress: React.FC<MeasurementsProgressProps> = ({ value }) => {
  return <>
    <Box sx={{ width: '100%' }}>
      <BorderLinearProgress variant="determinate" value={value} />
    </Box>
  </>
}

export default MeasurementsProgress
