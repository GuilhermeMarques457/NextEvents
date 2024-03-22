import { Notification } from "@/models/notification";
import React, { ReactNode, createContext, useState, useEffect } from "react";

type contextType = {
  notification: Notification | null;
  showNotification: (notificationData: Notification) => void;
  hideNotification: (notificationData: any) => void;
};

const contextDefaultValues: contextType = {
  notification: null,
  showNotification: (notificationData: Notification) => {},
  hideNotification: (notificationData: any) => {},
};

const NotificationContext = createContext<contextType>(contextDefaultValues);

type Props = {
  children: ReactNode;
};

export function NotificationContextProvider({ children }: Props) {
  const [activeNotification, setActiveNotification] = useState<any>();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 10000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData: Notification) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler(notificationData: any) {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
