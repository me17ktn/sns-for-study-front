import { useRef } from "react";
import "./Register.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password.current.value !== passwordConfirmation.current.value) {
      passwordConfirmation.current.setCustomValidity("パスワードが違います");
    } else {
      try {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        await axios.post("http://localhost:5000/api/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleClick = () => {
    navigate("/login");
  }

  return (
    <div className="registerContainer">
      <div className="registerWrapper">
        <div className="register">新規ユーザー登録</div>
        <form className="registerInput" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder="ユーザーネーム" className="input" required ref={username}/>
          <input type="email" placeholder="メールアドレス" className="input" required ref={email}/>
          <input type="password" placeholder="パスワード" className="input" required minLength="6" ref={password}/>
          <input type="password" placeholder="確認用パスワード" className="input" required minLength="6" ref={passwordConfirmation}/>
          <button className="registerBtn" type="submit">登録</button>
          <button className="returnLogin" type="button" onClick={handleClick}>ログイン画面に戻る</button>
        </form>
      </div>
    </div>
  )
}

export default Register