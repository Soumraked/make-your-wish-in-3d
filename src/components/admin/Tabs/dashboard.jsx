import React from 'react';
import axios from "axios";

export default function Dashboard() {

  React.useEffect(() => {
    const obtenerInfo = () => {
      axios.get("https://us-central1-u-app-3100e.cloudfunctions.net/api/information/get")
        .then((data) => {
          console.log(data.data);
        })
        .catch((error) => {
          console.log(error);
        } //Mostrar un alert o algo
        );
    };
    obtenerInfo();
  }, []);

  return (
    <div>
      Dashboard
    </div>
  )
}
