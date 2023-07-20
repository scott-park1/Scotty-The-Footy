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

  return (
    <div className="content">
      <div>
        <h1 className="heading">Match Details</h1>
        <br />
        {matchDetails?.matches[0] ? (
          <>
            <h2>Full Time Score</h2>
            <br />
            <p className="table">
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
            <h2>Referee</h2>
            <br />
            <p className="table">{matchDetails?.matches[0].referees[0].name}</p>
            <br />
            <h2>Head-to-Head</h2>
            <br />
            <p className="table">
              <b>Played:</b> {matchDetails?.aggregates.numberOfMatches}
            </p>
            <p className="table">
              <b>Draws:</b> {matchDetails?.aggregates.homeTeam.draws}
            </p>
            <br />
            <p className="table">{matchDetails?.aggregates.homeTeam.name}</p>
            <p className="table">
              <b>Total Wins:</b> {matchDetails?.aggregates.homeTeam.wins}
            </p>
            <br />
            <p className="table">{matchDetails?.aggregates.awayTeam.name}</p>
            <p className="table">
              <b>Total Wins:</b> {matchDetails?.aggregates.awayTeam.wins}
            </p>
          </>
        ) : (
          <p className="table-no-details">Match details not available yet...</p>
        )}
      </div>
      <div>
        <Link to="/fixture" className="button">
          Back to Fixtures
        </Link>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
