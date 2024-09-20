import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaChevronRight, FaChevronLeft, FaStop } from "react-icons/fa";
import { gsap } from "gsap";
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const interviewQuestions = [
    { Question: "What is the difference between `var`, `let`, and `const`?" },
    { Question: "Explain hoisting in JavaScript." },
    { Question: "What is a closure, and how is it used?" },
    { Question: "What is the difference between `==` and `===`?" },
    { Question: "Can you explain how the `this` keyword works?" },
    { Question: "What is event delegation?" },
    { Question: "What are promises and how do they work?" },
    { Question: "What is the purpose of `async` and `await`?" },
    { Question: "Explain the concept of prototypal inheritance." },
    { Question: "What are arrow functions, and how do they differ from regular functions?" },
    { Question: "What is the event loop in JavaScript?" },
    { Question: "How do you handle errors in JavaScript?" },
    { Question: "What is the purpose of the `bind`, `call`, and `apply` methods?" },
    { Question: "What is the spread operator and how is it used?" },
    { Question: "Can you explain the difference between synchronous and asynchronous programming?" },
    { Question: "What is a higher-order function?" },
    { Question: "What are the new features introduced in ES6?" },
    { Question: "What is the purpose of the `new` keyword?" },
    { Question: "How can you create an object in JavaScript?" },
    { Question: "What is the difference between an object and an array?" }
];

const Sidebar = ({ questions, expand, onQuestionClick, toggleExpand }) => {
    const sidebarRef = useRef(null);

    useEffect(() => {
        gsap.to(sidebarRef.current, { width: expand ? "300px" : "70px", duration: 0.3 });
    }, [expand]);

    return (
        <div ref={sidebarRef} className='flex-none overflow-y-auto bg-zinc-950 py-2 scrollbar-hidden'>
            <div className='px-2 justify-end flex' onClick={toggleExpand}>
                {expand ? <FaChevronLeft /> : <FaChevronRight />}
            </div>
            {questions.map((item, index) => (
                <div
                    className='text-white flex gap-2 justify-start items-center w-full hover:bg-zinc-900 px-2 py-1 cursor-pointer'
                    key={index}
                    onClick={() => onQuestionClick(index)}
                >
                    <h1 className={`text-lg bg-slate-800 hover:bg-blue-200 ${index < 9 ? 'px-5' : 'px-4'} py-2 rounded-2xl`}>{index + 1}</h1>
                    {expand && <h1 className='text-sm'>{item.Question}</h1>}
                </div>
            ))}
        </div>
    );
};

const SpeechRec = ({ isListening, setIsListening, setTranscript }) => {
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    useEffect(() => {
        setTranscript(transcript);
    }, [transcript, setTranscript]);

    if (!browserSupportsSpeechRecognition) {
        return <div>Your browser does not support speech recognition.</div>;
    }

    const startListening = () => {
        setIsListening(true);
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    };

    const stopListening = () => {
        setIsListening(false);
        SpeechRecognition.stopListening();
    };

    return (
        <>
            {!isListening ? (
                <button className='bg-blue-500 p-2 rounded-full' onClick={startListening}>
                    <FaMicrophone size={24} />
                </button>
            ) : (
                <button className='bg-orange-500 p-2 rounded-full' onClick={stopListening}>
                    <FaStop size={24} />
                </button>
            )}
        </>
    );
};

