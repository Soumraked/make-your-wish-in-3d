import React from "react";

//Import App bar Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
// End import

//Import container
import Container from "@material-ui/core/Container";
// End import

//Components
import LinkButton from "./linkbutton";
import Search from "./search";
// import Avatar from "./avatar";
import Drawer from "./drawer";
// End import

import Moon from "@material-ui/icons/Brightness4";
import Sun from "@material-ui/icons/Brightness7";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";
import CustomizedDialogs from "../../views/popup";

//Style Navbar
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  theme: {
    padding: 10,
    margin: 0,
  },
  letra:{
    fontFamily: "Orbitron,sans-serif" ,
  }
}));
// End Style

function Navbar({ themeState, handleThemeChange }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Container maxWidth="lg" disableGutters>
      
        { window.location.pathname!=="/admin" ? (<CustomizedDialogs/>) 
        :
        (console.log("bien"))
        }
          <Toolbar>
            <Drawer
              themeState={themeState}
              handleThemeChange={handleThemeChange}
            />
            <Typography style={{"font-family": 'Orbitron,sans-serif ',padding:"1em"  }} route="/" ><a style={{"text-decoration": "none","font-size": "2.1vh",    fontVariant: "petite-caps"}} href="/">Make your wish in 3D</a></Typography>
            <LinkButton  name="Inicio" route="/"  style={{paddingLeft:"10px"}} />
            <LinkButton name="Productos" route="/productos" />
            <LinkButton class="end" />

            <Search />
            <IconButton
              edge="end"
              className={classes.theme}
              color="inherit"
              aria-label="open drawer"
              onClick={handleThemeChange}
            >
              {themeState ? <Moon /> : <Sun />}
            </IconButton>
            {/* <Avatar
              src="https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/nekoAvatar.jpg?alt=media"
              alt="Kooga"
            /> */}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Navbar;
