import '../main.css'
import request from 'superagent'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Scorer {
  player: {
    id: number
    name: string
    nationality: string
  }
  team: {
    id: number
    name: string
    crest: string
  }
  goals: number
  assists: number
}

export default function Stats() {
  const [scorers, setScorers] = useState<Scorer[]>([])
  const [selectedSeason, setSelectedSeason] = useState('2023')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchScorers() {
      try {
        const response = await request.get(`/api/scorers/${selectedSeason}`)
        const statsData = response.body.scorers
        setScorers(statsData)
        setLoading(false)
      } catch (error) {
        setError('Something went wrong...')
        setLoading(false)
      }
    }
    fetchScorers()
  }, [selectedSeason])

  if (loading) {
    return (
      <p className="loading">
        Loading...
        <img
          src="https://cdn2.iconfinder.com/data/icons/activity-5/50/26BD-soccer-ball-128.png"
          alt="footbll"
          className="football"
        />
      </p>
    )
  }

  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setSelectedSeason(event.target.value)
  }

  return (
    <div className="content">
      <h1 className="heading">Stats</h1>
      <h2>Select Year</h2>
      <select
        name="select-season"
        id="select-season"
        onChange={handleSeasonChange}
        defaultValue={selectedSeason}
        className="dropdown"
      >
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
      </select>
      <h3 className="heading-goals">Goals</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Club</th>
            <th>Nationality</th>
            <th>Goals</th>
          </tr>
        </thead>
        <tbody>
          {scorers.map((scorer, index) => (
            <tr key={scorer.player.id}>
              <td>{index + 1}</td>
              <td>{scorer.player.name}</td>
              <td className="teamname">
                <img
                  className="crest"
                  src={scorer.team.crest}
                  alt={scorer.team.name}
                />
                {scorer.team.name}
              </td>
              <td>{scorer.player.nationality}</td>
              <td>{scorer.goals}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Link to="/" className="button">
          Home
        </Link>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
