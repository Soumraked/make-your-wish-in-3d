import React from 'react'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Dashboard from "./Tabs/dashboard";
import Info from "./Tabs/info";
import Admin from "./Tabs/admin";
import Modify from "./Tabs/modify";
import Password from "./Tabs/password";
import Delete from "./Tabs/delete";

function Main({ token }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleChange}
          scrollButtons="auto"
          variant="scrollable"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Dashboard" />
          <Tab label="Agregar producto" />
          <Tab label="Modificar producto" />
          <Tab label="Eliminar producto" />
          <Tab label="Información pública" />
          <Tab label="Cambio de contraseña" />
        </Tabs>

      </Paper>
      {value === 0 ? <Dashboard token={token} /> : value === 1 ? <Admin token={token} /> : value === 2 ? <Modify token={token} /> : value === 3 ? <Delete token={token} /> : value === 4 ? < Info token={token} /> : <Password token={token} />}
    </>
  )
}

export default Main;
