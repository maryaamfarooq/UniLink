import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import "./search-result.css"

export default function SearchResult({onClick, result}) {
  return (
    <div onClick={onClick} className="search-result-wrapper">
      <div className="search-result-pp">
        <img className="search-result-img" src={result.profilePicture} />
      </div>
      <div className="search-result-info">
        <div><span className="search-result-name">{result.firstName} {result.lastName}</span><span className="profileSeperator search-result-grey">&middot;</span><span className="search-result-grey italicize">{result.category}</span></div>
        <div><span className="search-result-grey">{result.department}</span><span className="profileSeperator search-result-grey">&middot;</span><span className="search-result-grey">{result.batch}</span></div>
        <div className="search-result-grey">{result.mutualFriendsCount} mutuals</div>
      </div>
      <div className="search-result-add">
        {result.isFriendNum == 0 && <div className="search-result-not-friend search-result-grey"><AddIcon sx={{ color: "white"}} /></div>}
        {result.isFriendNum == 1 && <div className="search-result-friend search-result-grey"><DoneIcon sx={{ color: "white"}} /></div>}
        {result.isFriendNum == 2 && <div className="search-result-pending search-result-grey">Pending</div>}
        {result.isFriendNum == 3 && <div className="search-result-respond search-result-grey">Respond to request</div>}
      </div>
    </div>
  )
}
