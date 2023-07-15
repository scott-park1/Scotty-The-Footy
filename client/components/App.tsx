import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Standings from './Standings'
import Stats from './Stats'
import Teams from './Teams'
import TeamDetails from './TeamDetails'
import Fixtures from './Fixtures'
import Home from './Home'
import FixtureDetails from './FixtureDetails'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Teams />} />
          <Route path="/team/:id" element={<TeamDetails />} />
          <Route path="/fixture" element={<Fixtures />} />
          <Route path="/fixtures/:id" element={<FixtureDetails />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
