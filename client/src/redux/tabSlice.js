import {createSlice} from '@reduxjs/toolkit'

const tabSlice = createSlice({
    name:'currentTab',
    initialState:{
        category:{
            id:0,label:''
        }
    },
    reducers:{
        selectTab:(state,payload)=>{
            state.category.id = payload.payload.id;
            state.category.label = payload.payload.label
        }
    }
})

export const {selectTab} = tabSlice.actions
export default tabSlice.reducer;