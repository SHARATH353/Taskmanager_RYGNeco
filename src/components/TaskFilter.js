import React from "react";

const TaskFilter = ({ filter, setFilter, counts }) => {
  const buttonBaseStyle = {
    marginRight: "10px",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    color: "white",
  };

  return (
    <div style={{ margin: "20px 0", textAlign: "center" }}>
      <button
        onClick={() => setFilter("all")}
        style={{
          ...buttonBaseStyle,
          backgroundColor: "black",
        }}
      >
        All ({counts.all})
      </button>
      <button
        onClick={() => setFilter("completed")}
        style={{
          ...buttonBaseStyle,
          backgroundColor: "green",
        }}
      >
        Completed ({counts.completed})
      </button>
      <button
        onClick={() => setFilter("pending")}
        style={{
          ...buttonBaseStyle,
          backgroundColor: "red",
        }}
      >
        Pending ({counts.pending})
      </button>
    </div>
  );
};

export default TaskFilter;
