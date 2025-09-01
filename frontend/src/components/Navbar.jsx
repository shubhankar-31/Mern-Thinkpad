import React from 'react'
import {Link} from "react-router"
import {PlusIcon} from "lucide-react"
const Navbar = ({notes}) => {
  return (
   <header className='bg-bas-300 border-b border-base-content/10'>
    <div className='mx-auto max-w-6xl p-4'>
      <div className='flex items-center justify-between'> 
        <h1 className='text-3xl font-bold text-warning font-mono tracking-tight'>Thinkpad</h1>
        {notes.length!==0 && (<div className='flex items-center gap-4'>
        <Link to={"/create"} className='btn btn-warning'>
          <PlusIcon className='size-5' />
          <span>New Note</span>
        </Link>
        </div>)}
      </div>
    </div>
   </header>
  )
}

export default Navbar;