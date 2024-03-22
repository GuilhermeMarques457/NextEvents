import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { Comment } from "@/models/comment";
import notificationContext from "@/store/notification-context";
import NotificationContext from "@/store/notification-context";

function Comments(props: any) {
  const { eventId } = props;

  const notificationContext = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>();

  useEffect(() => {
    async function fetchComments() {
      const response = await fetch("/api/comments/" + eventId);
      const data = await response.json();
      setComments(data);
    }

    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);

    if (!showComments) {
    }
  }

  async function addCommentHandler(commentData: any) {
    const { email, name, text } = commentData;
    const requestBody = {
      email,
      name,
      text,
    };

    const response = await fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(requestBody),
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
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
