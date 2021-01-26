import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

import './index.css';

function App() {

const [tasks, setTasks] = useState([])

const [showForm, setShowForm] = useState(false);

useEffect(() => {
  const getTasks = async () => {
    const tasksFromServer = await fetchTasks()

    setTasks(tasksFromServer)
  }
 
  getTasks()

}, [tasks])

// Fetch tasks
const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()

  return data;
}

// Add Task
const addTaskHandler = async (task) => {

  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json();

  setTasks([...tasks, data])

}

// Delete Task
const deleteTaskHander = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE'
  })

  

  setTasks(tasks.filter(task => task.id !== id)) 
}

// Toggle Reminder
const toggleReminder = (id) => {
  setTasks(tasks.map(task => task.id === id ? {...task, reminder: !task.reminder} : task))

}

// Add Toggler
const formToggle = () => {
  setShowForm(!showForm)

}

  return (
    <div className="container">
        <Header title="Task Tracker" showForm={formToggle} show={showForm} />
        <Route path='/' exact>
        {
          showForm ? <AddTask onAdd={addTaskHandler} /> : null
        }
        {
          tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTaskHander} onToggle={toggleReminder}/> : "No tasks to show"
        }
        <Footer />
      </Route>
      <Route path="/about" component={About} />

    </div>
   
  );
}

export default App;
