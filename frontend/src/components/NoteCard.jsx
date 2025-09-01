import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils.js'
import api from "../lib/axios.js"
import toast from "react-hot-toast"
const NoteCard = ({note,setNotes}) => {

  const handleDelete=async (e,id) => {
    e.preventDefault();
    
    if(!window.confirm("Your sure u wanna delete this note ?"))
        return;

    try {
      
      await api.delete(`/notes/${id}`)
      setNotes((prevNotes)=>prevNotes.filter(note=>note._id!=id))//Getting rid ofe the deleted ones
      toast.success("Note deleted");


    } catch (error) {
      toast.error("Failed to delete note");
    }
    //refreshing after deleting a note
    //  window.location.reload();
    
  }



  return (
    <Link to={`/note/${note._id}`}
        className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]"
    >

        <div className='card-body'>
             <h3 className="card-title text-primary">{note.title}</h3>
             <p className="text-base-content/90 line-clamp-3">{note.content}</p>
            <div className='card-actions justify-between items-center mt-4'>
                <span className='text-sm text-base-content/60'>{formatDate(new Date(note.createdAt))}</span>
                <div className='flex items-center gap-1'>
                    <PenSquareIcon className='size-4'/>
                    <button className='btn btn-ghost btn-xs text-primary' onClick={(e)=>{handleDelete(e,note._id)}}>
                        <Trash2Icon className='size-4'/>
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default NoteCard