const QuestionDisplay = ({ question, index, onNext, onSubmit, transcript, setTranscript }) => {
    const [isListening, setIsListening] = useState(false);

    return (
        <div className={`flex transition-all duration-300 flex-grow bg-zinc-900 py-4 px-4 flex-col`}>
            <div className='flex gap-2 items-center'>
                <h1 className='font-bold text-2xl bg-blue-500 px-4 py-2 rounded-2xl'>{index + 1}</h1>
                <h1 className='ml-2'>{question.Question}</h1>
            </div>
            <div className='bg-red-200 w-full mt-8 h-1/2 rounded-2xl bg-slate-900/[0.6] border-2 border-blue-500 p-4 text-sm min-h-[300px]'>
                {transcript}
            </div>
            <div className='w-full flex justify-end gap-2 mt-4 px-2'>
                <SpeechRec setIsListening={setIsListening} isListening={isListening} setTranscript={setTranscript} />
                {index < interviewQuestions.length - 1 ? (
                    <button className='bg-green-600 px-6 rounded-full' onClick={onNext}>
                        Next
                    </button>
                ) : (
                    <button className='bg-purple-400 hover:bg-purple-700 font-bold px-6 rounded-full' onClick={onSubmit}>
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};

const ControlPanel = ({ onEndInterview, showConfirmation, setShowConfirmation, onConfirm }) => {
    const buttonsRef = useRef(null);

    useEffect(() => {
        if (showConfirmation) {
            gsap.fromTo(buttonsRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });
        }
    }, [showConfirmation]);

    return (
        <div className='flex-none w-1/4 h-full flex flex-col p-4 gap-6'>
            <div className='h-1/2 bg-slate-700 rounded-2xl flex flex-col items-center px-4 py-4'>
                <div className='w-[150px] h-[150px] bg-red-200 rounded-full'>
                    <img src="https://media.licdn.com/dms/image/v2/C4D03AQGh8UBflS3quQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1625999448087?e=1732147200&v=beta&t=OODAmfTv-CmsjUO4cjfBRsYm05bILGj71iBUg4szE2s" alt="" className='w-full h-full object-fill rounded-full' />
                </div>
                <h1 className='mt-4'>Kaushal Agarwal</h1>
            </div>
            <div className='h-1/2 bg-slate-700 rounded-2xl'></div>
            {showConfirmation ? (
                <div ref={buttonsRef} className='flex gap-4 w-full'>
                    <button className='border-2 border-red-600 px-4 py-2 rounded-full' onClick={onConfirm}>
                        Yes
                    </button>
                    <button className='bg-green-400 hover:bg-green-600 px-4 py-2 rounded-full w-full' onClick={() => setShowConfirmation(false)}>
                        No
                    </button>
                </div>
            ) : (
                <button className='bg-red-400 hover:bg-red-600 py-2 rounded-full font-semibold cursor-pointer' onClick={onEndInterview}>
                    End Interview
                </button>
            )}
        </div>
    );
};

const InterviewStar = () => {
    const [expand, setExpand] = useState(false);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [transcript, setTranscript] = useState(""); // Lifted state

    const navigate = useNavigate();

    const toggleExpand = () => setExpand(prev => !prev);
    const handleQuestionClick = index => {
        setSelectedQuestionIndex(index);
        setTranscript(""); // Reset transcript when a new question is selected
    };
    const handleNextClick = () => {
        if (selectedQuestionIndex < interviewQuestions.length - 1) {
            setSelectedQuestionIndex(prev => prev + 1);
            setTranscript(""); // Reset transcript when moving to next question
        }
    };
    const handleSubmit = () => navigate('/dashboard');
    const handleEndInterview = () => setShowConfirmation(true);
    const handleConfirmYes = () => navigate('/dashboard');

    return (
        <div className='text-white h-full flex w-full'>
            <Sidebar 
                questions={interviewQuestions} 
                expand={expand} 
                onQuestionClick={handleQuestionClick} 
                toggleExpand={toggleExpand} 
            />
            <QuestionDisplay 
                question={interviewQuestions[selectedQuestionIndex]} 
                index={selectedQuestionIndex} 
                onNext={handleNextClick} 
                onSubmit={handleSubmit} 
                transcript={transcript} // Pass down the transcript
                setTranscript={setTranscript} // Pass down the setter function
            />
            <ControlPanel 
                onEndInterview={handleEndInterview} 
                showConfirmation={showConfirmation} 
                setShowConfirmation={setShowConfirmation} 
                onConfirm={handleConfirmYes} 
            />
        </div>
    );
}

export default InterviewStar;
