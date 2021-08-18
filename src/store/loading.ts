import { createSlice,PayloadAction } from "@reduxjs/toolkit";


export interface LoadingState{
    loading:boolean,
    success:boolean,
    error:boolean
}

const initialState ={
    loading:false,
    success:false,
    error:false,
} as LoadingState



export const loadingSlice =createSlice({
    name:'loading',
    initialState,
    reducers:{
        loading:(state , action:PayloadAction<boolean>)=>{
            state.loading = action.payload
        }
    }
})


export const {loading} = loadingSlice.actions;
export default loadingSlice.reducer
