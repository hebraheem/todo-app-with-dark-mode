import React, { useState, useEffect } from "react";
import Task from "./Task";
import { useThemeContext } from "../context";
import Alert from "./Alert";
import { CgDarkMode } from "react-icons/cg";
import { BsLightning } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { AiOutlineEdit } from "react-icons/ai";

const Storage = () => {
  let storedItems = localStorage.getItem("input");
  if (storedItems) {
    return JSON.parse(localStorage.getItem("input"));
  } else {
    return [];
  }
};

function SearchField() {
  const { isDark, setIsDark, styles } = useThemeContext();
  const [input, setInput] = useState("");
  const [tasks, setTask] = useState(Storage());
  const [isEditting, setIsEditting] = useState(false);
  const [id, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", status: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      return setAlert({
        show: true,
        msg: "enter an item",
        status: "alert-danger",
      });
    } else if (input && isEditting) {
      setTask(
        tasks.map((task) => {
          if (task.id === id) {
            return { ...task, title: input };
          }
          return task;
        })
      );
      setAlert({
        show: true,
        msg: "item edited",
        status: "alert-success",
      });
      setInput("");
      setIsEditting(false);
      setEditId(null);
    } else {
      const items = {
        id: new Date().getTime().toString(),
        title: input,
        time: new Date().toLocaleTimeString(),
      };
      setTask([...tasks, items]);
      setAlert({
        show: true,
        msg: "item added",
        status: "alert-success",
      });
      setInput("");
    }
  };

  const removeItem = (id) => {
    setTask(tasks.filter((task) => task.id !== id));
    setAlert({
      show: true,
      msg: "item removed",
      status: "alert-danger",
    });
  };

  const editItem = (id) => {
    const edited = tasks.find((task) => task.id === id);
    setInput(edited.title);
    setEditId(id);
    setIsEditting(true);
  };

  useEffect(() => {
    localStorage.setItem("input", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <div className="dark">
        <button onClick={() => setIsDark(!isDark)}>
          {isDark ? (
            <BsLightning style={{ color: isDark ? "white" : "black" }} />
          ) : (
            <CgDarkMode />
          )}
        </button>
      </div>
      {alert.show && <Alert {...alert} tasks={tasks} setTime={setAlert} />}
      <form action="" onSubmit={handleSubmit} className="form-field">
        <input
          type="text"
          value={input}
          placeholder="add task"
          className="form-control"
          onChange={(e) => setInput(e.target.value)}
          style={{
            backgroundColor: isDark ? styles.backgroundColor : "#C9AFA0",
            color: isDark ? "#fffdfb" : "black",
          }}
        />
        <button
          style={{
            backgroundColor: isDark ? styles.backgroundColor : "#C9AFA0",
            color: isDark ? "#fffdfb" : "black",
          }}
          className="add-btn"
        >
          {isEditting ? <AiOutlineEdit /> : <GrAdd />}
        </button>
      </form>
      <div className="tasks">
        {tasks.length > 0 && (
          <Task tasks={tasks} removeItem={removeItem} editItem={editItem} />
        )}
      </div>
    </div>
  );
}

export default SearchField;
