import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 230,
    // [theme.breakpoints.down("sm")]: {
    //   display: "none",
    // },
  },
  media: {
    paddingTop: "56.25%", // 16:9
  },
}));

export default function Variants() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Skeleton variant="rect" className={classes.media} />
      <Skeleton variant="text" />
    </Card>
  );
}