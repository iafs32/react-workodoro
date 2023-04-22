import React, { useState } from "react";
import './settings.css';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 1rem 1rem -0.7rem rgb(0, 0, 0, 0.4)',
    padding: theme.spacing(2,4,3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  input: {
    margin: theme.spacing(0.7),
    padding: theme.spacing(1),
    border: '1px solid #ccc',
    borderRadius: '0.25rem'
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    color: '#fff',
    fontSize: 18,
    backgroundColor: 'skyblue',
    width: 100,
    height: 35,
    border: 'none',
    borderRadius: 15,
    cursor: 'pointer'
  }
}));

export const Settings = ({ sendData, secondsLimit, minutesLimit, hoursLimit, rest }) => {
  const [limitHours, setLimitHours] = useState(hoursLimit);
  const [limitMinutes, setLimitMinutes] = useState(minutesLimit);
  const [limitSeconds, setLimitSeconds] = useState(secondsLimit);
  const [restRelation, setRestRelation] = useState(rest);

  const styles = useStyles();

  const saveSettings = () => {
    sendData(limitHours, limitMinutes, limitSeconds, restRelation);
  }

  return (
    <div className={styles.modal}>
      <div align='center'>
        <h2>Settings</h2>
        <div>

          <label>Tiempo límite: </label>
          <input
            type="number"
            min="0"
            max="24"
            value={limitHours}
            onChange={(event) => setLimitHours(event.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            min="0"
            max="59"
            value={limitMinutes}
            onChange={(event) => setLimitMinutes(event.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            min="0"
            max="59"
            value={limitSeconds}
            onChange={(event) => setLimitSeconds(event.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <label>Relación de descanso: </label>
          <input
            type="number"
            min="0.01"
            max="0.99"
            step="0.01"
            value={restRelation}
            onChange={(event) => setRestRelation(event.target.value)}
            className={styles.input}
          />
        </div>
        <button onClick={saveSettings} className={styles.button}>Guardar</button>
      </div>
    </div>
  );
}