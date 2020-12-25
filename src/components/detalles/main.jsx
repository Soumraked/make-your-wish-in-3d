import { Card, CardActionArea, Container, Grid } from '@material-ui/core'
import React from 'react'
import "./detalle.css"

export default function detalles({name,desc,img,model}) {
    return (
        <div >
        <Container maxWidth="ld" style={{marginTop:"1em"}}  >
            <Grid container direction="row" >
                <Grid container spacing={3} justify="space-between">
                    <Grid item xs={6}>
                        <Card>
                            <CardActionArea>
                                <img src={img} alt="Imagen del producto" className={"imgProducto"} />
                            </CardActionArea>
                        </Card>        
                    </Grid>
                    
                    <Grid item xs={6}  >
                        <Card>
                            <Grid container spacing={3} className="row-top" style={{justifyItems:"center",alignContent:"center"}}> 
                                <Grid item xs={12} justify="space-around" className="row-top" >
                                <h3 >Nombre del producto :   {name} ({ model} )</h3><hr style={{pt:0}}></hr>
                                 
                                </Grid>
                                <Grid item xs={12} className="row-top"  >
                                <h4  >Descripción del producto:   </h4>
                                    <br></br>
                                    <p>
                                    {desc}                            
                                    </p>
                                    <br></br>
                                </Grid>
                           
                            </Grid>
                        </Card>
                   </Grid>
                  
                   <Grid item xs={12} style={{background:"blue"}} >
                        Discuss
                    </Grid>
                       
               
                </Grid>
            
            </Grid>
        </Container>
        </div>
    )
}
