export interface Notification {
  message: string;
  title: string;
  status: "success" | "error" | "pending";
}
