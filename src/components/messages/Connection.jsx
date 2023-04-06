import React from 'react'
import './connection.css';

export default function Connection(props) {
  return (
    <div>
      <img src={props.image} />
      {props.username}
    </div>
  )
}
