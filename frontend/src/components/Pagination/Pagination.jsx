import React from 'react';
import RcPagination from 'rc-pagination';


const Pagination = () => {
  return (
    <>
      <RcPagination

        showTotal={(total, range) =>
          `${range[0]} - ${range[1]} of ${total} items`
        }
        total={15}
        className="text-gray-400"

        prevIcon="Previus"
        nextIcon="Next"
        //   defaultPageSize="8"
        pageSize="6"

      />
    </>
  )
}

export default Pagination