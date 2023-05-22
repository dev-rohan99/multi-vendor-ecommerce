import React, { useEffect } from 'react';
import { CgClose } from 'react-icons/cg';

const DeleteModal = ({ handleCancel, handleDelete , title}) => {
  useEffect(() => {
    const root = document?.querySelector("html");
    root.style.overflow = "hidden"
  }, [])


  return (
    <div className='fixed z-[9999999999999999999] top-0 left-0 flex items-center justify-center h-screen w-screen bg-gray-800/50'>
      <div className='bg-gray-700 w-[400px] rounded-md shadow-xl'>
        <div className="flex justify-between py-2 text-gray-300  px-3">
          <h2 className="text-xl font-medium">{title}</h2>
          <button onClick={handleCancel} className="text-xl">
            <CgClose className="" />
          </button>
        </div>
        <div className="divider bg-gray-600"></div>

        <div className='py-5 px-3' >
          <p className='text-gray-300'>Are you sure?</p>
        </div>


        <div className="text-end pt-2 pb-3 px-3">
          <button onClick={handleCancel} className="text-sm btn btn-primary">
            Cancel
          </button>
          <button onClick={handleDelete} className="text-sm btn btn-danger ml-3">
            Delete
          </button>
        </div>
      </div>


    </div>
  )
}

export default DeleteModal;