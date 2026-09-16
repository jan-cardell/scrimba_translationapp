import OpenAI from 'openai'
import express from 'express'
import 'dotenv/config'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const openai = new OpenAI({
    apiKey: process.env.AI_KEY,
    baseURL: process.env.AI_URL
})

const messages = [{
    role: 'system',
    content: `
    You are a translator.
    Only tranlate the last user input.
    Ouptut only the translation and nothing else.
    `
}]

app.post('/api/translation', async (req, res) => {
    const { userPromt } = req.body
    const { inputLanguage } = req.body

    messages.push({
        role: 'system',
        content: `Translate the user input into ${inputLanguage}`
    })
    messages.push({
        role: 'user',
        content: userPromt
    })

    try {
        const response = await openai.chat.completions.create({
            model: process.env.AI_MODEL,
            messages
        })
        const translation = response.choices[0].message.content

        res.json({ translation })
    } catch(e) {
        console.log(e)
    }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

