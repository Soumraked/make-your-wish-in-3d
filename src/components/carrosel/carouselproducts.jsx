import React from "react";

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import axios from "axios";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Card } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));


const url = "https://us-central1-u-app-3100e.cloudfunctions.net/api/dashboard/products/4";

const AutoplaySlider = withAutoplay(AwesomeSlider);





const slider = (
  <AutoplaySlider
    play={true}
    cancelOnInteraction={false} // should stop playing on user interaction
    interval={6000}
    style={{ marginTop:"1em", height:"20vw" }}>
      <div data-src="https://firebasestorage.googleapis.com/v0/b/u-app-3100e.appspot.com/o/imagen_2020-12-26_201225.png?alt=media&token=00ccb76c-35b6-459a-af61-89eee216938c" />
      <div data-src="https://firebasestorage.googleapis.com/v0/b/u-app-3100e.appspot.com/o/jewelry_desktop.png?alt=media&token=5d7f62a1-c8bb-4d7f-ba1b-c181845f7486" />
      <div data-src="https://firebasestorage.googleapis.com/v0/b/u-app-3100e.appspot.com/o/prototyping_desktop.png?alt=media&token=9ef21172-f7ec-44f4-8063-bed88c18a900" />
    
  </AutoplaySlider>
);

export default function CarouselProducts() {
    
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    const obtenerProductos = () => {
      axios.get(url)
      .then((data) => {
        setProducts(data.data);
      })
      .catch((error) => {
        alert("Ha ocurrido un error.");
        console.log(error);
        
        } //Mostrar un alert o algo
      );
    };
    obtenerProductos();
  }, []);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (<>
  {slider}
  <div>
  <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
   
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
        </Tabs>

      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
        </div>
  </>
  );
}


