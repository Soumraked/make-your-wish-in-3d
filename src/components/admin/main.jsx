import React from 'react'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Dashboard from "./Tabs/dashboard";
import Message from "./Tabs/message";
import Admin from "./Tabs/admin";

function Main({token}) {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Dashboard" />
          <Tab label="Agregar producto" />
          <Tab label="Mensajes" />
        </Tabs>
        
      </Paper>
      {value === 0 ? <Dashboard /> : value === 1 ? <Admin token={token} /> :<Message /> }
    </>
  )
}

export default Main;
