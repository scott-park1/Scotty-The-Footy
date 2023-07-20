import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import App from './components/App'
import Home from './components/Home'
import Teams from './components/Teams'
import TeamDetails from './components/TeamDetails'
import Fixtures from './components/Fixtures'
import FixtureDetails from './components/FixtureDetails'
import Standings from './components/Standings'
import Stats from './components/Stats'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/team" element={<Teams />} />
    <Route path="/team/:id" element={<TeamDetails />} />
    <Route path="/fixture" element={<Fixtures />} />
    <Route path="/fixtures/:id" element={<FixtureDetails />} />
    <Route path="/standings" element={<Standings />} />
    <Route path="/stats" element={<Stats />} />
  </Route>
)

export const router = createBrowserRouter(routes)
