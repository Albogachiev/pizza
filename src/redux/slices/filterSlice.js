import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    categoryId:0,
    sort: {
        name:'популярности', sort:'rating'
    },
 }

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, actions){
        state.categoryId = actions.payload
    },
    setSort(state, actions){
        state.sort = actions.payload
    }
  },
})

export const { setCategoryId, setSort } = filterSlice.actions
export default filterSlice.reducer