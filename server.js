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
    Ouptut only the translation and nothing else.
    `
}]

app.post('/api/translation', async (req, res) => {
    const { userPromt } = req.body
    const { inputLanguage } = req.body

    messages[1] = {
        role: 'system',
        content: `Translate the user input into ${inputLanguage}`
    }

    messages[2] = {
        role: 'user',
        content: userPromt
    }

    try {
        const stream = await openai.chat.completions.create({
            model: process.env.AI_MODEL,
            messages,
            stream: true
        })
        
        console.log(stream)
        let translation = ''

        for await (const chunk of stream) {
            const chunkContent = chunk.choices[0].delta.content
            if (chunkContent) {
                res.write(chunkContent)
            }
        } res.end()
        } catch(err){
            console.log(err)
        }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

