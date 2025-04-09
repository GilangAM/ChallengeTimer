import { useRef, useState, useEffect } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef(null);
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (timeRemaining <= 0 && isRunning) {
      clearInterval(timer.current);
      setIsRunning(false);
      dialog.current.open(); 
    }
  }, [timeRemaining, isRunning]);

  function handleStart() {
    if (!isRunning) {
      setTimeRemaining(targetTime * 1000);
      setIsRunning(true);

      clearInterval(timer.current);
      timer.current = setInterval(() => {
        setTimeRemaining((prev) => Math.max(prev - 10, 0));
      }, 10);
    }
  }

  function handleStop() {
    clearInterval(timer.current);
    setIsRunning(false);

    dialog.current.open();
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={isRunning ? handleStop : handleStart}>
            {isRunning ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={isRunning ? "active" : undefined}>
          {isRunning ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
