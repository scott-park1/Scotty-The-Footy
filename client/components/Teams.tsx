import "../main.css"
import request from "superagent";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

interface Squad {
  id: number;
  name: string;
  shortName: string;
  crest: string;
  founded: string;
  venue: string;
  website: string;

  coach: {
    id: number;
    firstName: string;
    name: string;
    dateOfBirth: number;
    nationality: string;
  }

  squad: [
    {
      id: number;
      name: string;
      position: string;
      dateOfBirth: number;
      nationality: string;
    }
  ]
}

export default function Teams() {
  const [teams, setTeams] = useState<Squad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await request.get('/api/teams')
        const teamsData = response.body.teams
        setTeams(teamsData)
        setLoading(false)
      } catch (error) {
      setError('Something went wrong...')
      setLoading(false)
      }
    }
    fetchTeams()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }
  
  return (
    <div>
      <h1>Teams</h1>
      <ul>
        {teams.map((team) =>{
          return <div key={team.id}>
            <p><Link to={`/team/${team.id}`}>{team.name}</Link></p>
          </div>
        })}
      </ul>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  )
}