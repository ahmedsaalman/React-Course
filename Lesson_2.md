# Lesson 2 --- Components & JSX

## Love That Mental Model --- "Safe Space" is Actually Perfect

Let me build on your words:

> The Virtual DOM is React's **scratch pad**.\
> React does all its thinking there first --- figures out the *minimum*
> changes needed --- then touches the real DOM **once**, **precisely**,
> and **efficiently**.

You instinctively got the core reason: **fewer, smarter DOM updates**.
That's exactly why it exists. ✅

------------------------------------------------------------------------

## We're Ready for Lesson 2

You've got the foundations solid:

-   ✅ Why React exists (`UI = f(state)`)
-   ✅ SPA mental model
-   ✅ Virtual DOM purpose

------------------------------------------------------------------------

# Lesson 2 --- Components & JSX

## What is a Component?

A component is just a **function that returns UI**.

That's it. Nothing magical.

``` jsx
function TaskCard() {
  return <h2>Math Homework</h2>
}
```

This is a complete React component.

------------------------------------------------------------------------

## What is JSX?

Here's something that looks weird at first:

``` jsx
return <h2>Math Homework</h2>
```

That's **not HTML**. That's **JSX --- JavaScript XML**.

It is a syntax extension that lets you write HTML-like code inside
JavaScript.

### Why does JSX exist?

Before JSX, you'd write UI like this:

``` javascript
React.createElement('h2', null, 'Math Homework')
```

Imagine writing an entire page like that.

JSX is simply **syntactic sugar** --- it gets compiled down to
`React.createElement` calls automatically.

You write something readable, the compiler handles the rest.

### Mental Model

> JSX is like a **blueprint drawing**.\
> You sketch the UI visually.\
> React's compiler converts it into real construction instructions.

------------------------------------------------------------------------

## JSX Rules Worth Knowing

### 1. You must return one parent element

❌ Incorrect

``` jsx
return (
  <h2>Title</h2>
  <p>Description</p>
)
```

✅ Correct

``` jsx
return (
  <div>
    <h2>Title</h2>
    <p>Description</p>
  </div>
)
```

Everything must be wrapped in **one parent element**.

------------------------------------------------------------------------

### 2. Use `className` instead of `class`

❌ HTML way

``` jsx
<div class="card">
```

✅ JSX way

``` jsx
<div className="card">
```

Because `class` is a reserved keyword in JavaScript.

------------------------------------------------------------------------

### 3. JavaScript lives inside `{ }`

``` jsx
const subject = "Mathematics"

return <h2>{subject}</h2>
```

Output:

    Mathematics

Curly braces are your **escape hatch back into JavaScript**.

------------------------------------------------------------------------

## Component Composition

Components can contain other components.

This is how complex UIs are built from simple pieces.

``` jsx
function TaskCard() {
  return <div className="card">Math Homework</div>
}

function TaskBoard() {
  return (
    <div className="board">
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </div>
  )
}
```

### Mental Model

> Think of **LEGO bricks**.\
> Each brick alone is simple.\
> But combine them and you can build anything.

`TaskBoard` does not need to know *how* `TaskCard` works internally.\
It just uses it.

------------------------------------------------------------------------

## Study Planner Project Structure

This is the component architecture we will gradually build:

    App
     ├── Header          → shows app title
     ├── Sidebar         → shows subject list
     ├── TaskBoard       → shows all task cards
     │     └── TaskCard  → one individual task
     └── AddTaskForm     → form to add new tasks

Each of these will be its own component.

Each component has **one responsibility**.

------------------------------------------------------------------------

# Exercise

Before looking at the full implementation, think through this.

### Task

Write a `Header` component that renders:

-   an `<h1>` with the text **Study Planner**
-   a `<p>` with the text **Manage your tasks**
-   both wrapped in a `<header>` element

Example requirement:

    <header>
      <h1>Study Planner</h1>
      <p>Manage your tasks</p>
    </header>

Try writing the JSX yourself first.

Even rough pseudocode is fine.

In the next step, we'll build the **full static version of the app UI**.
