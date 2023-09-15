import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface FetchParams {
  currenPage:number;
  idCat:string;
  sortData:string;
}
type Pizza = {
  imageUrl:string
  title:string
  price:number
  category:string
  rating:string
  id:string
  sizes:number[]
  types:number[]
}
interface PizzaBlockSlice {
  items:Pizza[];
  status:string;
}
enum Status {
  LOADING = 'loading',
  SECCES = 'succes',
  ERROR = 'error'
}

export const fetchPizzas = createAsyncThunk(
   'pizza/fetchPizzasById',
   async (params:FetchParams, thunkApi) => {
    const {currenPage, idCat, sortData} = params;
    const { data } = await axios.get(`https://64ecb1c9f9b2b70f2bfacce8.mockapi.io/categoriPizza?page=${currenPage}&limit=4&category=${idCat}&sortBy=${sortData}`)
     return data as Pizza[]
   }
 )

 export const fullPizzaData = createAsyncThunk(
  'fullPizza/:id',
  async (id) => {
   const { data } =  await axios.get('https://64ecb1c9f9b2b70f2bfacce8.mockapi.io/categoriPizza/' + id)
    return data
  }
)

const initialState:PizzaBlockSlice = { 
   items:[],
   status:Status.LOADING,
 }

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
  setItems(state, actions){
    state.items = actions.payload
  },
},
extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING
            state.items = []
    },)
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = Status.SECCES
    },)
    builder.addCase(fetchPizzas.rejected, (state, action) => {
        state.status = Status.ERROR
        state.items = []
    })
  },
})


export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer
