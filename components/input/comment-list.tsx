import { Comment } from "@/models/comment";
import classes from "./comment-list.module.css";

type Props = {
  items: Comment[] | undefined;
};

function CommentList(props: Props) {
  return (
    <ul className={classes.comments}>
      {props.items
        ? props.items.map((item) => (
            <li key={item._id}>
              <p>{item.text}</p>
              <div>
                By <address>{item.name}</address>
              </div>
            </li>
          ))
        : undefined}
    </ul>
  );
}

export default CommentList;
