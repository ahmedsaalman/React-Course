import { useState } from "react"

function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("")

  function handleSubmit() {
    if (!title.trim()) return

    const newTask = {
      id: Date.now(),
      title,
      subject,
      completed: false
    }

    onAdd(newTask)
    setTitle("")
    setSubject("")
  }

  return (
    <div className="add-task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
      />
      <button onClick={handleSubmit}>
        Add Task
      </button>
    </div>
  )
}

export default AddTaskForm