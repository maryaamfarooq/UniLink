import React from 'react'
import Request from './Request/Request'
import './friend-requests.css'

export default function FriendRequests({onHandleViewUserProfile, requests}) {

  function goToUser(userInfo) {
    userInfo.isFriendNum = 3;
    onHandleViewUserProfile(userInfo)
  }

  return (
    <div>
        {requests.length == 0 && <div className="friend-no-requests">No Requests</div>}
        {requests && requests.map((r) => (
          <Request onClick={() => goToUser(r.userInfo)} result={r} />
        ))}
    </div>
  )
}
