import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar"
import Topbar from "../../components/Topbar/Topbar"
import "./Search.css"
import axios from "axios";
import SearchResult from "../../components/SearchResult/SearchResult";
import { AuthContext } from "../../state/AuthContext";

const Search = () => {
    const [ users, setUsers ] = useState([]);
    const [ show, setShow ] = useState(false);
    const username = useRef();
    const { user: currentUser } = useContext(AuthContext);
    
    const handleSubmit = async () => {
        const response = await axios.get(`http://localhost:5000/api/user/search?username=${username.current.value}`);
        setUsers(response.data);
        if(users){
            setShow(true);
        }
    };

  return (
    <>
        <Topbar title="検索" user={currentUser}/>
        <div className="main">
            <div className="searchWrapper">
                <div className="inputSearch">
                    <input type="text" className="searchInput" placeholder='ユーザーネームを入力' ref={username}/>
                    <button onClick={handleSubmit} className="searchBtn">検索</button>
                </div>
                <hr />
                {show ? users.map((user) => (
                    <SearchResult user={user} key={user.id}/>
                )):  <div className="notFound">
                    <span className="notFoundLetter">
                        ユーザーが見つかりません    
                    </span>   
                </div>}
            </div>
            <div className="sidebarSearch">
                <Sidebar />
            </div>
        </div>
    </>
  )
}

export default Search