import React, { useState } from "react";

const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleEdit = () => {
    onEdit(task.id, editTitle, editDescription);
    setIsEditing(false);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        margin: "10px 0",
        padding: "20px",
        borderRadius: "12px",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        width: "100%",
        maxWidth: "600px",
      }}
    >
      {isEditing ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <button onClick={handleEdit} style={{ width: "100px" }}>Save</button>
        </div>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Created at: {new Date(task.createdAt).toLocaleString()}</p>
          <button
            onClick={() => onToggle(task.id)}
            style={{ marginRight: "8px" }}
          >
            {task.completed ? "Mark Pending" : "Mark Complete"}
          </button>
          <button
            onClick={() => setIsEditing(true)}
            style={{ marginRight: "8px" }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this task?")) {
                onDelete(task.id);
              }
            }}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
