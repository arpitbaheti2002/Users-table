import React from 'react';

function ColumnFilter({ column }) {

  const { filterValue, setFilter, Header } = column;

  console.log(column)
  return (
    <span>
      <input value={filterValue}
        placeholder={`Search by ${Header}`}
        onChange={(e) => setFilter(e.target.value)} 
      />
    </span>
  )
}

export default ColumnFilter;
