import { useState } from "react"

function AddTaskForm({ subjects, onAdd }) {
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("Mathematics")
  const [due, setDue] = useState("")

  function handleSubmit() {
    // Validate
    if (!title.trim()) {
      alert("Please enter a task title")
      return
    }

    // Build task
    const newTask = {
      id: Date.now(),
      title,
      subject,
      due,
      completed: false
    }

    // Send up to App
    onAdd(newTask)

    // Reset form
    setTitle("")
    setDue("")
  }

  return (
    <div className="add-task-form">
      <h3>Add New Task</h3>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />

      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      >
        {subjects
          .filter(s => s !== "All")
          .map(s => (
            <option key={s} value={s}>{s}</option>
          ))
        }
      </select>

      <input
        type="date"
        value={due}
        onChange={(e) => setDue(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Add Task
      </button>
    </div>
  )
}

export default AddTaskForm