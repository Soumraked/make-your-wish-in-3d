//Route
import Home from "./views/home";
import Details from "./views/details_product";
import Products from "./views/products";
import Admin from "./views/admin";
import Error from "./views/error";
import "./App.css";
//Components
import Navbar from "./components/navbar/main";
import Footer from "./components/footer/main";

//Utils
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

//Librarys
import Container from "@material-ui/core/Container";

function App() {
  //Dark theme
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeState, setThemeState] = useState(false);
  const palletType = themeState ? "dark" : "light";
  const theme = createMuiTheme({
    palette: {
      type: palletType,
    },
    
  });
  const handleThemeChange = () => {
    setThemeState(!themeState);
    localStorage.theme = !themeState ? "dark" : "light";
  };

  React.useEffect(() => {
    const obtenerInfo = () => {
      if (localStorage.theme === "dark") {
        setThemeState(true);
      } else if (localStorage.theme === "light") {
        setThemeState(false);
      } else {
        setThemeState(prefersDarkMode ? true : false);
        localStorage.theme = prefersDarkMode ? "light" : "dark";
      }
    };
    obtenerInfo();
  }, [prefersDarkMode, setThemeState]);
  return (
    <div className="page-container">
      <div className="content-wrap" >
    <ThemeProvider theme={theme}>
        <CssBaseline />
    
      <Router>
          <Navbar
            themeState={themeState}
            handleThemeChange={handleThemeChange}
          />
          <Container maxWidth="lg">
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/productos" component={Products}></Route>
              <Route exact path="/productos/:id" component={Details}></Route>
              <Route exact path="/admin" component={Admin}></Route>
              <Route component={Error}></Route>
            </Switch>
          </Container>
        </Router>
        </ThemeProvider>
        </div>
        <Footer />
    </div>
  );
}

export default App;
