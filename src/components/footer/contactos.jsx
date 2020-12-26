import React from 'react';

import { Container, FormControl, FormHelperText, makeStyles, Button, Grid, TextField, Typography } from '@material-ui/core';
import axios from "axios" ;

import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";


const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(3),
    },
    typography: {
        padding: theme.spacing(2),
    },
    TextField: {
        width: "30vw",

    },
    boton: {
        height: 30,
        color: "grey",
        outline: "grey",

    },

    separacion: {
        width: "50%",

    },
    datosempresa: {
        display: "flex",
        alignItems: "flex-start",


    },
}));



function Formulario(props) {
    const classes = useStyles();

    const [email, setEmail] = React.useState("");
    const [asunto, setAsunto] = React.useState("");
    const [comentario, setComentario] = React.useState("");

    const enviarmail=()=>{
        var data = {
            service_id: 'service_ht4t8q7',
            template_id: 'template_ojtj6cb',
            user_id: 'user_bGr1D7ZHFaYb8uucOFAa2',
            template_params: {
                'email': email,
                'asunto': asunto,
                'comentario':comentario,
                'reply-to':email,
            }
        };
        axios.post('https://api.emailjs.com/api/v1.0/email/send',data,{Headers:{"content-Type":"application/json"}}).then(res=>{
            console.log(res);
        }).catch(error=>{console.log(error)});
            
    }

    
    return <Container maxWidth="md" className="classes.datosempresa" >

        <Grid container direction="row" className="classes.datosempresa"  >
            {/* {Datos de empresa} */}
            <Grid item xs={12} sm={6} className={"classes.datosempresa"} >
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

                        <a href="https://facebook.com"><SiFacebook size={'2em'} /> </a>

                        <Typography style={{ textAlign: "center" }}
                            variant={props.width === "xs" ? "caption" : "subtitle1"}
                            component="div"> Facebook</Typography>
                    </Grid>
                    <Grid item xs={3} sm={4} style={{ textAlign: 'center', }}>
                        <a href="https://www.instagram.com" > <SiInstagram size={'2em'} /></a>

                        <Typography style={{ textAlign: "center" }}
                            variant={props.width === "xs" ? "caption" : "subtitle1"}
                            component="div"> Instagram</Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} style={{ textAlign: 'center', }}>
                        <a href="https://www.google.com" > <SiWhatsapp size={'2em'} /></a>


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
                    Dirección:   0333# Avenida Springfield
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
            <Grid item xs={12} sm={6}   >
                {/* {Nombre} */}
                <FormControl className={classes.separacion} >
                    <TextField
                        id="email-helper"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        label="Email"
                    />
                    <FormHelperText id="email-helper">Nunca compartiremos tu email.</FormHelperText>
                </FormControl>


                {/* {Email} */}

                <FormControl className={classes.separacion} style={{ padding: "0 0px 0px 10px", }}>
                    <TextField
                        id="asunto"
                        value={asunto}
                        onChange={(event) => {
                            setAsunto(event.target.value);
                        }}
                        label="Asunto"
                    />
                    <FormHelperText id="asunto">Nunca compartiremos tus datos.</FormHelperText>
                </FormControl>
                {/* {Numero} */}

                <FormControl>
                    <br></br>
                    <TextField multiline
                        rowsMax={3}
                        size="medium"
                        label="Comentarios"
                        variant="outlined"
                        className={classes.TextField}
                        value={comentario}
                        onChange={(event) => {
                            setComentario(event.target.value);
                        }} />
                    <Button variant="outlined" color="primary" className={classes.boton} onClick={enviarmail} >
                        Enviar
               </Button>
                </FormControl>


            </Grid>


        </Grid>
        {/* {    */}
    </Container>

}

export default Formulario;