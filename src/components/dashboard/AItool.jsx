import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Steps from '../Steps';
import { FaFileUpload } from "react-icons/fa";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import * as pdfjsLib from 'pdfjs-dist/build/pdf'; // Import pdfjs
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'; // Import worker

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker; // Set the worker source

const AItool = () => {
  const [file, setFile] = useState(null);
  const [viewerFileUrl, setViewerFileUrl] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [pdfText, setPdfText] = useState('');
  const [jobDescription, setJobDescription] = useState(null);
  const jobDescriptionRef = useRef(null);
  const navigate = useNavigate();

  const [ats,setAts] = useState("?")

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
  }, [file]);

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
      const trimmedText = text.trim();
      setPdfText(trimmedText);
      console.log(trimmedText);
    };
  };

  const handleNext = () => {
    if (activeStep < 1) {
      setActiveStep(prevStep => prevStep + 1);
    }
  };

  const handleMockInterview = () => {
    const currentJobDescription = jobDescriptionRef.current.value; // Get the value from the textarea
    setJobDescription(currentJobDescription || ''); // Update state or set to empty if null
    console.log("Job Description:", currentJobDescription); // Log the description
    navigate('/mock-interview'); // Navigate to the Mock Interview route
  };

  const renderUploadResume = () => (
    <div className='min-h-[300px] min-w-[250px] bg-zinc-900 rounded-2xl flex py-8 items-center flex-col'>
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
    </div>
  );

  const renderEnterJobDescription = () => (
    <div className='flex flex-col h-full gap-2 py-2'>
      <h1 className='text-3xl text-center text-white'>Enter Job Description</h1>
      <textarea className='w-full h-full bg-zinc-800 rounded-xl px-3' placeholder='Job description here' ref={jobDescriptionRef}></textarea>
      {/* <p className='text-left text-white mt-2'>{pdfText}</p> */}
    </div>
  );

  const renderATS = () => (
    <div className='min-h-[300px] min-w-[250px] bg-zinc-900 rounded-2xl flex py-8 items-center flex-col'>
      <div className='h-[120px] w-[120px] rounded-full bg-zinc-800 text-center py-7 text-green-700 font-bold text-6xl shadow-inner drop-shadow-2xl shadow-sky-700'>
        {ats}
      </div>
      <button className='text-xl font-bold text-white mt-6 border-2 border-green-600 py-1 px-4 rounded-full'>Get ATS</button>
    </div>
  );

  const renderPreview = () => (
    <div className='bg-zinc-900 max-h-[calc(100vh-120px)] h-full w-full text-white rounded-2xl px-[100px] overflow-y-auto text-center'>
      {activeStep === 0 && (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          {viewerFileUrl ? (
            <Viewer fileUrl={viewerFileUrl} />
          ) : (
            <p className='mt-[30%]'>Please upload a resume to preview.</p>
          )}
        </Worker>
      )}
      {activeStep === 1 && renderEnterJobDescription()}
    </div>
  );

  return (
    <div className='h-full rounded-lg flex flex-col gap-2'>
      <div className='flex gap-4 items-center'>
        <h1 className='text-2xl text-white'>AI Tool</h1>
        <Steps activeStep={activeStep} setActiveStep={setActiveStep} />
      </div>

      <div className='bg-zinc-800 h-full rounded-lg flex w-full p-2 items-center gap-4'>
        <div className='flex gap-2 flex-col'>
          {activeStep === 0 && renderUploadResume()}
          {activeStep === 1 && renderATS()}

          {activeStep === 0 && (
            <button 
              className={`w-full py-1 rounded-2xl font-bold text-black ${file ? 'bg-green-600 text-white' : 'bg-gray-400 cursor-not-allowed'}`} 
              onClick={handleNext}
              disabled={!file}
            >
              Next
            </button>
          )}

          {activeStep === 1 && (
            <button 
              className='w-full py-1 rounded-2xl font-bold text-black bg-green-600 text-white' 
              onClick={handleMockInterview}
            >
              Mock Interview
            </button>
          )}
        </div>

        {renderPreview()}
      </div>
    </div>
  );
};

export default AItool;
