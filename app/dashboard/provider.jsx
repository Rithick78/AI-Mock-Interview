import React from 'react'
import Header from './_components/Header'
import { Slide, ToastContainer,toast} from 'react-toastify'

function DasboardProvider({ children }) {
  return (
   <div className='min-h-screen bg-[#fdfcff] bg-[radial-gradient(circle_at_20%_30%,rgba(192,132,252,0.35)_0%,transparent_60%),radial-gradient(circle_at_80%_20%,rgba(96,165,250,0.35)_0%,transparent_60%),radial-gradient(circle_at_30%_80%,rgba(253,186,116,0.35)_0%,transparent_60%),radial-gradient(circle_at_70%_80%,rgba(134,239,172,0.35)_0%,transparent_60%)]'>
       <Header/>
       { children }
       <ToastContainer
        position="top-center"
        autoClose={5000}
        theme="colored"
         transition={Slide}
       />
    </div>
  )
}

export default DasboardProvider