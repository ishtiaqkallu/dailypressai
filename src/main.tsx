import { useState } from 'react'
import './App.css'

const articles = [
  {
    category: 'TECHNOLOGY',
    title: 'How artificial intelligence is changing our everyday lives',
    description:
      'Discover the latest developments in AI and how new tools are transforming the way we work, learn, and create.',
    source: 'DailyPress AI',
    time: '5 min read',
    icon: '🤖',
  },
  {
    category: 'WORLD',
    title: 'The global stories shaping tomorrow',
    description:
      'A concise overview of important international developments, emerging trends, and the stories worth following.',
    source: 'World Brief',
    time: '4 min read',
    icon: '🌍',
  },
  {
    category: 'SCIENCE',
    title: 'New discoveries expand our understanding of the universe',
    description:
      'Explore fascinating research and scientific ideas that help us understand the world around us.',
    source: 'Science Daily',
    time: '6 min read',
    icon: '🔬',
  },
]

const interests = ['Technology', 'World News', 'Business', 'Science', 'Sports', 'Health']

function App() {
  const [selected, setSelected] = useState<string[]>(['Technology', 'Science'])
  const [subscribed, setSubscribed] = useState(false)

  function toggleInterest(interest: string) {
    setSelected((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    )
    setSubscribed(false)
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">D</span>
          <span>DailyPress<span className="brand-accent">AI</span></span>
        </a>

        <nav className="nav-links">
          <a href="#edition">Today's Edition</a>
          <a href="#personalize">Your Interests</a>
          <a href="#about">About</a>
        </nav>

        <a className="nav-button" href="#personalize">Personalize <span>↗</span></a>
      </header>

      <main id="home">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow"><span className="live-dot" /> YOUR WORLD, WELL READ</div>
            <h1>Your morning.<br />Your news.<br /><span>Your perspective.</span></h1>
            <p className="hero-description">
              A smarter morning paper, made just for you. Discover the stories
              that matter to your world — all in one beautiful daily edition.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#edition">Explore today's paper <span>→</span></a>
              <a className="text-button" href="#personalize">Make it yours ↗</a>
            </div>
            <div className="hero-note"><span>✦</span> A little more informed, every morning.</div>
          </div>

          <div className="paper-preview" aria-label="Newspaper preview">
            <div className="paper-topline"><span>THE DAILY PRESS</span><span>YOUR PERSONAL EDITION</span></div>
            <div className="paper-date">MONDAY · YOUR DAILY BRIEFING</div>
            <div className="paper-rule" />
            <div className="paper-label">THE BIG STORY</div>
            <h2>A world of news.<br />One paper.</h2>
            <p className="paper-summary">The stories you care about, thoughtfully brought together for your morning.</p>
            <div className="paper-illustration"><span>☀</span><span>◒</span><span>✳</span></div>
            <div className="paper-columns">
              <div><b>01 / DISCOVER</b><span>Fresh perspectives</span></div>
              <div><b>02 / PERSONALIZE</b><span>Made for you</span></div>
            </div>
            <div className="paper-bottom"><span>READ WITH PURPOSE</span><span>VOL. 001</span></div>
          </div>
          <div className="floating-tag"><span>✦</span> Curated around you</div>
        </section>

        <section className="trust-strip">
          <span>LESS NOISE. MORE SIGNAL.</span>
          <span className="trust-divider" />
          <span>YOUR INTERESTS</span>
          <span className="trust-divider" />
          <span>ONE DAILY EDITION</span>
          <span className="trust-divider" />
          <span>ALWAYS YOURS</span>
        </section>

        <section className="edition-section" id="edition">
          <div className="section-heading">
            <div><div className="eyebrow">THE MORNING EDITION</div><h2>Worth your <em>attention.</em></h2></div>
            <span className="edition-date">A SAMPLE EDITION</span>
          </div>
          <p className="section-description">
            A preview of the kind of stories your personal paper could bring together.
          </p>

          <div className="article-grid">
            {articles.map((article, index) => (
              <article className="article-card" key={article.title}>
                <div className={`article-art art-${index + 1}`}><span>{article.icon}</span><small>0{index + 1}</small></div>
                <div className="article-content">
                  <div className="article-category">{article.category}</div>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <div className="article-footer"><span>{article.source}</span><span>{article.time}</span></div>
                </div>
              </article>
            ))}
          </div>
          <p className="sample-notice">These are sample stories for the design preview, not live news articles.</p>
        </section>

        <section className="personalize-section" id="personalize">
          <div className="personalize-copy">
            <div className="eyebrow">MADE FOR YOUR MIND</div>
            <h2>Your interests.<br /><em>Your edition.</em></h2>
            <p>Choose the subjects you care about. Your selections are a first step toward a morning paper that feels like yours.</p>
            <div className="interest-note">✦ You can change your interests any time.</div>
          </div>
          <div className="interest-panel">
            <div className="interest-panel-header"><div><span>01 — PERSONALIZE</span><h3>What interests you?</h3></div><span className="interest-count">{selected.length} selected</span></div>
            <div className="interest-options">
              {interests.map((interest) => (
                <button
                  className={`interest-chip ${selected.includes(interest) ? 'selected' : ''}`}
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  aria-pressed={selected.includes(interest)}
                >
                  <span>{selected.includes(interest) ? '✓' : '+'}</span>{interest}
                </button>
              ))}
            </div>
            <button className="primary-button subscribe-button" type="button" onClick={() => setSubscribed(true)}>
              Save my interests <span>→</span>
            </button>
            {subscribed && <p className="success-message" role="status">✓ Your interests have been selected for this session.</p>}
            <p className="privacy-note">This demo doesn't send or store your choices on a server.</p>
          </div>
        </section>

        <section className="closing-banner" id="about">
          <div><div className="eyebrow">A BETTER WAY TO BEGIN</div><h2>Make room for what <em>matters.</em></h2></div>
          <a href="#edition" className="primary-button">Explore the edition <span>→</span></a>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#home"><span className="brand-icon">D</span><span>DailyPress<span className="brand-accent">AI</span></span></a>
        <span>Your world, well read.</span>
        <span>© 2026 DailyPressAI · Hackathon prototype</span>
      </footer>
    </div>
  )
}

export default App