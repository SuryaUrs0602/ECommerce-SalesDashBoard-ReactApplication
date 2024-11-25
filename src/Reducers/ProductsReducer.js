

import { SET_ALL_PRODUCTS,
    SET_CATEGORIES,
    SET_ERROR,
    SET_PRODUCTS,
    SET_QUANTITIES,
    SET_STOCK_LEVELS,
    CLEAR_PRODUCTS
 } from "../Actions/ProductsAction"

 export const initialState = {
    products: [],
    allProducts: [],
    categories: [],
    quantities: {},
    stockLevel: {},
    error: ''
 };

 const ProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };

        case SET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload
            };

        case SET_CATEGORIES: 
            return {
                ...state,
                categories: action.payload
            };

        case SET_QUANTITIES:
            return {
                ...state,
                quantities: action.payload
            };

        case SET_STOCK_LEVELS:
            return {
                ...state,
                stockLevel: action.payload
            };

        case CLEAR_PRODUCTS:
            return {
                ...state,
                products: state.allProducts
            };

        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
 };

export default ProductsReducer