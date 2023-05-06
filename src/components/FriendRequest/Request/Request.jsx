import React from 'react'
import '../../Search/SearchResult/search-result.css'

import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';

export default function Request({result}) {
  return (
    <div>
    <div className="search-result-wrapper">
      <div className="search-result-pp">
        <img className="search-result-img" src={result.profilePicture} />
      </div>
      <div className="search-result-info">
        <div><span className="search-result-name">{result.firstName} {result.lastName}</span></div>
      </div>
      <div className="search-result-add">
        <div className="search-result-pending search-result-grey">Pending</div>
      </div>
    </div>
    </div>
  )
}
