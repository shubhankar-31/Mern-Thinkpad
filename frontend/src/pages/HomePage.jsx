import React from 'react'
import Navbar from "../components/Navbar"
import RateLimited from '../components/RateLimited'
import NoteCard from '../components/NoteCard'
import { useState,useEffect } from 'react'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'
import NotesNotFound from '../components/NotesNotFound.jsx'
const HomePage = () => {

  const [limited,setLimited]=useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const fetchNotes= async () => {
    
    try {
      const res=await api.get("/notes");
      setNotes(res.data);
      setLimited(false);
    } catch (error) {
      console.log("Error while fetching notes",error);
      if(error.response?.status===429)
          setLimited(true);
      else
        toast.error("Failed to load.")

    } finally{
      setLoading(false);
    }  }

  fetchNotes();
}, [])



  return (
    <div className='min-h-screen'>
      <Navbar notes={notes}/>
      {limited&& <RateLimited/>}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className='text-center text-info py-10'>
                  <span>Loading Notes...</span>
                  <span className="loading loading-ball loading-md"></span>
                  </div>
        }

        { notes.length===0 && !limited && !loading && <NotesNotFound/>}



        {
          notes.length>0 && !limited && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {notes.map((note)=>(
              
                      <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                    
                  ))}
            </div>
          ) 
        }




      </div>

    </div>
  )
}

export default HomePage