
import { createContext, useContext, useReducer } from 'react'
import ProductsReducer, { initialState } from '../Reducers/ProductsReducer'

const ProductContext = createContext();

export const useProductContext = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ProductsReducer, initialState);

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            { children }
        </ProductContext.Provider>
    )
}