function Sidebar({ subjects, selectedSubject, onSelectSubject }) {
  return (
    <aside className="sidebar">
      <h3>Subjects</h3>
      <ul>
        {subjects.map(subject => (
          <li
            key={subject}
            onClick={() => onSelectSubject(subject)}
            style={{
              fontWeight: subject === selectedSubject
                ? "bold"
                : "normal",
              cursor: "pointer",
              color: subject === selectedSubject
                ? "blue"
                : "black"
            }}
          >
            {subject}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar