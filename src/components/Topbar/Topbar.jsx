import { Logout, Person } from "@mui/icons-material"
import "./Topbar.css"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../state/AuthContext"
import { Link } from "react-router-dom"
import LogOut from "../LogOut/LogOut"
import axios from "axios"

const Topbar = ({ title, user }) => {
  const [ show, setShow ] = useState(false);
  // const [ user, setUser ] = useState({});
  // const { user } = useContext(AuthContext);
  // console.log(user)

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const response = await axios.get(`http://localhost:5000/api/user/get?userId=${userId}`);
  //     setUser(response.data);
  //   };
  //   fetchUser();
  // }, [user]);

  const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;

  let userIcon
  if(user.icon === "") {
    userIcon = false;
  } else {
    userIcon = true;
  }

  return (
    <div className="TopbarContainer">
        <div className="TopbarUpper">
            <div className="TopbarIcon">
                <Link to={`/profile/${user.userId}`} style={{ textDecoration: "none"}}>
                {userIcon ? <img src={PUBLIC_FOLDER + user.icon} alt="" className='topIcon'/> : <Person className='topIconNull'/>}
                </Link>
            </div>
            <div className="TopbarCenter">
                <span className="TopbarHome">{title}</span>
            </div>
            <div className="TopbarRight">
                <Logout className="logoutIcon" onClick={()  => {setShow(true)}}/>
                <LogOut show={show} setShow={setShow}/>
            </div>
        </div>
        <hr className="Topbardivision"/>
        
    </div>
  )
}

export default Topbar