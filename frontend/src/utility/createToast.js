import { toast } from "react-toastify";


const createToast = (type = "info", message) => {

    switch(type){

        case "error":
            toast.error(message);
            break;

        case "success":
            toast.success(message);
            break;

        case "warn":
            toast.warn(message);
            break;

        default:
            toast.info(message);
            break;

    }

}

export default createToast;
