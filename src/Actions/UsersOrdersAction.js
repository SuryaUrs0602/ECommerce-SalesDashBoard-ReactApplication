
export const FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST';
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS';
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR';


export const fetchOrdersRequest = () => ({
    type: FETCH_ORDERS_REQUEST
});

export const fetchOrdersSuccess = (orders) => ({
    type: FETCH_ORDER_SUCCESS,
    payload: orders
});

export const fetchOrdersError = (error) => ({
    type: FETCH_ORDERS_ERROR,
    payload: error
});