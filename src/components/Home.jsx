import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import {useDispatch, useSelector}from  'react-redux' 
import { updateToPastes,removeFromPastes,resetAllPastes,addToPastes } from '../redux/pasteSlice';

const Home = () => {

    const [title,setTitle] = useState("");//title of pastes
    const [value,setValue] = useState("");//value of pastes 
    //search params contains query parameters (stores key value pair after ex:- ?search=react&sort=desc)
    const [searchParams,setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    //dispatcher for dispatching tasks
    const dispatch = useDispatch();
    //function to create paste
    //to get all pastes from state
    const allPastes = useSelector((state) => (state.paste.pastes))
    const paste = allPastes.find((p) => (p._id === pasteId));
    //runs when value of pasteId is changed
    useEffect(() => {
      if(pasteId){
        setTitle(paste.title)
        setValue(paste.content)
      }
    }, [pasteId])
    

    function createPaste(){
      //object paste constains all fields
      const paste = {
        title :title,
        content:value,
        _id : pasteId || Date.now().toString(36),
        //way to capture the current date and time in the ISO 8601 string format.
        createdAt : new Date().toISOString()
      } 
      //if paste is already created
       if(pasteId){
        dispatch(updateToPastes(paste));
       }
       //to create new paste
       else{
          dispatch(addToPastes(paste));
       }

       //after creation or updation
       setTitle('');
       setValue('');
       //to reset search params bcoz search params contains query parameters which constain object  
       setSearchParams({});
    }
  return (
  <div className='flex flex-col items-center '>

     <div className='w-3/4 box-border mt-2 border-solid outline-black '>
        <input className='p-3 m-2 rounded-md w-3/4 box-border' 
        type="text" 
        placeholder='enter title here'
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />

        <button className='p-3 m-2 box-border'
         onClick={createPaste}
        >
            {pasteId ? "Update Paste" : "Create My Paste"}
        </button>
   </div>

   <div className='w-3/4 border-solid outline-black'>
    <textarea
    className='p-3 m-2 rounded-md  w-full rounded' 
    value={value}
    placeholder='enter text here'
    onChange={(e)=> setValue(e.target.value)}
    rows={20}
    />
   </div>

  </div>
  )
}

export default Home
