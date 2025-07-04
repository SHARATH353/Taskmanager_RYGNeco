import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";

function App() {
  const [username, setUsername] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }

    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([task, ...tasks]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const editTask = (id, newTitle, newDescription) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, title: newTitle, description: newDescription } : t
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  if (!username) {
    return <Login onLogin={setUsername} />;
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "40px 10px",
        backgroundImage: `url(${process.env.PUBLIC_URL + '/Taskmanager_bg.jpg'})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Welcome, {username}!</h1>
      <TaskFilter filter={filter} setFilter={setFilter} counts={counts} />
      <TaskForm onAdd={addTask} />
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onEdit={editTask}
      />
    </div>
  );
}

export default App;
