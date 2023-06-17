import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Standings from "./Standings"
import Stats from "./Stats"
import Teams from "./Teams"
import TeamDetails from "./TeamDetails"

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Teams />} />
          <Route path='/team/:id' element={<TeamDetails />} />
        </Routes>
        <Standings />
        <Stats />
        <Footer />
      </div>
    </Router>
  )
}

export default App
