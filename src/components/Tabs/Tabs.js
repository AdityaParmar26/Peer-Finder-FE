import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './Tabs.css';
import TechnicalInterest from '../Interest Page/Technical Interst Page/TechnicalInterest';
import NonTechnicalInterest from '../Interest Page/Non Technical Interest Page/NonTechnicalInterest';
import CulturalInterest from '../Interest Page/Cultural Interest Page/CulturalInterest';

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
          <Typography component={'span'} variant={'body2'}>{children}</Typography>
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

const TabsInterest = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box>
        <Box>
          <Tabs value={value} onChange={handleChange} centered textColor="inherit" indicatorColor="secondary">
            <Tab label="Technical" style={{minWidth:"33.3%"}}/>
            <Tab label="Non-Technical" style={{minWidth:"33.3%"}}/>
            <Tab label="Cultural" style={{minWidth:"33.3%"}} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TechnicalInterest/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <NonTechnicalInterest />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CulturalInterest />
        </TabPanel>
      </Box>
    </div>
    
  );
}

export default TabsInterest