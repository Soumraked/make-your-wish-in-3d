import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import withWidth from "@material-ui/core/withWidth";

function WithTheme(props) {
  return (
    <div style={{ position: "relative", minHeight: "15vh" }}>
      <Card
        style={{
          //absolute
          //fixed
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "auto",
        }}
      >
        <CardContent>
          <Container maxWidth="lg" disableGutters>
            <Typography
              style={{ textAlign: "center" }}
              variant={props.width === "xs" ? "caption" : "subtitle1"}
              component="div"
            >
              Make Your Wish in 3D - Todos los derechos reservados.
            </Typography>
          </Container>
        </CardContent>
      </Card>
    </div>
  );
}

export default withWidth()(WithTheme);
