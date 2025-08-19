'use client'
import { db } from '@/Backend/db'
import { chatSession } from '@/Backend/google'
import { UserAnswer } from '@/Backend/schema'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import { Camera, CameraOff, CircleCheckBig, LoaderCircle } from 'lucide-react'
import moment from 'moment'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Webcam from 'react-webcam'


function WebCam( {mockInterviewQuestion, interviewData , activeIndex}) {

   const[enable, setEnable] = useState(false)
   const[userAnswer,setUserAnswer]=useState('')
   const [loading,setLoading]=useState(false)
   const {user}=useUser()
   const now=moment()
  
  
  const onSave=async()=>{
    if(userAnswer.length<10){
      alert(' Minimum of 2 to 3 lines ')
    }else{
     console.log(userAnswer)

    const feedbackPrompt="Question:"+ mockInterviewQuestion[activeIndex]?.question +",Answer:"+ userAnswer + ".Depends on the Question and Answer for given Interview question.Give us the rating of 1-10 and feedback of 3-5 line how to improve in JSON format."

     console.log(feedbackPrompt);
     setLoading(true)
     const result=await chatSession.sendMessage(feedbackPrompt)
     const mockFeedback=(result.response.text()).replace('```json', " ").replace('```', " ")
     const jsonFeedback = JSON.parse(mockFeedback)
     console.log(jsonFeedback);
     setLoading(false)
     toast.success('Saved Successfully 👍')
     
     const feedbackText = jsonFeedback?.feedback ?? "";
     const ratingValue = String(jsonFeedback?.rating ?? "");

     const resp=await db.insert(UserAnswer).values({
         mockIdRef:interviewData?.mockId,
         question:mockInterviewQuestion[activeIndex]?.question,
         correctAns:mockInterviewQuestion[activeIndex]?.answer,
         userAns:userAnswer,
         feedback:feedbackText,
         rating:ratingValue,
         userEmail:user?.primaryEmailAddress?.emailAddress || "unknown",
         createdAt:now.format("MMMM Do YYYY, h:mm a")
     })

         
     if(resp){
       console.log('Inserted Successfully');
     }
      setUserAnswer('')
       
  }}
  return (

    <div>
      <div className=' flex flex-col gap-5 items-center '>
        {enable ?
        <div className='mt-10 rounded-3xl 2xl:w-150 xl:w-110 sm:[70%] w-[90%] h-70 sm:h-100'>
          <Webcam mirrored={true} className='rounded-xl' />
         </div> 
          : <div className='bg-[gray]/10 2xl:w-150 xl:w-110 sm:[70%] w-[90%] h-70 sm:h-100 mt-10 rounded-xl flex justify-center items-center'>
            <CameraOff className=' md:size-17 sm:size-12 size-10 ' />

          </div>}
          <div className='w-[100%] flex flex-col items-center gap-3'>
            <label className='block xl:hidden sm:text-md text-[8px] font-semibold' >{mockInterviewQuestion[activeIndex]?.question}</label>
             <Textarea onChange={(e)=>setUserAnswer(e.target.value)} value={userAnswer} required className='bg-gray-200 2xl:w-150 xl:w-110 md:w-170 sm:w-[70%] w-[90%] font-semibold' />
          </div>
          
  
        <div className='flex 2xl:gap-90 lg:gap-50 md:gap-35 sm:gap-25 gap-15 items-center'>
          <div className='flex bg-white rounded-full'>
            <button className={`rounded-l-4xl px-4 sm:px-6 transition-all border-none py-3 ${enable ? 'bg-blue-600 text-white' : 'bg-white'}`} onClick={() => setEnable(true)}><Camera className='size-4 sm:size-5 stroke-2'/></button>
            <button className={`rounded-r-4xl px-4 sm:px-6 transition-all border-none py-3 ${enable || 'bg-red-600 text-white'}`} onClick={() => setEnable(false)} ><CameraOff className='size-4 sm:size-5 stroke-2 '/></button>
          </div>
            {loading ? <button onClick={onSave} variant='outline' className='border-2 border-blue-500 text-blue-500 rounded-4xl font-bold text-[17px] px-6 py-5 bg-[white]/20 flex items-center'><LoaderCircle className='animate-spin' /></button>
            : <button onClick={onSave} className=' hover:bg-blue-600 bg-blue-500 text-white rounded-4xl sm:text-md text-[12px] font-semibold p-2.5 sm:p-4 flex items-center gap-2'>Save<CircleCheckBig className='size-4 sm:size-7'/></button>}
        </div>
      </div>
     
          
    </div>

  )
}

export default WebCam