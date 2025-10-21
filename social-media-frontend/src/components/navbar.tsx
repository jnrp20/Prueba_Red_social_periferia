import React from 'react'
import Image from 'next/image';
export default function Navbar() {
  return (
    <div className='w-full h-[10vh] flex justify-between bg-green-500 items-center px-4 px-10' >

       
        <Image 
          width={220}  
          height={40} 
          className='rounded-full' 
          src="/periferia_it_group_logo.jpeg" 
          alt="perferia logo"  
        />
      

      <h1 className='font-sans text-2xl font-bold text-white'>PERIFERIA SOCIAL NETWORK</h1>
 

    </div>
  )
}