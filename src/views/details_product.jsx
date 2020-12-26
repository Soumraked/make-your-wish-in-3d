import { Container } from "@material-ui/core";
import React from "react";
import axios from "axios";
import Detalle from "../components/detalles/main"
// Recibir el id del producto , mostrar la descripcion


function Details(props) {
  var id = props.match.params.id;
  const url = `https://us-central1-u-app-3100e.cloudfunctions.net/api/products/getDetails/${id}`;
  
  const [products, setProducts] = React.useState({});
  
  React.useEffect(() => {
    const obtenerProductos = () => {
      axios.get(url)
      .then((data) => {
         console.log(data.data);
        setProducts(data.data);
      })
      .catch((error) => {
        // alert("Ha ocurrido un error.");
         console.log(error);
        } //Mostrar un alert o algo
      );
    };
    obtenerProductos();
  }, [url]);
  
  return <Container>
      {products.img && <Detalle name={products.name} desc={products.desc} img={products.img} model={products.model}  />}
      
  </Container>
    
}

export default Details;
