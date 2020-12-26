import { Button, Card, CardActionArea, Container, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import "./detalle.css"
import { CommentEmbed } from 'disqus-react';
import { DiscussionEmbed } from 'disqus-react';



export default function Detalles({name,desc,img,model}) {

const id = name;
const num =desc;
const [disqus, setDisqus] = useState(false);
const [disqusBtn, setDisqusBtn] = useState("block");

React.useEffect(() => {
    const obtenerInfo = () => {
      setDisqus(false);
      setDisqusBtn("block");
    };
    obtenerInfo();
  }, [id, num, setDisqusBtn, setDisqus]);


const disqusFunction = () => {
    var d = document,
      s = d.createElement("script");
    s.src = 'https://makeyourwish3d.disqus.com/embed.js';
    s.setAttribute("data-timestamp", +new Date());
    (d.head || d.body).appendChild(s);
  };

  const seeComments = () => {
    setDisqus(true);
    setDisqusBtn("none");
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
