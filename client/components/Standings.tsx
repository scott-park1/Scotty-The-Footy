import '../main.css'
import request from 'superagent'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Team {
  position: number
  team: {
    id: number
    name: string
    crest: string
  }
  playedGames: number
  won: number
  draw: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
  form: string
}

export default function Standings() {
  const [standings, setStandings] = useState<Team[]>([])
  const [selectedYear, setSelectedYear] = useState('2023')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchStandings() {
      try {
        const response = await request.get(`/api/standings/${selectedYear}`)
        const standingsData = response.body.standings[0].table
        setStandings(standingsData)
        setLoading(false)
      } catch (error) {
        setError('Something went wrong...')
        setLoading(false)
      }
    }
    fetchStandings()
  }, [selectedYear])

  if (loading) {
    return <p>Loading...</p>
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setSelectedYear(event.target.value)
  }

  return (
    <div className="content">
      <h1 className="heading">Tables</h1>
      <h2>Select Year:</h2>
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
      <table className="table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Club</th>
            <th>Played</th>
            <th>Won</th>
            <th>Drawn</th>
            <th>Lost</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Points</th>
            <th>Form</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr key={team.team.id}>
              <td>{team.position}</td>
              <td className="teamname">
                <img
                  className="crest"
                  src={team.team.crest}
                  alt={team.team.name}
                />
                {team.team.name}
              </td>
              <td>{team.playedGames}</td>
              <td>{team.won}</td>
              <td>{team.draw}</td>
              <td>{team.lost}</td>
              <td>{team.goalsFor}</td>
              <td>{team.goalsAgainst}</td>
              <td>{team.goalDifference}</td>
              <td>{team.points}</td>
              <td>{team.form}</td>
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
