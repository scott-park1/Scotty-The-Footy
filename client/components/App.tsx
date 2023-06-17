import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Footer from "./Footer"
import Standings from "./Standings"
import Stats from "./Stats"
import Teams from "./Teams"
import TeamDetails from "./TeamDetails"

function App() {
  return (
    <Router>
      <div>
        <h1>SCOTTY THE FOOTY ⚽</h1>
        <h2>&quot;WELCOME TO THE BEST FOOTY WEBSITE EVER.&quot;</h2>
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
