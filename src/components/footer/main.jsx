import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import withWidth from "@material-ui/core/withWidth";
import Formulario from "./Contactos";

function WithTheme(props) {
 

  return (
    <footer className="footer" style={{ position: "fixed",  bottom: "0",
    left: "0",  width: "100%" ,minHeight: "15vh",  padding: "0"}}>
      <Card
        style={{
          //absolute
          //fixed
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "auto",
          padding: "0 0 0 0"
        }}
      >
        <CardContent  style={{padding:"0 0 1em 0" }}>
          <Container maxWidth="lg" disableGutters>
            <Formulario/>
          </Container>
        </CardContent>
      </Card>
    </footer>
  );
}

export default withWidth()(WithTheme);
