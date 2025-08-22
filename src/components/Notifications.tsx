import { useState, useRef, useEffect } from 'react';
import { Bell, X, Check, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications, type Notification } from '@/hooks/use-notifications';
import { cn } from '@/lib/utils';

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
  switch (type) {
    case 'welcome':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'success':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    case 'error':
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    default:
      return <Info className="w-4 h-4 text-blue-500" />;
  }
};

const NotificationItem = ({ 
  notification, 
  onMarkAsRead, 
  onRemove 
}: { 
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "p-4 border-l-4 rounded-r-lg shadow-sm transition-all duration-200",
        notification.read 
          ? "bg-gray-50 border-gray-200" 
          : "bg-white border-blue-500 shadow-md",
        isHovered && "shadow-lg transform scale-[1.02]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <NotificationIcon type={notification.type} />
          <div className="flex-1 min-w-0">
            <h4 className={cn(
              "text-sm font-semibold mb-1",
              notification.read ? "text-gray-600" : "text-gray-900"
            )}>
              {notification.title}
            </h4>
            <p className={cn(
              "text-sm leading-relaxed",
              notification.read ? "text-gray-500" : "text-gray-700"
            )}>
              {notification.message}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {notification.timestamp.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-2">
          {!notification.read && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="p-1 text-gray-400 hover:text-green-600 transition-colors"
              title="Marcar como lida"
            >
              <Check className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onRemove(notification.id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            title="Remover notificação"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botão do sininho */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white/90 hover:text-white transition-colors duration-200 group"
        title="Notificações"
      >
        <Bell className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" />
        
        {/* Indicador de notificações não lidas */}
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
          >
            <span className="text-xs font-bold text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </motion.div>
        )}
      </button>

      {/* Dropdown de notificações */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-80 max-h-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Notificações</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Marcar todas como lidas
                  </button>
                )}
              </div>
            </div>

            {/* Lista de notificações */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Nenhuma notificação</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={markAsRead}
                      onRemove={removeNotification}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
