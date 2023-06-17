import "../main.css"
import request from "superagent";
import { useEffect, useState } from "react";

interface Scorer {
  player: {
    id: number;
    name: string;
    nationality: string;
  }
  team: {
    id: number;
    name: string;
    crest: string;
  }
  goals: number;
  assists: number;
}

export default function Stats() {
  const [scorers, setScorers] = useState<Scorer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchScorers() {
      try {
        const response = await request.get('/api/scorers')
        const statsData = response.body.scorers
        setScorers(statsData)
        setLoading(false)
      } catch (error) {
      setError('Something went wrong...')
      setLoading(false)
      }
    }
    fetchScorers()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }
  
  return (
    <div>
      <h1>Stats</h1>
      <h2>Goals</h2>
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
                <img className="crest" src={scorer.team.crest} alt={scorer.team.name} />
                {scorer.team.name}
              </td>
              <td>{scorer.player.nationality}</td>
              <td>{scorer.goals}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  )
}