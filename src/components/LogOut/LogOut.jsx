import { useNavigate } from "react-router-dom";
import "./LogOut.css"

const LogOut = ({ show, setShow }) => {
    const navigate  = useNavigate();

    const handleClick = () => {
        
    }

  if(show){
    return (
      <>
        <div className="background">
          <div className="popUp">
            <div className="letter">
              <span className="logoutLetter">ログアウトしますか？</span>
            </div>
            <div className="attention">※ログアウトボタンを押した後、再読み込みしてください</div>
            <div className="logoutBtns">
              <button className='closeModal' onClick={() => {setShow(false)}}>閉じる</button>
              <button className="logO" onClick={() => {
                setShow(false);
                localStorage.removeItem("user");
                navigate("/login");
              }}>ログアウト</button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default LogOut