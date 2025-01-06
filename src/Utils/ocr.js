import fs from 'fs';
import * as pdfjsLib from "pdfjs-dist/build/pdf";

async function extractTextFromPDF(pdfUrl) {
    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
    let extractedText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        const pageText = textContent.items.map(item => item.str).join(' ');
        extractedText += pageText + '\n';
    }

    console.log("Extracted Text:", extractedText);
    return extractedText;
}

export default extractTextFromPDF;


