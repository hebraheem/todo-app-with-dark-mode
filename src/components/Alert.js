import React, { useEffect } from "react";
import '../Alert.css'
const Alert = ({ msg, status, setTime, tasks }) => {
  useEffect(() => {
    const time = setTimeout(() => {
      setTime({ show: false, msg: "", status: "" });
    }, 1500);
    return () => {
      clearTimeout(time);
    };
  }, [tasks, setTime]);
  return <h4 className={`alert ${status}`}>{msg}</h4>;
};

export default Alert;
