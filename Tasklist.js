// components/TaskList.js
export default function TaskList({ tasks, onDelete, onUpdate }) {
    return (
      <ul className="list-none p-0">
        {tasks.map(task => (
          <li key={task._id} className="border-b border-gray-200 py-2">
            <input
              type="text"
              value={task.title}
              onChange={(e) => onUpdate(task._id, e.target.value, task.description)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              value={task.description}
              onChange={(e) => onUpdate(task._id, task.title, e.target.value)}
              className="border p-2 rounded"
            />
            <button onClick={() => onDelete(task._id)} className="bg-red-500 text-white px-4 py-2 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
  