import ColumnFilter from './ColumnFilter';
import DeleteButton from './DeleteButton';

export const COLUMNS = (handleDelete) => [
  {
    Header: 'S.no', 
    accessor: (row, index) => index + 1,
    Filter: '',
    disableSortBy: true
  },
  {
    Header: '', 
    accessor: 'Image',
    Cell: ({ value }) => <img src={value} alt="User" style={{ width: '50px', height: '50px' }} />,
    Filter: "",
    disableSortBy: true
  },
  {
    Header: 'Name', 
    accessor: 'Name',
    Filter: ColumnFilter
  },
  {
    Header: 'Gender', 
    accessor: 'Gender',
    Filter: ColumnFilter
  },
  {
    Header: 'Country', 
    accessor: 'Country',
    Filter: ColumnFilter
  },
  {
    Header: 'Email', 
    accessor: 'email',
    Filter: ColumnFilter
  },
  {
    Header: 'Date', 
    accessor: 'Date',
    Filter: ColumnFilter
  },
  {
    Header: 'Status', 
    accessor: 'Status',
    Filter: ColumnFilter
  },
  {
    Header: 'Actions',
    accessor: 'id',
    Cell: ({ value }) => <DeleteButton id={value} onDelete={handleDelete} />,
    Filter: '',
    disableSortBy: true
  },
]