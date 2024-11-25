
import { FETCH_INVENTORY_REQUEST, FETCH_INVENTORY_SUCCESS, FETCH_INVENTORY_ERROR } from "../Actions/InventoryTableAction";

export const initialState = {
    inventory: [],
    loading: false,
    error: ''
};

const InventoryTableReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INVENTORY_REQUEST:
            return {
                ...state,
                loading: true
            };

        case FETCH_INVENTORY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case FETCH_INVENTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                inventory: action.payload
            };

        default:
            return state;
    }
};

export default InventoryTableReducer