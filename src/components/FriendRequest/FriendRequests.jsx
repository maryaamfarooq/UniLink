import React from 'react'
import Request from './Request/Request'
import './friend-requests.css'

export default function FriendRequests({requests}) {
  return (
    <div>
        {requests.length == 0 && <div className="friend-no-requests">No Requests</div>}
        {requests && requests.map((r) => (
          <Request result={r} />
        ))}
    </div>
  )
}
