
import { CgClose } from "react-icons/cg";


function FullScreenModal({ children, title, className, btnName, footer, close }) {


  return (
    <div className="flex items-center justify-center z-[99999] fixed top-0 left-0 w-screen h-screen bg-gray-700/50">
      <div className={`w-[700px] px-4 py-2 bg-gray-600 rounded-md shadow-lg ${className ? className : ""}`}>
        <div className="flex justify-between py-2">
          <h2 className="text-xl font-medium text-gray-300">{title}</h2>
          <button onClick={() => close("")} className="text-xl">
            <CgClose className="" />
          </button>
        </div>

        <div className="divider bg-gray-700"></div>
        {children}
        {footer &&
          <>
            <div className="divider bg-gray-700"></div>
            <div className="text-end pt-2">
              <button className="text-sm btn btn-primary">
                {btnName ? btnName : "Save"}
              </button>
            </div>
          </>
        }

      </div>
    </div>
  );
}

export default FullScreenModal;