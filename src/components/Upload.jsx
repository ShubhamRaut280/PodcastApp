import React, { useState, useEffect } from 'react';
import '../App.css';
import pdfToText from 'react-pdftotext';
import { generate } from '../Utils/Gemini';
import { Circles } from 'react-loader-spinner';
import { saveAs } from 'file-saver';
import axios from 'axios';


const cleanText = (text) => {
    return text.replace(/\[.*?\]|\{.*?\}|\(.*?\)/g, '').trim();
};


const Upload = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [uploadTitle, setUploadTitle] = useState('Upload');
    const [filePath, setFilePath] = useState('');
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [generatingScript, setGeneratingScript] = useState(false);
    const [script, setScript] = useState('');
    const [generatingAudio, setGeneratingAudio] = useState(false);

    useEffect(() => {
        if (generatingScript) {
            generate(content)
                .then((json) => {
                    setScript(json);
                    setGeneratingScript(false);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(`Failed to generate script: ${error}`);
                    setLoading(false);
                });
        }
    }, [generatingScript, content]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setError('');
        } else {
            setFile(null);
            setError('Please select a PDF file');
        }
    };

    const handleUpload = async () => {
        if (file) {
            setUploadTitle('Uploading...');
            setLoading(true);
            pdfToText(file)
                .then(async (text) => {
                    setContent(text);
                    console.log('Extracted text from pdf:', text);
                    setGeneratingScript(true);
                })
                .catch((error) => {
                    console.error(`Failed to extract text from pdf: ${error}`);
                    setLoading(false);
                });
            setUploadTitle('Completed');
        } else {
            console.log('No file selected or invalid file type');
        }
    };

    const handleDownload = () => {
        const blob = new Blob([script], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'generated_script.txt');
    };

    const handleGenerateAudio = async () => {
        setGeneratingAudio(true);

        console.log(`Generating audio for script: ${script}`);
        const output = cleanText(script);
        console.log(`Cleaned script: ${output}`);

        try {
            const response = await axios.post('https://podcast-backend-eta.vercel.app/generate-audio', { text: script }, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'audio/mp3' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'generated_audio.mp3');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error generating audio:', error);
        } finally {
            setGeneratingAudio(false);
        }
    };

    return (
        <div className="upload-container">
            <h1 className="upload-title">{uploadTitle}</h1>
            <input type="file" className="upload-input" onChange={handleFileChange} />
            {error && <p className="error-message">{error}</p>}
            <button className="upload-button" onClick={handleUpload} disabled={loading}>
                {loading ? <Circles height="20" width="20" color="#fff" /> : 'Upload'}
            </button>
            {script && <button className="upload-button" onClick={handleDownload}>Download Generated File</button>}
            {script && <button className="upload-button" onClick={handleGenerateAudio} disabled={generatingAudio}>
                {generatingAudio ? <Circles height="20" width="20" color="#fff" /> : 'Generate Audio'}
            </button>}
        </div>
    );
};

export default Upload;
