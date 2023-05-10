import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './styles/global.css';
import './styles/confirm-email.css';
import './styles/auth-card.css'
import ImageUploader from './ImageUploader'

export default function AuthCard(props) {
  return (
    // <div>
    //     <div className="form-div">
    //         <div className="back-arrow-div"><div onClick={props.onHandleChooseAuth} className="back-arrow-div2"><ArrowBackIcon htmlColor="#7FD8BE" /></div></div>
    //         <div className="form">
    //             <h1>Welcome!</h1>
    //             <p>Please upload an image of your NUST-issued identification card</p>
    //             <div className="email-div">
    //                 {/* <input type="text" className="email-inp1" name="email"></input> */}
    //                 <ImageUploader />
    //             </div>
    //             <div className="btn-div">
    //                 <button className="next-btn"><span className="next">Next</span><span className="gt">&gt;</span></button>
    //             </div>
    //         </div>
    //     </div>
    //     <span className="btm-sign-up">Already have an account? <a onClick={props.onHandleLogin}>Sign in</a></span>
    // </div>
    <ImageUploader />
  )
}
