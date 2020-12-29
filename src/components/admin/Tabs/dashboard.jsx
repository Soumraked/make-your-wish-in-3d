import React from 'react';

import axios from "axios";
import PieChart from "./dashboard/pieChart";
import { Container, Grid } from '@material-ui/core'
import LinearProgress from "@material-ui/core/LinearProgress";

export default function Dashboard() {

  const [products, setProducts] = React.useState([]);
  const [access, setAccess] = React.useState(0);

  React.useEffect(() => {
    const obtenerInfo = () => {
      axios.get("https://us-central1-u-app-3100e.cloudfunctions.net/api/dashboard/statistics")
        .then((data) => {
          let list = [];
          for (let i in Object.keys(data.data)) {
            let aux = data.data[Object.keys(data.data)[i]];
            aux.name = `${aux.name} ${aux.model}`
            list.push(aux);
          }
          setProducts(list);
        })
        .catch((error) => {
          console.log(error);
        } //Mostrar un alert o algo
        );
    };
    obtenerInfo();
  }, []);

  React.useEffect(() => {
    const obtenerInfo = () => {
      axios.get("https://us-central1-u-app-3100e.cloudfunctions.net/api/dashboard/access")
        .then((data) => {
          setAccess(data.data.access);
        })
        .catch((error) => {
          console.log(error);
        }
        );
    };
    obtenerInfo();
  }, []);

  return (
    <>
      <Container style={{ paddingTop: 20 }}>
        <Grid container direction="row" justify="center" alignItems="center">
          {
            products && products.length > 0 && access !== 0 ? <PieChart access={access} data={products} /> : <Grid container direction="row" justify="center" alignItems="center">
              <h1>Cargando información...</h1>
              <div
                style={{
                  width: "100%",
                  "& > * + *": {
                    marginTop: "10%",
                  },
                }}
              >
                <LinearProgress color="secondary" />
              </div>
            </Grid>
          }
        </Grid>
      </Container>
    </>
  );
}
