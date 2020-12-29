import React from 'react'
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
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


export default function Information({ token }) {
  const classes = useStyles();

  const [charge, setCharge] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const [mail, setMail] = React.useState("");
  const [fb, setFb] = React.useState("");
  const [ig, setIg] = React.useState("");
  const [wsp, setWsp] = React.useState("");
  const [direction, setDirection] = React.useState("");
  const handleMail = (event) => {
    setMail(event.target.value);
  };
  const handleFb = (event) => {
    setFb(event.target.value);
  };
  const handleIg = (event) => {
    setIg(event.target.value);
  };
  const handleWsp = (event) => {
    if (event.target.value !== "") {
      if (event.target.value.length <= 9) {
        setWsp(event.target.value);
      }
    }
  };
  const handleDirection = (event) => {
    setDirection(event.target.value);
  };
  const [messageMail, setMessageMail] = React.useState("");
  const [messageFb, setMessageFb] = React.useState("");
  const [messageIg, setMessageIg] = React.useState("");
  const [messageWsp, setMessageWsp] = React.useState("");
  const [messageDirection, setMessageDirection] = React.useState("");

  const handleChangeInformation = () => {
    if (wsp.toString().length !== 9 || !validateEmail(mail)) {
      setMessageMail("");
      setMessageWsp("");
      if (wsp.toString().length !== 9) {
        setMessageWsp(
          "Formato incorrecto, debe ingresar 9 numeros."
        );
      } if (!validateEmail(mail)) {
        setMessageMail("Formato no valido para el email.");
      }
      setCharge(false);
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put(
          `https://us-central1-u-app-3100e.cloudfunctions.net/api/information/modify`,
          {
            mail: mail,
            facebook: fb,
            instagram: ig,
            whatsapp: wsp,
            direction: direction,
          }
        )
        .then((data) => {
          setMessageMail("");
          setMessageFb("");
          setMessageIg("");
          setMessageWsp("");
          setMessageDirection("");
          if (data.status === 200) {
            setSuccess(true);
            setMessage("Información modificada con exito.");
            setTimeout(() => {
              setSuccess(false);
            }, 3000)
          } else {
            setMessageMail(
              "Error desconocido, verifique los datos antes de continuar."
            );
            setMessageFb(
              "Error desconocido, verifique los datos antes de continuar."
            );
            setMessageIg(
              "Error desconocido, verifique los datos antes de continuar."
            );
            setMessageWsp(
              "Error desconocido, verifique los datos antes de continuar."
            );
            setMessageDirection(
              "Error desconocido, verifique los datos antes de continuar."
            );
          }
          setCharge(false);
        })
        .catch((error) => {
          alert("Ha ocurrido un error inesperado, intenta nuevamente más tarde");
          console.log(error.request.status);
          setCharge(false);
        });

    }
  };

  React.useEffect(() => {
    const obtenerInfo = () => {
      axios.get("https://us-central1-u-app-3100e.cloudfunctions.net/api/information/get")
        .then((data) => {
          setMail(data.data.mail);
          setFb(data.data.facebook);
          setIg(data.data.instagram);
          setWsp(data.data.whatsapp);
          setDirection(data.data.direction);
        })
        .catch((error) => {
          console.log(error);
        } //Mostrar un alert o algo
        );
    };
    obtenerInfo();
  }, []);

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

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
                    label="Email"
                    color="secondary"
                    value={mail}
                    onChange={(event) => {
                      handleMail(event);
                    }}
                    error={messageMail !== ""}
                    helperText={messageMail}
                    autoComplete="off"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  style={{
                    width: "95%",
                  }}
                >
                  <TextField
                    type="text"
                    label="Facebook"
                    placeholder="https://www.facebook.com/TU_DIRECCION"
                    color="secondary"
                    value={fb}
                    onChange={(event) => {
                      handleFb(event);
                    }}
                    error={messageFb !== ""}
                    helperText={messageFb}
                    autoComplete="off"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  style={{
                    width: "95%",
                  }}
                >
                  <TextField
                    type="text"
                    placeholder="https://www.instagram.com/TU_DIRECCION"
                    label="Instagram"
                    color="secondary"
                    value={ig}
                    onChange={(event) => {
                      handleIg(event);
                    }}
                    error={messageIg !== ""}
                    helperText={messageIg}
                    autoComplete="off"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  style={{
                    width: "95%",
                  }}
                >
                  <TextField
                    data-testid="wsp"
                    type="number"
                    label="Whatsapp"
                    placeholder="Sólo 9 números"
                    color="secondary"
                    value={wsp}
                    onChange={(event) => {
                      handleWsp(event);
                    }}
                    error={messageWsp !== ""}
                    helperText={messageWsp}
                    autoComplete="off"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  style={{
                    width: "95%",
                  }}
                >
                  <TextField
                    type="text"
                    label="Dirección"
                    color="secondary"
                    value={direction}
                    onChange={(event) => {
                      handleDirection(event);
                    }}
                    error={messageDirection !== ""}
                    helperText={messageDirection}
                    autoComplete="off"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container direction="row" justify="center" alignItems="center">
              <Button
                data-testid="btn"
                variant="outlined" color="secondary"
                onClick={() => {
                  setCharge(true);
                  handleChangeInformation();
                }}
              >
                {charge ? (
                  <CircularProgress
                    color="secondary"
                    style={{ width: "50%", height: "50%" }}
                  />
                ) : (
                    "Modificar información"
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
