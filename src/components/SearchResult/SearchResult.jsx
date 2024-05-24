import { Link } from "react-router-dom";
import "./SearchResult.css"
import { Person } from "@mui/icons-material";

const SearchResult = ({ user }) => {
    const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;

    let userIcon
    if(user.icon === "") {
      userIcon = false;
    } else {
      userIcon = true;
    };

    return (
        <>
            <Link to={`/profile/${user.id}`} style={{ textDecoration: "none" }}>
                <div className="user">
                    <div className="messageIcon">
                        {userIcon ? <img src={PUBLIC_FOLDER + user.icon} alt="" className='userIcon'/> : <Person className='userIconNull'/>}
                    </div>
                    <div className="messageInfo">
                        <div className="upperInfo">
                            <span className="nameLetter">
                                {user.username}
                            </span>
                        </div>
                        <div className="userDesc">
                            <span className="descLetter">
                                {user.greeting}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
            <hr className='timelineHr'/>    
        </>
    )
}


export default SearchResult;