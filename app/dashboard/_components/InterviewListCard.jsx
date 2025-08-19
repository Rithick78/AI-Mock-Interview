import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewListCard({item}) {

    const router=useRouter();

    const navigateToFeedback=()=>{
       router.push('/dashboard/interview/'+ item?.mockId+"/feedback")
    }

  return (
    <div className='bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 p-0.5 rounded-xl text-center'>
    <div className='bg-[white]/80 p-5 rounded-2xl'>
        <h1 className='font-extrabold text-[18px] text-blue-900'>{item?.jobPosition}</h1>
        <div className='mt-3'> 
            <h2 className='font-bold'>{item?.jobDescription}</h2>
            <h2 className='font-semibold'>{item?.jobExperience} Years of Experience</h2>
             <p className='font-semibold text-gray-400 '>{item?.createdAt}</p>
        </div>
        <hr className=' my-5 border border-gray-500'/>
        <div className='flex justify-center'>
            <button onClick={navigateToFeedback} className='bg-blue-500 text-white rounded-3xl px-4 py-2 font-semibold transition-all hover:scale-105 hover:bg-blue-700 cursor-pointer'>FeedBack</button>
        </div>
       
    </div>
    </div>
  )
}

export default InterviewListCard