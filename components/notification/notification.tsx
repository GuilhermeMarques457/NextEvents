import { useContext } from "react";

import classes from "./notification.module.css";
import NotificationContext from "../../store/notification-context";

type Props = {
  title: string;
  message: string;
  status: string;
};

export default function Notification(props: Props) {
  const notificationCtx = useContext(NotificationContext);

  const { title, message, status } = props;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div
      className={activeClasses}
      onClick={notificationCtx.hideNotification}
      style={{ cursor: "pointer" }}
    >
      {/* <div className={activeClasses}> */}
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
