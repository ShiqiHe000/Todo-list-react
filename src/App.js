import { useState, useEffect } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';
// import { v4 as uuidv4 } from 'uuid';

// React todo list
// App component & JSX
// State & useSate Hook
// Global State
// Icons with react-icons
// Optional message if no message
// Conditional styling
// Add form
// Submit form
// Button toggle
// Build for production
// JSON server
// useEffect Hook & Fetch tasks from server
// Delete tasks from server
// Add tasks to server
// Toggle remainder on server
// Routing & Footer & About 
function App() {
  const [showForm, setShowForm] = useState(false);

  const [tasks, setTasks] = useState([])

  useEffect(() => {

    // get tasks from server
    async function getTasks() {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, [])

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json()

    return data;
  }

  // delete task
  async function deleteTask(id) {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(
      tasks.filter(task => task.id !== id)
    )
  }


  // fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json()

    return data;
  }


  // toggle reminader
  async function toggleReminder(id) {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json();

    setTasks(
      tasks.map(task => task.id === id ? { ...task, reminder: data.reminder } : task)
    )
  }


  // add task
  async function addTask(task) {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json();

    setTasks([...tasks, data]);


  }


  return (
    <BrowserRouter>
      <div className="container">
        {/* header and show form button */}
        <Header
          toggleShowForm={() => setShowForm(!showForm)}
          showAdd={!showForm}
        />

        <Route path="/" exact render={(props) => (
          <>
            {/* add task form */}
            {showForm && <AddTask addTask={addTask} />}

            {/* show tasks */}
            {tasks.length > 0 ? (
              <Tasks
                tasks={tasks}
                onToggle={toggleReminder}
                onDelete={deleteTask}
              />
            ) : (
              "No Task"
            )}

          </>
        )} />

        {/* footer */}
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
