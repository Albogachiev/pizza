import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    categoryId:0,
    sort: {
        name:'популярности', sort:'rating'
    },
    search: '',
    currentPage: 1,
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
    },
    searchInput(state, actions){
      state.search = actions.payload
    },
    setPage(state, actions){
      state.currentPage = actions.payload
    },
    setFilters(state, actions){
      state.categoryId = actions.payload.category;
      state.sort = actions.payload.sortFilt;
      state.currentPage = actions.payload.page;
    }
  },
})

export const { setCategoryId, setSort, searchInput, setFilters, setPage } = filterSlice.actions
export default filterSlice.reducer