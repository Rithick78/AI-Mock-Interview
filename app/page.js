import React from 'react'
import Header from './dashboard/_components/Header'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'

function page() {
  return (
    <div className='min-h-screen bg-[#fdfcff] bg-[radial-gradient(circle_at_20%_30%,rgba(192,132,252,0.35)_0%,transparent_60%),radial-gradient(circle_at_80%_20%,rgba(96,165,250,0.35)_0%,transparent_60%),radial-gradient(circle_at_30%_80%,rgba(253,186,116,0.35)_0%,transparent_60%),radial-gradient(circle_at_70%_80%,rgba(134,239,172,0.35)_0%,transparent_60%)]'>
      <Header />
      <div className='flex flex-col xl:gap-10 gap-5  justify-center items-center mt-10'>
        <div className='bg-[white]/20 sm:w-[75%] w-[95%] rounded-3xl flex justify-center items-center'>
          <h1 className='2xl:text-6xl xl:text-4xl md:text-3xl sm:text-2xl text-5xl  font-extrabold lg:py-15 py-8 sm:flex ml-10 sm:ml-0 sm:flex-row items-center gap-4 bg-gradient-to-r from-purple-500 via-blue-400 to-orange-400 bg-clip-text text-transparent'>Ace Your Next Interview With <span className='lg:border-4 md:border-3 border-2 border-blue-500 p-1 md:py-2 md:px-2 rounded-full text-blue-500 lg:text-4xl md:text-2xl text-[20px]'> AI</span> </h1>
        </div>
        <div className=' flex lg:flex-row flex-col-reverse justify-between items-center gap-3 rounded-3xl p-5 2xl:mx-50 sm:mx-10'>
          <div className='lg:w-1/2 sm:w-[90%] w-full font-semibold sm:border-2 border-gray-400 sm:py-10 py-5 md:px-12 md:py-7 sm:px-5 lg:px-17 rounded-3xl space-y-5 sm:text-[16px] text-[9px]'>
            <p> 🔹 The AI Mock Interview System simulates real job interviews with domain-specific, AI-generated questions.</p>
            <p> 🔹Users can type responses, hear questions via text-to-speech, and get instant performance ratings with detailed feedback.</p>
            <p> 🔹Incorrect answers include the correct response for learning.</p>
            <p> 🔹With webcam integration for realistic face-to-face practice, it enhances accessibility, engagement, and confidence for job seekers.</p>
          </div>
          <Image src='/aiRobot2.png' className='lg:w-110 2xl:w-125 md:w-125 sm:w-100'  width={250} height={100} alt='FrontPage' />
        </div>
      </div>
      <div className='bg-blue-950 pb-10 text-white sm:mt-23'>
        <div className='grid md:grid-cols-2 grid-cols-1 md:gap-x-10 gap-y-5 sm:mx-10 mx-3 md:py-20 py-10'>
          <div className=' space-y-4 sm:space-y-7'>
            <h1 className='font-extrabold text-2xl bg-gradient-to-r from-purple-500 via-blue-400 to-orange-400 bg-clip-text text-transparent'> AI Mock Interview</h1>
            <p className='font-semibold sm:text-[14px] md:text-[16px] text-[10px]'>  Practice your interviews with AI. Get instant feedback, improve your answers,
              and gain confidence for your next opportunity.</p>
          </div>
          <div className='flex items-center w-full sm:w-[60%] md:w-full '>
            <Input placeholder='xxxxx@gmail.com' className='py-4 sm:py-6 lg:py-8 rounded-r-none ' />
            <Button className='lg:w-35 sm:w-25 w-20 lg:h-17 sm:h-13 h-9 bg-white text-black lg:text-[20px] sm:text-[17px] text-[14px] rounded-l-none'>Sign Up</Button>
          </div>
        </div>

        <div className="flex sm:justify-evenly justify-between mx-5 sm:mx-0">
          <div>
            <h3 className="font-bold text-[13px] sm:text-[16px] md:text-[20px] text-purple-500 mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="text-white md:font-bold font-semibold  text-[9px] sm:text-[14px] md:text-[16px] hover:text-purple-500">• Features</a></li>
              <li><a href="#" className="text-white md:font-bold font-semibold  text-[9px] sm:text-[14px] md:text-[16px] hover:text-purple-500">• Pricing</a></li>
              <li><a href="#" className="text-white md:font-bold font-semibold  text-[9px] sm:text-[14px] md:text-[16px] hover:text-purple-500">• Upgrade</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[13px] sm:text-[16px] md:text-[20px] text-purple-500 mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="text-white md:font-bold font-semibold  text-[9px] sm:text-[14px] md:text-[16px] hover:text-purple-500">• About Us</a></li>
              <li><a href="#" className="text-white md:font-bold font-semibold  text-[9px] sm:text-[14px] md:text-[16px] hover:text-purple-500" >• Careers</a></li>
              <li><a href="#" className="text-white md:font-bold font-semibold  text-[9px] sm:text-[14px] md:text-[16px] hover:text-purple-500">• Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[13px] sm:text-[16px] md:text-[20px] text-purple-500 mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600 ">
              <li><a href="#" className="text-white md:font-bold font-semibold  text-[9px] sm:text-[14px] md:text-[16px] hover:text-purple-500">• Blog</a></li>
              <li><a href="#" className="text-white md:font-bold font-semibold  text-[9px] sm:text-[14px] md:text-[16px] hover:text-purple-500">• Help Center</a></li>
              <li><a href="#" className="text-white md:font-bold font-semibold  text-[9px] sm:text-[14px] md:text-[16px] hover:text-purple-500">• Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className='flex flex-col-reverse sm:flex-row justify-between gap-5 sm:gap-0 mt-7 sm:mt-15 mx-10'>
          <div className='flex items-center flex-col'>
            <h1 className='font-bold text-[13px] md:text-[17px]'>© 2025 AutoDrive. All rights reserved.</h1>
            <p className='text-[10px] md:text-[15px]'>AI-Powered Mock Interview</p>
          </div>
          <div className='flex items-center xl:gap-15 gap-10'>
            <Instagram className='lg:size-10 size-7 opacity-45' />
            <Facebook className='lg:size-10 size-7 opacity-45' />
            <Youtube className='lg:size-10 size-7 opacity-45' />
            <Twitter className='lg:size-10 size-7 opacity-45' />
          </div>
        </div>
      </div>
    </div >
  )
}
export default page