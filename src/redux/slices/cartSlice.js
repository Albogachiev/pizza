import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    totalPrice:0,
    items:[],
 }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductCart(state, actions){
        state.items.push(actions.payload);
        state.totalPrice = state.items.reduce((sum, obj) => {
            return Number(obj.price) + sum
        },0)
    },
    removeItem(state, actions){
        state.items = state.items.filter((el) => el.id !== actions.payload)
    },
    clearItems(state, actions){
        state.items = []
    }
   
  },
})

export const { addProductCart, removeItem, clearItems} = cartSlice.actions
export default cartSlice.reducer