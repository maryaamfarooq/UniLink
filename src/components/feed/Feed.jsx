import React, {useState} from 'react'
import Post from "../post/Post";
import Shared from "../shared/Shared";
import "./feed.css";
import { Posts } from "../../dummyData";
var jwt = require("jsonwebtoken");

export default function Feed(props) {

  const token = localStorage.getItem("token");
  const decodedToken = jwt.decode(token);
  console.log(decodedToken);

  // const [postDetails, setPostDetails] = useState({
  //   firstName: "",
  //   lastName: "",
  //   description: "",
  //   createdAt: "",
  //   likes: [],
  //   comments: [],
  // })
  // setPostDetails({
  //   firstName: decodedToken.firstName,
  //   lastName: decodedToken.lastName
  // })
  // postDetails.firstName = decodedToken.firstName;
  // postDetails.lastName = decodedToken.lastName;

  // const [postDetails, setPostDetails] = useState({
  //   createdAt: "",
  //   createdBy: "",
  //   desc: "",
  //   hashtags: [],
  //   likes: [],
  //   _id: 0
  // })

  // const [posts, setPosts] = useState([])

  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* {props.currComponent === "newsfeed" && <Shared />} */}
        {/* <Shared token={props.token} setPostDetails={setPostDetails} setPosts={setPosts}/> */}
        <Shared/>
        {/* {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))} */}
        {/* <div className="temp">POST DEETSSSSSSSSSSS{postDetails.desc}</div> */}
      </div>
    </div>
  );
}