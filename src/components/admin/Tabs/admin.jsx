import React from "react";
import withWidth from "@material-ui/core/withWidth";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Information from "./admin/information";
import Image from "./admin/image";

import axios from "axios";

function Upload() {
  const [nameProduct, setNameProduct] = React.useState("");
  const [modelProduct, setModelProduct] = React.useState("");
  const [valueProduct, setValueProduct] = React.useState(0);
  const [descProduct, setDescProduct] = React.useState("");
  const [imageProduct, setImageProduct] = React.useState("https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/imageUpload%2Fchapter.png?alt=media");

  const addNameProduct = (value) => {
    setNameProduct(value);
  };
  const addModelProduct = (value) => {
    setModelProduct(value);
  };
  const addValueProduct = (value) => {
    setValueProduct(value);
  };
  const addDescProduct = (value) => {
    setDescProduct(value);
  };
  const addImageProduct = (value) => {
    setImageProduct(value);
  };

  const cleanData = () => {
    setNameProduct("");
    setModelProduct("");
    setValueProduct(0);
    setDescProduct("");
    setImageProduct("https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/imageUpload%2Fchapter.png?alt=media");
  };

  const addProduct = () => {
    const data = {
      name:nameProduct,
      model:modelProduct,
      desc:descProduct,
      value:valueProduct,
      img:"image"
    }
    const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNjYmM4ZjIyMDJmNjZkMWIxZTEwMTY1OTFhZTIxNTZiZTM5NWM2ZDciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdS1hcHAtMzEwMGUiLCJhdWQiOiJ1LWFwcC0zMTAwZSIsImF1dGhfdGltZSI6MTYwODg2MTU1OCwidXNlcl9pZCI6IkVsTWxhUWNtRE9lNXJORzl0N2Fjc2xBMDlZdzEiLCJzdWIiOiJFbE1sYVFjbURPZTVyTkc5dDdhY3NsQTA5WXcxIiwiaWF0IjoxNjA4ODYxNTU4LCJleHAiOjE2MDg4NjUxNTgsImVtYWlsIjoiMTk2OTU5MjFAbWFrZS5jbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyIxOTY5NTkyMUBtYWtlLmNsIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.jGdR2vPOBolCi2FMAsUmAFSE3TlD93PhI3n0XIwjE_m8gVwqkN06Vrphio8xtud8OyHxEXLDsU4ryaVNfpB1L3G_HAAkmd1BYvAko4OdL9XVrl22upGBjQVQKKP2YY7KW358NHAfBM7nfSrSoYLj1vgBnuLPILGBDOLhN_fo9CI5XzXx2BnPY1Ik1wQvzzwRvuJm9DN4CofAhhnVxqmaiNn19_A3f-shIeJ1R2AUL_WAdcmYp8nkmyzMm6cjgbCRKT7Ky8uDyEpGnjAV3ljS5FH3XicITphpRNk7MCJBkDzOw9ikhH9qRa-cubAsr5iGN5jYIU_2dCkmKZ8Sy7o-iA";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.post("https://us-central1-u-app-3100e.cloudfunctions.net/api/products/add", data)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      <Grid container spacing={3} style={{ paddingTop: 20 }}>
        <Grid item xs={12} >
          <Information
            name={nameProduct}
            model={modelProduct}
            value={valueProduct}
            desc={descProduct}
            addName={addNameProduct}
            addModel={addModelProduct}
            addValue={addValueProduct}
            addDesc={addDescProduct}
          />
          <Image image={imageProduct} addImage={addImageProduct} />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginTop: 20 }}
      >
        <Button
          style={{
            margin: 20,
          }}
          variant="outlined"
          onClick={() => {
            cleanData();
          }}
        >
          Limpiar campos
        </Button>
        <Button
          style={{
            margin: 20,
          }}
          variant="outlined"
          onClick={() => {
            addProduct();
            //console.log("Añadir datos");
          }}
        >
          Ingresar datos
        </Button>
      </Grid>
    </>
  );
}

export default withWidth()(Upload);