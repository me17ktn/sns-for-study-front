import { Comment, ThumbUp } from '@mui/icons-material'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../state/AuthContext'

const Messages = () => {
    const [ like, setLike]  = useState(post.liked.length);
    const [ isLiked, setIsLiked ] = useState();
    const [ user, setUser ] = useState({});
  
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
          try{
            const response = await axios.get(
              `http://localhost:5000/api/post/get/${post.id}`
            );
            setPosts(response.data);
          } catch (e) {
            console.log(e)
          }
        };
        fetchPosts();
      }, []);
  
    useEffect(() => {
      const fetchUser = async () => {
        const response = await axios.get(`http://localhost:5000/api/user/get/${post.userId}`);
        setUser(response.data);
      };
      fetchUser();
    }, []);
  
    const handleLike = async () => {
      try {
        await axios.put(`http://localhost:5000/api/post/like/${post.id}`, {userId: currentUser.id})
      }catch (err) {
        console.log(err)
      }
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    };
  
    let userIcon
    if(user.icon === "") {
      userIcon = false;
    } else {
      userIcon = true;
    }

  return (
    <>
        <div className="message">
        <div className="messageIcon">
          {userIcon ? <img src={user.icon} alt="" className='userIcon'/> : <Person className='userIconNull'/>}
        </div>
        <div className="messageInfo">
          <div className="upperInfo">
            <span className="nameLetter">
              {user.username}
            </span>
            <div className="timestamp">
              <span className="nowtime">
                {dayjs.unix(post.postTime._seconds).format("YYYY/M/D H:m")}
              </span>
            </div>
          </div>
          <div className="middleInfo">
            <div className="subject">{post.subject}</div>
            <span className="time">{post.time}</span>
          </div>
          <div className="messageDesc">
            <p className="messageText">{post.desc}</p>
          </div>
          <div className="bottomInfo">
            <div className={isLiked ? "thumbLiked" : "thumb"} onClick={handleLike}>
              <ThumbUp className='thumbIcon'/>
              <span className="likeNumber">{like}</span>
            </div>
            <div className="comment">
              <Comment className='commentIcon'/>
              <span className="commentNumber">{post.comment.length}</span>
            </div>
          </div>
        </div>
      </div>
      <hr className='timelineHr'/> 
    </>
  )
}

export default Messages