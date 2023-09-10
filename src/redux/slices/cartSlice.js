import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    totalPrice:0,
    items:[],
 }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addProductCart(state, actions){
    //     state.items.push(actions.payload);
    //     state.totalPrice = state.items.reduce((sum, obj) => {
    //         return Number(obj.price) + sum
    //     },0)
    removeProduct(state, actions){
        state.items = state.items.filter((el) => el.id !== actions.payload)
    },
    addProductCart(state, actions){
        const findItem = state.items.find((obj) => obj.id === actions.payload.id);
        if(findItem){
            findItem.count++;
        }else{
            state.items.push({
                ...actions.payload,
                count:1
            })
        }
        state.totalPrice = state.items.reduce((sum, obj) => {
                    return Number(obj.price) + sum
                },0)
    },
    repeadAddProductCart(state, actions){
        const elemCart = state.items.find((el) => el.id === actions.payload);
        if(elemCart){
            elemCart.count++
        }
        state.totalPrice = state.items.reduce((sum, obj) => {
            return Number(obj.price) + sum
        },0)
    },
    removeProductCart(state, actions){
        const minusElem = state.items.find((el) => el.id === actions.payload);
        if(minusElem.count <= 1){
            state.items = state.items.filter((el) => el.id !== minusElem.id);
        }
        if(minusElem){
            minusElem.count-=1;
        }
    },
    removeItem(state, actions){
        state.items = state.items.filter((el) => el.id !== actions.payload)
    },
    clearItems(state, actions){
        state.items = []
    }
   
  },
})

export const { addProductCart, repeadAddProductCart, removeProduct, removeItem, removeProductCart, clearItems} = cartSlice.actions
export default cartSlice.reducer