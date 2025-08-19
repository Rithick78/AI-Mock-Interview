'use client'
import Image from 'next/image'
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { db } from '@/Backend/db';
import { UserAnswer } from '@/Backend/schema';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ArrowRight, ChevronsUpDown, Volume2 } from 'lucide-react';
import Link from 'next/link';

function Feedback() {

  const [feedbackList, setFeedbackList] = useState([]);
  const { interviewId } = useParams()

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);
  };


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
    <div className='flex flex-col items-center justify-center gap-5'>
      {feedbackList&&feedbackList?.length==0 ?
        <div className='flex justify-center flex-col items-center lg:mt-50 md:mt-35 mt-25'>
          <h1 className='md:text-3xl sm:text-2xl text-xl font-extrabold text-gray-600'>No Interview Feedback Found</h1>
          <Image src='/no-data.png' width={1000} height={1000} alt='Robot' />
        </div>
        : <>
          <div className='bg-[white]/20 mt-3 xl:w-[70%] lg:w-[85%] w-[95%] sm:px-10 px-3 pt-2 rounded-4xl flex justify-between items-center'>
            <div className='space-y-2'>
              <h2 className='font-extrabold lg:text-3xl md:text-2xl sm:text-xl text-md text-green-500'>Congratulation!</h2>
              <h2 className='font-extrabold lg:text-lg sm:text-md text-[10px] opacity-60'>Here is your interview feedback</h2>
              <p className='text-gray-500 font-semibold opacity-85 lg:text-md sm:text-sm text-[6px]'>Find below your Interview question / correct answer and also your answer and feedback!</p>
            </div>
            <div>
              <Image src='/Robot.png' width={180} height={100} alt='Robot' />
            </div>

          </div>
          <div className='text-center flex flex-col items-center gap-7 border-2 bg-[white]/20 lg:w-[70%] w-[90%] rounded-4xl py-7'>
            {feedbackList && feedbackList.map((item, index) => (

              <Collapsible key={index} className='bg-[gray]/10 p-2 sm:p-4 md:p-5  lg:w-[70%] w-[80%] rounded-3xl flex flex-col items-center '>
                <CollapsibleTrigger className='lg:font-bold font-semibold flex gap-1 lg:text-[16px] sm:text-[12px] text-[9px] mr-3'>{item?.question}<ChevronsUpDown className='sm:size-7 size-3' /> </CollapsibleTrigger>
                <CollapsibleContent className=' gap-3 flex flex-col justify-center items-center  mt-5'>

                  <p className={`border-1 rounded-3xl p-3 sm:p-4 md:font-bold font-semibold md:text-md sm:text-[15px] text-[10px] ${item.rating >= '5' ? 'text-green-600 bg-green-300' : 'text-red-600 bg-red-300'}`}><strong>Rating : {item?.rating}</strong></p>

                  <p className={`border-1 rounded-3xl w-[90%] sm:p-4 p-3 font-semibold md:text-md sm:text-sm text-[8px] ${item.rating >= '5' ? ' bg-green-300 text-green-600' : ' bg-red-300 text-red-600'}`}><strong>Your Answer :</strong> {item?.userAns}</p>

                  <div className='border-1 rounded-3xl w-[90%] px-3 py-4 bg-green-300 space-y-5 flex flex-col items-center justify-center'>
                    <p className=' text-green-600 font-semibold md:text-md sm:text-sm text-[8px]'><strong>Correct Answer :</strong> {item?.correctAns}</p>
                    <button onClick={() => textToSpeak(item?.correctAns)} className='flex items-center gap-2 bg-white rounded-3xl sm:px-3 sm:py-2 px-2 py-1 sm:text-md text-[12px] text-green-600 border sm:border-2 border-green-600 font-semibold sm:font-bold'>Speak<Volume2 className='sm:size-6 md:size-7 size-4' /></button>
                  </div>

                  <div className='border-1 rounded-3xl w-[90%] px-3 py-4 bg-blue-300 space-y-5 flex flex-col items-center justify-center'>
                    <p className=' text-blue-600 font-semibold md:text-md sm:text-sm text-[8px]'><strong>Feedback : </strong>{item?.feedback}</p>
                    <button onClick={() => textToSpeak(item?.feedback)} className='flex items-center gap-2 bg-white rounded-3xl sm:px-3 sm:py-2 px-2 py-1 sm:text-md text-[12px] text-blue-600 border sm:border-2 border-blue-600 font-semibold sm:font-bold'>Speak<Volume2 className='sm:size-6 md:size-7 size-4' /></button>
                  </div>
                </CollapsibleContent>
              </Collapsible>

            ))}
          </div>
        </>}
      <Link href={'/dashboard'}>
        <button className='flex items-center gap-2 md:font-bold sm:font-semibold text-blue-500 md:text-md sm:text-sm text-[12px] '>Go Back <ArrowRight className='sm:size-5 md:size-7 size-4' /></button>
      </Link>
    </div>
  )
}

export default Feedback