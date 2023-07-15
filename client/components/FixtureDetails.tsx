import '../main.css'
import request from 'superagent'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

interface Referee {
  id: number
  name: string
}

interface MatchDetails {
  id: number
  matchday: string
  referees: Referee[]

  homeTeam: {
    id: number
    name: string
    tla: string
    crest: string
  }

  awayTeam: {
    id: number
    name: string
    tla: string
    crest: string
  }
  score: {
    fullTime: {
      home: number
      away: number
    }
  }
}

export default function FixtureDetails() {
  const { id } = useParams()
  const [matchDetails, setMatchDetails] = useState<MatchDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchMatchDetails() {
      try {
        const response = await request.get(`/api/competitions/matches/${id}`)
        const matchData = response.body
        setMatchDetails(matchData)
        setLoading(false)
      } catch (error) {
        setError('Something went wrong...')
        setLoading(false)
      }
    }
    fetchMatchDetails()
  }, [id])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className="content">
      <div>
        <h1>Match Details</h1>
        <br />
        <h2>Full Time Score:</h2>
        <br />
        <p>
          <img
            className="crest"
            src={matchDetails?.homeTeam.crest}
            alt={matchDetails?.homeTeam.name}
          />
          {matchDetails?.homeTeam.name}{' '}
          <b>{matchDetails?.score.fullTime.home}</b> {':'}
          <b>{matchDetails?.score.fullTime.away}</b>{' '}
          {matchDetails?.awayTeam.name}
          <img
            className="crest"
            src={matchDetails?.awayTeam.crest}
            alt={matchDetails?.awayTeam.name}
          />
        </p>
        <br />
        <h2>Referee:</h2>
        <br />
        {/* <p>{matchDetails?.referees[0].name}</p> */}
      </div>
      <div>
        <Link to="/fixture" className="button">
          Back to Fixture
        </Link>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
