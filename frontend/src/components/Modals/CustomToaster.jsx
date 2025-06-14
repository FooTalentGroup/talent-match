import { Toaster, toast } from "react-hot-toast";
import { AlertCircle } from "lucide-react";

const CustomToast = ({ message, type, t }) => {
  const renderIcon = () => {
    if (type === "success") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2ZM0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C4.477 20 0 15.523 0 10ZM14.664 6.753C14.862 6.92918 14.9819 7.17675 14.9975 7.44132C15.0131 7.70589 14.923 7.96582 14.747 8.164L9.414 14.164C9.32018 14.2696 9.20506 14.3541 9.07622 14.412C8.94738 14.4698 8.80774 14.4997 8.6665 14.4997C8.52526 14.4997 8.38562 14.4698 8.25678 14.412C8.12794 14.3541 8.01282 14.2696 7.919 14.164L5.253 11.164C5.08712 10.9645 5.0053 10.7083 5.02482 10.4495C5.04434 10.1907 5.16368 9.94972 5.35762 9.77732C5.55156 9.60493 5.80492 9.51467 6.06418 9.52562C6.32344 9.53657 6.56828 9.64787 6.747 9.836L8.667 11.995L13.253 6.835C13.4293 6.63716 13.677 6.51739 13.9415 6.50202C14.2061 6.48664 14.4659 6.57691 14.664 6.753Z"
            fill="#1FC16B"
          />
        </svg>
      );
    } else if (type === "error") {
      return <AlertCircle size={20} color="#ef4444" />;
    } else {
      return null;
    }
  };

  return (
    <div
      className="py-3 px-4 rounded-lg text-center bg-[#152d53] text-white w-full max-w-md flex items-center justify-center transition-all duration-300 cursor-pointer"
      onClick={() => toast.dismiss(t.id)}
    >
      <div className="flex items-center gap-3">
        {renderIcon()}
        <span>{message}</span>
      </div>
    </div>
  );
};

const activeToasts = new Set();

export const showToast = (message, type = "success") => {
  const toastId = `${message}-${type}`;

  if (activeToasts.has(toastId)) {
    return;
  }

  activeToasts.add(toastId);

  return toast.custom(
    (t) => {

      if (!t.visible) {
        setTimeout(() => activeToasts.delete(toastId), 300);
      }
      return <CustomToast message={message} type={type} t={t} />;
    },
    {
      id: toastId,
      duration: 2000,
    }
  );
};

const CustomToaster = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 2000,
        style: {
          background: "transparent",
          boxShadow: "none",
          padding: 0,
          width: "480px",
          maxWidth: "85%",
          fontSize: "16px",
          fontFamily: "inter, sans-serif",
          fontWeight: "300",
          textTransform: "capitalize",
          borderRadius: "8px",
        },
      }}
    />
  );
};

export default CustomToaster;
