import React from "react";
import withWidth from "@material-ui/core/withWidth";

import Search from "./delete/search";
import Detalle from "./delete/detalle";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from "axios";


function Delete({ token }) {
  const [confirmation, setConfirmation] = React.useState(false);
  const [product, setProduct] = React.useState({});
  const [charge, setCharge] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleDelete = (value) => {
    setConfirmation(value);
  }
  const handleProduct = (value) => {
    setProduct(value);
  }
  const handleCharge = (value) => {
    setCharge(value);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setCharge(false);
    setOpen(false);
  };

  const deleteProduct = async () => {
    setOpen(false);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.post("https://us-central1-u-app-3100e.cloudfunctions.net/api/products/delete",
      {
        id: product.id
      }
    )
      .then((res) => {
        alert("Producto eliminado con exito.");
        handleDelete(false);
        setCharge(false);
      })
      .catch((error) => {
        alert("Ha ocurrido un error al intentar eliminar el producto.");
        handleDelete(false);
        setCharge(false);
      });

  }

  return (
    <>
      {confirmation ? (
        <>
          {product.name && product.desc && product.image && product.model && product.value &&
            <Detalle
              handleDelete={handleDelete}
              deleteProduct={handleClickOpen}
              name={product.name}
              desc={product.desc}
              img={product.image}
              model={product.model}
              value={product.value}
              handleCharge={handleCharge}
              charge={charge}
            />}

        </>
      ) :
        <Search

          confirmation={confirmation}
          handleDelete={handleDelete}
          handleProduct={handleProduct}
        />
      }
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Está a punto de eliminar el producto de id: ${product.id}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción no puede ser revertida.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancelar
          </Button>
          <Button onClick={deleteProduct} variant="outlined" color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withWidth()(Delete);