import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterSliceState {
  categoryId:number;
  sort:{
    name:string;
    sort:string;
  }
  search:string;
  currentPage:number;
}

const initialState:FilterSliceState = { 
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
    setCategoryId(state, actions:PayloadAction<number>){
        state.categoryId = actions.payload
    },
    setSort(state, actions:PayloadAction<{name:string, sort:string}>){
        state.sort = actions.payload
    },
    searchInput(state, actions:PayloadAction<string>){
      state.search = actions.payload
    },
    setPage(state, actions:PayloadAction<number>){
      state.currentPage = actions.payload
    },
    setFilters(state, actions){
      state.categoryId = actions.payload.category;
      state.sort = actions.payload.sortBy;
      state.currentPage = actions.payload.page;
    }
  },
})

export const { setCategoryId, setSort, searchInput, setFilters, setPage } = filterSlice.actions
export default filterSlice.reducer