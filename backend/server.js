import express from 'express'
import { dbConnection } from './src/scripts/dbConnection'

const app = express()
const port = process.env.port