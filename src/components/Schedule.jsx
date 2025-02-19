import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { put } from '@vercel/blob';

export default function Schedule({ username }) {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Wake Up', checked: false, time: '', notes: '' },
    { id: 2, name: 'Breakfast', checked: false, time: '', notes: '' },
  ]);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  // Load saved data when page opens
// src/components/Schedule.jsx
useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/fetch-schedule?username=${username}`);
      const savedData = await response.json();
      setTasks(savedData);
    };
    fetchData();
  }, [username]);

  // Save to Vercel Blob
  const saveSchedule = async () => {
    await put(
      `schedules/${username}.json`,
      JSON.stringify(tasks),
      { access: 'public' }
    );
    alert('Saved!');
  };

  // Logout
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ textAlign: 'right' }}>
        <p>Hi {username}!</p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <h2>Today's Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Done?</th>
            <th>Time</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={task.checked}
                  onChange={(e) => {
                    const updatedTasks = tasks.map(t => 
                      t.id === task.id ? { 
                        ...t, 
                        checked: e.target.checked,
                        time: e.target.checked ? new Date().toLocaleTimeString() : '' 
                      } : t
                    );
                    setTasks(updatedTasks);
                  }}
                />
              </td>
              <td>{task.time}</td>
              <td>
                <input
                  type="text"
                  value={task.notes}
                  onChange={(e) => {
                    const updatedTasks = tasks.map(t => 
                      t.id === task.id ? { ...t, notes: e.target.value } : t
                    );
                    setTasks(updatedTasks);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={saveSchedule}>Save Schedule</button>

      <h3>Past Schedules</h3>
      <div>
        {history.map((entry, index) => (
          <div key={index}>
            <p>Date: {entry.date}</p>
            <pre>{JSON.stringify(entry.tasks, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}