import React from 'react';
import { useProductContext } from '../../Context/ProductsContext';

const FilterSection = ({ onCategoryClick, onClearFilters }) => {

    const { state } = useProductContext();
    const { categories } = state;

    return (
        <div className="p-4 border rounded shadow-md">
            <h2 className="text-lg font-semibold text-center mb-2">Category</h2>
            <div className="flex flex-col items-center">
                {categories.map((currEle, index) => (
                    <button
                        key={index}
                        onClick={() => onCategoryClick(currEle)}
                        className="w-full text-left p-2 my-1 rounded hover:bg-gray-200"
                    >
                        {currEle}
                    </button>
                ))}
            </div>
            <div>
                <button 
                    onClick={onClearFilters}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
};

export default FilterSection;

