import React, {useState, useEffect} from 'react'
import Post from "../post/Post";
import { Posts } from "../../dummyData";
import axios from 'axios'; 
import './userProfile.css'

export default function UserProfile(props) {

  const [allPosts, setAllPosts] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  var i = 0;

  async function getUser() {    
    try {
      const token = localStorage.getItem("token");
      const {data} = await axios.get(`http://localhost:8080/api/v1/user/${props.userId}`, {
        headers:{
          authorization: `Bearer ${token}`
        }
      });
      const userObj = data;
      setUserInfo(userObj);
      // console.log("user: "+JSON.stringify(userInfo));
    } catch (error) {
      console.error(error.response.data);
    }
  }

  async function getAllPosts() {
    try {
      const token = localStorage.getItem("token");
      const {data} = await axios.get('http://localhost:8080/api/v1/post/', {
        headers:{
          authorization: `Bearer ${token}`
        }
      });
      const postsArray = data.userPosts;
      return postsArray;
      // await setAllPosts(prevPosts => {
      //   const newPosts = [...prevPosts, ...postsArray];
      //   console.log("New posts added:", newPosts);
      //   return newPosts;
      // });
      // console.log("allPostsssss"+JSON.stringify(allPosts));
      // setAllPosts(postsArray);
    } catch (error) {
        console.error(error.response.data);
    }
  }

  useEffect(() => {
    i++;
    if (i <= 1) {
      async function fetchUser() {
        await getUser();
      }
      fetchUser();
      async function fetchPosts() {
        const res = await getAllPosts();
        // setAllPosts(prevPosts => {
        //     const newPosts = [...prevPosts, ...res];
        //     console.log("New posts added:", newPosts);
        //     return newPosts;
        //   });
        await setAllPosts(prevPosts => [...prevPosts, ...res]);
        console.log("allPostsssss"+JSON.stringify(allPosts));
      }
      fetchPosts()
    };
  }, [])

  useEffect(() => {
    console.log("user: "+JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <div className="profile">
      <div className="profileCover">
        <img
          className="profileCoverImg"
          src={userInfo.coverPicture}
          alt=""
        />
      </div>
      <div className="profileInfo">
          <img
            className="profileUserImg"
            src={userInfo.profilePicture}
            alt=""
          />
          <div  className="profileDetails">
          <span className="profileName"><h4 className="profileInfoName">{props.username}</h4><span className="profileSeperator">&middot;</span><span className="userType">{props.userType}</span></span>
          <span className="profileBatch"><span>{userInfo.department}</span><span className="profileSeperator">&middot;</span><span>{userInfo.batch}</span></span>
          <span className="profileInfoDesc">{userInfo.desc}</span>
          </div>
      </div>
      <div className="profileBottom">
        <div className="profileBottomTags">
          <div>Posts</div>
          <div>Friends</div>
          <div>About</div>
        </div>
        {allPosts && allPosts.map((p) => (
          <Post user={userInfo} post={p} />
        ))}
      </div>
    </div>
  )
}
