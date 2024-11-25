

export const FETCH_INVENTORY_REQUEST = 'FETCH_INVENTORY_REQUEST';
export const FETCH_INVENTORY_SUCCESS = 'FETCH_INVENTORY_SUCCESS';
export const FETCH_INVENTORY_ERROR = 'FETCH_INVENTORY_ERROR';


export const fetchInventoryRequest = () => ({
    type: FETCH_INVENTORY_REQUEST
});

export const fetchInventorySuccess = (inventory) => ({
    type: FETCH_INVENTORY_SUCCESS,
    payload: inventory
});

export const fetchInventoryError = (error) => ({
    type: FETCH_INVENTORY_ERROR,
    payload: error
});