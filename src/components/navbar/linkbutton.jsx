import React, { Fragment } from "react";

import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: 30,
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  LastTitle: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
}));

const LinkButton = (props) => {
  const classes = useStyles();

  return (
    <Fragment>
      {props.class ? (
        <Typography
          className={classes.LastTitle}
          variant="h6"
          noWrap
        ></Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          noWrap
          component={Link}
          to={props.route}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {props.strong ? <strong> {props.name}</strong> : <p>{props.name}</p>}
        </Typography>
      )}
    </Fragment>
  );
};

export default LinkButton;
