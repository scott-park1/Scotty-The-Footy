import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function App() {
  return (
    <div className="container">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  )
}

export default App
