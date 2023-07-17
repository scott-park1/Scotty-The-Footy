import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home">
      <div className="homeheading">
        <h3 className="homelist">
          <Link to="/team" className="button">
            Teams
          </Link>
        </h3>
        <h3 className="homelist">
          <Link to="/fixture" className="button">
            Fixtures
          </Link>
        </h3>
        <h3 className="homelist">
          <Link to="/standings" className="button">
            Standings
          </Link>
        </h3>
        <h3 className="homelist">
          <Link to="/stats" className="button">
            Stats
          </Link>
        </h3>
      </div>
    </div>
  )
}
