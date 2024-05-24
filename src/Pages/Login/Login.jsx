import { useContext, useRef } from "react"
import "./Login.css"
import { loginCall } from "../../actionCalls"
import { AuthContext } from "../../state/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    loginCall({
        email: email.current.value,
        password: password.current.value,
      }, dispatch);
  };

  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <p className="login">ログイン</p>
        <form className="loginInput" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder="メールアドレス" className="input" required ref={email}/>
          <input type="password" placeholder="パスワード" className="input" required ref={password}/>
          <button className="loginBtn">ログイン</button>
          <button className="newUser"type="button"onClick={() => {navigate("/register")}}>新規ユーザー登録はこちらから</button>
        </form>
      </div>
    </div>
  )
}

export default Login