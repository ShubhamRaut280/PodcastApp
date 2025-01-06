import React, { useState } from 'react'
import '../App.css'

const Upload = () => {
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setError('')
    } else {
      setFile(null)
      setError('Please upload a PDF file')
    }
  }

  const handleUpload = () => {
    if (file) {
      // Handle the file upload logic here
      console.log('Uploading file:', file)
    } else {
      console.log('No file selected or invalid file type')
    }
  }

  return (
    <div className="upload-container">
        <h1 className="upload-title">Upload your pdf</h1>
        <input type="file" className="upload-input" onChange={handleFileChange} />
        {error && <p className="error-message">{error}</p>}
        <button className="upload-button" onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default Upload