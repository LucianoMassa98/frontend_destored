import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

const Notification = ({ 
  type = 'info', // 'success', 'error', 'warning', 'info'
  message, 
  duration = 5000, 
  onClose,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          setTimeout(onClose, 300); // Dar tiempo para la animación
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <XCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return 'bg-green-800 text-green-200 border-green-600';
      case 'error':
        return 'bg-red-800 text-red-200 border-red-600';
      case 'warning':
        return 'bg-yellow-800 text-yellow-200 border-yellow-600';
      default:
        return 'bg-blue-800 text-blue-200 border-blue-600';
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`
      fixed top-4 right-4 z-50 
      flex items-center gap-3 
      px-4 py-3 rounded-md border
      ${getColors()}
      ${isVisible ? 'animate-slide-in' : 'animate-slide-out'}
      ${className}
    `}>
      {getIcon()}
      <span className="text-sm font-medium">{message}</span>
      {onClose && (
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-2 hover:opacity-75"
        >
          ✕
        </button>
      )}
    </div>
  );
};

// Hook para manejar notificaciones
export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now();
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove después del duration
    setTimeout(() => {
      removeNotification(id);
    }, notification.duration || 5000);

    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const NotificationContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          {...notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );

  return {
    addNotification,
    removeNotification,
    NotificationContainer
  };
};

export default Notification;
