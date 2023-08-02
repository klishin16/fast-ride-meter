import React from 'react';
import './App.css';
import TrafficMeterPage from "./pages/TrafficMeterPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import LightsPage from "./pages/LightsPage";
import { BottomNavigation, BottomNavigationAction, Box, styled } from "@mui/material";
import { Home, Info, Traffic, Backspace } from '@mui/icons-material';
import MeasurementsPage from "./pages/MeasurementsPage";
import SnackbarMessage from "./components/SnackbarMessage";
import TimesPage from "./pages/TimesPage";
import MetricsPage from "./pages/MetricsPage";


const AppPagesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: 20,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}))

function App() {
  const navigate = useNavigate();

  const [value, setValue] = React.useState()

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main className='main_container'>
        <SnackbarMessage />
        <AppPagesContainer sx={ {
          width: {
            xs: 1,
            sm: 500
          },
          height: {
            xs: '90vh',
            sm: 450
          },
          boxShadow: 0,
          backgroundColor: 'primary.light',
          borderRadius: {
            xs: 0,
            sm: 3
          },
          p: 2,
        } }>
          <Routes>
            <Route path="/" element={ <LightsPage/> }/>
            <Route path="traffic-meter" element={ <TrafficMeterPage/> }/>
            <Route path="traffic-meter/:lightId" element={ <TrafficMeterPage/> }/>
            <Route path="measurements" element={ <MeasurementsPage/> }/>
            <Route path="times/:lightId" element={ <TimesPage/> }/>
            <Route path="metrics/:lightId" element={ <MetricsPage /> }/>
            <Route path="about" element={ <AboutPage/> }/>
          </Routes>
        </AppPagesContainer>

        <BottomNavigation
          showLabels
          value={ value }
          onChange={ (event, newValue) => {
            setValue(newValue);
          } }
          sx={ {
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
          } }
        >
          <BottomNavigationAction label="Home" icon={ <Home/> } onClick={ () => navigate('/') }/>
          <BottomNavigationAction label="Measurements" icon={ <Traffic/> }
                                  onClick={ () => navigate('measurements') }/>
          <BottomNavigationAction label="Traffic meter" icon={ <Traffic/> }
                                  onClick={ () => navigate('traffic-meter') }/>
          <BottomNavigationAction label="About" icon={ <Info/> } onClick={ () => navigate('about') }/>
          <BottomNavigationAction label="Back" icon={ <Backspace/> } onClick={ () => navigate(-1) }/>
        </BottomNavigation>
      </main>
    </div>
  );
}

export default App;
