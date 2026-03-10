import { useState, useEffect } from "react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import TaskBoard from "./components/TaskBoard"
import AddTaskForm from "./components/AddTaskForm"

function App() {
  // Global state — needed by multiple components
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks")
    return saved ? JSON.parse(saved) : []
  })

  const [selectedSubject, setSelectedSubject] = useState("All")

  const subjects = ["All", "Mathematics", "Physics", "History"]

  // Persist tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  // Derived data — not state, just calculated
  const filteredTasks = selectedSubject === "All"
    ? tasks
    : tasks.filter(task => task.subject === selectedSubject)

  // Handlers
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
      <div className="main-layout">
        <Sidebar
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSelectSubject={setSelectedSubject}
        />
        <div className="content">
          <TaskBoard
            tasks={filteredTasks}
            onDelete={handleDeleteTask}
            onToggle={handleToggleComplete}
          />
          <AddTaskForm
            subjects={subjects}
            onAdd={handleAddTask}
          />
        </div>
      </div>
    </div>
  )
}

export default App