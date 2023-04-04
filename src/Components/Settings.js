import React from "react";
import { Modal, TextField, Button  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2,4,3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}));

export const Settings = () => {
  const styles = useStyles();

  return (
    <div className={styles.modal}>
      <div align='center'>
        <h2>Settings</h2>
      </div>

    </div>
  );
}