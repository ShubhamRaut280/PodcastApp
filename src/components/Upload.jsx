import React, { useState } from 'react'
import '../App.css'
import pdfToText from 'react-pdftotext'
import  generate  from '../Utils/Gemini'
import { Circles } from 'react-loader-spinner'

const Upload = () => {
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const [uploadTitle, setUploadTitle] = useState('Upload')
    const [filePath, setFilePath] = useState('')
    const [loading, setLoading] = useState(false)

    const getScript = async (text) => {
        const response = await generate(text)
        setFilePath(response)
        setLoading(false)
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile)
            setError('')
        } else {
            setFile(null)
            setError('Please select a PDF file')
        }
    }

    const handleUpload = async () => {
        if (file) {
            setUploadTitle('Uploading...')
            setLoading(true)
            console.log('Uploading...', file)
            pdfToText(file)
                .then(text => getScript(text))
                .catch(error => {
                    console.error(`Failed to extract text from pdf ${error}`)
                    setLoading(false)
                })
            setUploadTitle('Completed')
        } else {
            console.log('No file selected or invalid file type')
        }
    }

    return (
        <div className="upload-container">
            <h1 className="upload-title">{uploadTitle}</h1>
            <input type="file" className="upload-input" onChange={handleFileChange} />
            {error && <p className="error-message">{error}</p>}
            <button className="upload-button" onClick={handleUpload} disabled={loading}>
                {loading ? <Circles height="20" width="20" color="#fff" /> : 'Upload'}
            </button>
            {filePath && <a href={filePath} download>Download Generated File</a>}
        </div>
    )
}

export default Upload