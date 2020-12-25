import React from "react";

import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Formulario from "./Contactos";
import "./contactos.css"

function Contacto(props) {
  return (
    <footer className="main-footer" >
    <div className="container">
      <Card
     
      >
        <CardContent  style={{padding:"0 0 1em 0" }}>
          <Container maxWidth="lg" disableGutters>
            <Formulario/>
          </Container>
        </CardContent>
      </Card>
     </div>
    </footer>
  );
}

export default Contacto;
