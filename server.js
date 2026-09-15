import OpenAI from 'openai'
import express from 'express'

const app = express()
app.use(express.json())

const openai = new OpenAI({
    apiKey: process.env.AI_KEY
})