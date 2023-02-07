import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Feed from "../feed/Feed";
import Rightbar from "../rightbar/Rightbar";
import "./homepage.css"

export default function Homepage(props) {
  console.log("homeoage");
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar onHandleLogin={props.onHandleLogin}/>
        <Feed/>
        <Rightbar/>
      </div>
    </>
  );
}