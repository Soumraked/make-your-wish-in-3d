import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import Pagination from "@material-ui/lab/Pagination";
import "./paginacion.css"
import Card from "./products";
import Skeleton from "./skeleton";

const url = "https://us-central1-u-app-3100e.cloudfunctions.net/api/products/get";



function Products(props) {
  var skeleton = [];
  for (var i = 0; i < 24; i++) {
    skeleton.push(i);
  }


  
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

  const max = 16;

  const [productsSection, setProductsSection] = React.useState([]);

  const section = (init) => {
    setProductsSection(products.slice(init, max + init));
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    section((value - 1) * max);
  };

  React.useEffect(() => {
    const firstPagination = () => {
      setProductsSection(products.slice(0, max));
    };
    firstPagination();
  }, [setProductsSection, products]);

  return (
    <div style={{ paddingTop: 20 }}>
         <Fragment>
        {productsSection.length > 0 ? (
          <Grid container spacing={3}>
            {productsSection.map((item) => (
              <Grid
                item
                xs={["xs", "sm"].indexOf(props.width) !== -1 ? 6 : 3}
                key={item.id}
              >
              
            {item.img.length <10? (
                    <Card
                      name={item.name}
                      id={item.id}
                      model={item.model}
                      value={item.value}
                      img={"https://firebasestorage.googleapis.com/v0/b/u-app-3100e.appspot.com/o/error%2Ferror.jpeg?alt=media"}
                    />

                  )
                  :(
                    <Card
                      name={item.name}
                      id={item.id}
                      model={item.model}
                      value={item.value}
                      img={item.img}

                    />       
                      )
                  }
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {skeleton.map((item) => (
              <Grid
                item
                xs={["xs", "sm"].indexOf(props.width) !== -1 ? 6 : 3}
                key={item}
              >
                <Skeleton />
              </Grid>
            ))}
          </Grid>
        )}

        <div className="paginacion" >
          <Pagination

            style={{ display: "inline-block" , align: "0" }}
            count={Math.ceil(products.length / max)}
            variant="outlined"
            color="secondary"
            page={page}
            onChange={handleChange}
            siblingCount={
              props.width === "xs"
                ? 0
                : props.width === "sm"
                ? 3
                : props.width === "md"
                ? 6
                : 12
            }
          />
        </div>
      </Fragment>
    </div>
  );
}

export default withWidth()(Products);