function AddTaskForm() {
  return (
    <div className="add-task-form">
      <h3>Add New Task</h3>
      <input type="text" placeholder="Task name" />
      <input type="text" placeholder="Subject" />
      <button>Add Task</button>
    </div>
  )
}

export default AddTaskForm