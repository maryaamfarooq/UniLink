import React from 'react'
import Notif from './Notif/Notif'
import './notifications.css'

export default function Notifications({notifications}) {
  return (
    <div>
        {notifications.length == 0 && <div className="no-notif">No new notifications</div>}
        {notifications.length > 0 && notifications.map((n) => (
          <Notif key={n.post._id} notif={n} />
        ))}
    </div>
  )
}
