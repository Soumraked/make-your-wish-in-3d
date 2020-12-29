import React from "react"; 
import { makeStyles } from "@material-ui/core/styles";
import 'react-awesome-slider/dist/styles.css'; 
import axios from "axios"; 
import Carousel from 'react-elastic-carousel';
import { Card, CardContent, Typography } from "@material-ui/core";
import "./carr.css";


const url = "https://us-central1-u-app-3100e.cloudfunctions.net/api/dashboard/products/8"; 
 
const UseStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 300,
      minWidth: 200,
      textDecoration: "none",
      // [theme.breakpoints.down("sm")]: {
      //   display: "none",
      // },
    },
    media: {
      height: 0,
      paddingTop: "80%", // 16:9
    },
    content: {
      margin: 0,
      padding: 10,
    },
    number: {
      position: "absolute",
      right: "3%",
      bottom: "23%",
      color: "white",
      [theme.breakpoints.down("md")]: {
        bottom: "28%",
      },
      [theme.breakpoints.down("sm")]: {
        bottom: "32%",
      },
    },
    type: {
      position: "absolute",
      right: "3%",
      top: "3%",
      color: "white",
    },
  }));
 
export default function CarouselProducts() { 
  const classes = UseStyles();
  const [products, setProducts] = React.useState([]); 
  React.useEffect(() => { 
    const obtenerProductos = () => { 
      axios.get(url) 
      .then((data) => { 
        setProducts(data.data); 

      }) 
      .catch((error) => { 
        alert("Ha ocurrido un error."); 
        console.log(error); 
         
        } //Mostrar un alert o algo 
      ); 
    }; 
    obtenerProductos(); 
  }, []); 


  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 4 }
  ];

  const state = {
    items: [
      {id: 1, title: 'item #1'},
      {id: 2, title: 'item #2'},
      {id: 3, title: 'item #3'},
      {id: 4, title: 'item #4'},
      {id: 5, title: 'item #5'},
      {id: 6, title: 'item #5'},
      {id: 7, title: 'item #5'},
      {id: 8, title: 'item #5'}
    ]
  }


  return (<> 
  <div style={{ marginTop:"6em"  }}>
      <Carousel  showArrows={false} enableAutoPlay={true}  autoPlaySpeed={7000} breakPoints={breakPoints}>
        {state.items.map(item =>
        
         <Card className={classes.root}  key={item.id}
        // name={"item.name"}
        // id={item.id}
        // model={item.model}
        // value={item.value}
        // img={item.img}
         >
     <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
            dasdsa
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      
        </Card>
        
        
        )}
      </Carousel>
      </div>
    </>
  ); 
} 
 
 
