import { useContext, useEffect } from 'react'
import "./Followers.css"
import { AuthContext } from "../../state/AuthContext";

const Followers = () => {
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchUser = async () => {
      let follwers = [];
      user.follower.map( async (Fer) => {
      const response = await axios.get(`http://localhost:5000/api/user/get?userId=${Fer}`)
      follwers.push(response.data)
    })
    };
    fetchUser();
    if(user.id === currentUser.userId) {
      setIsMe(true);
    } else {
      setIsMe(false)
    }
  }, [])
  return (
    <>
      <div className="topbarFollower"> 
        <Topbar title={"フォロワー"}/>
      </div>
        <div className="main">
          <div className="follwers">
          </div>
          <div className="sidebar">
            <Sidebar />
          </div>
        </div>
    </>
  )
}

export default Followers