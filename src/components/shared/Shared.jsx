import "./shared.css";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PublicIcon from '@mui/icons-material/Public';

export default function Shared() {
  return (
    <div className="shared">
      <div className="shareTop">
        <img className="shareProfileImg" src="assets/person/1.jpeg" alt="" />
        <input
          placeholder="Create a post"
          className="shareInput"
        />
      </div>

      <div className="shareBottom">
        <div className="shareIcon"><PublicIcon htmlColor="white"/></div>
        <div className="shareIcon"><AttachFileIcon htmlColor="white"/></div>
        <button className="shareButton">Post</button>
      </div>
    </div>
  );
}


