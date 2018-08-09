import restify from 'restify'
import cookieParser from 'restify-cookies'
import logger from './config/logger'
import config from './config'
import { getUserFromJwt, createNewUser } from './session'
import User from './models/User'
import sectors from './data/sectors.json'

// Connect to database
require('./config/db')

const { API_NAME, API_VERSION } = config

export const server = restify.createServer({
  name: API_NAME,
  version: API_VERSION,
})

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())
server.use(cookieParser.parse)

server.get('/sectors', async (request, response, next) => {
  const { cookies } = request
  const { jwt: token } = cookies
  const responseData = { sectors, selectedSectors: [] }
  const user = await getUserFromJwt(token)

  if (user) {
    // existing user
    logger.info(`User with id ${user._id} is trying to get sectors`)
    const { selectedSectors } = user
    responseData.selectedSectors = selectedSectors
    response.send(responseData)
    return next()
  }

  response.setCookie('jwt', await createNewUser())
  response.send(responseData)

  return next()
})

server.post('/save-selectors', async (request, response, next) => {
  let statusCode = 422

  try {
    const { cookies: { jwt: token }, body: { ids } } = request
    const user = await getUserFromJwt(token)
    if (!user) {
      statusCode = 404
    }
    // add error handling if jwt token is not returning user, generate new user and save
    const { id: userId } = user
    logger.info(`User: ${userId} is saving selectors ${ids}`)
    await User.findByIdAndUpdate(userId, {
      $set: { selectedSectors: ids },
    }, {
      runValidators: true,
    })
    response.send(ids)
  } catch (e) {
    logger.error('Saving selectors error')
    logger.error(e)
    response.send(statusCode, e)
  }

  return next()
})

server.listen(config.PORT, () => {
  logger.info(`${server.name} is listening on ${server.url}`)
})
