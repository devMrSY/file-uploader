import React from 'react'
import '../App.css'
import BootstrapTable from 'react-bootstrap-table-next'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css'
function table(props) {
  props.userData.map(data =>
    data.createdOn = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(props.createdOn)
  );
  const columns = [
    { dataField: 'firstName', text: 'firstName', sort: true, filter: textFilter() },
    { dataField: 'lastName', text: 'lastName', sort: true, filter: textFilter() },
    { dataField: 'email', text: 'email', sort: true, filter: textFilter() },
    { dataField: 'phone', text: 'phone' },
    { dataField: 'createdOn', text: 'createdOn' }
  ]
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage)
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage)
    }
  });
  console.log(props.userData)
  return (
    <div className='container'>
      <BootstrapTable
        bootstrap4
        keyField='id'
        columns={columns}
        data={props.userData}
        pagination={pagination}
        filter={filterFactory()} />
    </div>
  )
}

export default table