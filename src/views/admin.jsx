import React from "react";
import Main from "../components/admin/main";
import Login from "../components/login/main";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";

function Admin() {

  const [access, setAcess] = React.useState(2);
  // 1 -> access
  // 2 -> not access
  const [token, setToken] = React.useState("");

  const handleAccess = (value) => {
    setAcess(value);
  };

  const handleToken = (value) => {
    setToken(value);
  };

  return <>
  <div style={{paddingTop:20}}>
      {access === 1 ? (
        <Main token={token}/>
      ) : access === 2 ? (
        <Grid container direction="row" justify="center" alignItems="center">
          <Login handleAccess={handleAccess} handleToken={handleToken}/>
        </Grid>
      ) : (
        <Grid container direction="row" justify="center" alignItems="center">
          <h1>Error inesperado, recarge la página para continuar.</h1>
          <div
            style={{
              width: "100%",
              "& > * + *": {
                marginTop: "10%",
              },
            }}
          >
            <LinearProgress color="secondary" />
          </div>
        </Grid>
      )}
    </div>
    
  </>;
}

export default Admin;
