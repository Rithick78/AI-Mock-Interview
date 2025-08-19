"use client"
import { db } from '@/Backend/db';
import { MockInterview } from '@/Backend/schema';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Questionprev from './_components/Questionprev';
import WebCam from './_components/WebCam';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, CircleCheckBig } from 'lucide-react';

function InterviewPrev() {

  const { interviewId } = useParams()
  const [interviewData, setInterviewData] = useState()
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState()
   const[activeIndex,setActiveIndex]=useState(0)

  useEffect(() => {
    GetInterviewDetails()
  }, [])

  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));

    if (result.length > 0 && result[0]?.jsonMockResp) {
      const jsonresp = JSON.parse(result[0]?.jsonMockResp)

      setMockInterviewQuestion(jsonresp)
      setInterviewData(result[0])

      console.log('jsonresp:', jsonresp);


    } else {
      console.log("No MockInterview data found for interviewId:", interviewId);
    }
  }
  return mockInterviewQuestion && (
    <div>
      <div className='grid grid-cols-1 xl:grid-cols-2 mt-7 xl:gap-10 md:gap-5 gap-3 py-10 rounded-4xl md:mx-20 mx-1'>

        <Questionprev
          mockInterviewQuestion={mockInterviewQuestion}
          interviewData={interviewData}
          activeIndex={activeIndex}
        />

        <WebCam
          mockInterviewQuestion={mockInterviewQuestion}
          interviewData={interviewData}
          activeIndex={activeIndex}
        />

      </div>
       <div>
         <div className='flex gap-3 items-center justify-center xl:justify-normal xl:mx-20 pb-10 -mt-5 md:mt-0'>
                        {activeIndex > 0 && <button onClick={() => setActiveIndex(activeIndex - 1)} className='flex gap-1 bg-blue-500 p-2 sm:p-3 text-white text-[12px] sm:text-md sm:font-semibold items-center rounded-3xl pr-6'><ChevronLeft className='md:size-7 sm:size-6 size-4' />Previous</button>}
                        {activeIndex < mockInterviewQuestion.length - 1 && <button onClick={() => setActiveIndex(activeIndex + 1)} className='flex gap-1 bg-blue-500 p-2 sm:p-3 text-white text-[12px] sm:text-md sm:font-semibold items-center rounded-3xl'>Next <ChevronRight className='md:size-7 sm:size-6 size-4' /></button>}
                        <Link href={'/dashboard/interview/' + interviewData?.mockId + "/feedback"}>
                            {activeIndex == mockInterviewQuestion.length - 1 && <button className='flex gap-1 bg-blue-500 p-2 sm:p-3 text-white text-[12px] sm:text-md sm:font-semibold items-center rounded-3xl'>End Interview <CircleCheckBig className='md:size-7 sm:size-6 size-4' /></button>}
                        </Link>
                    </div>
       </div>
    </div>
  )
}

export default InterviewPrev