import React, {useState, useEffect} from 'react'
import TimelinePost from '../timelinePost/TimelinePost';
import axios from 'axios'; 
import DoneIcon from '@mui/icons-material/Done';
import './userProfile.css'

export default function UserProfile(props) {

  const [allPosts, setAllPosts] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [currView, setCurrView] = useState("posts");
  const [allFriends, setAllFriends] = useState([]);
  const [aboutInfo, setAboutInfo] = useState([]);
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
      setUserInfo(userObj.user);
      setAllFriends(userObj.userfriends)
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
    } catch (error) {
        console.error(error.response.data);
    }
  }

  async function getAboutInfo() {
    
  }

  function goToPosts() {
    setCurrView("posts");
  }

  function goToFriends() {
    setCurrView("friends");
  }

  function goToAbout() {
    setCurrView("about");
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
      }
      fetchPosts()

    };
  }, [])

  // useEffect(() => {
  //   console.log("userrrrr: "+JSON.stringify(userInfo));
  // }, [userInfo]);

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
          <div className={currView === "posts" ? "clr-green" : ""} onClick={goToPosts}>Posts</div>
          <div className={currView === "friends" ? "clr-green" : ""} onClick={goToFriends}>Friends</div>
          <div className={currView === "about" ? "clr-green" : ""} onClick={goToAbout}>About</div>
        </div>
        {currView === "posts" && allPosts && allPosts.map((p) => (
          <TimelinePost user={userInfo} post={p} />
        ))}
        {currView === "friends" && allFriends.length > 0 && allFriends.map((f) => (
          <UserFriend result={f} />
        ))}
        {currView === "friends" && allFriends.length == 0 && 
          <div className="user-profile-no-friends">No friends</div>
        }
        {currView === "about" && <div></div>}
      </div>
    </div>
  )
}

function UserFriend({result}) {
  return (
    <div className="user-profile-wrapper">
    <div className="user-profile-pp">
      <img className="user-profile-img" src={result.profilePicture} />
    </div>
    <div className="user-profile-info">
      <div><span className="user-profile-name">{result.firstName} {result.lastName}</span><span className="profileSeperator user-profile-grey">&middot;</span><span className="user-profile-grey italicize">{result.category}</span></div>
      <div><span className="user-profile-grey">{result.department}</span><span className="profileSeperator user-profile-grey">&middot;</span><span className="user-profile-grey">{result.batch}</span></div>
    </div>
    <div className="user-profile-add">
      <div className="user-profile-friend user-profile-grey"><DoneIcon sx={{ color: "white"}} /></div>
    </div>
  </div>
  )
}
