import Topbar from '../../components/Topbar/Topbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import "./Home.css"
import Timeline from '../../components/Timeline/Timeline'
import { useContext } from 'react'
import { AuthContext } from '../../state/AuthContext'

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="topbarHome"> 
        <Topbar title={"ホーム"} user={user}/>
      </div>
        <div className="main">
          <div className="timeline">
            <Timeline />
          </div>
          <div className="sidebar">
            <Sidebar />
          </div>
        </div>
    </>
  )
}

export default Home