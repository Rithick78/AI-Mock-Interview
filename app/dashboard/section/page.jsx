'use client'
import React from 'react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';


function Upgrade() {

  const upgrade = [
    {
      "id": 1,
      "name": "Free",
      "cost": 0,
      "offering": [
         { "value": "✔ Create 3 Free Mock Interview"},
         { "value": "✔ Unlimited Retake Interview"},
         { "value": "  ✘ Practice Question"},
         { "value": "  ✘ Email Support"}
      ]
    },
    {
      "id": 2,
      "name": "Monthly",
      "cost": 7.99,
      "offering": [
        { "value": "✔ Create 3 Free Mock Interview"},
        {  "value": "✔ Unlimited Retake Interview"},
        {  "value": "✔ Practice Question"},
        {  "value": "✔ Email Support"}
      ]
    }
  ]

  console.log(upgrade);

  return (
    <div className='mt-20 flex flex-col items-center gap-7'>
      <div className='text-center space-y-3'>
        <h1 className='font-extrabold text-2xl '>Upgrade</h1>
        <p className='font-semibold text-gray-500'>Upgrade for Monthly Plan To Access Unlimited Mock Interview</p>
      </div>

      <div className='text-center bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 p-0.5 rounded-2xl xl:w-[60%] lg:w-[80%] md:w-[95%] sm:w-[75%] w-[90%]'>
        <div className='bg-[white]/80 md:p-5 rounded-2xl flex md:flex-row flex-col justify-center items-center lg:gap-30 md:gap-15 gap-7 py-20 '>
          {upgrade.map((item, index) => (
            <div key={index} className='sm:border-2 border   border-gray-500 bg-[white]/70 rounded-3xl sm:p-5 p-6'>
              <h1 className='font-bold text-2xl'>{item?.name}</h1>
              <h1 className='font-semibold md:my-10 my-6'><span className='font-extrabold text-4xl'>${item?.cost}</span> /month</h1>
                <div>{item.offering.map((offer,index)=>(
                    <p key={index} className='mt-3 text-start font-semibold text-[12px] sm:text-[16px]'>{offer?.value}</p>
                ))}</div>
                 <HoverCard>
              <HoverCardTrigger><button className='px-10 py-2.5 border-2 border-purple-700 mt-6 rounded-2xl text-purple-800 font-bold'>Start</button></HoverCardTrigger>
              <HoverCardContent>
               <h1 className='font-semibold '>This section is for UI display proposes</h1>
                <Link href={'/'}>
               <button className='text-blue-600 flex gap-1 mt-2'>Get Back to the Home <ArrowRight/></button>
               </Link>
              </HoverCardContent>
            </HoverCard>
                
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default Upgrade