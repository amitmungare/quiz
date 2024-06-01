import React, { useEffect, useState } from 'react'

const QuestionTimer = ({timeout, onTimeOut, mode}) => {

    const [remainingTime, setRemainingTime]=useState(timeout);

    useEffect(()=>{
        const timer = setTimeout(onTimeOut, timeout);
        return ()=>{
            clearTimeout(timer)
        }
    }, [timeout, onTimeOut])
    
    useEffect(()=>{
        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime=>prevRemainingTime-10)
        }, 10);
        return ()=>{
            clearInterval(interval);
        }
    }, [])
   

  return (
    <progress id='question-time' value={remainingTime} max={timeout} className={mode}/>
  )
}

export default QuestionTimer