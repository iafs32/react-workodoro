import React, { useEffect, useState } from "react";
import './timer.css'

export const Timer = () => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    var timer;

    useEffect(() => {
      timer = setInterval(() => {
        setSeconds(seconds + 1);

        if(seconds===59){
          setSeconds(0);
          setMinutes(minutes + 1);
          if(minutes === 59){
            setMinutes(0);
            setHours(hours + 1);
          }
        }
        
      }, 1000);
    
      return () => {
        clearInterval(timer);
      }
    });
    
    const restart = () => {
      setSeconds(0);
      setMinutes(0);
      setHours(0);
    }

    const stop = () => {
      clearInterval(timer);
    }

    return (
      <div className="timer">
        <div className="container">
          <div className="timer_container">
            <h1>Timer</h1>
            <h1>
              {hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
            </h1>
            <button className="restart" onClick={restart}>Restart</button>
            <button className="stop" onClick={stop}>Stop</button>
          </div>
        </div>
      </div>
    )
}