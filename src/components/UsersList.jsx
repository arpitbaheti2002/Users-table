import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table';
import { COLUMNS } from './columns';
import GlobalFilter from './GlobalFilter';
import ListControls from './ListControls';

function UsersList() {
  const [user_data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Getting the data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  // Deleting the data

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      setData((prevData) => prevData.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const columns = useMemo(() => COLUMNS(handleDelete), []);
  const data = useMemo(() => user_data, [user_data])

  const table = useTable({ columns, data, initialState: {pageSize: 7} }, useFilters, useGlobalFilter, useSortBy, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
  } = table;

  const { globalFilter, pageIndex, pageSize } = state;
  
  // Color status differently
  
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'green'; // Set your desired color for "active"
      case 'inactive':
        return 'red'; // Set your desired color for "inactive"
      case 'renewal':
        return 'orange'; // Set your desired color for "renewal"
      default:
        return 'black'; // Default color or any other color for unknown status
    }
  };

  return (
    <div>
      <div className='header'>
        <h1>List of Users</h1>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      
      <table {...getTableProps()}>
      <thead>
          {headerGroups.map((headerGroup, index) => (
            <React.Fragment key={index}>
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={column.isSorted ? 'sorted-header' : ''}
                  >
                    {column.render('Header')}
                    <span className='arrows'>{column.canSort ? (
                      column.isSorted ? (column.isSortedDesc ? ' ↓' : ' ↑') : ' ↑↓'
                    ) : (
                      ' '
                    )}</span>
                  </th>
                ))}
              </tr>
              <tr>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} {...column.getHeaderProps()}>
                    {column.canFilter ? column.render('Filter') : null}
                  </th>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {loading && <p>Loading...</p>}

          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{  color: cell.column.id === 'Status' ? getStatusColor(cell.value) : 'black',
                              fontWeight: cell.column.id === 'Status' ? 800 : 400 
                            }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <ListControls 
        pageSize = {pageSize}
        setPageSize = {setPageSize}
        pageIndex = {pageIndex}
        pageOptions = {pageOptions}
        gotoPage = {gotoPage}
        previousPage = {previousPage}
        nextPage = {nextPage}
        canPreviousPage = {canPreviousPage}
        canNextPage = {canNextPage}
        pageCount = {pageCount}
      />
    </div>
  );
}

export default UsersList;
