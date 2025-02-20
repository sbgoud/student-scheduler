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
// Replace the useEffect for fetching history
useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch(`/api/fetch-history?username=${username}`);
      const historyData = await response.json();
      setHistory(historyData);
    };
    fetchHistory();
  }, [username]);

  // Save to Vercel Blob
  const saveSchedule = async () => {
    try {
      const response = await fetch('/api/save-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, tasks })
      });
  
      if (!response.ok) throw new Error('Save failed');
      alert('Saved successfully!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
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
    <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <h4>📅 Date: {entry.date}</h4>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Completed Time</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {entry.tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.time || '❌ Not completed'}</td>
              <td>{task.notes || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ))}
</div>
    </div>
  );
}