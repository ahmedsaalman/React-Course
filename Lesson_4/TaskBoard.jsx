import TaskCard from "./Task_Card"


tasks = [
  { id: 1, title: "Math Homework" },   // task on iteration 1
  { id: 2, title: "Read Chapter 4" },  // task on iteration 2
  { id: 3, title: "Essay Draft" }      // task on iteration 3
]


function TaskBoard({ tasks, onDelete, onToggle }) {
  return (
    <div className="task-board">
      <h2>Your Tasks</h2>
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