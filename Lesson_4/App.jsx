import { useState } from "react"
import Header from "./components/Header"
import TaskBoard from "./components/TaskBoard"
import AddTaskForm from "./components/AddTaskForm"

function App() {
  const [tasks, setTasks] = useState([])

  function handleAddTask(newTask) {
    setTasks([...tasks, newTask])
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  function handleToggleComplete(id) {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  return (
    <div className="app">
      <Header />
      <TaskBoard
        tasks={tasks}
        onDelete={handleDeleteTask}
        onToggle={handleToggleComplete}
      />
      <AddTaskForm onAdd={handleAddTask} />
    </div>
  )
}

export default App