import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector}from  'react-redux' 
import { updateToPastes,removeFromPastes,resetAllPastes,addToPastes } from '../redux/pasteSlice';
import { useParams } from 'react-router-dom';


const ViewPaste = () => {

  //destructuring  the object to get id parameter
  const {id} = useParams();
  const pastes = useSelector ((state) => state.paste.pastes)
  const paste = pastes.find((p) => p._id === id )


  return (
    <div>
    <div>
       <input className='p-3 m-2 rounded-md' 
       type="text" 
       value={paste.title}
       disabled
       
       />
  </div>

  <div>
   <textarea
   className='p-3 m-2 rounded-md  min-w-[500px] rounded' 
   disabled
   value={paste.content}
   
   rows={20}
   />
  </div>
 </div>
  )
}

export default ViewPaste
