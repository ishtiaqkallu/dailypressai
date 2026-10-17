
import { useState } from 'react'
import './App.css'

const stories = [
  {
    category: 'TECHNOLOGY',
    title: 'How artificial intelligence is changing our everyday lives',
    description: 'Explore the latest developments in AI, innovation, and the technology shaping our future.',
    time: '5 min read',
    color: '#e4e9ff',
  },
  {
    category: 'WORLD',
    title: 'The global stories you need to know today',
    description: 'A clear, concise look at the important events and ideas making headlines around the world.',
    time: '4 min read',
    color: '#f8e8d9',
  },
  {
    category: 'BUSINESS',
    title: 'The ideas and trends shaping tomorrow’s economy',
    description: 'Discover the business developments, market shifts, and new opportunities worth following.',
    time: '6 min read',
    color: '#dff3e8',
  },
]

function App() {
  const [interests, setInterests] = useState<string[]>([
    'Technology',
    'Business',
  ])
  const [email, setEmail] = useState('')
  const [started, setStarted] = useState(false)

  const topics = [
    'Technology',
    'World News',
    'Business',
    'Science',
    'Sports',
    'Health',
    'Entertainment',
    'Environment',
  ]

  function toggleInterest(topic: string) {
    setInterests((current) =>
      current.includes(topic)
        ? current.filter((item) => item !== topic)
        : [...current, topic],
    )
  }

  return (
    <main>
      <nav className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">D</span>
          DailyPress<span className="brand-ai">AI</span>
        </a>

        <div className="nav-links">
          <a href="#edition">Today's edition</a>
          <a href="#about">How it works</a>
        </div>

        <a className="nav-button" href="#personalize">
          Personalize yours <span>↗</span>
        </a>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="live-dot" />
            YOUR WORLD, WELL READ
          </div>

          <h1>
            The world,
            <br />
            <span>delivered to you.</span>
          </h1>

          <p className="hero-description">
            Your personal morning newspaper, thoughtfully curated
            around what matters to you. Less noise. More insight.
            A better way to start your day.
          </p>

          <div className="hero-actions">
            <a href="#personalize" className="primary-button">
              Create my newspaper <span>→</span>
            </a>
            <a href="#edition" className="secondary-button">
              Explore the edition ↓
            </a>
          </div>

          <div className="hero-note">
            <span>✦</span> Made for curious minds, every morning.
          </div>
        </div>

        <div className="newspaper-preview">
          <div className="paper-top">
            <span>YOUR DAILY BRIEFING</span>
            <span>VOL. 001</span>
          </div>

          <div className="paper-masthead">The Daily</div>
          <div className="paper-masthead accent">Perspective.</div>

          <div className="paper-rule" />

          <div className="paper-meta">
            <span>MONDAY MORNING EDITION</span>
            <span>PERSONALIZED FOR YOU</span>
          </div>

          <div className="paper-feature">
            <div>
              <span className="paper-category">THE BIG PICTURE</span>
              <h3>A smarter way to stay informed.</h3>
              <p>Your interests. Your stories. Your morning ritual.</p>
            </div>
            <div className="paper-illustration">✳</div>
          </div>

          <div className="paper-rule" />

          <div className="paper-columns">
            <div>
              <span className="mini-category">TECHNOLOGY</span>
              <div className="mini-line wide" />
              <div className="mini-line" />
              <div className="mini-line short" />
            </div>
            <div>
              <span className="mini-category">WORLD NEWS</span>
              <div className="mini-line wide" />
              <div className="mini-line" />
              <div className="mini-line short" />
            </div>
          </div>

          <div className="paper-footer">
            <span>CURATED WITH INTELLIGENCE</span>
            <span>01 / 08</span>
          </div>
        </div>

        <div className="hero-decoration decoration-one" />
        <div className="hero-decoration decoration-two" />
      </section>

      <section className="stats-strip">
        <div>
          <strong>01</strong>
          <span>One personal edition</span>
        </div>
        <div>
          <strong>08+</strong>
          <span>Topics to explore</span>
        </div>
        <div>
          <strong>∞</strong>
          <span>Stories worth discovering</span>
        </div>
      </section>

      <section className="edition-section" id="edition">
        <div className="section-heading">
          <div>
            <span className="section-label">A GLIMPSE INSIDE</span>
            <h2>Stories with substance.</h2>
            <p>A preview of the kind of stories your morning paper can bring together.</p>
          </div>
          <span className="date-badge">THE DAILY EDITION</span>
        </div>

        <div className="story-grid">
          {stories.map((story, index) => (
            <article className="story-card" key={story.category}>
              <div
                className="story-art"
                style={{ backgroundColor: story.color }}
              >
                <span className="story-number">0{index + 1}</span>
                <span className="story-symbol">
                  {['✳', '◎', '↗'][index]}
                </span>
              </div>
              <div className="story-body">
                <span className="story-category">{story.category}</span>
                <h3>{story.title}</h3>
                <p>{story.description}</p>
                <span className="read-time">{story.time} · Preview story</span>
              </div>
            </article>
          ))}
        </div>
        <p className="preview-note">
          These are sample preview stories, not live news articles yet.
        </p>
      </section>

      <section className="personalize-section" id="personalize">
        <div className="personalize-copy" id="about">
          <span className="section-label">BUILT AROUND YOU</span>
          <h2>Your interests.<br />Your newspaper.</h2>
          <p>
            Tell us what you care about. DailyPressAI is being built to
            help you discover relevant stories and create a reading
            experience that feels like yours.
          </p>
          <div className="benefit"><span>✓</span> Choose your favorite topics</div>
          <div className="benefit"><span>✓</span> Discover a more focused daily briefing</div>
          <div className="benefit"><span>✓</span> Work toward a personal PDF edition</div>
        </div>

        <form
          className="interest-card"
          onSubmit={(event) => {
            event.preventDefault()
            setStarted(true)
          }}
        >
          <div className="form-heading">
            <span className="section-label">YOUR READING PROFILE</span>
            <h3>What interests you?</h3>
            <p>Select a few topics to shape your experience.</p>
          </div>

          <div className="topic-grid">
            {topics.map((topic) => (
              <button
                className={`topic-chip ${interests.includes(topic) ? 'selected' : ''}`}
                type="button"
                key={topic}
                onClick={() => toggleInterest(topic)}
                aria-pressed={interests.includes(topic)}
              >
                {interests.includes(topic) ? '✓ ' : '+ '}
                {topic}
              </button>
            ))}
          </div>

          <label className="email-label" htmlFor="email">
            Email address (optional)
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <button className="primary-button submit-button" type="submit">
            Save my preferences <span>→</span>
          </button>

          {started && (
            <p className="success-message" role="status">
              Your selected topics: {interests.join(', ') || 'None selected'}.
              {email ? ` Email: ${email}.` : ''} This is a local demo; your
              preferences are not saved to a server yet.
            </p>
          )}
        </form>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon">D</span>
          DailyPress<span className="brand-ai">AI</span>
        </a>
        <p>A little more perspective, every morning.</p>
        <span>© 2026 DailyPressAI · Built for curious minds.</span>
      </footer>
    </main>
  )
}

export default App
