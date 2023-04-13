import React, { useState } from "react";
import './settings.css';
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
          />
          <input
            type="number"
            min="0"
            max="59"
            value={limitMinutes}
            onChange={(event) => setLimitMinutes(event.target.value)}
          />
          <input
            type="number"
            min="0"
            max="59"
            value={limitSeconds}
            onChange={(event) => setLimitSeconds(event.target.value)}
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
          />
        </div>
        <button onClick={saveSettings}>Guardar</button>
      </div>
    </div>
  );
}