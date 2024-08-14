import { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h1>Task Manager</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) => updateTask(task._id, e.target.value, task.description)}
            />
            <input
              type="text"
              value={task.description}
              onChange={(e) => updateTask(task._id, task.title, e.target.value)}
            />
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
