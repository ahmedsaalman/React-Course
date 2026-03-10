
# Lesson 5: The `useEffect` Hook & React Component Architecture

**Table of Contents**
1. [The `useEffect` Hook](#1-the-useeffect-hook)
   - [What is a Side Effect?](#what-is-a-side-effect)
   - [Syntax Structure](#syntax-structure)
   - [The Dependency Array](#the-dependency-array-controlling-execution)
   - [The Cleanup Function](#the-cleanup-function)
2. [React Component Architecture](#2-react-component-architecture)
   - [The Problem: The "God Component"](#the-problem-the-god-component)
   - [The Solution: Three Core Principles](#the-solution-three-core-principles)
   - [Component Architecture Example](#component-architecture-example-study-planner)
   - [Derived Data](#derived-data)

---

## 1. The `useEffect` Hook

### What is a Side Effect?
In React, the primary job of a component is to return UI (JSX) based on its current props and state. A "side effect" is any action that reaches outside of this predictable rendering process to interact with the outside world. 

Common examples of side effects include:
* Fetching data from an external API.
* Reading from or writing to browser storage (`localStorage`).
* Setting up timers (`setTimeout` or `setInterval`).
* Directly manipulating the DOM.
* Subscribing to external events (like a WebSocket connection).

### Introducing `useEffect`
The `useEffect` hook allows you to perform side effects in function components. It tells React to execute a specific block of code *after* the component has finished rendering the UI to the screen.

### Syntax Structure
The hook takes two arguments: a function (the effect) and an optional array (the dependencies).

```javascript
useEffect(() => {
  // 1. Setup code (the side effect) goes here

  return () => {
    // 2. Optional cleanup code goes here
  };
}, [/* 3. Dependency array */]);

```

### The Dependency Array: Controlling Execution

The dependency array is the most critical concept in `useEffect`. It tells React exactly *when* to execute your effect. There are three possible scenarios:

#### 1. No Dependency Array (Run on Every Render)

If you omit the array completely, the effect runs after the initial render and after **every single re-render** of the component. This is rarely used and is a common cause of infinite loops if you update state inside the effect.

```javascript
useEffect(() => {
  console.log("This runs after every single render.");
});

```

#### 2. Empty Dependency Array `[]` (Run Once on Mount)

If you pass an empty array, the effect runs **only once** when the component first appears on the screen (mounts). It will never run again for the lifecycle of that component. This is standard for initial setup, like fetching data on page load or reading initial state from `localStorage`.

```javascript
useEffect(() => {
  console.log("This runs only once when the component loads.");
  const initialData = localStorage.getItem("tasks");
}, []);

```

#### 3. Array with Dependencies `[state1, prop2]` (Run on Specific Changes)

If you place variables (state or props) inside the array, the effect runs on the initial render, and then **re-runs only if those specific variables have changed** since the previous render. This is used to keep an external system in sync with your React state.

```javascript
useEffect(() => {
  console.log("This runs on load, and whenever the 'tasks' state changes.");
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]); // React watches 'tasks'

```

### The Cleanup Function

Some side effects create ongoing processes that need to be stopped when the component is removed from the screen (unmounted) to prevent memory leaks. Examples include active intervals, event listeners, or open network requests.

To handle this, your effect can return a **cleanup function**. React will run this cleanup function right before the component unmounts, and also before re-running the effect if the dependencies change.

```javascript
useEffect(() => {
  // Setup: Create a timer
  const timerId = setInterval(() => {
    console.log("Tick");
  }, 1000);

  // Cleanup: Clear the timer when the component unmounts
  return () => {
    clearInterval(timerId);
  };
}, []);

```

---

## 2. React Component Architecture

### The Problem: The "God Component"

As applications grow, placing all state and handler functions inside a single component (like `App.jsx`) creates a "God Component." This leads to two major issues:

1. **Prop Drilling:** Data must travel through multiple layers of components that do not need the data, simply to reach a deeply nested child component that does.
2. **No Clear Responsibility:** When bugs occur, the entire codebase must be scanned because all logic is tangled in one massive file.

### The Solution: Three Core Principles

To build scalable React applications, follow these three architectural principles:

#### Principle 1: Single Responsibility

Each component should do exactly one thing.

*Mental Model:* Think of a hospital. The surgeon performs surgery, the receptionist handles appointments, and the director coordinates. Nobody does everything.

* **Header:** Shows the app name.
* **Sidebar:** Shows the subject list.
* **TaskBoard:** Shows the list of tasks.
* **TaskCard:** Shows a single task.
* **AddTaskForm:** Handles new task input.
* **App:** Assembles everything and owns shared state.

#### Principle 2: Lifting State Up

State should live at the **lowest common ancestor** of all components that need it. State lives as low as possible, but high enough to reach everyone who needs it.

* **tasks array:** Needed by TaskBoard (to render) and AddTaskForm (to add). Common ancestor = `App`.
* **selectedSubject:** Needed by Sidebar (to click) and TaskBoard (to filter). Common ancestor = `App`.
* **title (input field):** Needed only by AddTaskForm. Common ancestor = `AddTaskForm` itself.

**Visualizing Data Flow:**

* **Data** flows **down** through props (Parent -> Child).
* **Events** flow **up** through callback functions (Child -> Parent).

#### Principle 3: Controlled Components

Form inputs are always controlled by React state. The DOM does not own the value; React does.

* **Uncontrolled:** `<input type="text" />` (React has no idea what is typed).
* **Controlled:** `<input value={title} onChange={(e) => setTitle(e.target.value)} />`
* **Why?** It allows you to read the value anytime, reset it programmatically, validate before submission, and pre-fill existing data.

### Component Architecture Example (Study Planner)

#### 1. Presentational Components (No State)

* **Header.jsx:** Returns pure UI. No state, no props.
* **TaskCard.jsx:** Knows only about one task. Receives `task`, `onDelete`, and `onToggle` as props.
* **TaskBoard.jsx:** Renders a list. Receives `tasks`, `onDelete`, and `onToggle` as props. Maps through the tasks to render TaskCards.

#### 2. Interactive Components (Local State)

* **Sidebar.jsx:** Displays subjects and reports clicks upward. Receives `subjects`, `selectedSubject`, and `onSelectSubject`.
* **AddTaskForm.jsx:** Owns local input state (`title`, `subject`, `due`). Handles validation and packaging the new task before sending it up to App via the `onAdd` prop.

#### 3. The Coordinator (Global State)

* **App.jsx:** Coordinates the entire application.
* **Owns:** `tasks` (persisted to localStorage), `selectedSubject`, and the static `subjects` list.
* **Calculates:** Derived data like `filteredTasks`.
* **Defines handlers:** `handleAddTask`, `handleDeleteTask`, `handleToggleComplete`.



### Derived Data

You do not always need `useState` for data that changes. If data can be computed from existing state, it should be calculated on the fly as a standard variable.

```javascript
// Derived data — not state, just calculated during render
const filteredTasks = selectedSubject === "All"
  ? tasks
  : tasks.filter(task => task.subject === selectedSubject)

```

