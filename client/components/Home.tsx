import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home">
      <h1>&quot;WELCOME TO THE BEST FOOTY WEBSITE EVER.&quot;</h1>
      <div className="homeheading">
        <h3 className="homelist">
          <Link to="/team">Teams</Link>
        </h3>
        <h3>Matches</h3>
        <h3 className="homelist">
          <Link to="/standings">Standings</Link>
        </h3>
        <h3 className="homelist">
          <Link to="/stats">Stats</Link>
        </h3>
      </div>
    </div>
  )
}
