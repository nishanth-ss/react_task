import '../styles/maincontainer.css';
import { Outlet } from 'react-router-dom';

const MainContainer = () => {
  

  return (
    <div className='main-container'>
      <div className="container-wrapper">
        <Outlet />
      </div>
    </div>
  )
}

export default MainContainer