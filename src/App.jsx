import React from 'react'
import './App.css'
import Upload from './components/Upload'

function App() {
  return (
    <div className="app-container">
      <h2 className="app-title">Automated Podcast Solution</h2>
      <p className="app-description">Upload a PDF file to generate a podcast script and audio file</p>
      <Upload />
    </div>
  )
}

export default App
