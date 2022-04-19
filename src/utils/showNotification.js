import { toast } from "react-toastify";

const showNotification = (message, type = "warning") => {
  const toastOptions = {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: "no-duplicate",
  };
  if (type === "success") {
    toast.success("✅ " + message, toastOptions);
    return;
  }
  if (type === "error") {
    toast.error("❗ " + message, toastOptions);
    return;
  }
  if (type === "info") {
    toast.info("ℹ️ " + message, toastOptions);
    return;
  }
  if (type === "warning") {
    toast.warn("⚠️ " + message, toastOptions);
    return;
  }
  //   success ? toast.success(message, toastOptions) : toast.error(message, toastOptions);
};

export default showNotification;
