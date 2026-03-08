import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import TaskBoard from "./components/TaskBoard"
import AddTaskForm from "./components/AddTaskForm"

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          <TaskBoard />
          <AddTaskForm />
        </div>
      </div>
    </div>
  )
}

export default App