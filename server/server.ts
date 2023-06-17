import { join } from 'node:path'
import express from 'express'
import request from 'superagent'
import 'dotenv/config'

const token = process.env.X_Auth_Token

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, './public')))

server.get('/api/teams', async (req, res) => {
  const response = await request
  .get('https://api.football-data.org/v4/competitions/PL/teams?season=2022')
  .set('X-Auth-Token', `${token}`)
  const teams = response.body.teams
  console.log(response.body)
  res.json({ teams })
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
}})

server.get('/api/standings/:id', async (req, res) => {
  const id = req.params.id
  const response = await request
  .get(`https://api.football-data.org/v4/competitions/PL/standings?season=${id}`)
  .set('X-Auth-Token', `${token}`)
  const standings = response.body.standings
  console.log(response.body)
  res.json({ standings })
})

server.get('/api/scorers', async (req, res) => {
  const response = await request
  .get('https://api.football-data.org/v4/competitions/PL/scorers?season=2022')
  .set('X-Auth-Token', `${token}`)
  const scorers = response.body.scorers
  console.log(response.body)
  res.json({ scorers })
})

export default server
