import React from 'react'
import Request from './Request/Request'

export default function FriendRequests({requests}) {
  return (
    <div>
        {requests.length == 0 && <div>No Requests</div>}
        {requests && requests.map((r) => (
          <Request result={r} />
        ))}
    </div>
  )
}
