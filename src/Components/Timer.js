import React, { startTransition, useEffect, useState } from "react";
import './timer.css'

export const Timer = () => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(1);
    const [hours, setHours] = useState(0);
    const [isCountdown, setIsCountdown] = useState(true);
    const [toogleButtonText, setToogleButtonText] = useState('Work');
    const [isPlaying, setIsPlaying] = useState(false);

    var timer;

    useEffect(() => {
      if(isPlaying){

        timer = setInterval(() => {
          if (!isCountdown) {
            setSeconds(seconds + 1);
    
            if(seconds===59){
              setSeconds(0);
              setMinutes(minutes + 1);
              
              if(minutes === 59){
                setMinutes(0);
                setHours(hours + 1);
              }
            }
          }
  
          if (isCountdown) {
            if(seconds > 0) {
              setSeconds(seconds - 1);
            } else {
              if(minutes > 0) {
                setSeconds(59);
                setMinutes(minutes - 1);
              } else {
                if (hours > 0) {
                  setMinutes(59);
                  setSeconds(59);
                  setHours(hours - 1);
                } else {
                  start();
                }
              }
            }
          }
          
        }, 1000);
      }
    
      return () => {
        clearInterval(timer);
      }
    });
    

    const start = () => {
      setIsPlaying(true);
      setIsCountdown(!isCountdown);
      if(!isCountdown){
        const time = seconds + (minutes * 60) + (hours * 3600);
        const restTime = time * 0.32;
        setHours(Math.floor(restTime / 3600));
        setMinutes(Math.floor((restTime / 60) % 60));
        setSeconds(Math.floor(restTime % 60));
        setToogleButtonText('Work');
      } else {
        setToogleButtonText('Rest');
      }
    }

    const stop = () => {
      clearInterval(timer);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      setIsPlaying(false);
      setIsCountdown(true);
      setToogleButtonText('Work');
    }

    return (
      <div className="timer">
        <div className="container">
          <div className="timer_container">
            <h1>Timer</h1>
            <h1>
              {hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
            </h1>
            <button className="restart" onClick={start}>{toogleButtonText}</button>
            <button className="stop" onClick={stop}>Stop</button>
          </div>
        </div>
      </div>
    )
}