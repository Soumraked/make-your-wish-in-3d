import React from "react";

import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";


const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(3),
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

function Avatar(props) {
  const classes = useStyles();

  return (
    <div>
      <IconButton
        edge="end"
        className={classes.menuButton}
        color="inherit"
        aria-label="open drawer"
        variant="contained"
        // onClick={}
      >
        <AccountCircleIcon />
      </IconButton>

    </div>
  );
}

export default Avatar;
