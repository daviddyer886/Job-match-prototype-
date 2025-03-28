
import React, { useState } from 'react'
import jobData from './jobs.json'

export default function App() {
  const [matches, setMatches] = useState([])

  const handleUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    const text = await file.text()
    const keywords = extractKeywords(text)

    const ranked = jobData.map(job => {
      const jobKeywords = extractKeywords(job.description)
      const matchScore = keywords.filter(k => jobKeywords.includes(k)).length
      return { ...job, matchScore }
    }).sort((a, b) => b.matchScore - a.matchScore)

    setMatches(ranked.slice(0, 5))
  }

  const extractKeywords = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3)
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>California State Job Match</h1>
      <input type="file" accept=".txt,.pdf,.docx" onChange={handleUpload} />
      <h2>Top Matches:</h2>
      <ul>
        {matches.map((job, i) => (
          <li key={i}>
            <strong>{job.title}</strong> — {job.department} <br/>
            <small>{job.description.slice(0, 100)}...</small>
          </li>
        ))}
      </ul>
    </div>
  )
}
