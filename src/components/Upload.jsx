import React, { useState } from 'react'
import '../App.css'
import pdfToText from 'react-pdftotext'


const Upload = () => {
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const [uploadTitle, setUploadTitle] = useState('Upload')

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
            setUploadTitle('Uploading...');

            pdfToText(file)
                .then(text => console.log(`final text ${text}`))
                .catch(error => console.error("Failed to extract text from pdf"))
            setUploadTitle('Completed')
        } else {
            console.log('No file selected or invalid file type')
        }
    }

    return (
        <div className="upload-container">
            <h1 className="upload-title">Upload your pdf</h1>
            <input type="file" className="upload-input" onChange={handleFileChange} />
            {error && <p className="error-message">{error}</p>}
            <button className="upload-button" onClick={handleUpload}>{uploadTitle}</button>
        </div>
    )
}

export default Upload