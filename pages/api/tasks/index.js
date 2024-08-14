import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css'; // Import CSS module

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('/api/tasks');
    setTasks(response.data.data);
  };

  const addTask = async () => {
    const response = await axios.post('/api/tasks', { title, description });
    setTasks([...tasks, response.data.data]);
    setTitle('');
    setDescription('');
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  const updateTask = async (id, updatedTitle, updatedDescription) => {
    const response = await axios.put(`/api/tasks/${id}`, {
      title: updatedTitle,
      description: updatedDescription,
    });
    setTasks(tasks.map(task => task._id === id ? response.data.data : task));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Task Manager</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.input}
          />
          <button onClick={addTask} className={styles.button}>Add Task</button>
        </div>
        <ul className={styles.taskList}>
          {tasks.map(task => (
            <li key={task._id} className={styles.taskItem}>
              <input
                type="text"
                value={task.title}
                onChange={(e) => updateTask(task._id, e.target.value, task.description)}
                className={styles.input}
              />
              <input
                type="text"
                value={task.description}
                onChange={(e) => updateTask(task._id, task.title, e.target.value)}
                className={styles.input}
              />
              <button onClick={() => deleteTask(task._id)} className={styles.button}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
