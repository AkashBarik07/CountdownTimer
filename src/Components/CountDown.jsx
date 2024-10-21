import { useEffect, useRef, useState } from "react";

export default function CountDown() {
  const [time, setTime] = useState({
    hour: "",
    minute: "",
    second: "",
  });

  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const handleChange = (e, field) => {
    const value = parseInt(e.target.value, 10) || 0;

    const copyTime = { ...time };
    copyTime[field] = value;
    copyTime.minute += Math.floor(copyTime.second / 60);
    copyTime.second = copyTime.second % 60;
    copyTime.hour += Math.floor(copyTime.minute / 60);
    copyTime.minute = copyTime.minute % 60;

    setTime(copyTime);
    console.log(e.target.value, field);
  };

  const handleStart = () => {
    if (
      time.hour.length === 0 &&
      time.minute.length === 0 &&
      time.second.length === 0
    ) {
      console.log("returned");
      return;
    }
    setIsRunning(!isRunning);
  };
  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime({
      hour: "",
      minute: "",
      second: "",
    });
    console.log("Reset btn clicked");
  };

  useEffect(() => {
    if (isRunning) {
      if (
        time.hour.length === 0 &&
        time.minute.length === 0 &&
        time.second.length === 0
      ) {
        console.log("returned");
        return;
      }
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          let copyPreviousTime = { ...prevTime };
          copyPreviousTime.second--;
          if (copyPreviousTime.second < 0) {
            copyPreviousTime.minute--;
            copyPreviousTime.second = 59;

            if (copyPreviousTime.minute < 0) {
              copyPreviousTime.hour--;
              copyPreviousTime.minute = 59;

              if (copyPreviousTime.hour < 0) {
                clearInterval(intervalRef.current);
                return { hour: "", second: "", minute: "" };
              }
            }
          }
          return copyPreviousTime;
        });
      }, 1000);
    }

    return () => {
      console.log(intervalRef.current);
      clearInterval();
    };
  }, [isRunning]);

  return (
    <div className="container">
      <div className="input-container">
        <input
          disabled={isRunning}
          value={time.hour}
          onChange={(e) => handleChange(e, "hour")}
          type="text"
          placeholder="HH"
        />
        :
        <input
          disabled={isRunning}
          value={time.minute}
          onChange={(e) => handleChange(e, "minute")}
          type="text"
          placeholder="MM"
        />
        :
        <input
          disabled={isRunning}
          value={time.second}
          onChange={(e) => handleChange(e, "second")}
          type="text"
          placeholder="SS"
        />
      </div>
      <div className="button-container">
        <button onClick={handleStart}>{!isRunning ? "Start" : "Pause"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
