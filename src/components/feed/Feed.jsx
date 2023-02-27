import Post from "../post/Post";
import Shared from "../shared/Shared";
import "./feed.css";
import { Posts } from "../../dummyData";

export default function Feed(props) {
  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* {props.currComponent === "newsfeed" && <Shared />} */}
        <Shared />
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}