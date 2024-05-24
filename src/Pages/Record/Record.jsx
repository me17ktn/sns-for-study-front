import { useContext, useRef, useState } from "react"
import Sidebar from "../../components/Sidebar/Sidebar"
import Topbar from "../../components/Topbar/Topbar"
import "./Record.css"
import { AuthContext } from "../../state/AuthContext"
import axios from "axios"
import TimeInput from "../../components/TimeInput/TimeInput"

const Record = () => {
    const { user } = useContext(AuthContext);
    const subject = useRef();
    const desc = useRef();
    const [ hour, setHour] = useState(0);
    const [ minute, setMinute] = useState(0);
    const [ show, setShow ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let recordTime;
        if(hour == 0) {
            recordTime = minute + "m";
        } else {
            recordTime = hour + "h" + minute + "m";
        }

        let description;
        if(desc.current.value === ""){
            description = subject.current.value + " を学習しました";
        } else {
            description =desc.current.value;
        }
        
        const newPost = {
            userId: user.userId,
            subject: subject.current.value,
            time: recordTime,
            desc: description
        }

        try{
            await axios.post(`http://localhost:5000/api/post/${user.userId}`, newPost);
        } catch (err) {
            console.log(err);
        }
        
        subject.current.value = "";
        setHour(0);
        setMinute(0) ;
        desc.current.value = "";
    }

  return (
    <>
        <Topbar title={"記録"} user={user}/>
        <div className="main">
            <div className="recordWrapper">
                <form className="recordForm" onSubmit={(e) => handleSubmit(e)}>
                    <input className="inputText" type="text" placeholder="科目/教材" ref={subject}  required/>
                    <div className="timeInput">
                        <span className="displayTime">{hour + " h " + minute + " m "}</span>
                        <button className="inputBtn" type="button" onClick={() => setShow(true)}>学習時間を変更</button>
                        <TimeInput show={show} setShow={setShow} setHour={setHour} setMinute={setMinute}/>
                    </div>
                    <input className="inputDesc" type="text" placeholder="一言" ref={desc}/>
                    <button className="submitBtn" type="submit">記録する</button>
                </form>
            </div>
            <div className="sidebarRecord">
                <Sidebar />
            </div>
        </div>
    </>
  )
}

export default Record