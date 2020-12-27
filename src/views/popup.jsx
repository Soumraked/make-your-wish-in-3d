import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Card, CardActionArea, CardMedia } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});





export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(true);


  const handleClose = () => {
    
    setOpen(false);
  };

  return (
    <div>
 
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
       
        <Card>
          <CardActionArea>
            <CardMedia CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200%"
          width="200%"
          image="https://firebasestorage.googleapis.com/v0/b/u-app-3100e.appspot.com/o/geek-megasale-enero-2020-n01.jpg?alt=media&token=b6041f3b-cc4e-4f63-af11-6561526ebbca"
          style={{objectFit:"scale-down"}}
           >
            </CardMedia>
          </CardActionArea>
        </Card>
        </DialogTitle>
      </Dialog>
    </div>
  );
}