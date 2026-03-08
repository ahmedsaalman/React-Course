import TaskCard from "./TaskCard"

function TaskBoard() {
  return (
    <div className="task-board">
      <h2>Your Tasks</h2>
      <TaskCard
        title="Math Homework"
        subject="Mathematics"
        due="Tomorrow"
        completed={false}
      />
      <TaskCard
        title="Read Chapter 4"
        subject="Physics"
        due="Monday"
        completed={true}
      />
      <TaskCard
        title="Essay Draft"
        subject="History"
        due="Wednesday"
        completed={false}
      />
    </div>
  )
}

export default TaskBoard