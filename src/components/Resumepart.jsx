import React, { useEffect, useState } from 'react';
import { FaFileUpload } from "react-icons/fa";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import * as pdfjsLib from 'pdfjs-dist/build/pdf'; 
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'; 

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker; 
const ResumePart = ({ setPdfText, viewerFileUrl, setViewerFileUrl }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type === 'application/pdf') {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = async (e) => {
        setFile(e.target.result);
        await extractTextFromPDF(selectedFile);
      };
    } else {
      alert("Please upload a PDF file.");
    }
  };

  useEffect(() => {
    setViewerFileUrl(file);
  }, [file, setViewerFileUrl]);

  const extractTextFromPDF = async (file) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    
    fileReader.onload = async () => {
      const typedArray = new Uint8Array(fileReader.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      const numPages = pdf.numPages;
      let text = '';

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        text += pageText + ' ';
      }
      setPdfText(text.trim()); 
    };
  };

  return (
    <div className='min-h-[300px] min-w-[250px] bg-zinc-900 rounded-2xl flex flex-col py-8 items-center'>
      <h1 className='text-2xl text-gradient bg-clip-text text-transparent'>Upload Resume</h1>
      <FaFileUpload size={36} className='mt-8 hover:bg-red-200' fill='white' />
      <label htmlFor="cv-input" className='mt-6 border-2 border-blue-500 hover:border-blue-200 hover:bg-blue-500 rounded-full font-bold text-lg text-white w-2/3 text-center py-2 cursor-pointer'>Select a file</label>
      <input
        id='cv-input'
        type="file" 
        accept="application/pdf"
        className='border-2 text-white mt-4 text-sm rounded-full w-[80%]'
        onChange={handleFileChange}
        hidden
      />
      <div className='bg-zinc-800 max-h-[300px] w-full text-white rounded-2xl px-[20px] overflow-y-auto text-center mt-4'>
        {file && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={viewerFileUrl} />
          </Worker>
        )}
        {!file && <p className='mt-[30%]'>Please upload a resume to preview.</p>}
      </div>
    </div>
  );
};

export default ResumePart;
