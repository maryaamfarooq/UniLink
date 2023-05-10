import React, {useState, useEffect} from 'react'
import TimelinePost from '../timelinePost/TimelinePost';
import axios from 'axios';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import './view-user-profile.css'

export default function ViewUserProfile(props) {

    const [allPosts, setAllPosts] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [openRemoveFriend, setOpenRemoveFriend] = useState(false);
    const [openRespondToRequest, setOpenRespondToRequest] = useState(false);
    const [openCancelFriendRequest, setOpenCancelFriendRequest] = useState(false);
    const [currReqStatus, setCurrReqStatus] = useState();
    var i = 0;
  
    async function getUser() {    
      try {
        const token = localStorage.getItem("token");
        const {data} = await axios.get(`http://localhost:8080/api/v1/user/${props.userInfo._id}`, {
            headers:{
              authorization: `Bearer ${token}`
            }
          });
        const userObj = data;
        setUserInfo(userObj.user);
      } catch (error) {
        console.error(error.response.data);
      }
    }
  
    async function getAllPosts() {
      try {
        const token = localStorage.getItem("token");
        const {data} = await axios.get(`http://localhost:8080/api/v1/post/${props.userInfo._id}/otherUser`, {
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

    async function acceptFriendRequest() {
      setOpenRespondToRequest(false)
      // setCurrReqStatus(1);
      try {
        const token = localStorage.getItem("token");
        const {data} = await axios.put(`http://localhost:8080/api/v1/user/${props.userInfo._id}/respondRequest`, { type: 'accept' }, {
            headers:{
              authorization: `Bearer ${token}`
            }
          });
          // console.log(data);
          setCurrReqStatus(data.requestStatus);
      } catch (error) {
          console.error(error.response.data);
      }
    }

    async function rejectFriendRequest() {
      setOpenRespondToRequest(false)
      // setCurrReqStatus(0);
      try {
        const token = localStorage.getItem("token");
        const {data} = await axios.put(`http://localhost:8080/api/v1/user/${props.userInfo._id}/respondRequest`, { type: 'reject' }, {
            headers:{
              authorization: `Bearer ${token}`
            }
          });
          // console.log(data);
          setCurrReqStatus(data.requestStatus);
      } catch (error) {
          console.error(error.response.data);
      }
    }

    async function sendFriendRequest() {
      // setCurrReqStatus(2);
      try {
        const token = localStorage.getItem("token");
        const {data} = await axios.put(`http://localhost:8080/api/v1/user/${props.userInfo._id}/sendRequest`, null, {
            headers:{
              authorization: `Bearer ${token}`
            }
          });
          setCurrReqStatus(data.requestStatus);
      } catch (error) {
          console.error(error.response.data);
      }
    }

    async function cancelFriendRequest() {
      setOpenCancelFriendRequest(false);
      // setCurrReqStatus(0);
      try {
        const token = localStorage.getItem("token");
        const {data} = await axios.put(`http://localhost:8080/api/v1/user/${props.userInfo._id}/respondRequest`, { type: 'cancel' }, {
            headers:{
              authorization: `Bearer ${token}`
            }
          });
          // console.log(data);
          setCurrReqStatus(data.requestStatus);
      } catch (error) {
          console.error(error.response.data);
      }
    }

    async function removeFriend() {
      setOpenRemoveFriend(false);
      // setCurrReqStatus(0);
      try {
        const token = localStorage.getItem("token");
        const {data} = await axios.put(`http://localhost:8080/api/v1/user/${props.userInfo._id}/removeFriend`, null, {
            headers:{
              authorization: `Bearer ${token}`
            }
          });
          // console.log(data);
          setCurrReqStatus(data.requestStatus);
      } catch (error) {
          console.error(error.response.data);
      }
    }
  
    useEffect(() => {
      i++;
      if (i <= 1) {
        setCurrReqStatus(props.userInfo.isFriendNum);
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
        //   console.log("allPostsssss"+JSON.stringify(allPosts));
        }
        fetchPosts()
      };
    }, [])
  
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
            <div className="profileDetails">
            <span className="profileName">
              <h4 className="profileInfoName">{userInfo.firstName} {userInfo.lastName}</h4><span className="profileSeperator">&middot;</span><span className="userType">{userInfo.category}</span>
              <div className="view-user-add">
                {currReqStatus == 0 && <div onClick={sendFriendRequest} className="view-user-not-friend view-user-grey"><AddIcon sx={{ color: "white"}} /></div>}

                {currReqStatus == 1 && <div onClick={() => {setOpenRemoveFriend(prev => !prev)}} className="view-user-friend view-user-grey"><DoneIcon sx={{ color: "white"}} /></div>}

                {currReqStatus == 2 && !openCancelFriendRequest && <div onClick={() => {setOpenCancelFriendRequest(prev => !prev)}} className="view-user-pending view-user-grey">Pending Request</div>}
                {currReqStatus == 2 && openCancelFriendRequest && <div onClick={() => {setOpenCancelFriendRequest(prev => !prev)}} className="view-user-pending2 view-user-grey">Pending Request</div>}

                {currReqStatus == 3 && !openRespondToRequest && <div onClick={() => {setOpenRespondToRequest(prev => !prev)}} className="view-user-repond-to-request view-user-grey">Respond to Request</div>}
                {currReqStatus == 3 && openRespondToRequest && <div onClick={() => {setOpenRespondToRequest(prev => !prev)}} className="view-user-repond-to-request2 view-user-grey">Respond to Request</div>}

                {openRemoveFriend &&
                  <div className="view-user-cancel-div" onClick={removeFriend}>
                    <div className="view-user-cancel">Remove friend</div>
                  </div>
                }
                {openCancelFriendRequest &&
                  <div className="view-user-cancel-div" onClick={cancelFriendRequest}>
                    <div className="view-user-cancel">Cancel request</div>
                  </div>
                }
                {openRespondToRequest && 
                  <div className="view-user-respond-div">
                    <div className="view-user-respond-div-accept" onClick={acceptFriendRequest}>Accept</div>
                    <div className="view-user-respond-div-reject" onClick={rejectFriendRequest}>Reject</div>
                  </div>
                }
              </div>
            </span>
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
            <TimelinePost key={p._id} user={userInfo} post={p} />
          ))}
        </div>
      </div>
    )
}
