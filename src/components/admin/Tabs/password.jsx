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
  card: {
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  }
}));


export default function ChangePassword({ token }) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    password: "",
    newPassword: "",
    newPassword2: "",
    showPassword: false,
    showNewPassword: false,
    showNewPassword2: false
  });

  const [messageName, setMessageName] = React.useState("");
  const [messagePass, setMessagePass] = React.useState("");
  const [messagePassVerification, setMessagePassVerification] = React.useState("");
  const [messagePassVerification2, setMessagePassVerification2] = React.useState("");
  const [charge, setCharge] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword2 = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword3 = () => {
    setValues({ ...values, showNewPassword2: !values.showNewPassword2 });
  };

  const handleMouseDownPassword3 = (event) => {
    event.preventDefault();
  };

  const [nick, setNick] = React.useState("");

  const handleNick = (event) => {
    setNick(event.target.value);
  };

  const handleChangePass = () => {
    if (values.newPassword !== values.newPassword2 || values.newPassword.length === 0) {
      setMessagePassVerification("Las contraseñas estan vacias o no coinciden.");
      setMessagePassVerification2("Las contraseñas estan vacias o no coinciden.");
      setCharge(false);
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .post(
          `https://us-central1-u-app-3100e.cloudfunctions.net/api/admin/changePassword`,
          {
            rut: nick,
            password: values.password,
            newPassword: values.newPassword2
          }
        )
        .then((data) => {
          setMessageName("");
          setMessagePass("");
          setMessagePassVerification("");
          setMessagePassVerification2("");
          if (data.status === 200) {
            setSuccess(true);
            setMessage("Contraseña modificada con exito.");
            setTimeout(() => {
              setSuccess(false);
            }, 3000)
          } else {
            setMessageName(
              "Error desconocido, verifique los datos antes de continuar."
            );
            setMessagePass(
              "Error desconocido, verifique los datos antes de continuar."
            );
            setMessagePassVerification("Error desconocido, verifique los datos antes de continuar.");
            setMessagePassVerification2("Error desconocido, verifique los datos antes de continuar.");
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
                setMessageName("El nombre de usuario no puede estar vacio.");
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
              setMessageName("El rut no figura en la base de datos.");
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
  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center" style={{ paddingTop: 20 }}>
        <Card className={classes.card}>
          <CardContent>
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
                    Contraseña actual
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
                    Nueva contraseña
                    </InputLabel>
                  <Input
                    error={messagePass !== ""}
                    color="secondary"
                    id="new-pass-error"
                    type={values.showNewPassword ? "text" : "password"}
                    value={values.newPassword}
                    onChange={handleChange("newPassword")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                          onMouseDown={handleMouseDownPassword2}
                        >
                          {values.showNewPassword ? (
                            <Visibility />
                          ) : (
                              <VisibilityOff />
                            )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText id="new-pass-error"> {messagePassVerification} </FormHelperText>
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
                    Confirmación de nueva contraseña
                    </InputLabel>
                  <Input
                    error={messagePass !== ""}
                    color="secondary"
                    id="new-pass-2-error"
                    type={values.showNewPassword2 ? "text" : "password"}
                    value={values.newPassword2}
                    onChange={handleChange("newPassword2")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword3}
                          onMouseDown={handleMouseDownPassword3}
                        >
                          {values.showNewPassword2 ? (
                            <Visibility />
                          ) : (
                              <VisibilityOff />
                            )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText id="new-pass-2-error"> {messagePassVerification2} </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container direction="row" justify="center" alignItems="center">
              <Button
                variant="outlined" color="secondary"
                onClick={() => {
                  setCharge(true);
                  handleChangePass();
                }}
              >
                {charge ? (
                  <CircularProgress
                    color="secondary"
                    style={{ width: "50%", height: "50%" }}
                  />
                ) : (
                    "Modificar contraseña"
                  )}
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center" style={{ paddingTop: 20 }}>
        {success && <FormHelperText id="success">{message}</FormHelperText>}
      </Grid>
    </>

  )
}
