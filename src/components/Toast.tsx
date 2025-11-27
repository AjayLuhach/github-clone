import React, { useEffect } from 'react';
import { GoInfo } from 'react-icons/go';

interface IToastProps {
  title: string;
  message: string;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<IToastProps> = ({ title, message, onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-4 right-4 z-[9999] animate-slide-in-right">
      <div className="bg-[#161b22] border border-[#30363d] rounded-md shadow-2xl max-w-md overflow-hidden">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-full bg-[#1f6feb] flex items-center justify-center">
                <GoInfo className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[#e6edf3] font-semibold text-sm">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 text-[#7d8590] hover:text-[#e6edf3] transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path>
                  </svg>
                </button>
              </div>
              <p className="text-[#7d8590] text-sm mt-1 whitespace-pre-line">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="h-1 bg-[#30363d]">
          <div
            className="h-full bg-[#1f6feb] animate-toast-progress"
            style={{ animationDuration: `${duration}ms` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
