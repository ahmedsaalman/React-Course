function TaskCard({ task, onDelete, onToggle }) {
  return (
    <div className="task-card">
      <div className="task-header">
        <h4
          style={{
            textDecoration: task.completed
              ? "line-through"
              : "none"
          }}
        >
          {task.title}
        </h4>
        <span>{task.completed ? "YES" : "NO"}</span>
      </div>

      <p>📚 {task.subject}</p>
      <p>📅 Due: {task.due}</p>

      <div className="task-actions">
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskCard