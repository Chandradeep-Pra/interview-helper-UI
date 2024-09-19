import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import Steps from '../Steps';
import { FaFileUpload } from "react-icons/fa";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import Interviewstar from '../Interviewstar'; // Ensure this import is correct

const AItool = () => {
  const [file, setFile] = useState(null);
  const [viewerFileUrl, setViewerFileUrl] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate(); // Use navigate for navigation

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = (e) => {
        setFile(e.target.result);
      };
    } else {
      alert("Please upload a PDF file.");
    }
  };

  useEffect(() => {
    setViewerFileUrl(file);
  }, [file]);

  const handleNext = () => {
    if (activeStep < 1) {
      setActiveStep(prevStep => prevStep + 1);
    }
  };

  const handleMockInterview = () => {
    navigate('/mock-interview'); // Navigate to the Mock Interview route
  };

  const renderUploadResume = () => (
    <div className='min-h-[300px] min-w-[250px] bg-zinc-900 rounded-2xl flex py-8 items-center flex-col'>
      <h1 className='text-2xl text-gradient bg-clip-text text-transparent'>Upload Resume</h1>
      <FaFileUpload size={36} className='mt-8 hover:bg-red-200' fill='white' />
      <input 
        type="file" 
        accept="application/pdf"
        className='border-2 text-white mt-4 text-sm rounded-full w-[80%]'
        onChange={handleFileChange}
      />
    </div>
  );

  const renderEnterJobDescription = () => (
    <div className='flex flex-col h-full gap-2 py-2'>
      <h1 className='text-3xl text-center text-white'>Enter Job Description</h1>
      <textarea className='w-full h-full bg-zinc-800 rounded-xl px-3' placeholder='Job description here'></textarea>
    </div>
  );

  const renderATS = () => (
    <div className='min-h-[300px] min-w-[250px] bg-zinc-900 rounded-2xl flex py-8 items-center flex-col'>
      <div className='h-[120px] w-[120px] rounded-full bg-zinc-800 text-center py-7 text-green-700 font-bold text-6xl shadow-inner drop-shadow-2xl shadow-sky-700'>
        64
      </div>
      <h1 className='text-2xl font-bold text-white mt-6'>ATS</h1>
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
