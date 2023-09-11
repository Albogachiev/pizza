import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
   'pizza/fetchPizzasById',
   async ({currenPage, idCat, sortData}) => {
    const { data } = await axios.get(`https://64ecb1c9f9b2b70f2bfacce8.mockapi.io/categoriPizza?page=${currenPage}&limit=4&category=${idCat}&sortBy=${sortData}`)
     return data
   }
 )

const initialState = { 
   items:[],
   status:'loading'
 }

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
  setItems(state, actions){
    state.items = actions.payload
  }
},
extraReducers: (builder) => {
    builder.addCase(
    fetchPizzas.pending, (state, action) => {
            state.status = 'loading'
            state.items = []
    },)
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'success'
    },)
    builder.addCase(fetchPizzas.rejected, (state, action) => {
        state.status = 'error'
        state.items = []
    })
  },
})

export const { setItems, } = pizzaSlice.actions
export default pizzaSlice.reducer
