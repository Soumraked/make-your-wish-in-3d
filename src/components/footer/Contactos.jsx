import React from 'react';

import {Container, FormControl, FormHelperText,InputLabel,Input, makeStyles, Button,Grid, TextField, Typography} from '@material-ui/core';



import { SiFacebook,SiInstagram,SiWhatsapp} from "react-icons/si";


const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(3),
    },
    typography: {
      padding: theme.spacing(2),
    },
    TextField:{
        width: "30vw",
     
    },
    boton:{
       height:30,
       color:"grey",
       outline:"grey",  
       
    },

    separacion:{
        width:"50%",
     
    },
    datosempresa:{
        display:"flex",
        alignItems:"flex-start",


    },
  }));

/* Enviar datos del formulario */
function handleClickForm(e) {
    e.preventDefault();
    console.log('The link was clicked.');
}

function Formulario(props) {
    const classes = useStyles();

    return <Container maxWidth="md" className="classes.datosempresa" >
    <Grid container direction="row" className="classes.datosempresa"  >

    {/* {Datos de empresa} */}
    <Grid item xs={12} sm={6} className={"classes.datosempresa"} >
         <Grid container spacing={2}>
             <Grid item xs={12} style={{ textAlign: 'center',}}>
                <Typography
                style={{ textAlign: "center" }}
                variant={props.width === "xs" ? "caption" : "subtitle1"}
                component="div"
                >
               ¡Siguenos en nuestras redes sociales!
            </Typography>

             </Grid>
             <Grid item md={3} sm={3} style={{ textAlign: 'center',}} >
             
                <a  href="https://facebook.com"><SiFacebook size={'2em'} /> </a>

                <h3>Facebook</h3>
             </Grid>
            <Grid item xs={3} sm={4} style={{ textAlign: 'center',}}>
                <a href="https://www.instagram.com" > <SiInstagram  size={'2em'} /></a>
               
                <h3>Instagram</h3>
            </Grid>
            <Grid item xs={3} sm={3} style={{ textAlign: 'center',}}>
                <a href="https://www.google.com" > <SiWhatsapp size={'2em'} /></a>
               
                <h3>Whatsapp</h3>
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
        <Grid item  xs={12} sm={6}   >
    {/* {Nombre} */}
            <FormControl className={classes.separacion} >
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" type="email" aria-describedby="email-helper" />
                <FormHelperText id="email-helper">Nunca compartiremos tu email.</FormHelperText>
            </FormControl>
            
  
   {/* {Email} */}

            <FormControl className={classes.separacion}  style={{ padding:"0 0px 0px 10px", }}> 
                <InputLabel LabelhtmlFor="Asunto">Asunto</InputLabel>
                <Input id="Asunto" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">Nunca compartiremos tus datos.</FormHelperText>
            </FormControl>
    {/* {Numero} */}

            <FormControl>
                <TextField multiline htmlFor="texto"  rowsMax={3} size="medium"  label="Comentarios" variant="outlined"  className={classes.TextField}>Comentarios</TextField>
                <Button variant="outlined" color="primary" className={classes.boton} onClick={handleClickForm} >
                Enviar
               </Button>
            </FormControl>

           
        </Grid>
 
      
    </Grid>
 {/* {    */}
    </Container>
    
}

export default Formulario;
