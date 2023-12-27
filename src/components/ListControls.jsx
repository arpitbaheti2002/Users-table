import React from 'react';

function ListControls(props) {
  return (
    <div className='list-controls'>
      <div className='buttons'>
        <button onClick={() => props.gotoPage(0)} disabled={!props.canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => props.previousPage()} disabled={!props.canPreviousPage}>
          {'< '}Previous
        </button>
        <button onClick={() => props.nextPage()} disabled={!props.canNextPage}>
          Next{' >'}
        </button>
        <button onClick={() => props.gotoPage(props.pageCount - 1)} disabled={!props.canNextPage}>
          {'>>'}
        </button>
      </div>

      <div className='page-numbers'>
        Page{' '}
        {props.pageIndex + 1} of {props.pageOptions.length}{' '}
      </div>


      <span className='page-info'>
        <span>
          Go to page:{' '}
          <input
            type="number"
            defaultValue={props.pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
              props.gotoPage(pageNumber);
            }}
          />
        </span>

        <span>
          <label>
            {'  '} | Page Size:{' '}
            <select
              value={props.pageSize}
              onChange={(e) => {
                props.setPageSize(Number(e.target.value));
              }}
            >
              {[5, 7, 10, 25, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </span>
      </span>
    </div>
  )
}

export default ListControls;
