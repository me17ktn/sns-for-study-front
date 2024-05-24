import { useContext, useEffect, useRef, useState } from "react";
import "./EditProf.css"
import { AuthContext } from "../../state/AuthContext";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios"

const EditProf = () => {
    const { user } = useContext(AuthContext);
    const [ isOpen, setIsOpen ] = useState(user.isOpen);
    const [ editted, setEditted ] = useState(user.isOpen);
    const [ username, setUsername ] = useState(user.username);
    const [ pass, setPass ] = useState(user.password);
    const [ checkPass, setCheckPass ] = useState(user.password);
    const [ greeting, setGreeting ] = useState(user.greeting || "よろしくお願いします");
    const imgFile = useRef();

    const [ file, setFile ] = useState(user.icon || null);

    useEffect(() => {
      setEditted(false)
      setFile(user.icon)
    }, [user])

    const handleClick = async (e) => {
      let userIcon;
      let data;
      console.log(file)
      if(file) {
        data = new FormData();
        userIcon = file.name;
        console.log(userIcon)
        data.append("name", userIcon)
        data.append("file", file);
      } else if(user.icon !== "" || undefined) {
        userIcon = user.icon
        console.log(user.icon !== "")
      } else if(user.icon === ""){
        userIcon = ""
      }
      if(pass !== checkPass) {
        alert("パスワードが一致しません");
      } else {
        try {
          await axios.post("http://localhost:5000/api/upload", data);
          e.preventDefault();
      
      const edittedUser = {
        userId: user.userId,
        username: username,
          password: pass,
          // isOpen: isOpen,
          icon: userIcon || file,
          greeting: greeting
        }
        console.log(edittedUser)

        await axios.put(`http://localhost:5000/api/user/update/${user.userId}`, edittedUser);

        setEditted(true);

        localStorage.setItem("user",JSON.stringify({
          ...edittedUser,
          email: user.email,
          follower: user.follower,
          following: user.following,
          like: user.like,
          posts: user.posts
        }))
        } catch (err) {
          console.log(err)
        }}
      };


  return (
    <>
      <div className="topbarEdit">
        <Topbar title={"プロフィール編集"} user={user}/>
      </div>
      <div className="editMain">
        <div className="editContent">
          <div className="changeName">
            <span className="changeNameLetter">ユーザーネーム</span>
            <input type="text" className="inputName" placeholder={`${user.username}`} value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className="changePass">
            <span className="changePassLetter">パスワード</span>
            <input type="password" className="inputPass" placeholder="パスワード" value={pass} onChange={(e) => setPass(e.target.value)}/>
            <input type="password" className="inputPassCheck" placeholder="確認用パスワード" value={checkPass} onChange={(e) => setCheckPass(e.target.value)}/>
          </div>
          <label htmlFor="file" className="img">
            <span className="changeIcon">プロフィール画像を変更</span>
            <input type="file" id="file" accept=".png, .jpeg, .jpg" style={{display: "none"}} onChange={(e) => setFile(e.target.files[0])} ref={imgFile}/>
            {file ? <span className="selectedFile">{file.name}</span> : null}
          </label>
          <div className="intro">
            <span className="introLetter">自己紹介</span>
            <input type="text" className="inputGreeting" placeholder="自己紹介" value={greeting} onChange={(e) => setGreeting(e.target.value)}/>
          </div>
          {/* <div className="isOpen">
            <span className="toggleLetter">投稿を公開する</span>
            <ToggleSwitch isOpen={isOpen} setIsOpen={setIsOpen}/>
          </div> */}
          <div className="keepBtn">
            <button className="keep"  onClick={(e) => handleClick(e)}>保存</button>
          </div>
          { editted ? <div className="changed">
            <span className="changeLetter">
              プロフィールを編集しました!
            </span>
            <span className="warning">
              ※再読込をしてください
              </span>
          </div> : null}
        </div>
        <div className="sidebarEdit">
          <Sidebar />
        </div>
      </div>
    </>
  )
}

export default EditProf;