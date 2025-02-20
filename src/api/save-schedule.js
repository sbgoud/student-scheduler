import { put } from '@vercel/blob';

export default async function handler(req, res) {
  const { username, tasks } = req.body;
  const date = new Date().toISOString().split('T')[0];
  const blobName = `schedules/${username}-${date}.json`;

  try {
    const blob = await put(blobName, JSON.stringify(tasks), {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save schedule' });
  }
}