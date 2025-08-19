'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/Backend/google'
import { db } from '@/Backend/db'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import { MockInterview } from '@/Backend/schema'
import { useRouter } from 'next/navigation'
import moment from 'moment/moment'
import InterviewList from './_components/InterviewList'
import { toast } from 'react-toastify'


function Dashboard() {

  const [openDailog, setOpenDailog] = useState(false)
  const [jobPosition, setJobPosition] = useState()
  const [jobDescription, setJobDescription] = useState()
  const [jobExperience, setJobExperience] = useState()
  const [loading, setLoading] = useState(false)
  const [jsonValue, setJsonValue] = useState([])
  const { user } = useUser()
  const router=useRouter()
  const now=moment()


  const onSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    console.log(jobPosition, jobDescription, jobExperience);
    const Prompt = `Job Position:${jobPosition} Job Description:${jobDescription} Job Experience:${jobExperience}.Depends on information give 5 interview question and answer in one line in pure JSON format like [{},{},{},{},{}].`
    console.log(Prompt);
    const result = await chatSession.sendMessage(Prompt)
    const MockQuestion = (result.response.text()).replace('```json', " ").replace('```', " ")
    console.log(MockQuestion);
    setLoading(false)
    toast.success('Created Successfully 👍')
    setJsonValue(MockQuestion)
    
    console.log(jsonValue);
    


    const resp = await db.insert(MockInterview).values({
      mockId: uuidv4(),
      jsonMockResp: MockQuestion,
      jobPosition: jobPosition,
      jobDescription: jobDescription,
      jobExperience: jobExperience,
      createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
      createdAt:now.format("MMMM Do YYYY, h:mm a")
    }).returning({ mockId: MockInterview.mockId });
    console.log('Inserted Values', resp);
    if(resp){
      setOpenDailog(false)
      router.push('/dashboard/interview/'+resp[0]?.mockId)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='flex lg:flex-row flex-col justify-evenly 2xl:gap-30 xl:gap-10 md:gap-5 items-center bg-[white]/20 2xl:w-[80%] lg:w-[95%] w-[98%] mt-15 rounded-3xl '>
        <div className='flex flex-col items-center gap-6'>
          <h1 className='mt-5 lg:mt-0 font-extrabold 2xl:text-4xl lg:text-3xl md:text-4xl sm:text-3xl text-[16px] ml-3 sm:ml-0'>Get Interview-Ready With <span className='xl:text-2xl sm:text-2xl md:text-[18px] text-[10px] sm:p-2 p-1 rounded-2xl border-blue-600  sm:border-3 border-2 text-blue-600 '>AI</span></h1>
          <p className='font-semibold 2xl:text-[17px] lg:text-[14px] md:text-[15px] sm:text-[13px] text-[8px] text-gray-700 ml-3 sm:ml-0'>Practice Real Interview Questions & Get Instant Feedback</p>
        </div>

        <div className='flex items-center sm:gap-15 gap-2 mt-5 lg:mt-0'>
           <Button onClick={() => setOpenDailog(true)} className='xl:h-15 sm:h-13 h-8  hover:scale-105 transition-all  bg-blue-500 xl:text-[20px] sm:text-[17px] text-[12px] font-semibold hover:bg-blue-600'>Create Interview <ArrowRight /></Button>
          <Image src="/robot2.png" alt='robot' width={110} height={50} className='lg:pt-5 xl:w-50 lg:w-45 sm:w-40' />
          <Dialog open={openDailog} >
            <DialogContent className=' bg-[radial-gradient(circle_at_center,#c084fc_20%,_transparent_60%),radial-gradient(circle_at_30%_20%,#60a5fa_0%,_transparent_50%)]'>
              <DialogHeader>
                <DialogTitle className='font-bold sm:text-[18px] text-[16px] text-center'>Tell us more about your job interviewing</DialogTitle>
                <DialogDescription className='font-semibold text-[12px] text-center'>
                  Add details about tour job position,role and years of experience
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={onSubmit}>
                <div className='sm:px-3 sm:space-y-5 space-y-2 sm:mt-7 bg-[white]/30 sm:py-5 p-3 rounded-3xl'>
                  <div >
                    <label className='text-[10px] font-semibold sm:text-[15px]'>Job Position</label>
                    <Input onChange={(e) => setJobPosition(e.target.value)} required className='py-2 text-[10px] sm:py-5 bg-[white]/50 text-black' placeholder='Ex.Frontend Developer' />
                  </div>
                  <div>
                    <label className='text-[10px] font-semibold sm:text-[15px]'>Job Description / Tech Stacks</label>
                    <Textarea onChange={(e) => setJobDescription(e.target.value)} required className='py-2 text-[10px] sm:py-5 bg-[white]/50 text-black' placeholder='Ex.HTML,CSS,JavaScript' />
                  </div>
                  <div>
                    <label className='text-[10px] font-semibold sm:text-[15px]'>Years of Experience</label>
                    <Input onChange={(e) => setJobExperience(e.target.value)} required type='number' className='py-2 text-[10px] sm:py-5 bg-[white]/50 text-black' placeholder='Ex.1,2' />
                  </div>
                </div>
                <div className='flex gap-5 items-center justify-end sm:mt-5 mt-2'>
                  <Button variant='outline' className='text-[10px] border-blue-600 hover:text-blue-800 text-blue-600' onClick={() => setOpenDailog(false)}>Cancel</Button>
                  <Button disabled={loading} type='submit' className='text-[10px] bg-blue-600 hover:bg-blue-700'>{loading ? <>Generating...<LoaderCircle className='animate-spin' /></> : 'Create'}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

       <InterviewList/>

    </div>
  )
}

export default Dashboard