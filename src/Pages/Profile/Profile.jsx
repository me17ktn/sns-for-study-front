import { MoreHoriz, Person } from "@mui/icons-material"
import Sidebar from "../../components/Sidebar/Sidebar"
import Topbar from "../../components/Topbar/Topbar"
import "./Profile.css"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { AuthContext } from "../../state/AuthContext"
import Timeline from "../../components/Timeline/Timeline"

const Profile = () => {
  const [ user, setUser ] = useState({});
  const [ follow, setFollow ] = useState();
  const [ isMe, setIsMe ] = useState();
  const [ followerNum, setFollowerNum ] = useState();
  const [ show, setShow ] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  const userId = useParams().userId;

  const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`http://localhost:5000/api/user/get?userId=${userId}`);
      setUser(response.data);
      setFollow(response.data.follower.includes(currentUser.userId))
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    setFollowerNum(user.follower?.length);
    if(userId === currentUser.userId) {
     setIsMe(true);
    } else {
      setIsMe(false)
    }
  },[user])

  const fetchFollow = async () => {
    try{
      await axios.put(`http://localhost:5000/api/user/follow/${userId}`, {userId: currentUser.userId});
      let newFollowing = [...currentUser.following];
      if(!currentUser.following.includes(userId)) {
        newFollowing.push(userId)
      } else {
        const index = currentUser.following.indexOf(userId);
        if(index > -1){
          newFollowing.splice(index, 1)
        }
      }
      localStorage.setItem("user", JSON.stringify({
        userId: currentUser.userId,
        username: currentUser.username,
        email: currentUser.email,
        icon: currentUser.icon,
        greeting: currentUser.greeting,
        password: currentUser.password,
        like: currentUser.like,
        posts: currentUser.posts,
        follower: currentUser.follower,
        following: newFollowing
      }));
    } catch (e) {
      console.log(e)
    }
    setFollowerNum(follow ? followerNum - 1 : followerNum + 1);
    setFollow(!follow);
  };

  let userIcon
  if(user.icon === "") {
    userIcon = false;
  } else {
    userIcon = true;
  }

  return (
    <>
      <Topbar title={"プロフィール"} user={currentUser}/>
      <div className="main">
        <div className="profileWrapper">
          <div className="profileMain">
            <div className="message">
              <div className="messageIcon">
              {userIcon ? <img src={PUBLIC_FOLDER + user.icon} alt="" className='userIcon'/> : <Person className='userIconNull'/>}
              </div>
              <div className="mainInfo">
                <div className="upperInfo">
                  <span className="nameLetter">
                        {user.username}
                  </span>
                  {isMe 
                  ? null
                  :follow 
                  ?<div className="unfollowBtn" onClick={fetchFollow}>
                    <span className="unfollowLetter">
                      フォロー解除 
                    </span>
                    </div>
                  :<div className="followBtn" onClick={fetchFollow}>
                      <span className="followLetter">
                        フォロー  
                      </span>
                  </div>
                  }
                  { user.id === currentUser.userId ?<MoreHoriz className='colon' onClick={() => setShow(true)}/> : null}
                  {show 
                  ? <div className="edit">
                      <div className="close" onClick={() => setShow(false)}>×</div>
                      <Link to={`/editProf/${currentUser.userId}`} style={{textDecoration: "none", color: "salmon"}}>
                        <div className="editLink">
                          <span className="editLetter">
                            プロフィールを編集する
                          </span>
                        </div>
                      </Link>
                  </div>  
                  : null}
                </div>
                <div className="messageInfo">
                  <div className="profDescription">
                    <p className="messagetext">{user.greeting}</p>
                  </div> 
                </div>
              </div>
            </div>
            <div className="ffWrapper">
              {/* <Link to={`/follow/${userId}`} style={{ textDecoration: "none"}}> */}
                <div className="ff">
                  <h1 className="ffNumber">{user.following?.length}</h1> 
                  <p className="ffText">フォロー</p>
                </div>
              {/* </Link> */}
              {/* <Link to={`/follower/${userId}`} style={{ textDecoration: "none"}}> */}
              <div className="ff">
                <h1 className="ffNumber">{followerNum}</h1>
                <p className="ffText">フォロワー</p>
              </div>
              {/* </Link> */}
            </div>
            <hr className="profileHr"/>
            <div className="myPosts">
              <span className="postsLetter">
                投稿
              </span>
            </div>
            <hr className="profileHr" />
          </div>
          <Timeline uId={userId}/>
        </div>
        <div className="sidebarProfile">
         <Sidebar />
        </div>
      </div>
    </>
  )
}

export default Profile