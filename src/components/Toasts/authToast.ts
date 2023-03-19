import { toast } from "react-toastify";

const createAuthToast = () => {
  const toastId = toast.loading("Promise", {
    position: "top-center",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  return toastId;
};

export default createAuthToast;
