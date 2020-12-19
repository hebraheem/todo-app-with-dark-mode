import React, { useState, useEffect } from "react";
import "../Task.css";
import { useThemeContext } from "../context";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
//import { TiInputChecked } from "react-icons/ti";

const Task = ({ tasks, removeItem, editItem, setAlert }) => {
  const [checked, setChecked] = useState(false);
  const { isDark, styles } = useThemeContext();

  useEffect((id) => {
    const alert = tasks.map((task) => {
      if (task.id === id) {
        let countDownDate = task.value.toLocaleString();
        let today = new Date();
        let currentTime = today.getHours() + ":" + today.getMinutes();
        console.log(countDownDate);
        console.log(currentTime);
        if (currentTime === countDownDate) {
          console.log("you made it");
        }
      }
    });
  }, []);
  // const setAlertNot = (id) => {
  //   const alert = tasks.map((task) => {
  //     if (task.id === id) {
  //       let countDownDate = task.value.toLocaleString();
  //       let today = new Date();
  //       let currentTime =
  //         today.getHours() +
  //         ":" +
  //         (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
  //       console.log(countDownDate);
  //       console.log(currentTime);

  //       if (currentTime === countDownDate) {
  //         console.log("you made it");
  //         clearInterval(setAlertNot);
  //       }
  //     }
  //   });
  // };
const setAlertNot =(id)=>{
  const interval = setInterval(() => {
      const alert = tasks.map((task) => {
        if (task.id === id) {
          let countDownDate = task.value.toLocaleString();
          let today = new Date();
          let currentTime =
            today.getHours() +
            ":" +
            (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
          console.log(countDownDate);
          console.log(currentTime);
          if (currentTime === countDownDate) {
            console.log("you made it");
            clearInterval(interval);
          }
        }
      });
  }, 1000);
}

  return (
    <div className="tasks">
      <h3 style={{ color: isDark ? styles.textColor : "black" }}>My Task</h3>
      {tasks.map((task) => {
        const { id, title, time, value } = task;
        return (
          <>
            <div
              className="task"
              key={id}
              style={{
                backgroundColor: isDark ? styles.backgroundColor : "#C9AFA0",
              }}
            >
              <div className="alert">
                <p
                  style={{ color: isDark ? styles.textColor : "black" }}
                  onClick={() => setAlertNot(id)}
                >
                  set <br /> alert
                </p>
              </div>
              <div className="task_text">
                <h4
                  style={{
                    color: isDark ? styles.textColor : "black",
                    textDecorationLine: checked && "line-through",
                  }}
                >
                  {title}
                </h4>
                <p style={{ color: isDark ? styles.textColor : "grey" }}>
                  Due time: {value}
                </p>
              </div>
              <div className="task_action">
                <button className="del_btn" onClick={() => removeItem(id)}>
                  <AiOutlineDelete />
                </button>
                <button className="edit_btn" onClick={() => editItem(id)}>
                  <FiEdit />
                </button>
              </div>
            </div>
            <div className="space"></div>
          </>
        );
      })}
    </div>
  );
};

export default Task;
