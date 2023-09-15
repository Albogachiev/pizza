import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
    id: string;
    title:string;
    price:number;
    sizes:number;
    types:string;
    imageUrl:string;
    count:number;
   }
   interface cartSliceState {
    totalPrice:number;
    items:CartItem[];
   }

const initialState:cartSliceState = { 
    totalPrice:0,
    items:[],
 }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeProduct(state, actions:PayloadAction<string>){
        state.items = state.items.filter((el) => el.id !== actions.payload)
    },
    addProductCart(state, actions:PayloadAction<CartItem>){
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
                    return obj.price + sum
                },0)
    },
    repeadAddProductCart(state, actions: PayloadAction<string>){
        const elemCart = state.items.find((el) => el.id === actions.payload);
        if(elemCart){
            elemCart.count++;
        }
        state.totalPrice = state.items.reduce((sum, obj) => {
            return obj.price + sum
        },0)
    },
    removeProductCart(state, actions:PayloadAction<string>){
        const minusElem = state.items.find((el) => el.id === actions.payload);
        if(minusElem){
            if(minusElem.count <= 1){
                state.items = state.items.filter((el) => el.id !== minusElem.id);
            }
            if(minusElem){
                minusElem.count-=1;
            }
        }
    },
    removeItem(state, actions){
        state.items = state.items.filter((el) => el.id !== actions.payload)
    },
    clearItems(state, actions){
        state.items = [];
        state.totalPrice = 0;
    }
   
  },
})

export const { addProductCart, repeadAddProductCart, removeProduct, removeItem, removeProductCart, clearItems} = cartSlice.actions
export default cartSlice.reducer