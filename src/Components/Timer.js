import React, { useEffect, useState } from "react";
import './timer.css'
import bell from '../assets/bell.mp3'
import { Modal } from "@material-ui/core";
import { Settings } from "./Settings";

export const Timer = () => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [secondsLimit, setSecondsLimit] = useState(0);
    const [minutesLimit, setMinutesLimit] = useState(20);
    const [hoursLimit, setHoursLimit] = useState(3);
    const [isCountdown, setIsCountdown] = useState(true);
    const [toogleButtonText, setToogleButtonText] = useState('Work');
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasSounded, setHasSounded] = useState(false);
    const [modal, setModal] = useState(false);

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

            if(secondsLimit > 0) {
              setSecondsLimit(secondsLimit - 1);
            } else {
              if(minutesLimit > 0) {
                setSecondsLimit(59);
                setMinutesLimit(minutesLimit - 1);
              } else {
                if (hoursLimit > 0) {
                  setMinutesLimit(59);
                  setSecondsLimit(59);
                  setHoursLimit(hoursLimit - 1);
                } else {
                  if(!hasSounded){
                    playSound();
                    setHasSounded(true);
                  }
                }
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
                  playSound();
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
      setHours(0);
      setMinutes(0);
      setSeconds(0);
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

    const playSound = () => {
      new Audio(bell).play();
    }

    const openCloseModal = () => {
      setModal(!modal);
    }

    return (
      <div className="timer">
        <div className="container">
          <div className="timer_container">
          <button onClick={openCloseModal}>Settings</button>
          <Modal open={modal} onClose={openCloseModal}>
            <Settings />
          </Modal>
            <h1>Timer</h1>
            <h1>
              {hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
            </h1>
            <h3>
              {hoursLimit < 10 ? '0' + hoursLimit : hoursLimit}:{minutesLimit < 10 ? '0' + minutesLimit : minutesLimit}:{secondsLimit < 10 ? '0' + secondsLimit : secondsLimit}
            </h3>
            <button className="restart" onClick={start}>{toogleButtonText}</button>
            <button className="stop" onClick={stop}>Stop</button>
          </div>
        </div>
      </div>
    )
}