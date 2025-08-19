"use client"
import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'


function Questionprev({ mockInterviewQuestion, activeIndex}) {

    const textToSpeak = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text)
            window.speechSynthesis.speak(speech)
        }
        else {
            alert = ('Sorry,Your Browser Does Not Support Text To Speech')
        }
    }
 
    return (
        <div>
            <div className='bg-[white]/30 md:p-6 p-3 rounded-4xl md:mt-10 '>
                
                    <div className='grid 2xl:grid-cols-5 xl:grid-cols-3 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 text-center gap-3 my-7'>
                        {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
                            <div key={index} className={`text-blue-500 border-2 border-blue-500 rounded-full py-3 ${activeIndex == index && 'text-white bg-blue-500'}`}>
                                <h1 className='lg:font-bold lg:text-md sm:text-sm text-[10px]  font-semibold '>Question: {index + 1}</h1>
                            </div>
                        ))}
                    </div>

                <hr className='border-1 border-blue-500 my-10 md:mx-10 mx-2' />
                <div className='flex flex-col justify-center items-center gap-3'>
                    <h1 className='text-center font-semibold md:text-md sm:text-sm text-[12px] '>{mockInterviewQuestion[activeIndex]?.question}</h1>
                    <button onClick={() => textToSpeak(mockInterviewQuestion[activeIndex]?.question)} className='hover:bg-gray-300 border-2 md:p-4 p-2 bg-gray-200 border-gray-300 rounded-2xl'><Volume2 className='md:size-10 sm:size-7 size-4' /></button>
                </div>
                <hr className='border-1 border-blue-500 my-10 lg:mx-10 mx-2' />
                <div className='md:mb-7  text-blue-400 border-1 border-blue-600 p-6 2xl:mx-15 sm:mx-10 mx-1 xl:mx-5 rounded-4xl bg-blue-200'>
                    <h1 className='flex gap-3 font-bold md:text-md text-sm'><Lightbulb className='md:size-7 sm:size-5 size-4' /> Note:</h1>
                    <p className='md:text-md sm:text-sm  text-[10px]'>Click on Record Answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each of question and your answer to comapre it.</p>
                </div>
            </div>
        </div>
    )
}

export default Questionprev