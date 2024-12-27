import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { format } from 'date-fns';

const Pastes = () => {
  //retrives pastes property from paste slice of state
  const pastes = useSelector((state) => state.paste.pastes);

  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  //  new array on checking title contains searchTerm as a substring 
  // .to to make comparison case insensitive

  const filteredData = pastes.filter(

    (paste) => paste.title.toLowerCase().includes
      (searchTerm.toLowerCase())

  );

  //handle delete function 

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId))
  }

  return (

    <div className='flex flex-col items-center'>
      <input className='p-3 m-2 rounded-md w-96'
        type='text'
        placeholder='search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className=' flex flex-col gap-2 border p-2'>
        <h1 className='text-gray'>All Pastes</h1>

        {filteredData.length > 0 &&
          //returns JSX for each element
          filteredData.map(

            (paste) => {
              return (
                <div className='border' key={paste?._id}>

                  <div>
                    {paste.title}
                  </div>

                  <div>
                    {paste.content}
                  </div>

                  <div className='flex flex-row  gap-2 space content-evenly'>

                    <button   >
                      <NavLink to={`/?pasteId=${paste?._id}`}>
                        Edit
                      </NavLink>
                    </button>

                    <button   >
                    <NavLink to={`/viewPaste/${paste?._id}`}>
                        View
                      </NavLink>
                    </button>

                    <button onClick={() => handleDelete(paste?._id)}
                     >
                     delete
                    </button>

                    <button 
                     
                     onClick={() => (
                      // copy content to clipboard
                      navigator.clipboard.writeText(paste?.content),
                      toast.success("copied to clipboard")
                    )}>
                      Copy
                    </button>

                    {/* <button
                     >
                      Share 
                    </button> */}

                  </div>

                  <div>
                      {format(new Date(paste.createdAt),'dd-MM-yy')}
                  </div>

                </div>
              );
            }
          )
        }

      </div>
    </div>
  )


}

export default Pastes
