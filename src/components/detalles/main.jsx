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
                                {img.length<10? ( 
                                    <div class="sketchfab-embed-wrapper">
    <iframe title="A 3D model" width="640" height="480" src="https://sketchfab.com/models/faef9fe5ace445e7b2989d1c1ece361c/embed?autostart=0&amp;ui_controls=1&amp;ui_infos=1&amp;ui_inspector=1&amp;ui_stop=1&amp;ui_watermark=1&amp;ui_watermark_link=1" frameborder="0" allow="autoplay; fullscreen; vr" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
</div>
                        )
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
                                <Typography variant="h5" >
                                Nombre del producto :   {name} ({ model} )
                                <hr></hr>
                                </Typography>
                                 
                                </Grid>
                                <Grid item xs={12} className="row-top"  >
                                <Typography variant="h6" >Descripción del producto:   </Typography>
                                    <br></br>
                                    <Typography variant="subtitle2" style={{"textAlign": "justify"}}>
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
