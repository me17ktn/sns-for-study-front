import { useState } from "react";
import "./TimeInput.css"

const TimeInput = ({ show, setShow, setHour, setMinute }) => {
  const [ selectH, setSelectH ] = useState(0);
  const [ selectM, setSelectM ] = useState(0);

  let hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(<option className="option" value={i} key={i}>{i}</option>);
  }

  let minutes = [];
  for (let i = 0; i < 60; i++) {
    minutes.push(<option className="option" value={i} key={i}>{i}</option>);
  }

  if(show){
    return (
      <>
        <div className="overlay">
          <div className="content">
            <div className="letter">
              <span className="inputLetter">勉強時間を入力</span>
            </div>
            <div className="inputTimes">
              <div className="inputHour">
                <select name="Hours" className="selectHour" onChange={(e) => {setSelectH(e.target.value)}} value={selectH}>
                  {hours}
                </select>
                <span className="hourLetter">h</span>
              </div>
              <div className="inputMinute">
                <select name="Minutes" className="selectMinute" onChange={(e) => {setSelectM(e.target.value)}} value={selectM}>
                  {minutes}
                </select>
                <span className="minuteLetter">m</span>
              </div>
            </div>
            <div className="btns">
              <button className='closeModal' type="button" onClick={() => {setShow(false);}}>閉じる</button>
              <button className="complete" type="button" onClick={() => {
                setHour(selectH);
                setMinute(selectM);
                setShow(false);
              }}>完了</button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default TimeInput