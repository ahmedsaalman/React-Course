import TaskCard from "./Task_Card"

function TaskBoard({ tasks, onDelete, onToggle }) {
  // Handle empty state
  if (tasks.length === 0) {
    return (
      <div className="task-board">
        <h2>Your Tasks</h2>
        <p>No tasks yet. Add one below!</p>
      </div>
    )
  }

  return (
    <div className="task-board">
      <h2>Your Tasks ({tasks.length})</h2>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}

export default TaskBoard