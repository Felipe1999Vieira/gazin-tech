import { toast } from "react-toastify";

export function Toast(
  type: "success" | "error" | "info" | "warning",
  message: string
) {
  const toastTypes = {
    success: toast.success,
    error: toast.error,
    info: toast.info,
    warning: toast.warning,
  };

  toastTypes[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}
