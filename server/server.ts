import { join } from 'node:path'
import express from 'express'
import request from 'superagent'
import 'dotenv/config'

const token = process.env.X_Auth_Token

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, './public')))

server.get('/api/competitions/teams/:id', async (req, res) => {
  const teamsId = req.params.id
  try {
    const response = await request
      .get(
        `https://api.football-data.org/v4/competitions/PL/teams?season=${teamsId}`
      )
      .set('X-Auth-Token', `${token}`)
    const teams = response.body.teams
    console.log(response.body)
    res.json({ teams })
  } catch (error) {
    res.json(500)
  }
})

server.get('/api/teams/:id', async (req, res) => {
  const teamId = req.params.id
  try {
    const response = await request
      .get(`https://api.football-data.org/v4/teams/${teamId}`)
      .set('X-Auth-Token', `${token}`)
    const teamDetails = response.body
    console.log(response.body)
    res.json(teamDetails)
  } catch (error) {
    res.json(500)
  }
})

server.get('/api/competitions/matches/:season/:id', async (req, res) => {
  const matchId = req.params.id
  const season = req.params.season
  try {
    const response = await request
      .get(
        `https://api.football-data.org/v4/competitions/PL/matches?season=${season}&matchday=${matchId}`
      )
      .set('X-Auth-Token', `${token}`)
    const matchDetails = response.body
    console.log(response.body)
    res.json(matchDetails)
  } catch (error) {
    res.json(500)
  }
})

server.get('/api/standings/:id', async (req, res) => {
  const id = req.params.id
  const response = await request
    .get(
      `https://api.football-data.org/v4/competitions/PL/standings?season=${id}`
    )
    .set('X-Auth-Token', `${token}`)
  const standings = response.body.standings
  console.log(response.body)
  res.json({ standings })
})

server.get('/api/scorers/:id', async (req, res) => {
  const id = req.params.id
  const response = await request
    .get(
      `https://api.football-data.org/v4/competitions/PL/scorers?season=${id}`
    )
    .set('X-Auth-Token', `${token}`)
  const scorers = response.body.scorers
  console.log(response.body)
  res.json({ scorers })
})

export default server
