import { Fragment, useContext } from "react";
import Notification from "@/components/notification/notification";
import MainHeader from "./main-header";
import NotificationContext from "@/store/notification-context";

function Layout(props: any) {
  const notificationContext = useContext(NotificationContext);
  const activeNotification = notificationContext.notification;
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification ? (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      ) : undefined}
    </Fragment>
  );
}

export default Layout;
