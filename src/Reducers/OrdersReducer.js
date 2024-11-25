
import { FETCH_ORDERS_ERROR, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_REQUEST } from "../Actions/OrdersAction";

const initialState = {
    orders: [],
    loading: false,
    error: ''
};


const OrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case FETCH_ORDERS_SUCCESS:
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

export default OrdersReducer