
if (!response.ok) {
  console.error('Groq API request failed:', response.status, data)
  return res.status(502).json({
    error: 'AI service failed. Please check the server configuration and try again.',
  })
}
