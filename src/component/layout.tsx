import Sidebar from './sidebar'
import MainContainer from './mainContainer';
import '../styles/layout.css'

const Layout = () => {
  return (
    <div className='layout-container'>
        <Sidebar />
        <MainContainer />
    </div>
  )
}

export default Layout