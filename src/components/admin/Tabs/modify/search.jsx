import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";

import ButtonBase from "@material-ui/core/ButtonBase";
import axios from "axios";

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

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
    padding: 10,
  },
  textField: {
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  }
}));

function SearchProduct({
  handleModify,
  addName,
  addModel,
  addValue,
  addDesc,
  addImage
}) {
  const classes = useStyles();

  const [names, setNames] = React.useState({});

  React.useEffect(() => {
    const obtenerInfo = () => {
      axios.get("https://us-central1-u-app-3100e.cloudfunctions.net/api/products/search")
        .then((data) => {
          let aux = {};
          for (let i = 0; i < data.data.length; i++) {
            aux[data.data[i].id] = {
              id: data.data[i].id,
              image: data.data[i].img.length > 10 ? data.data[i].img : "https://firebasestorage.googleapis.com/v0/b/u-app-3100e.appspot.com/o/error%2Ferror.jpeg?alt=media",
              name: `${data.data[i].name} ${data.data[i].model}`,
              names: `${data.data[i].name} ${data.data[i].model}`,
              value: data.data[i].value.toString(),
              model: data.data[i].model,
              desc: data.data[i].desc
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

  const handleChange = (event) => {
    setSearch(event.target.value);
    searchName(event.target.value);
  };

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
  const handleClickSearch = (value) => {
    handleModify(true);
    addName(names[value].name);
    addModel(names[value].model);
    addValue(names[value].value);
    addDesc(names[value].desc);
    addImage(names[value].image);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginTop: 20 }}
      >
        <TextField
          className={classes.textField}
          value={search}
          onChange={handleChange}
          label="Buscar"
          color="secondary"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          style={{
            margin: 20,
          }}
          variant="outlined"
          onClick={() => {
            setSearch("");
          }}
        >
          Limpiar campo
      </Button>
      </Grid>
      <List style={{ paddingTop: 20 }}>
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
            <Card className={classes.cardAction}>
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
    </>
  );
}

export default SearchProduct;
