import '../main.css'
import request from 'superagent'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

interface SquadMember {
  id: number
  name: string
  position: string
  dateOfBirth: number
  nationality: string
}
interface TeamDetails {
  id: number
  name: string
  crest: string
  founded: string
  venue: string
  website: string
  squad: SquadMember[]

  coach: {
    name: string
    dateOfBirth: number
    nationality: string
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
        console.log('Team Name:', teamData.name)

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

  if (!teamDetails) {
    return <p>Cannot find team details...</p>
  }

  return (
    <div className="content">
      <div>
        <h1 className="heading">Team Details for {teamDetails.name}</h1>
        <br />
        <p className="table">
          <b>Crest:</b>
          <img
            className="crest-team"
            src={teamDetails.crest}
            alt={teamDetails.name}
          />
        </p>
        <p className="table">
          <b>Name:</b> {teamDetails.name}
        </p>
        <p className="table">
          <b>Founded:</b> {teamDetails.founded}
        </p>
        <p className="table">
          <b>Venue:</b> {teamDetails.venue}
        </p>
        <p className="table">
          <b>Website:</b> {teamDetails.website}
        </p>
      </div>
      <br />
      <div>
        <h2>Manager</h2>
        <br />
        <p className="table">
          <b>Name:</b> {teamDetails.coach.name}
        </p>
        <p className="table">
          <b>Date of Birth:</b> {teamDetails.coach.dateOfBirth}
        </p>
        <p className="table">
          <b>Nationality:</b> {teamDetails.coach.nationality}
        </p>
      </div>
      <br />
      <div>
        <h2>Squad</h2>
        <br />
        {teamDetails.squad.map((squadMember) => (
          <div key={squadMember.id}>
            <p className="table">
              <b>Name:</b> {squadMember.name}
            </p>
            <p className="table">
              <b>Position:</b> {squadMember.position}
            </p>
            <p className="table">
              <b>Date of Birth:</b> {squadMember.dateOfBirth}
            </p>
            <p className="table">
              <b>Nationality:</b> {squadMember.nationality}
            </p>
            <br />
          </div>
        ))}
      </div>
      <div>
        <Link to="/team" className="button">
          Back to the list of teams
        </Link>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
