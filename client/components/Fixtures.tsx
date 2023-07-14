import '../main.css'
import request from 'superagent'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Match {
  id: number
  matchday: string

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
}

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([])
  const [selectedYear, setSelectedYear] = useState('2023')
  const [matchWeek, setMatchWeek] = useState('1')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchMatches() {
      try {
        const response = await request.get(
          `api/competitions/matches/${selectedYear}/${matchWeek}`
        )
        const matchesData = response.body.matches
        setMatches(matchesData)
        setLoading(false)
      } catch (error) {
        setError('Something went wrong...')
        setLoading(false)
      }
    }
    fetchMatches()
  }, [selectedYear, matchWeek])

  if (loading) {
    return <p>Loading...</p>
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setSelectedYear(event.target.value)
  }

  const handleMatchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setMatchWeek(event.target.value)
  }

  return (
    <div className="content">
      <h1 className="heading">Fixtures</h1>
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
      <h2>Select Matchweek:</h2>
      <select
        name="select-matchweek"
        id="select-matchweek"
        onChange={handleMatchChange}
        defaultValue={matchWeek}
        className="dropdown"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        <option value="25">25</option>
        <option value="26">26</option>
        <option value="27">27</option>
        <option value="28">28</option>
        <option value="29">29</option>
        <option value="30">30</option>
        <option value="31">31</option>
        <option value="32">32</option>
        <option value="33">33</option>
        <option value="34">34</option>
        <option value="35">35</option>
        <option value="36">36</option>
        <option value="37">37</option>
        <option value="38">38</option>
      </select>
      {matches.map((match) => {
        return (
          <div key={match.id}>
            <p>
              <img
                className="crest"
                src={match.homeTeam.crest}
                alt={match.homeTeam.name}
              />
              {match.homeTeam.tla} <b>vs</b> {match.awayTeam.tla}
              <img
                className="crest"
                src={match.awayTeam.crest}
                alt={match.awayTeam.name}
              />
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
