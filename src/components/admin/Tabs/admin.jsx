import React from "react";
import withWidth from "@material-ui/core/withWidth";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import CircularProgress from "@material-ui/core/CircularProgress";

import Information from "./admin/information";
import Image from "./admin/image";

import axios from "axios";

function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  //Old Code
  //write the ArrayBuffer to a blob, and you're done
  //var bb = new BlobBuilder();
  //bb.append(ab);
  //return bb.getBlob(mimeString);

  //New Code
  return new Blob([ab], { type: mimeString });


}

function Upload({ token }) {
  const [nameProduct, setNameProduct] = React.useState("");
  const [modelProduct, setModelProduct] = React.useState("");
  const [valueProduct, setValueProduct] = React.useState(0);
  const [descProduct, setDescProduct] = React.useState("");
  const [imageProduct, setImageProduct] = React.useState("https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/imageUpload%2Fchapter.png?alt=media");
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [charge, setCharge] = React.useState(false);

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

  const addProduct = async () => {
    setError(false);
    if (nameProduct === "" || modelProduct === "" || descProduct === "" || valueProduct === 0 || imageProduct === "https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/imageUpload%2Fchapter.png?alt=media") {
      setMessage("Ninguno de los campos puede estar vacio.");
      setError(true);
      setCharge(false);
    } else {
      var blob = dataURItoBlob(imageProduct);
      const formData = new FormData();
      const idImage = (nameProduct.trim().substr(0, 1) + modelProduct.split(' ').join('')).toUpperCase().replace(/[^a-z0-9]/gi, '');
      formData.append('image', blob, `${idImage}.jpg`);
      axios.post(`https://us-central1-u-app-3100e.cloudfunctions.net/api/image/upload/products/${idImage}`, formData).then((data) => {
        sendInfo(data.data.url);
      }).catch((error) => {
        console.log(error.request);
        setCharge(false);
      });
    }
  }

  const sendInfo = (url) => {
    const data = {
      name: nameProduct,
      model: modelProduct,
      desc: descProduct,
      value: valueProduct,
      img: url
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.post("https://us-central1-u-app-3100e.cloudfunctions.net/api/products/add", data)
      .then((res) => {
        console.log("Bien");
        setCharge(false);
        setSuccess(true);
        setMessage("Producto ingresado con exito.");
        cleanData();
        setTimeout(() => {
          setSuccess(false);
        }, 3000)
      })
      .catch((error) => {
        console.log("Mal");
        console.log(error.request);
        switch (error.request.status) {
          case 409:
            setError(true);
            setMessage("Este modelo de producto ya se encuentra en la base de datos.");
            break;
          default:
            setMessage("Error desconocido, verifique los datos antes de continuar.");
            break;
        }
        setCharge(false);
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
        {error && <FormHelperText id="error" error={true}>{message}</FormHelperText>}
        {success && <FormHelperText id="success">{message}</FormHelperText>}
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
          variant="outlined" color="secondary"
          onClick={() => {
            cleanData();
          }}
        >
          {charge ? (
            <CircularProgress
              color="secondary"
              style={{ width: "50%", height: "50%" }}
            />
          ) : (
              "Limpiar campos"
            )}
        </Button>
        <Button
          style={{
            margin: 20,
          }}
          variant="outlined" color="secondary"
          onClick={() => {
            setCharge(true);
            addProduct();
          }}
        >
          {charge ? (
            <CircularProgress
              color="secondary"
              style={{ width: "50%", height: "50%" }}
            />
          ) : (
              "Ingresar datos"
            )}
        </Button>
      </Grid>
    </>
  );
}

export default withWidth()(Upload);