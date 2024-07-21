import { useEffect, useRef, useState } from 'react';
import styles from '../styles/stopclock.module.scss';

const StopClock = () => {

  const [clock, setClock] = useState(0);
  const [clockMaintain, setClockMaintain] = useState({
    start: false,
    pause: true,
    stop: true,
  });

  let timer = useRef() as any;

  useEffect(() => {
    return () => clearInterval(timer.current);
  }, []);

  const handleTime = () => {
    timer.current = setInterval(() => {
      setClock(prev => prev + 1);
    }, 1000);
    setClockMaintain({
      ...clockMaintain,
      start: true,
      pause: false,
      stop: false
    })
  }

  const handlePause = ()=>{
    clearInterval(timer.current);
    setClockMaintain({
      ...clockMaintain,
      start: false,
      pause: true,
      stop: false
    })
  }

  const handleStop = ()=>{
    clearInterval(timer.current);
    setClock(0);
    setClockMaintain({
      ...clockMaintain,
      start: false,
      pause: true,
      stop: true
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.container_wrapper}>
        <h1>{clock}</h1>
        <div className={styles.btn_container}>
          <button className={!clockMaintain.start ? styles.start : styles.disable} disabled={clockMaintain.start} onClick={handleTime}>Start</button>
          <button className={!clockMaintain.pause ? styles.pause : styles.disable} disabled={clockMaintain.pause} onClick={handlePause}>Pause</button>
          <button className={!clockMaintain.stop ? styles.stop : styles.disable} disabled={clockMaintain.stop} onClick={handleStop}>Stop</button>
        </div>
      </div>
    </div>
  )
}

export default StopClock