import React, { useState, useEffect, useRef } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Popper from "@material-ui/core/Popper";
import List from "@material-ui/core/List";

import ButtonBase from "@material-ui/core/ButtonBase";
import axios from "axios";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  root: {
    marginTop: 10,
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      marginLeft: 60,
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: 10,
      width: "auto",
    },
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
    width: "100%",
  },
  rootSearch: {
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1,
    },
  },
}));

function SearchProduct() {
  const classes = useStyles();
  let history = useHistory();

  // const names = {
  //   "FCALAVERADET-REX":{
  //     id:"FCALAVERADET-REX",
  //     image:"https://firebasestorage.googleapis.com/v0/b/u-app-3100e.appspot.com/o/products%2FFCALAVERADET-REX.jpg?alt=media",
  //     name:"Figura (Calavera de T-rex )",
  //     names:"Figura (Calavera de T-rex )",
  //     value: 22000
  //   }
  // };
  const [names, setNames] = React.useState({});

  React.useEffect(() => {
    const obtenerInfo = () => {
      axios.get("https://us-central1-u-app-3100e.cloudfunctions.net/api/products/search")
      .then((data) => {
        let aux = {};
        for(let i=0; i<data.data.length; i++){
          aux[data.data[i].id] = {
            id: data.data[i].id,
            image: data.data[i].img.length > 10 ? data.data[i].img : "https://firebasestorage.googleapis.com/v0/b/u-app-3100e.appspot.com/o/error%2Ferror.jpeg?alt=media",
            name: `${data.data[i].name} ${data.data[i].model}`,
            names: `${data.data[i].name} ${data.data[i].model}`,
            value: data.data[i].value.toString()
          }
        }
        setNames(aux);
      })
      .catch((error) => {
        console.log(error);
        } //Mostrar un alert o algo
      );
    };
    obtenerInfo();
  }, []);


  const [search, setSearch] = useState("");
  const [empty, setEmpty] = useState(false);
  const [options, setOptions] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleChange = (event) => {
    setStyleMenu("block");
    setSearch(event.target.value);
    searchName(event.target.value);
    if (event.target.value.length > 0) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const [styleMenu, setStyleMenu] = useState("none");

  function useOutside(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setStyleMenu("none");
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const searchName = (name) => {
    let options = [];
    for (let i in names) {
      if (names[i].names.toLowerCase().includes(name.toLowerCase())) {
        options.push(names[i].id);
      }
    }
    setEmpty(options.length === 0 && name.length > 0 ? false : true);
    setOptions(options);
  };

  const handleClick = () => {
    setStyleMenu("block");
  };

  const handleClickSearch = (value) => {
    setStyleMenu("none");
    setSearch("");
    setOptions([]);
    history.push(`/productos/${value}`);
  };

  const wrapperRef = useRef(null);
  useOutside(wrapperRef);

  return (
    <div className={classes.rootSearch}>
      <div className={classes.search}> 
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          aria-describedby={id}
          value={search}
          onChange={handleChange}
          onClick={handleClick}
          placeholder="Buscar"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          style={{ display: styleMenu }}
          ref={wrapperRef}
          className={classes.root}
        >
          <List>
            {empty && search.length > 0
              ? options.map((item) => (
                  <Card key={item}>
                    <ButtonBase
                      className={classes.cardAction}
                      onClick={(event) => {
                        handleClickSearch(item);
                      }}
                    >
                      <CardHeader
                        avatar={
                          <Avatar
                            src={names[item].image}
                            alt={names[item].name}
                            className={classes.large}
                          />
                        }
                        title={names[item].name}
                        subheader={`Valor: $${names[item].value}`}
                      />
                    </ButtonBase>
                  </Card>
                ))
              : !empty &&
                search.length > 0 && (
                  <Card className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar
                          src="https://firebasestorage.googleapis.com/v0/b/u-app-3100e.appspot.com/o/error%2Ferror.jpeg?alt=media"
                          alt="kooga"
                          className={classes.large}
                        />
                      }
                      title="No se ha encontrado resultado para la búsqueda."
                      subheader="Intentalo nuevamente."
                    />
                  </Card>
                )}
          </List>
        </Popper>
      </div>
    </div>
  );
}

export default SearchProduct;
