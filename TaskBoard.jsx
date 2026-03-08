import TaskCard from "./Task_Card"

function TaskBoard() {
  return (
    <div className="task-board">
      <h2>Your Tasks</h2>
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </div>
  )
}

export default TaskBoard