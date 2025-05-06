import { useState, useEffect } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDos));
  }, [toDos]);

  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") return;
    setToDos((current) => [toDo, ...current]);
    setToDo("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit} style={styles.form}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write your to do..."
          style={styles.input}
        />
        <button style={styles.addButton}>Add</button>
      </form>
      <ul style={styles.list}>
        {toDos.map((item, index) => (
          <li key={index} style={styles.listItem}>
            <span>{item}</span>
            <button
              style={styles.deleteButton}
              onClick={() => {
                setToDos((current) => current.filter((_, i) => i !== index));
              }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif",
    backgroundColor: "#fdfdfd"
  },
  title: {
    textAlign: "center"
  },
  form: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px"
  },
  input: {
    flex: 1,
    padding: "8px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  addButton: {
    padding: "8px 12px",
    fontSize: "16px",
    borderRadius: "6px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f0f0f0",
    padding: "8px 12px",
    borderRadius: "6px",
    marginBottom: "8px"
  },
  deleteButton: {
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer"
  }
};

export default App;
