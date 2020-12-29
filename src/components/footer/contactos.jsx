import React from 'react';

import { Container, FormHelperText, makeStyles, Button, Grid, TextField, Typography } from '@material-ui/core';
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";


const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(3),
    },
    typography: {
        padding: theme.spacing(2),
    },
    TextField: {
        paddingTop: 0,
        marginTop:15,
        paddingBottom: 10,
        width: "100%",

    },
    boton: {
        paddingTop: 10,

    },

    separacion: {
        width: "50%",
        paddingRight: 10,

    },
    datosempresa: {
        display: "flex",
        alignItems: "flex-start",


    },
}));




var Recaptcha = require('react-recaptcha');


function Formulario(props) {
    const classes = useStyles();

    const [email, setEmail] = React.useState("");
    const [asunto, setAsunto] = React.useState("");
    const [comentario, setComentario] = React.useState("");
    const [captcha,setCaptcha]=React.useState(false);
    const [mensajeCaptcha,SetmensajeCaptcha]=React.useState("");
  
    var callback = function () {
        console.log('Done!!!!');
      };
       
      // specifying verify callback function
    var verifyCallback = function (response) {
        console.log(response);
        if(response){
            setCaptcha(true);
        }
    };

    const [info, setInfo] = React.useState({
        fb: "https://facebook.com",
        ig: "https://intagram.com",
        wsp: "https://api.whatsapp.com/send?phone=",
        direction: "Springfield"
    });

    React.useEffect(() => {
        const obtenerInfo = () => {
            axios.get("https://us-central1-u-app-3100e.cloudfunctions.net/api/information/get")
                .then((data) => {
                    setInfo({
                        fb: data.data.facebook,
                        ig: data.data.instagram,
                        wsp: `https://api.whatsapp.com/send?phone=56${data.data.whatsapp}`,
                        direction: data.data.direction
                    });
                })
                .catch((error) => {
                    alert("Ha ocurrido un error al cargar la información pública.");
                    console.log(error);
                } //Mostrar un alert o algo
                );
        };
        obtenerInfo();
    }, []);

    const [message, setMessage] = React.useState("");
    const [messageStatus, setMessageStatus] = React.useState(0); // 0 -> hidden, -> 1 -> Success, 2 -> Error
    const [charge, setCharge] = React.useState(false);

    const cleanData = () => {
        setEmail("");
        setAsunto("");
        setComentario("");
    };

    const enviarmail = () => {
        if(captcha===true ){
            SetmensajeCaptcha("");
            if (email === "" || asunto === "" || comentario === "") {
                setMessageStatus(2);
                setMessage("Los campos anteriores no pueden estar vacios.");
                setCharge(false);
            } else {
                setMessage("");
                setMessageStatus(0);
                var data = {
                    service_id: 'service_ht4t8q7',
                    template_id: 'template_ojtj6cb',
                    user_id: 'user_bGr1D7ZHFaYb8uucOFAa2',
                    template_params: {
                        'email': email,
                        'asunto': asunto,
                        'comentario': comentario,
                        'reply-to': email,
                    }
                };
                axios.post('https://api.emailjs.com/api/v1.0/email/send', data, { Headers: { "content-Type": "application/json" } })
                    .then(res => {
                        setCharge(false);
                        setMessageStatus(1);
                        setMessage("Correo enviado exitosamente.");
                        cleanData();
                        setTimeout(() => {
                            setMessageStatus(0);
                            setMessage("");
                        }, 3000);
    
                    })
                    .catch(error => {
                        setMessageStatus(2);
                        setMessage("Ha ocurrido un error, intenta nuevamente más tarde.");
                        console.log(error);
                        setCharge(false);
                    });
            }
    
        }else{
            SetmensajeCaptcha("Revisa que no eres un robot! y vuelve a presionar el boton");
        }
       
    }

  
    
    return <Container maxWidth="md" className="classes.datosempresa" style={{ justifyContent: "center" }} >
   

        <Grid container direction="row" className="classes.datosempresa"  style={{justifyContent: "center"}} >
            {/* {Datos de empresa} */}
            <Grid item xs={12} md={6} className={"classes.datosempresa"} >
                <br></br>
                <Grid container spacing={2}>

                    <Grid item xs={12} style={{ textAlign: 'center', }}>
                        <Typography
                            style={{ textAlign: "center" }}
                            variant={props.width === "xs" ? "caption" : "subtitle1"}
                            component="div"
                        >
                            ¡Siguenos en nuestras redes sociales!
            </Typography>

                    </Grid>
                    <Grid item md={3} sm={3} style={{ textAlign: 'center', }} >

                        <a href={info.fb}><SiFacebook size={'2em'} style={{ color: "#4267B2" }} /> </a>

                        <Typography style={{ textAlign: "center" }}
                            variant={props.width === "xs" ? "caption" : "subtitle1"}
                            component="div"> Facebook</Typography>
                    </Grid>
                    <Grid item xs={3} sm={4} style={{ textAlign: 'center', }}>
                        <a href={info.ig} > <SiInstagram size={'2em'} style={{ color: "#f28168" }} /></a>

                        <Typography style={{ textAlign: "center" }}
                            variant={props.width === "xs" ? "caption" : "subtitle1"}
                            component="div"> Instagram</Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} style={{ textAlign: 'center', }}>
                        <a href={info.wsp} > <SiWhatsapp size={'2em'} style={{ color: "#25D366" }} /></a>


                        <Typography
                            style={{ textAlign: "center" }}
                            variant={props.width === "xs" ? "caption" : "subtitle1"}
                            component="div"
                        >
                            Whatsapp
                      </Typography>
                    </Grid>

                </Grid>
                <br></br>

                <Typography
                    style={{ textAlign: "center" }}
                    variant={props.width === "xs" ? "caption" : "subtitle1"}
                    component="div"
                >
                    {info.direction}
                </Typography>

                <Typography
                    style={{ textAlign: "center" }}
                    variant={props.width === "xs" ? "caption" : "subtitle1"}
                    component="div"
                >
                    Make Your Wish in 3D - Todos los derechos reservados.
        </Typography>
            </Grid>


            {/* {Formulario} */}

            <Grid item xs={12} sm={6} style={{ alignContent: "center" }}  >
                {/* {Nombre} */}
                <TextField
                    className={classes.separacion}
                    color="secondary"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                    label="Email"
                    helperText="Nunca compartiremos tu email."
                />

                {/* {Email} */}
                <TextField
                    className={classes.separacion}
                    color="secondary"
                    id="asunto"
                    value={asunto}
                    onChange={(event) => {
                        setAsunto(event.target.value);
                    }}
                    label="Asunto"
                    helperText="Nunca compartiremos tus datos."
                />

                {/* {Numero} */}

                <TextField multiline
                    color="secondary"
                    rowsMax={3}
                    size="medium"
                    label="Comentarios"
                    variant="outlined"
                    className={classes.TextField}
                    value={comentario}
                    onChange={(event) => {
                        setComentario(event.target.value);
                    }}
                />
         
                <Grid container direction="row" justify="center" alignItems="center">
                    <Button className={classes.boton}
                        variant="outlined" color="secondary"
                        style={{marginRight:"1em",marginBottom:"1em"}}
                        onClick={() => {
                            // setCharge(true);
                            enviarmail();
                        }}>
                        {charge && captcha===true ? (
                            <CircularProgress

                                style={{ width: "50%", height: "50%" }}
                            />
                        ) : (
                                "Enviar"
                            )}
                    </Button>

                            <Recaptcha
                            sitekey="6Leu5RcaAAAAAGbtL_kaFErj6gUTVU7YZ-7EM1Ru"
                            render="explicit"
                            verifyCallback={verifyCallback}
                            onloadCallback={callback}
                            style={{} }
                        />
                        {mensajeCaptcha}

                        <Grid container direction="row" justify="center" alignItems="center">
                    {messageStatus !== 0 && <FormHelperText id="error" error={messageStatus === 2}>{message}</FormHelperText>}
                </Grid>
                </Grid>



            </Grid>


        </Grid>
        {/* {    */}
    </Container>

}

export default Formulario;
