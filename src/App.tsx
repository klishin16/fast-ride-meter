import React from 'react';
import './App.css';
import TrafficMeter from "./pages/TrafficMeter";
import { Route, Routes, useNavigate } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import TrafficLightsPage from "./pages/TrafficLightsPage";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, Traffic, Info } from '@mui/icons-material';
import TrafficLightsMetricsPage from "./pages/TrafficLightsMetricsPage";


function App() {
  const navigate = useNavigate();

  const [value, setValue] = React.useState()

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main className='main_container'>
        <Routes>
          <Route path="/" element={<TrafficLightsPage />} />
          <Route path="traffic-meter" element={<TrafficMeter />} />
          <Route path="traffic-meter/:lightId" element={<TrafficMeter />} />
          <Route path="measurements" element={<TrafficLightsMetricsPage />} />
          <Route path="about" element={<AboutPage />} />
        </Routes>

        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            width: {
              xs: 1,
              sm: 530
            },
            height: {
              xs: '10vh',
              sm: '7vh'
            },
            pl: 2,
            pr: 2
          }}
        >
          <BottomNavigationAction label="Home" icon={<Home />} onClick={() => navigate('/')} />
          <BottomNavigationAction label="Measurements" icon={<Traffic />} onClick={() => navigate('measurements')} />
          <BottomNavigationAction label="Traffic meter" icon={<Traffic />} onClick={() => navigate('traffic-meter')} />
          <BottomNavigationAction label="About" icon={<Info />} onClick={() => navigate('about')} />
        </BottomNavigation>
      </main>
    </div>
  );
}

export default App;
