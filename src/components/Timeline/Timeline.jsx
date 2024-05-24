import { useContext, useEffect, useState } from "react"
import "./Timeline.css"
import axios from "axios"
import Post from "../Post/Post";
import { AuthContext } from "../../state/AuthContext";

const Timeline = ({ uId }) => {
  const [ posts, setPosts ] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
      const fetchPosts = async () => {
        try{
          let response;
          if(uId !== undefined){
            response = await axios.get(
              `http://localhost:5000/api/post/timeline/my/${uId}`
            );
            } else {
              response = await axios.get(
                `http://localhost:5000/api/post/timeline/ff/${user.userId}`
              );
            }
          setPosts(response.data);
        } catch (err) {
          console.log(err)
        }
      };
      fetchPosts();
    }, [user.userId]);

    let zero;
    if(posts.length === 0){
      zero = true
    }
    
  return (
    <>
    {zero 
    ? <div className="noPost">
        <span className="noPostLetter">
        投稿がありません
        </span>
      </div> 
      : posts.map((post, index) => (
      <Post post={post} key={index}/>
    )
  )}
    </>
  )
}

export default Timeline