import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Standings from './Standings'
import Stats from './Stats'
import Teams from './Teams'
import TeamDetails from './TeamDetails'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/team" element={<Teams />} />
          <Route path="/team/:id" element={<TeamDetails />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
