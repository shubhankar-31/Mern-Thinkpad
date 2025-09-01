import Note from "../models/Note.js";

export const getAllNotes= async (_,res)=>{
    
try {
    const notes=await Note.find().sort({createdAt:-1});
    res.status(200).json(notes);

} catch (error) {
    res.status(500).json({message:"Internal Server error"});
    console.error("error in getallcontroller",error);
}



};
export const createNote= async (req,res)=>{
    try {
        const {title,content}=req.body;
        const newNote=new Note({title:title, content:content});


        const savedNote=await newNote.save();
        res.status(201).json(savedNote);
        
    } catch (error) {
        res.status(500).json({message:"Internal Server error"});
        console.error("error in creatNote Handler",error);
    }
}
export const updateNote= async (req,res)=>{
    
    try {
        const {title,content}=req.body;

        const updatedNote= await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true});

        if(!updateNote)
            return res.status(404).json({message:"note not found"})
        res.status(200).json(updatedNote)



    } catch (error) {
        res.status(500).json({message:"Internal Server error"});
        console.error("error in updateNote Handler",error);
    }


}
export const deleteNote= async (req,res)=>{
    try {
        const deletedNote=await Note.findByIdAndDelete(req.params.id);
        
        if(!deletedNote)
            return res.status(404).json({message:"note not found"})

        res.status(200).json({message:"Note deleted correctly"});

    } catch (error) {
        res.status(500).json({message:"Internal Server error"});
        console.error("error in deleteNote Handler",error);
    }
}
export const getNoteById= async (req,res)=>{
   try {
         const singleNote=await Note.findById(req.params.id);
         if(!singleNote)
            return res.status(404).json({message:"note not found"});

        res.status(200).json(singleNote);

       
   } catch (error) {
        res.status(500).json({message:"Internal Server error"});
        console.error("error in getNoteById Handler",error);
   }

}