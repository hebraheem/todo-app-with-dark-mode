import React, {useState} from "react";
import "../Task.css";
import { useThemeContext } from "../context";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { TiInputChecked } from "react-icons/ti";


const Task = ({ tasks, removeItem, editItem }) => {

  const [checked, setChecked] =useState(false)
  const { isDark, styles } = useThemeContext();

  return (
    <div className="tasks">
      <h3 style={{ color: isDark ? styles.textColor : "black" }}>My Task</h3>
      {tasks.map((task) => {
        const { id, title, time } = task;
        return (
          <>
            <div
              className="task"
              key={id}
              style={{
                backgroundColor: isDark ? styles.backgroundColor : "#C9AFA0",
              }}
            >
              <div className="btn-div">
                <button className="chck-btn" onClick = {()=> setChecked(!checked)}><TiInputChecked/></button>
              </div>
              <div className="task_text">
                <p style={{ color: isDark ? styles.textColor : "grey" }}>{time}</p>
                <h4 style={{ color: isDark ? styles.textColor : "black",  textDecorationLine: checked && "line-through"  }}>{title}</h4>
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
