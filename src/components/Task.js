import React, { useState } from "react";
import "../Task.css";
import { useThemeContext } from "../context";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

const audioTune = new Audio(
'src/audio/8660_download_samsung_galaxy_s6_2_ringtone.mp3');

const Task = ({ tasks, removeItem, editItem }) => {
  const [checked, setChecked] = useState(false);
  const { isDark, styles } = useThemeContext();
  // const [playInLoop, setPlayInLoop] = useS

  const setAlertNot = (id) => {
    let interval = setInterval(() => {
      if (!interval) {
        alert("Alert already set");
        clearInterval(interval);
      } else {
        tasks.map((task) => {
          if (task.id === id) {
            let countDownDate = task.value.toLocaleString();
            let today = new Date();
            let currentTime =
              today.getHours() +
              ":" +
              (today.getMinutes() < 10 ? "0" : "") +
              today.getMinutes();
            console.log(countDownDate);
            console.log(currentTime);
            alert("Alert set");
            clearInterval(interval);
            if (currentTime === countDownDate) {
              console.log("you made it");
              audioTune.load();
              audioTune.play();
              clearInterval(interval);
              interval = false;
            } else if (currentTime > countDownDate) {
              //alert("Task Expired");
              clearInterval(interval);
            }
          } 
        });
      }
    }, 1000);
  };

  return (
    <div className="tasks">
      <h3 style={{ color: isDark ? styles.textColor : "black" }}>My Task</h3>
      {tasks.map((task) => {
        const { id, title, value } = task;
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
