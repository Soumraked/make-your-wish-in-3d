import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Divider from "@material-ui/core/Divider";

import TextField from "@material-ui/core/TextField";

function Information({
  name,
  model,
  value,
  desc,
  addValue,
  addDesc,
}) {
  const handleValue = (event) => {
    addValue(event.target.value);
  };
  const handleDesc = (event) => {
    addDesc(event.target.value);
  };

  return (
    <>
      <Card>
        <CardContent>
          <TextField
            disabled
            value={name}
            label="Nombre"
            variant="outlined"
            color="secondary"
            style={{ width: "100%" }}
            helperText={"Nombre del producto."}
          />
          <Divider style={{ margin: 10 }} variant="middle" />
          <TextField
            disabled
            value={model}
            label="Modelo"
            variant="outlined"
            color="secondary"
            style={{ width: "100%" }}
            helperText={"Modelo del producto."}
          />
          <Divider style={{ margin: 10 }} variant="middle" />
          <TextField
            value={value}
            onChange={handleValue}
            label="Valor"
            variant="outlined"
            color="secondary"
            type="number"
            style={{ width: "100%" }}
            helperText={"Valor del producto."}
          />
          <Divider style={{ margin: 10 }} variant="middle" />
          <TextField
            value={desc}
            onChange={handleDesc}
            label="Descripción"
            color="secondary"
            multiline
            style={{ width: "100%" }}
            rows={7}
            variant="outlined"
            helperText={"Descripción del producto."}
          />
          <Divider style={{ marginTop: 20 }} variant="middle" />
        </CardContent>
      </Card>
    </>
  );
}

export default Information;
