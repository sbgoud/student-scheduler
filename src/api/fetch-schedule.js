// src/api/fetch-schedule.js
import { get } from '@vercel/blob';

export default async function handler(req, res) {
  const { username } = req.query;
  try {
    const blob = await get(`schedules/${username}.json`);
    res.status(200).json(JSON.parse(blob));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}