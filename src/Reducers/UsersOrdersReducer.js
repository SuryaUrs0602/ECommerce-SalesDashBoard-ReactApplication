

import { FETCH_ORDERS_ERROR, FETCH_ORDERS_REQUEST, FETCH_ORDER_SUCCESS } from "../Actions/UsersOrdersAction";

const initialState = {
    orders: [],
    loading: false,
    error: ''
};


const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };

        case FETCH_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload
            };

        case FETCH_ORDERS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default: 
            return state;
    }
};


export default OrderReducer;