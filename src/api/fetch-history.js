// Create this file in your project
import { list } from '@vercel/blob';

export default async function handler(req, res) {
  const { username } = req.query;
  try {
    // List all blobs for this user
    const { blobs } = await list({
      prefix: `schedules/${username}-`,
    });
    
    // Fetch data for each blob
    const history = await Promise.all(
      blobs.map(async (blob) => {
        const response = await fetch(blob.url);
        const tasks = await response.json();
        return { date: blob.pathname.split('-')[1], tasks };
      })
    );
    
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load history' });
  }
}