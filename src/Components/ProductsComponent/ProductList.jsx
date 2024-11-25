import React, { useEffect } from 'react';
import FormatPrice from '../../Utils/FormatPrice';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import { useProductContext } from '../../Context/ProductsContext';
import { fetchError, fetchQuantities, fetchStockLevel } from '../../Actions/ProductsAction';

const ProductList = () => {



    const { state, dispatch } = useProductContext();
    const { quantities, stockLevel, error, products } = state;
    const id = sessionStorage.getItem('UserId');
    const token = sessionStorage.getItem('Token');
    const navigate = useNavigate();

    const handleBuy = (product) => {
        const quantity = quantities[product.productId] || 1;
        navigate('/ordersconfirm', { state: { product, quantity } });

    };



    useEffect(() => {
        const fetchStockLevels = async () => {
            try {
                const stockPromises = products.map((product) =>
                    axios.get(`https://localhost:7148/api/Inventories/${product.productId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                );
                const stockResponses = await Promise.all(stockPromises);
                const levels = {};
                stockResponses.forEach((response, index) => {
                    levels[products[index].productId] = response.data.stockLevel;
                });
                dispatch(fetchStockLevel(levels));
            } catch (error) {
                dispatch(fetchError(`Some problem Occured please try again later`))
            }
        };

        if (products.length > 0) {
            fetchStockLevels();
        }
    }, [products]);


    const handleQuantityChange = (productId, change) => {
        const currentQuantity = quantities[productId] || 1;
        const availableStock = stockLevel[productId] || 0;

        let newQuantity = currentQuantity + change;

        if (newQuantity < 1) {
            newQuantity = 1;
        } else if (newQuantity > availableStock) {
            newQuantity = availableStock;
        }

        dispatch(fetchQuantities({ ...quantities, [productId]: newQuantity }));
    };

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Orders</h1>
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div
                        key={product.productId}
                        className="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
                    >
                        <img
                            className="w-full h-48 object-cover"
                            src={product.productImageUrl}
                            alt={product.productName}
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{product.productName}</h3>
                            {id && (
                                <p className="text-gray-600">{product.productDescription}</p>
                            )}
                            <p className="text-blue-500">{<FormatPrice price={product.productPrice} />}</p>
                            {id && (
                                <div className="flex items-center mt-4">
                                    <button
                                        className="bg-gray-300 p-2 rounded-l"
                                        onClick={() => handleQuantityChange(product.productId, -1)}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={quantities[product.productId] || 1}
                                        readOnly
                                        className="w-12 text-center border-t border-b"
                                    />
                                    <button
                                        className="bg-gray-300 p-2 rounded-r"
                                        onClick={() => handleQuantityChange(product.productId, 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                            {id && (
                                <button
                                    className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                    onClick={() => handleBuy(product)}
                                >
                                    Buy
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;