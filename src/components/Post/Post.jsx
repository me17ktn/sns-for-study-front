import { useState, useEffect, useContext } from 'react'
import { Comment, MoreHoriz, Person, ThumbUp } from "@mui/icons-material"
import './Post.css'
import axios from "axios"
import dayjs from "dayjs"
import { AuthContext } from '../../state/AuthContext'
import { Link } from 'react-router-dom'

const Post = ({ post }) => {
  const [ like, setLike]  = useState(post.liked.length);
  const [ isLiked, setIsLiked ] = useState();
  const [ user, setUser ] = useState({});
  const [ show, setShow ] = useState(false);

  const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`http://localhost:5000/api/user/get?userId=${post.userId}`);
      setUser(response.data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    setIsLiked(post.liked.includes(currentUser.userId))
  }, [post])

  const handleLike = async () => {
    try {
      await axios.put(`http://localhost:5000/api/post/like/${post.id}`, {userId: currentUser.userId});
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
  };

  return (
    <>
      <div className="message">
        <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none" }}>
          <div className="messageIcon">
            {userIcon ? <img src={PUBLIC_FOLDER + user.icon} alt="" className='userIcon'/> : <Person className='userIconNull'/>}
          </div>
        </Link>
        <div className="messageInfo">
      {/* <Link to={`/messages/${post.id}`} style={{ textDecoration: "none" }}> */}
          <div className="upperInfo">
            <div className="username">
              <span className="nameLetter">
                {user.username}
              </span>
            </div>
            <div className="timestamp">
              <span className="nowtime">
                {dayjs.unix(post.postTime._seconds).format("YYYY/M/D HH:mm")}
              </span>
            </div>
            {show 
              ? <div className="editPost">
                  <div className="close" onClick={() => setShow(false)}>×</div>
                  <Link to={`/editPost/${post.id}`} style={{textDecoration: "none", color: "salmon"}}>
                    <div className="editLink">
                      <span className="editLetter">
                        投稿を編集する
                      </span>
                    </div>
                  </Link>
                </div>  
              : null
            }
            <div className="colonWrapper">
              {post.userId === currentUser.userId ? <MoreHoriz className='colon' onClick={() => setShow(true)}/> : null}
            </div>
          </div>
          <div className="middleInfo">
            <div className="subject">{post.subject}</div>
            <span className="time">{post.time}</span>
          </div>
          <div className="messageDesc">
            <p className="messageText">{post.desc}</p>
          </div>
      {/* </Link> */}
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

export default Post