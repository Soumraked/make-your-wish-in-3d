import React from "react";
import 'react-awesome-slider/dist/styles.css';
import axios from "axios";
import Carousel from 'react-elastic-carousel';
import "./carr.css";
import CardProduct from "./carousel/product";


const url = "https://us-central1-u-app-3100e.cloudfunctions.net/api/dashboard/products/8";


export default function CarouselProducts() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    const obtenerProductos = () => {
      axios.get(url)
        .then((data) => {
          let keys = Object.keys(data.data);
          let list = [];
          for (let i = 0; i < keys.length; i++) {
            list.push(data.data[keys[i]])
          }
          setProducts(list);

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



  return (<>
    <div style={{ marginTop: "6em" }}>
      <Carousel showArrows={false} enableAutoPlay={true} autoPlaySpeed={7000} breakPoints={breakPoints}>
        {products.map((item) => (
          <CardProduct
            key={item.id}
            name={item.name}
            id={item.id}
            model={item.model}
            value={item.value}
            img={item.img.length > 10 ? item.img : "https://firebasestorage.googleapis.com/v0/b/u-app-3100e.appspot.com/o/error%2Ferror.jpeg?alt=media"}

          />
        ))
        }
      </Carousel>
    </div>
  </>
  );
}


