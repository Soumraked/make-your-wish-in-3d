import {Card, CardActionArea, CardContent, Container,  Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import "./detalle.css"


export default function Detalles({name,desc,img,model}) {

const id = name;
const num =desc;
const [disqus, setDisqus] = useState(false);

React.useEffect(() => {
    const obtenerInfo = () => {
      setDisqus(false);
    };
    obtenerInfo();
  }, [id, num, setDisqus]);


const disqusFunction = () => {
    var d = document,
      s = d.createElement("script");
    s.src = 'https://makeyourwish3d.disqus.com/embed.js';
    s.setAttribute("data-timestamp", +new Date());
    (d.head || d.body).appendChild(s);
  };

  const seeComments = () => {
    setDisqus(true);
    disqusFunction();
  };



    return (
        <div >


        <Container maxWidth="ld" style={{marginTop:"1em"}}  >
    

            <Grid container direction="row" >
                <Grid container spacing={3} justify="space-between">
                    <Grid item xs={6}>
                        <Card>
                            <CardActionArea>
                                {img.length<10? ( <img src={"https://firebasestorage.googleapis.com/v0/b/u-app-3100e.appspot.com/o/error%2Ferror.jpeg?alt=media"} alt="Imagen del producto" className={"imgProducto"} />)
                                :(
                                    <img src={img} alt="Imagen del producto" className={"imgProducto"} />
                                      )
                                }
                               
                            </CardActionArea>
                        </Card>        
                    </Grid>
                    
                    <Grid item xs={6}  >
                        <Card>
                            <CardContent> 
                                <Grid item xs={12} justify="space-around" className="row-top" >
                                <Typography variant="h6" >
                                Nombre del producto :   {name} ({ model} )
                                <hr></hr>
                                </Typography>
                                 
                                </Grid>
                                <Grid item xs={12} className="row-top"  >
                                <Typography variant="h5" >Descripción del producto:   </Typography>
                                    <br></br>
                                    <Typography variant="subtitle2">
                                    {desc}                            
                                    </Typography>
                                    <br></br>
                                </Grid>
                           
                            </CardContent>
                        </Card>
                   </Grid>
                  
                   <Grid item xs={12}  >
                   {disqus ? (
                    <div id="disqus_thread"></div>
                ) : (seeComments()
                        )}
                    </Grid>
                    
                 
               
                </Grid>
            
            </Grid>
        </Container>
        </div>
    )
}
