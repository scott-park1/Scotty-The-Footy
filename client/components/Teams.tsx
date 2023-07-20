import '../main.css'
import request from 'superagent'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Squad {
  id: number
  name: string
  shortName: string
  crest: string
  founded: string
  venue: string
  website: string

  coach: {
    id: number
    firstName: string
    name: string
    dateOfBirth: number
    nationality: string
  }

  squad: [
    {
      id: number
      name: string
      position: string
      dateOfBirth: number
      nationality: string
    }
  ]
}

export default function Teams() {
  const [teams, setTeams] = useState<Squad[]>([])
  const [selectedYear, setSelectedYear] = useState('2023')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await request.get(
          `/api/competitions/teams/${selectedYear}`
        )
        const teamsData = response.body.teams
        setTeams(teamsData)
        setLoading(false)
      } catch (error) {
        setError('Something went wrong...')
        setLoading(false)
      }
    }
    fetchTeams()
  }, [selectedYear])

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

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setSelectedYear(event.target.value)
  }

  return (
    <div className="content">
      <h1 className="heading">Teams</h1>
      <h2>Select Year</h2>
      <select
        name="select-year"
        id="select-year"
        onChange={handleYearChange}
        defaultValue={selectedYear}
        className="dropdown"
      >
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
      </select>
      {teams.map((team) => {
        return (
          <div key={team.id}>
            <p className="table">
              <Link to={`/team/${team.id}`} className="team-link">
                {team.name}
              </Link>
            </p>
          </div>
        )
      })}
      <div>
        <Link to="/" className="button">
          Home
        </Link>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
