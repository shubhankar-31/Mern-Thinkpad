import React, { useState,useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, ArrowLeftSquare, Trash2Icon } from 'lucide-react';


const NoteDetailPage = () => {

  const[note,setNote] =useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false)


  const navigate=useNavigate();
  const{id}=useParams();


useEffect(() => {
  
  const fetchNote= async () => {
    try {
      const res=await api.get(`/notes/${id}`);
      setNote(res.data);
    } catch (error) {
      console.log("Error in fetching note")
      toast.error("Failed to fetch the note ")
    } finally{
      setLoading(false)
    }
  }

 fetchNote();
}, [id]);

  const handleDelete= async ()=>{
    if(!window.confirm("Are you sure you want to delete this note ?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note Deleted");
      navigate("/");
    } catch (error) {
      console.log("Error to delete Note ",error);
      toast.error("Failed to delete note");
    }

  }
  const handleSave= async ()=>{
      if(!note.title.trim()|| !note.content.trim()){
        toast.error("All fields are required");
        return;
      }
      setSaving(true);
      try {
        await api.put(`/notes/${id}`,note);
        toast.success("Note Updated");
        navigate("/");
    } catch (error) {
        console.log("Error to update Note ",error);
        toast.error("Failed to update note");
    }finally{
      setSaving(false);
    }
    
  }

if(loading===true){
  return (<div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-infinity loading-lg size-16"></span>
      </div>)
}

return (
  <div className="min-h-screen bg-base-200">
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftSquare className="size-5" />
            Back to Notes
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-primary btn-outline"
          >
            <Trash2Icon className="size-5" />
            Delete Note
          </button>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="form-control mb-4">
              <label className='label'>
                  <span className='label-text'>Title</span>
              </label>
              <input type="text"
                placeholder="New Note Title"
                className='input input-bordered input-accent'
                value={note.title}
                onChange={(e)=>setNote({...note,title:e.target.value})}
              />
            </div>

            <div className="form-control mb-4">
              <label className='label'>
                  <span className='label-text'>Content</span>
              </label>
              <textarea
                placeholder="New Note content"
                className='textarea teaxtarea-bordered h-32 input-info'
                value={note.content}
                onChange={(e)=>setNote({...note,content:e.target.value})}
              />
            </div>

            <div className="card-actions justify-end">
              <button className="btn btn-success" disabled={saving} onClick={handleSave}>
                {saving ? (<span className="loading loading-dots loading-lg"></span>) : "Save Changes"}
              </button>
            </div>
          </div>
        </div>



      </div>
    </div>
  </div>
);


};
export default NoteDetailPage;
