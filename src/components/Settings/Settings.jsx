import React, {useState} from 'react'
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios'; 
import './settings.css'

export default function Settings({userObj}) {

const [showUpdatePassword, setShowUpdatePassword] = useState(false)
const [currPass, setCurrPass] = useState("");
const [newPass, setNewPass] = useState("");
const [newConfirmPass, setNewConfirmPass] = useState("");
const [changeFail, setChangeFail] = useState("");

async function updatePassword() {
  if(currPass.length > 0 && newPass.length > 0 && newConfirmPass.length > 0){
    if(newPass === newConfirmPass)
    {
      try {
        const token = localStorage.getItem("token");
        const {data} = await axios.put(`http://localhost:8080/api/v1/user/updateUser`, {
          currentPassword: currPass,
          newPassword: newPass
        }, {
          headers:{
            authorization: `Bearer ${token}`
          }
        }
        );
        setChangeFail("done");
      } catch (error) {
        setChangeFail("Incorrect current password")
        console.error(error.response.data);
      }
    }
    else {
      setChangeFail("Passwords don't match")
    }
  }
  else {
    setChangeFail("Missing fields")
  }
}

function cancelUpdate() {
  setCurrPass("");
  setNewPass("");
  setNewConfirmPass("");
  setChangeFail("");
  setShowUpdatePassword(false)
}

  return (
    <div className="settings-wrapper">
      <div className="settings-div">
        <div className="settings-heading">Edit Profile</div>
        {userObj && <div className="settings-div-2">
          <div className="settings-name-div">
            <img className="settings-pp" src={userObj.profilePicture} />
            <span className="settings-name">{userObj.firstName} {userObj.lastName}</span>
          </div>
          <div className="settings-email-div">
            <span className="settings-subheading">Email:</span>
            <span className="settings-email">{userObj.email}</span>
          </div>
          <div className="settings-pass-div">
            <span className="settings-subheading">Change password</span>
            {!showUpdatePassword && <span onClick={() => setShowUpdatePassword(true)} className="settings-pass-edit-icon"><EditIcon htmlColor="white" /></span>}
            {showUpdatePassword && <div className="settings-update-pass-div">
              <input type="password" onChange={event => setCurrPass(event.target.value)} value={currPass} className="settings-update-inp" placeholder="Current password" />  
              <input type="password" onChange={event => setNewPass(event.target.value)} value={newPass} className="settings-update-inp" placeholder="New password" />  
              <input type="password" onChange={event => setNewConfirmPass(event.target.value)} value={newConfirmPass} className="settings-update-inp" placeholder="Confirm new password" />  
              <div className="settings-update-btn-div">
                <button className="settings-update-btn" onClick={updatePassword}>Update</button>
                <button className="settings-cancel-btn" onClick={cancelUpdate}>Cancel</button>
              </div>
              {changeFail.length > 0 && changeFail != "done" && <div className="error-msg">{changeFail}</div>}
              {changeFail === "done" && <div className="done-msg">Password updated!</div>}
            </div>}
          </div>
        </div>}
      </div>
    </div>
  )
}
