import React from "react";
import withWidth from "@material-ui/core/withWidth";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import CircularProgress from "@material-ui/core/CircularProgress";

import Information from "./modify/information";
import Image from "./modify/image";
import Search from "./modify/search";

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

function Modify({ token }) {
  const [nameProduct, setNameProduct] = React.useState("");
  const [modelProduct, setModelProduct] = React.useState("");
  const [valueProduct, setValueProduct] = React.useState(0);
  const [descProduct, setDescProduct] = React.useState("");
  const [imageProduct, setImageProduct] = React.useState("https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/imageUpload%2Fchapter.png?alt=media");
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [charge, setCharge] = React.useState(false);
  const [modify, setModify] = React.useState(false);

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
  const handleModify = (value) => {
    setModify(value);
  };

  const modifyProduct = async () => {
    setError(false);
    if (nameProduct === "" || modelProduct === "" || descProduct === "" || valueProduct === 0 || imageProduct === "https://firebasestorage.googleapis.com/v0/b/monosotakos.appspot.com/o/imageUpload%2Fchapter.png?alt=media") {
      setMessage("Ninguno de los campos puede estar vacio.");
      setError(true);
      setCharge(false);
    } else {
      const id = (nameProduct.trim().substr(0, 1) + modelProduct.split(' ').join('')).toUpperCase().replace(/[^a-z0-9]/gi, '');
      if (imageProduct.substr(0, 68) === "https://firebasestorage.googleapis.com/v0/b/u-app-3100e.appspot.com/") {
        sendInfo(imageProduct, id);
      } else {
        var blob = dataURItoBlob(imageProduct);
        const formData = new FormData();
        formData.append('image', blob, `${id}.jpg`);
        axios.post(`https://us-central1-u-app-3100e.cloudfunctions.net/api/image/upload/products/${id}`, formData).then((data) => {
          sendInfo(data.data.url, id);
        }).catch((error) => {
          console.log(error.request);
          setCharge(false);
        });
      }
    }
  }

  const sendInfo = (url, id) => {
    const data = {
      id: id,
      desc: descProduct,
      value: valueProduct,
      img: url
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.put("https://us-central1-u-app-3100e.cloudfunctions.net/api/products/update", data)
      .then((res) => {
        setCharge(false);
        setSuccess(true);
        setMessage("Producto modificado con exito.");
        setTimeout(() => {
          setSuccess(false);
        }, 3000)
        handleModify(false);
      })
      .catch((error) => {
        console.log(error.request);
        switch (error.request.status) {
          case 404:
            setError(true);
            setMessage("El producto no se encuentra en la base de datos.");
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
      {modify ? (
        <>
          <Grid container spacing={3} style={{ paddingTop: 20 }}>
            <Grid item xs={12} >
              <Information
                name={nameProduct}
                model={modelProduct}
                value={valueProduct}
                desc={descProduct}
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
              variant="outlined" color="secondary"
              onClick={() => {
                setModify(false);
              }}
            >
              {charge ? (
                <CircularProgress
                  color="secondary"
                  style={{ width: "50%", height: "50%" }}
                />
              ) : (
                  "Cancelar"
                )}

            </Button>
            <Button
              style={{
                margin: 20,
              }}
              variant="outlined" color="secondary"
              onClick={() => {
                setCharge(true);
                modifyProduct();
              }}
            >
              {charge ? (
                <CircularProgress
                  color="secondary"
                  style={{ width: "50%", height: "50%" }}
                />
              ) : (
                  "Modificar datos"
                )}
            </Button>
          </Grid>
        </>
      ) :
        <Search
          handleModify={handleModify}
          addName={addNameProduct}
          addModel={addModelProduct}
          addValue={addValueProduct}
          addDesc={addDescProduct}
          addImage={addImageProduct}
        />
      }
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
    </>
  );
}

export default withWidth()(Modify);