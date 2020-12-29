
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import "./paginacion.css"
import NumberFormat from "react-number-format";

const UseStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    minWidth: 250,
    textDecoration: "none",
    margin:10
    // [theme.breakpoints.down("sm")]: {
    //   display: "none",
    // },
  },
  media: {
    height: 0,
    paddingTop: "80%", // 16:9
  },
  content: {
    margin: 0,
    padding: 10,
  },
  number: {
    position: "absolute",
    right: "3%",
    bottom: "23%",
    color: "white",
    [theme.breakpoints.down("md")]: {
      bottom: "28%",
    },
    [theme.breakpoints.down("sm")]: {
      bottom: "32%",
    },
  },
  type: {
    position: "absolute",
    right: "3%",
    top: "3%",
    color: "white",
  },
}));

function productCard(props) {
  const classes = UseStyles();
  const title = props.name + " - " + props.model;

  return (
    <Card
      className={classes.root}
      style={{ borderRadius: "5%" }}
    >

      <div style={{ position: 'relative' }} >
        <CardMedia className={classes.media} image={props.img} title={title} style={{ borderRadius: "1%" }} />

        {/* Texto en color rojo */}

        <div className="footer-product" >
          <h4 className="text-product">
            <NumberFormat value={props.value} displayType={'text'} thousandSeparator={true} prefix={'CLP '} />
          </h4>
        </div>
        <CardContent className={classes.content}>
          <Typography noWrap align="center">
            <strong>{title}</strong>
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}

export default productCard;