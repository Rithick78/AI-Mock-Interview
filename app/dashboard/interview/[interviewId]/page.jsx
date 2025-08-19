"use client"
import { db } from '@/Backend/db'
import { MockInterview } from '@/Backend/schema'
import { eq } from 'drizzle-orm'
import { ArrowRight, Camera, CameraOff, Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Webcam from "react-webcam";


function Interview() {

    const { interviewId } = useParams()
    const [interviewData, setInterviewData] = useState()
    const [enable, setEnable] = useState(false)

    useEffect(() => {
        console.log(interviewId)
        GetInterviewDetails()
    }, [])

    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, interviewId));

        console.log(result);
        setInterviewData(result[0])

    }


    return (
        <div className='md:px-20  mt-15'>
            <h1 className='md:text-5xl sm:text-4xl text-3xl sm:ml-10 ml-5 md:ml-0 font-bold bg-gradient-to-r from-purple-500 via-pink-400 to-orange-600 bg-clip-text text-transparent'>Let's Get Started</h1>
            <div className='grid xl:grid-cols-2 lg:grid-cols-1 mt-7 xl:gap-15 py-10 rounded-4xl'>
                <div className='sm:px-10 px-1.5 flex flex-col items-center gap-5'>
                    <div className='rounded-4xl w-full space-y-10 md:mt-8 pb-10 bg-[radial-gradient(circle_at_center,#c084fc_10%,_transparent_100%),radial-gradient(circle_at_80%_20%,#60a5fa_0%,_transparent_40%)]'>
                        <div className='bg-[white]/20 rounded-4xl p-6 '>
                            <h1 className='text-center font-extrabold 2xl:text-2xl sm:text-[20px] text-[15px]'>Your Interview Details</h1>
                            <div className='sm:grid sm:grid-cols-2 sm:gap-3 flex flex-col items-center gap-2 sm:mt-10 mt-4 mx-2 sm:mx-0'>
                                <p className='font-bold 2xl:text-[15px] xl:text-[13px] sm:text-[16px] text-[10px] '>Job Role: <span className='font-semibold '>{interviewData?.jobPosition}</span></p>
                                <p className='font-bold 2xl:text-[15px] xl:text-[13px] sm:text-[16px] text-[10px] flex justify-end'>{interviewData?.createdAt}</p>
                                <p className='font-bold 2xl:text-[15px] xl:text-[13px] sm:text-[16px] text-[10px] '>Job Desc: <span className='font-semibold '>{interviewData?.jobDescription}</span></p>
                                <p className='font-bold 2xl:text-[15px] xl:text-[13px] sm:text-[16px] text-[10px] flex justify-end'>Year of Experience: <span className='font-semibold '>{interviewData?.jobExperience}</span></p>
                            </div> 
                        </div>
                        <div className='space-y-3 text-center sm:mx-13 mx-1.5 bg-yellow-100 border-1 border-amber-300 rounded-3xl p-5'>
                            <h1 className='flex sm:gap-3 gap-1 text-yellow-500 font-bold sm:text-[16px] text-[13px]'><Lightbulb /> Information</h1>
                            <p className='text-yellow-500 sm:text-[12px] text-[10px]'>Enable Video Web Cam to Start your Al Generated Mock Interview, It Has 5 question which you can answer and at the last you will get the report on the basis of your answer. NOTE: We never record your video, Web cam access you can disable at any time if you want.</p>
                        </div>
                    </div>
                     
                     <Link href={'/dashboard/interview/'+interviewId+"/start"}>
                    <button className='bg-blue-500 text-white sm:p-5 p-3 rounded-full flex gap-3 font-semibold'>
                        Start Interview <ArrowRight /></button>
                     </Link>
                </div>
                <div className= {`flex flex-col ${enable || 'gap-6'} items-center`}>
                    {enable ?
                        <div className='rounded-xl sm:h-100 h-70 sm:w-130 w-70 mt-15' >
                        <Webcam mirrored={true} className='rounded-2xl' />
                        </div>
                        : <div className='bg-[gray]/10 sm:w-130 w-70 sm:h-100 h-70 mt-10 rounded-xl flex justify-center items-center'>
                            <CameraOff className=' size-17 ' />

                        </div>}

                    <div className='flex bg-white rounded-full'>
                        <button className={`rounded-l-full transition-all border-none md:p-5 sm:text-[16px] text-[11px] sm:p-3 p-2 flex sm:gap-3 gap-1 font-semibold ${enable ? 'bg-blue-600 text-white' : 'bg-white'}`} onClick={() => setEnable(true)}>Enable <Camera className='size-4 sm:size-6'  /></button>
                        <button className={`rounded-r-full transition-all border-none md:p-5 sm:text-[16px] text-[11px] sm:p-3 p-2 flex sm:gap-3 gap-1 font-semibold ${enable || 'bg-red-600 text-white'}`} onClick={() => setEnable(false)} >Disable<CameraOff className='size-4 sm:size-6'  /></button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Interview