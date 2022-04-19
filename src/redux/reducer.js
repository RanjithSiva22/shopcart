import { STORE_PRODUCTS,CART_ITEMS,REMOVE_ITEMS,UPDATE_QTY,PAYMENT_OVER} from './actions';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage' 

const initState = {
    products: [],
    cart:[],
}


export const addProducts = (state = initState, action) => {
    switch (action.type) {
        case STORE_PRODUCTS:
            return { ...state, products: action.data };
        default:
            return state;
    }
}


export const cartProducts = (state = initState, action) => {
    switch (action.type) {
        case CART_ITEMS:
            return {...state,cart:[...state.cart,action.purchase]};
        case REMOVE_ITEMS:
            const arr=state.cart.filter((item)=>item.id!==action.remove);
            // console.log(arr);
            return {...state,cart:arr};
        case UPDATE_QTY:
            return {...state,cart:[...action.update]};
        default:
            return state;
    }
}





export const appReducer= combineReducers({
    addProducts,
    cartProducts,
    
});

const rootReducer = (state, action) => {
    if (action.type === PAYMENT_OVER) {
        storage.removeItem('persist:root');
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

export default rootReducer;