import React from "react";
import { useState} from 'react';



export const SearchBar = ({ onSearch }) => {

    const [searchString, setSearchString] = useState(null);

    const handleInputChange = (event) => {
        console.log('value:', event.target.value);
        setSearchString(event.target.value);
    };

    const handleKeyPress = (event) => {
        console.log('event:', event, searchString);
        if (event.key === 'Enter') {
            if (searchString !== null) {
                onSearch(searchString);
            }
        }
    };

    return (
       
        <div className="w-full flex items-center px-4 h-10 max-w-xs rounded-lg bg-white shadow-md">
            <span className="material-symbols-outlined search">
                search
            </span>
            <input className=" w-full bg-transparent border-none text-base ml-1 focus:outline-none" placeholder="Search..." onKeyUp={handleKeyPress} onChange={handleInputChange} />
        </div>
    );
}