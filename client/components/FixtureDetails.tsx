import '../main.css'
import request from 'superagent'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

interface Referee {
  id: number
  name: string
  type: string
  nationality: string
}

interface GameMatch {
  homeTeam: {
    id: number
    name: string
    shortName: string
    tla: string
    crest: string
  }

  awayTeam: {
    id: number
    name: string
    shortName: string
    tla: string
    crest: string
  }

  score: {
    fullTime: {
      home: number
      away: number
    }
  }

  referees: Referee[]
}

interface MatchDetails {
  id: number
  matches: GameMatch[]

  aggregates: {
    numberOfMatches: number
    totalGoals: number
    homeTeam: {
      id: number
      name: string
      wins: string
      draws: string
      losses: string
    }
    awayTeam: {
      id: number
      name: string
      wins: string
      draws: string
      losses: string
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
        const response = await request.get(
          `/api/matches/${id}/head2head?limit=50`
        )
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
        {matchDetails?.matches[0] ? (
          <>
            <h2>Full Time Score:</h2>
            <br />
            <p>
              <img
                className="crest"
                src={matchDetails?.matches[0].homeTeam.crest}
                alt={matchDetails?.matches[0].homeTeam.name}
              />
              {matchDetails?.matches[0].homeTeam.name}{' '}
              <b>{matchDetails?.matches[0].score.fullTime.home}</b> {':'}{' '}
              <b>{matchDetails?.matches[0].score.fullTime.away}</b>{' '}
              {matchDetails?.matches[0].awayTeam.name}
              <img
                className="crest"
                src={matchDetails?.matches[0].awayTeam.crest}
                alt={matchDetails?.matches[0].awayTeam.name}
              />
            </p>
            <br />
            <h2>Referee:</h2>
            <br />
            <p>{matchDetails?.matches[0].referees[0].name}</p>
            <br />
            <h2>Head-to-Head:</h2>
            <br />
            <p>
              <b>Played:</b> {matchDetails?.aggregates.numberOfMatches}
            </p>
            <p>
              <b>Draws:</b> {matchDetails?.aggregates.homeTeam.draws}
            </p>
            <br />
            <p>{matchDetails?.aggregates.homeTeam.name}</p>
            <p>
              <b>Total Wins:</b> {matchDetails?.aggregates.homeTeam.wins}
            </p>
            <br />
            <p>{matchDetails?.aggregates.awayTeam.name}</p>
            <p>
              <b>Total Wins:</b> {matchDetails?.aggregates.awayTeam.wins}
            </p>
          </>
        ) : (
          <p>Match details not available yet...</p>
        )}
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
