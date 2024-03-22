import { FormEvent, useContext, useRef } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "@/store/notification-context";

function NewsletterRegistration() {
  const emailInput = useRef<any>(null);
  const notificationContext = useContext(NotificationContext);

  async function registrationHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    notificationContext.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter",
      status: "pending",
    });

    const email = emailInput.current.value;

    const response = await fetch("api/newsletter", {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      notificationContext.showNotification({
        title: "Succcess",
        message: "Success registering for newsletter",
        status: "success",
      });

      return;
    }

    notificationContext.showNotification({
      title: "Error!",
      message: data.message || "Something went wrong",
      status: "error",
    });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInput}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
