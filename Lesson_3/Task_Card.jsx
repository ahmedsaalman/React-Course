function TaskCard({ title, subject, due, completed }) {
  return (
    <div className="task-card">
      <h4>{title}</h4>
      <p>Subject: {subject}</p>
      <span>Due: {due}</span>
      <span>{completed ? "✅ Done" : "⏳ Pending"}</span>
    </div>
  )
}

export default TaskCard