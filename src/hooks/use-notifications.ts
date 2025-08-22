import { useState, useEffect } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'welcome' | 'info' | 'success' | 'warning' | 'error';
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Verifica se é a primeira visita do usuário
    const hasVisited = localStorage.getItem('bionai-has-visited');
    
    if (!hasVisited) {
      // Cria notificação de boas-vindas
      const welcomeNotification: Notification = {
        id: 'welcome-1',
        title: 'Bem-vindo à BIONAI! 🎉',
        message: 'Estamos felizes em tê-lo aqui! Descubra como estamos revolucionando o monitoramento glicêmico com inteligência artificial.',
        timestamp: new Date(),
        read: false,
        type: 'welcome'
      };
      
      setNotifications([welcomeNotification]);
      setUnreadCount(1);
      
      // Marca que o usuário já visitou
      localStorage.setItem('bionai-has-visited', 'true');
    }
  }, []);

  useEffect(() => {
    // Atualiza contador de não lidas
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}`,
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
    removeNotification
  };
}
