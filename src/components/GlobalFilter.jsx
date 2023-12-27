import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import { IconContext } from 'react-icons';
import { FaSearch } from "react-icons/fa";

function GlobalFilter({filter, setFilter}) {
  const [filterValue, setFilterValue] = useState('');

  const onFilter = useAsyncDebounce((value) => {
    setFilter(value);
  }, 300)
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    onFilter(value);
  };

  return (
    <div className='global-search'>
      <IconContext.Provider value={{ color: 'gainsboro', size: '20px' }}>
        <FaSearch />
      </IconContext.Provider>
      <input value={filterValue} onChange={handleInputChange} placeholder='Global Search'/>
    </div>
  )
}

export default GlobalFilter;
