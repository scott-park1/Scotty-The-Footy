import "../main.css"
import request from "superagent";
import { useEffect, useState } from "react";

interface Team {
  position: number;
  team: {
    id: number;
    name: string;
    crest: string;
  }
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string;
}

export default function Standings() {
  const [standings, setStandings] = useState<Team[]>([])
  // const [selectedYear, setSelectedYear] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchStandings() {
      try {
        const response = await request.get('/api/standings')
        const standingsData = response.body.standings[0].table
        setStandings(standingsData)
        setLoading(false)
      } catch (error) {
      setError('Something went wrong...')
      setLoading(false)
      }
    }
    fetchStandings()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }
  
  return (
    <div>
      <h1>Tables</h1>
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
                <img className="crest" src={team.team.crest} alt={team.team.name} />
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
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  )
}

