import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import HeadToHead from './HeadToHead';
import CapRace from './CapRace';
import SpoonRace from './SpoonRace';
import BestPerformanceRecent from './BestPerformanceRecent';
import Standings from './Standings';
import LineChart from './LineChart';
import SeasonPos from './SeasonPos';
import { margin } from '@mui/system';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const dimensions = {
    width: 600,
    height: 300,
    margin: {
      top: 30,
      right: 150,
      bottom: 30,
      left: 60
    }
};

export default function BasicTabs({data}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Analysis" {...a11yProps(0)} />
          {/* <Tab label="Individual" {...a11yProps(1)} /> */}
          <Tab label="Head To Head" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Standings data={data.leaderboards[data.leaderboards.length-1].results} dimensions={dimensions} />
        <SeasonPos data={data.leaderboards} dimensions={{...dimensions, margin: {...dimensions.margin, right: 150, top: 40}}} />
        <LineChart data={data.leaderboards} dimensions={{...dimensions, margin: {...dimensions.margin, right: 150}}} />
        <BestPerformanceRecent data={data.rounds} dimensions={dimensions} />
        <CapRace data={data.rounds} dimensions={dimensions} />
        <SpoonRace data={data.rounds} dimensions={dimensions} />
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
      </TabPanel> */}
      <TabPanel value={value} index={1}>
        <HeadToHead data={data}/>
      </TabPanel>
    </Box>
  );
}
