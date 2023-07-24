import server from './server'

const PORT = process.env.PORT || 3000
process.env.NODE_ENV

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port', PORT)
})

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  const envConfig = require('dotenv').config()
  if (envConfig.error) throw envConfig.error
}
