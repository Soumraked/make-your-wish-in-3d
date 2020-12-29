import { Card, CardActionArea, CardContent, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import "./detalle.css"
import NumberFormat from 'react-number-format';

export default function Detalles({ name, desc, img, model, value, access }) {
  return (

    <Container maxWidth="lg" style={{ paddingTop: 20 }}>
      <Card>
        <CardActionArea >
          <Grid container direction="row" justify="center" alignItems="center">
            {img.length < 10 ? (
              <img src="https://firebasestorage.googleapis.com/v0/b/u-app-3100e.appspot.com/o/error%2Ferror.jpeg?alt=media" alt="Imagen del producto" style={{ height: 300 }} className={"imgProducto"} />
            )
              : (
                <img src={img} alt="Imagen del producto" className={"imgProducto"} style={{ height: 300, width: "auto" }} />
              )
            }
          </Grid>
        </CardActionArea>
        <CardContent>
          <Grid item md={12} className="row-top" >
            <Typography variant="h5" >
              Nombre del producto :   {name} ({`Visitas: ${access}`} )
                                <NumberFormat style={{ marginLeft: "0.5em", fontWeight: "bold" }} value={value} displayType={'text'} thousandSeparator={true} prefix={'CLP '} />
            </Typography>
          </Grid>
        </CardContent>
      </Card>

    </Container>
  )
}
