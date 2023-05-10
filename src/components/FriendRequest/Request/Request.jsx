import React from 'react'
import './request.css'

import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';

export default function Request({result}) {
  return (
    <div>
    <div className="request-result-wrapper">
      <div className="request-result-pp">
        <img className="request-result-img" src={result.profilePicture} />
      </div>
      <div className="request-result-info">
        <div><span className="request-result-name">{result.firstName} {result.lastName}</span></div>
      </div>
      <div className="request-result-add">
        <div className="request-result-pending request-result-grey">Respond to Request</div>
      </div>
    </div>
    </div>
  )
}
