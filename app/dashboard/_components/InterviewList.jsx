'use client'
import { db } from '@/Backend/db'
import { MockInterview } from '@/Backend/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import InterviewListCard from './InterviewListCard'

function InterviewList() {

    const {user}=useUser()
    const[interviewList,setInterviewList]=useState([])

    useEffect(()=>{
        user && GetInterviewList()
    },[user])
    
    const GetInterviewList=async()=>{
        const result=await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id))

        console.log('GetInterviewList',result);
        setInterviewList(result)
        
    }
  
  return (
       <div className='mt-10 sm:w-[75%] w-[90%]'>
        <h1 className='font-extrabold sm:text-2xl text-[15px] text-start'>Your Previous <span className='text-blue-500'> AI Mock Interview</span> List</h1>
           <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-4 gap-2 mt-10 md:mx-5 sm:w-full mx-5'> 
            
            {interviewList&&interviewList.map((item,index)=>(
                <InterviewListCard key={index} item={item}/>
            ))}
        
       </div>
    </div>
  )
}

export default InterviewList