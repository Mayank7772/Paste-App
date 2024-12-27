
import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';


//creates object initial state intialize its property pastes with an empty array if data is not stored in local storage
const initialState = {
  pastes : localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))//deserialization usin JSON.parse bcoz Local Storage (key,value)=(string,string)
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      //extract data from action 
      const paste = action.payload;
      // adds new paste to the paste array of initial state
      state.pastes.push(paste);
      //update local storage with the new modified pastes array
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      //toast 
      toast.success("Paste created successfull")
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;// extracting data from action
      //if _id of any element of array  matches _id of paste then {number>0} else  -1
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      
      if(index >= 0){
        state.pastes[index]=paste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste updated")
      }

    },
    resetAllPastes: (state, action) => {
      state.pastes=[];
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id = pasteId );

      if(index>=0){
        state.pastes.splice(index,1);

        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Removed");
      }
    },

  },
})

// Action creators are generated for each case reducer function
export const { addToPastes,updateToPastes,resetAllPastes,removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer