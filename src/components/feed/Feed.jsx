import React, {useEffect, useState} from 'react'
import TimelinePost from "../timelinePost/TimelinePost";
import Shared from "../shared/Shared";
import "./feed.css";
import { Posts } from "../../dummyData";
import axios from 'axios'; 
var jwt = require("jsonwebtoken");

export default function Feed(props) {

  const [allPosts, setAllPosts] = useState([]);
  var i = 0;

  async function getAllPosts() {
    try {
      const token = localStorage.getItem("token");
      const {data} = await axios.get('http://localhost:8080/api/v1/post/timeline/all', {
        headers:{
          authorization: `Bearer ${token}`
        }
      });
      console.log("POSTS: " + data);
      const postsArray = data.friendPosts;
      return postsArray;
    } catch (error) {
        console.error(error.response.data);
    }
  }

  useEffect(() => {
    i++;
    if (i <= 1) {
      async function fetchPosts() {
        const res = await getAllPosts();
        // await setAllPosts(prevPosts => [...prevPosts, ...res]);
        await setAllPosts(res);
      }
      fetchPosts()
    }
  }, [])

  useEffect(() => {
  }, [allPosts])

  return (
    <div className="feed">
      <div className="feedWrapper"><Shared username={props.username} profilePicture={props.profilePicture}/>
        {allPosts && allPosts.map((p) => (
          <TimelinePost post={p} key={p._id} />
        ))}
      </div>
    </div>
  );
}