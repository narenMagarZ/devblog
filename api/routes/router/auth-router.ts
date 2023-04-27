import express from 'express'
import { authCheck, githubEnter } from '../handler'

const authRouter = express.Router()
authRouter.post('/github',githubEnter)
authRouter.get('/check',authCheck)
export default authRouter