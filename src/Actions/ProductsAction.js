
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_QUANTITIES = 'SET_QUANTITIES';
export const SET_STOCK_LEVELS = 'SET_STOCK_LEVELS';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS';


export const fetchProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products 
});

export const fetchAllProducts = (allProducts) => ({
    type: SET_ALL_PRODUCTS,
    payload: allProducts
});

export const fetchCatgories = (categories) => ({
    type: SET_CATEGORIES,
    payload: categories
});

export const fetchQuantities = (quantities) => ({
    type: SET_QUANTITIES,
    payload: quantities
});

export const fetchStockLevel = (stockLevel) => ({
    type: SET_STOCK_LEVELS,
    payload: stockLevel
});

export const fetchError = (error) => ({
    type: SET_ERROR,
    payload: error
});

export const fetchClearProducts = () => ({
    type: CLEAR_PRODUCTS,
});
