
import { useState } from 'react'
import './App.css'

type Explanation = {
  summary: string
  simpleExplanation: string
  keyPoints: string[]
}

function App() {
  const [article, setArticle] = useState('')
  const [result, setResult] = useState<Explanation | null>(null)
  const [error, setError] = useState('')

  function explainArticle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setResult(null)

    const cleanedArticle = article.trim()

    if (cleanedArticle.length < 40) {
      setError('Please paste a longer article (at least 40 characters).')
      return
    }

    // Demo mode: selects sentences locally; this is not real AI.
    const sentences = cleanedArticle
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.trim())
      .filter(Boolean)

    const summary = sentences.slice(0, 2).join(' ')
    const keyPoints = sentences.slice(0, 4)

    setResult({
      summary,
      simpleExplanation:
        'This is a short preview based on the opening of your article. Read the key points below to review the main statements. Connect an AI service to get a genuine AI-written explanation.',
      keyPoints,
    })
  }

  return (
    <main className="app-shell" id="home">
      <nav className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">D</span>
          DailyPress<span className="brand-ai">AI</span>
        </a>

        <div className="nav-links">
          <a href="#explainer">Article explainer</a>
          <a href="#about">How it works</a>
        </div>

        <a className="nav-button" href="#explainer">
          Try it now <span>↗</span>
        </a>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="live-dot" />
            NEWS, MADE CLEAR
          </div>

          <h1>
            Understand the news.
            <br />
            <span>Not just the headlines.</span>
          </h1>

          <p className="hero-description">
            Paste a news article and explore its main points in a
            simpler, clearer way. Less noise. More understanding.
          </p>

          <div className="hero-actions">
            <a href="#explainer" className="primary-button">
              Explain an article <span>→</span>
            </a>
            <a href="#about" className="secondary-button">
              How it works ↓
            </a>
          </div>

          <p className="hero-note">
            ✦ Built for curious minds and informed readers.
          </p>
        </div>

        <div className="newspaper-preview">
          <div className="paper-top">
            <span>YOUR DAILY BRIEFING</span>
            <span>VOL. 001</span>
          </div>
          <h2 className="paper-title">
            The Daily
            <br />
            <span>Perspective.</span>
          </h2>
          <div className="paper-rule" />
          <span className="paper-category">THE BIG PICTURE</span>
          <h3>A smarter way to stay informed.</h3>
          <p className="paper-description">
            Important information, broken down into clear and
            understandable points.
          </p>
          <div className="paper-highlight">
            <span>✳</span>
            <div>
              <strong>Read smarter</strong>
              <p>Focus on what matters.</p>
            </div>
          </div>
          <div className="paper-rule" />
          <div className="paper-footer">
            <span>CLARITY OVER CLUTTER</span>
            <span>01 / 01</span>
          </div>
        </div>
      </section>

      <section className="feature-strip">
        <div><strong>01</strong><span>Paste an article</span></div>
        <div><strong>02</strong><span>Review key points</span></div>
        <div><strong>03</strong><span>Understand the story</span></div>
      </section>

      <section className="explainer-section" id="explainer">
        <div className="section-heading">
          <span className="section-label">YOUR NEWS WORKSPACE</span>
          <h2>Make any article easier to understand.</h2>
          <p>
            Paste the article text below to create a quick local preview.
          </p>
        </div>

        <div className="workspace">
          <form className="article-form" onSubmit={explainArticle}>
            <label htmlFor="article">Your article</label>
            <p className="input-hint">
              Copy text from a news article and paste it here.
            </p>
            <textarea
              id="article"
              value={article}
              onChange={(event) => {
                setArticle(event.target.value)
                setError('')
              }}
              placeholder="Paste your news article here..."
              rows={11}
              required
            />
            <div className="input-footer">
              <span>{article.length} characters</span>
              <button className="clear-button" type="button" onClick={() => {
                setArticle('')
                setResult(null)
                setError('')
              }}>
                Clear text
              </button>
            </div>

            {error && <p className="error-message" role="alert">{error}</p>}

            <button className="primary-button submit-button" type="submit">
              Explain article <span>→</span>
            </button>
            <p className="privacy-note">
              Demo mode: your article is processed in this browser.
            </p>
          </form>

          <div className="results-panel" aria-live="polite">
            {!result ? (
              <div className="empty-state">
                <div className="empty-icon">✳</div>
                <h3>Your explanation will appear here.</h3>
                <p>
                  Add an article and select Explain article to see a
                  preview of the summary and key points.
                </p>
                <span className="demo-badge">LOCAL DEMO</span>
              </div>
            ) : (
              <div className="result-content">
                <span className="section-label">ARTICLE RESULTS</span>
                <span className="demo-badge">LOCAL DEMO · NOT AI</span>

                <h3>Quick summary</h3>
                <p>{result.summary}</p>

                <div className="result-divider" />

                <h3>In simple terms</h3>
                <p>{result.simpleExplanation}</p>

                <div className="result-divider" />

                <h3>Key points from the text</h3>
                <ul>
                  {result.keyPoints.map((point, index) => (
                    <li key={`${index}-${point}`}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="how-section" id="about">
        <span className="section-label">SIMPLE BY DESIGN</span>
        <h2>From long article to clear ideas.</h2>
        <div className="how-grid">
          <article>
            <span className="step-number">01</span>
            <h3>Paste</h3>
            <p>Bring the text of a news story into your workspace.</p>
          </article>
          <article>
            <span className="step-number">02</span>
            <h3>Review</h3>
            <p>See a quick preview and selected statements from the text.</p>
          </article>
          <article>
            <span className="step-number">03</span>
            <h3>Understand</h3>
            <p>Our next milestone is connecting a real AI service for deeper explanations.</p>
          </article>
        </div>
      </section>

      <footer className="footer">
        <a className="brand" href="#home">
          <span className="brand-icon">D</span>
          DailyPress<span className="brand-ai">AI</span>
        </a>
        <p>A little more perspective, every day.</p>
      </footer>
    </main>
  )
}

export default App
