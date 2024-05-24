import { AccountCircle, BorderColor, Search, Notifications, Bookmark, Feed } from "@mui/icons-material"
import { Link } from "react-router-dom"
import "./Sidebar.css"
import { useContext } from "react"
import { AuthContext } from "../../state/AuthContext"

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="sidebarContainer">
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <div className="switch">
          <div className="icon">
            <Feed />
          </div>
          <div className="desc">
            <span className="timelineLetter">
              ホーム
            </span>
          </div>
        </div>
      </Link>

      <Link to={`/post/${user.userId}`} style={{ textDecoration: "none", color: "black" }}>
        <div className="switch">
          <div className="icon">
            <BorderColor />
          </div>
          <div className="desc">
            <span className="recordLetter">
              記録する
            </span>
          </div>
        </div>
      </Link>

      <Link to={`/profile/${user.userId}`} style={{ textDecoration: "none", color: "black" }}>
        <div className="switch">
          <div className="icon">
            <AccountCircle />
          </div>
          <div className="desc">
            <span className="profileLetter">
              マイプロフィール
            </span>
          </div>
        </div>
      </Link>

      <Link to="/search" style={{ textDecoration: "none", color: "black" }}>
        <div className="switch">
          <div className="icon">
            <Search />
          </div>
          <div className="desc">
            <span className="searchLetter">
              検索
            </span>
          </div>
        </div>
      </Link>

      {/*<div className="switch">
        <div className="icon">
          <Notifications />
        </div>
        <div className="desc">
          <span className="notifyLetter">
            通知
          </span>
        </div>
      </div>

      <div className="switch">
        <div className="icon">
          <Bookmark />
        </div>
        <div className="desc">
          <span className="bookmarkLetter">
              ブックマーク
          </span>
        </div>
      </div> */}
    </div>
  )
}

export default Sidebar