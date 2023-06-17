import "../main.css"
import request from "superagent";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

interface TeamDetails {
  id: number;
  name: string;
  crest: string;
  founded: string;
  venue: string;
  website: string;

  coach: {
    firstName: string;
    name: string;
    dateOfBirth: number;
    nationality: string;
  }

  squad: {
    name: string;
    position: string;
    dateOfBirth: number;
    nationality: string;
  }
}

export default function TeamDetails() {
  const { id } = useParams()
  const [teamDetails, setTeamDetails] = useState<TeamDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchTeamDetails() {
      try {
        const response = await request.get(`/api/teams/${id}`)
        const teamData = response.body
        console.log('API Response:', teamData)
        console.log('Team Name:', teamData.name);
        
        setTeamDetails(teamData)
        setLoading(false)
      } catch (error) {
      setError('Something went wrong...')
      setLoading(false)
      }
    }
    fetchTeamDetails()
  }, [id])

  if (loading) {
    return <p>Loading...</p>
  }

  if (!teamDetails) {
    return <p>Cannot find team details...</p>
  }
  
  return (
    <div>
      <h1>Team Details for {teamDetails.name}</h1>
      <p><b>Crest:</b> <img className="crest-team" src={teamDetails.crest} alt={teamDetails.name} /></p>
      <p><b>Name:</b> {teamDetails.name}</p>
      <p><b>Founded:</b> {teamDetails.founded}</p>
      <p><b>Venue:</b> {teamDetails.venue}</p>
      <p><b>Website:</b> {teamDetails.website}</p>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  )
}