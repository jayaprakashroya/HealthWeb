import { useEffect } from 'react';

const NotificationHandler = () => {
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(perm => {
        if (perm === 'granted') {
          new Notification('Daily Reminder: Log your mood!');
        }
      });
    }
  }, []);
  return null;
};

export default NotificationHandler;