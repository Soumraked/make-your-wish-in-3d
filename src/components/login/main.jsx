import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "50%",
  },
}));


export default function Main({ handleAccess, handleToken }) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const [messageName, setMessageName] = React.useState("");
  const [messagePass, setMessagePass] = React.useState("");
  const [charge, setCharge] = React.useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [nick, setNick] = React.useState("");

  const handleNick = (event) => {
    setNick(event.target.value);
  };

  var controller = new AbortController();

  const handleLogin = () => {
    if (!validateEmail(nick)) {
      setMessageName("Formato no valido para el email.");
      setCharge(false);
    } else {
      axios
        .post(
          `https://us-central1-u-app-3100e.cloudfunctions.net/api/admin/login`,
          {
            rut: nick,
            password: values.password
          }
        )
        .then((data) => {
          setMessageName("");
          setMessagePass("");
          if (data.status === 200) {
            handleToken(data.data.token);
            handleAccess(1);
            return controller.abort();
          } else {
            setMessageName(
              "Error desconocido, verifique los datos antes de continuar."
            );
            setMessagePass(
              "Error desconocido, verifique los datos antes de continuar."
            );
          }
          setCharge(false);
        })
        .catch((error) => {
          setMessageName("");
          setMessagePass("");
          console.log(error.request.status);
          switch (error.request.status) {
            case 400:
              if (nick.length === 0) {
                setMessageName("Email no puede estar vacio.");
              }
              if (values.password.length === 0) {
                setMessagePass("La contraseña no puede estar vacia.");
              }
              if (nick.length !== 0 && values.password.length !== 0) {
                setMessageName(" ");
                setMessagePass(
                  "Las credenciales no coinciden, intenta nuevamente."
                );
              }
              break;
            case 404:
              setMessageName("El email no figura en la base de datos.");
              break;
            case 409:
              setMessagePass("La contraseña ingresada es incorrecta.");
              break;
            default:
              setMessageName(
                "Error desconocido, verifique los datos antes de continuar."
              );
              setMessagePass(
                "Error desconocido, verifique los datos antes de continuar."
              );
              break;
          }
          setCharge(false);
        });
    }
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  return (
    <>

      <Card>
        <CardContent>
          <h2>Inicie sesión para acceder a las herramientas de administración.</h2>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12}>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                style={{
                  width: "95%",
                }}
              >
                <TextField
                  type="email"
                  id="standard-required"
                  label="Email"
                  color="secondary"
                  value={nick}
                  onChange={(event) => {
                    handleNick(event);
                  }}
                  error={messageName !== ""}
                  helperText={messageName}
                  autoComplete="off"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                style={{ width: "95%" }}
                error={messagePass !== ""}
              >
                <InputLabel
                  htmlFor="standard-adornment-password"
                  color="secondary"
                >
                  Contraseña
                    </InputLabel>
                <Input
                  error={messagePass !== ""}
                  color="secondary"
                  id="pass-error"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                            <VisibilityOff />
                          )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id="pass-error"> {messagePass} </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <Button
              variant="outlined" color="secondary"
              onClick={() => {
                setCharge(true);
                handleLogin();
              }}
            >
              {charge ? (
                <CircularProgress
                  color="secondary"
                  style={{ width: "50%", height: "50%" }}
                />
              ) : (
                  "Ingresar"
                )}
            </Button>
          </Grid>
        </CardContent>
      </Card>

    </>
  )
}
