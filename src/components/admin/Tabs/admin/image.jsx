import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  media: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    height: "auto",
    maxWidth: 300,

  },
  mediaText: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  textImagen: {
    display: "block",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  textImagen2: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
}));

export default function UploadImage({ image, addImage }) {
  const classes = useStyles();

  const handleChange = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      addImage(reader.result);
    };
  };

  return (
    <div style={{paddingTop: 20}}>
      <Card >
        <CardContent>
          <Grid container>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <CardMedia
                className={classes.media}
                id="imageProduct"
                component="img"
                src={image}
                title={"image"}
              />
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <input
                accept="image/*"
                className={classes.input}
                id="image-file"
                type="file"
                onChange={(event) => {
                  handleChange(event);
                }}
              />
              <label htmlFor="image-file" className={classes.textImagen}>
                  Click aquí!
                <IconButton aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
              <label htmlFor="image-file" className={classes.textImagen2}>
                <IconButton aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
