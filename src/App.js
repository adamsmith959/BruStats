// import logo from './logo.svg';
import React from 'react'
import './App.css';
import data from './2022.json'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import schc from "./SCHC.json";
import vcit from "./VCIT.json";
import portfolio from "./portfolio.json";

import TopStats from './components/TopStats';
import MultilineChart from './components/MultilineChart'
import CapRace from './components/CapRace';
import SpoonRace from './components/SpoonRace';
import BestPerformanceRecent from './components/BestPerformanceRecent';
import Tabs from './components/Tabs'

const portfolioData = {
  name: "Portfolio",
  color: "orange",
  items: portfolio.map((d) => ({ ...d, date: new Date(d.date) }))
};
const schcData = {
  name: "SCHC",
  color: "#d53e4f",
  items: schc.map((d) => ({ ...d, date: new Date(d.date) }))
};
const vcitData = {
  name: "VCIT",
  color: "#5e4fa2",
  items: vcit.map((d) => ({ ...d, date: new Date(d.date) }))
};

const dimensions = {
  width: 600,
  height: 300,
  margin: {
    top: 30,
    right: 30,
    bottom: 30,
    left: 60
  }
};




function App() {
  return (
    <div className="App">
      <Container>
        <Typography style={{color: 'steelblue'}} variant='h2'>BruStats | Bude Beys</Typography>
        <Typography variant='h4' gutterBottom>2022-23</Typography>
      

        <TopStats style={{marginBottom: 25}} data={data} />

        <Tabs data={data}/>

        <br />
        {/* <BestPerformanceRecent data={data.rounds} dimensions={dimensions} /> */}
        <br />
        {/* <CapRace data={data.rounds} dimensions={dimensions} /> */}
        <br />
        {/* <SpoonRace data={data.rounds} dimensions={dimensions} /> */}
        <br />
        {/* <MultilineChart
          data={[portfolioData, schcData, vcitData]}
          dimensions={dimensions}
        /> */}
        {/* {JSON.stringify(data.leaderboards)} */}
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </Container>
    </div>
  );
}

export default App;
