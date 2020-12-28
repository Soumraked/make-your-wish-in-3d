import React from "react";
import Main from "../components/admin/main";
import Login from "../components/login/main";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Typography } from "@material-ui/core";

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

    <div style={{ paddingTop: 80 }}>
      {access === 1 ? (
        <Main token={token} />
      ) : access === 2 ? (
        <Grid container direction="row" justify="center" alignItems="center">
          <Login handleAccess={handleAccess} handleToken={handleToken} />
          <br></br>      <br></br>      <br></br>      <br></br>
          <Typography style={{ textAlignLast: "center" }}>Si no recuerda su contraseña, comuníquese con los programadores para habilitar un cambio.</Typography>
          <br /><br /><br />
          <Typography style={{ color: "red", textAlignLast: "center" }}>Su sesión se cerrará automaticamente al ingresar a otro apartado, salir o recargar la página. </Typography>
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
          )
      }
    </div>

  </>;
}

export default Admin;
