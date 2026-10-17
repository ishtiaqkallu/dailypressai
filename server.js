import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 3001

app.use(express.json({ limit: '1mb' }))

app.post('/api/explain', async (req, res) => {
  try {
    const article = req.body?.article

    if (typeof article !== 'string' || article.trim().length < 40) {
      return res.status(400).json({
        error: 'Please provide an article with at least 40 characters.',
      })
    }

    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      return res.status(500).json({
        error: 'Server API key is not configured.',
      })
    }

    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          temperature: 0.3,
          messages: [
            {
              role: 'system',
              content:
                'You are DailyPressAI, a careful news explainer. Return a concise summary, a simple explanation, and 3 to 5 key points. Use only facts supported by the supplied article. Do not invent facts.',
            },
            {
              role: 'user',
              content: `Explain this news article in simple English:\n\n${article.trim()}`,
            },
          ],
        }),
      },
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Groq API request failed:', response.status, data)
      return res.status(502).json({
        error: 'AI service failed. Please check the server configuration and try again.',
      })
    }

    const explanation = data.choices?.[0]?.message?.content

    if (!explanation) {
      return res.status(502).json({
        error: 'AI returned an empty explanation.',
      })
    }

    return res.json({ explanation })
  } catch (error) {
    console.error('Explanation request failed:', error)
    return res.status(500).json({
      error: 'Could not explain the article. Please try again.',
    })
  }
})

app.listen(PORT, () => {
  console.log(`DailyPressAI backend running at http://localhost:${PORT}`)
})
