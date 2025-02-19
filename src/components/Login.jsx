import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dummyUsers = [
  { username: 'alex', password: '123' },
  { username: 'sam', password: '456' }
];

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = dummyUsers.find(u => u.username === username && u.password === password);
    if (user) {
      navigate('/schedule'); // Go to schedule page
    } else {
      alert('Wrong username/password!');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Student Login</h1>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        /><br />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}