
import { useState, type FormEvent } from "react";

type Story = {
  id: number;
  category: string;
  title: string;
  summary: string;
  source: string;
  readTime: string;
};

const topics = ["AI & Tech", "World", "Business", "Science", "Climate", "Culture"];

const stories: Story[] = [
  {
    id: 1,
    category: "AI & Tech",
    title: "The next chapter of AI is about the people who use it",
    summary:
      "Explore how artificial intelligence is changing work, learning and access to everyday knowledge.",
    source: "TechCrunch",
    readTime: "6 min read",
  },
  {
    id: 2,
    category: "World",
    title: "Understanding the forces shaping our changing world",
    summary:
      "Discover the diplomatic, economic and social developments behind today's global headlines.",
    source: "Reuters",
    readTime: "4 min read",
  },
  {
    id: 3,
    category: "Business",
    title: "What today's economic signals mean for tomorrow",
    summary:
      "Explore the trends in employment, investment and markets that help explain the bigger picture.",
    source: "Bloomberg",
    readTime: "5 min read",
  },
  {
    id: 4,
    category: "Science",
    title: "Small scientific discoveries can lead to big ideas",
    summary:
      "Discover the questions and research that gradually change how we understand the world.",
    source: "Nature",
    readTime: "3 min read",
  },
  {
    id: 5,
    category: "Climate",
    title: "Making sense of the global energy transition",
    summary:
      "Understand how technology, investment and public policy shape the transition to cleaner energy.",
    source: "Carbon Brief",
    readTime: "5 min read",
  },
  {
    id: 6,
    category: "Culture",
    title: "The ideas and stories influencing modern culture",
    summary:
      "A closer look at the books, creative movements and conversations shaping everyday life.",
    source: "The Guardian",
    readTime: "4 min read",
  },
];

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700&display=swap');

* { box-sizing: border-box; }
body { margin: 0; }
button, input { font: inherit; }
button { cursor: pointer; }

.dp {
  --bg: #edf1f8;
  --ink: #202c42;
  --muted: #7d899d;
  --blue: #4969e6;
  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
  font-family: 'DM Sans', sans-serif;
}

.dp button:focus-visible, .dp input:focus-visible {
  outline: 3px solid #8ba3ff;
  outline-offset: 3px;
}

.dp-header {
  max-width: 1160px;
  margin: auto;
  padding: 23px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.dp-brand {
  display: flex;
  align-items: center;
  gap: 11px;
  border: 0;
  background: none;
  color: var(--ink);
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -0.8px;
}

.dp-brand-icon {
  display: grid;
  place-items: center;
  width: 39px;
  height: 39px;
  border-radius: 13px;
  background: linear-gradient(145deg,#6282ff,#3e57ce);
  color: white;
  box-shadow: 5px 5px 12px #cbd2df,-4px -4px 10px white;
}

.dp-ai { color: var(--blue); }

.dp-nav { display: flex; align-items: center; gap: 10px; }

.dp-button {
  border: 0;
  border-radius: 12px;
  padding: 12px 17px;
  font-size: 12px;
  font-weight: 700;
  transition: transform .2s, box-shadow .2s;
}

.dp-button:hover { transform: translateY(-2px); }

.dp-button-soft {
  background: var(--bg);
  color: var(--ink);
  box-shadow: 5px 5px 11px #d0d6e2,-5px -5px 11px white;
}

.dp-button-primary {
  background: linear-gradient(120deg,#5b7bfa,#405ed7);
  color: white;
  box-shadow: 0 7px 17px #aebde9;
}

.dp-main { max-width: 1160px; margin: auto; padding: 18px 28px 60px; }

.dp-hero {
  padding: 46px 0 38px;
  display: grid;
  grid-template-columns: 1.25fr .75fr;
  align-items: center;
  gap: 35px;
}

.dp-kicker {
  font-size: 10px;
  letter-spacing: 2px;
  font-weight: 800;
  color: var(--blue);
  text-transform: uppercase;
}

.dp-hero h1 {
  margin: 15px 0;
  font: 600 clamp(38px,5.3vw,66px)/1.08 'Playfair Display',serif;
  letter-spacing: -1.7px;
}

.dp-hero h1 em { color: var(--blue); font-weight: 500; }

.dp-muted { color: var(--muted); font-size: 14px; line-height: 1.9; }

.dp-feature {
  padding: 26px;
  border-radius: 24px;
  background: var(--bg);
  box-shadow: 12px 12px 28px #d0d6e2,-12px -12px 28px white;
  animation: dp-rise .65s ease both;
}

.dp-feature-art {
  min-height: 155px;
  border-radius: 17px;
  display: grid;
  place-items: center;
  font-size: 62px;
  color: #526ce2;
  background: linear-gradient(140deg,#dbe5f8,#d9e8dc);
}

.dp-feature h2 { font: 600 24px/1.3 'Playfair Display',serif; margin: 18px 0 8px; }

.dp-section-title {
  margin: 38px 0 19px;
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
}

.dp-section-title h2 { margin: 7px 0 0; font: 600 30px 'Playfair Display',serif; }

.dp-topics { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 22px; }

.dp-chip {
  padding: 10px 15px;
  border: 0;
  border-radius: 22px;
  background: var(--bg);
  color: #647189;
  box-shadow: 4px 4px 9px #d1d7e2,-4px -4px 9px white;
  font-size: 12px;
}

.dp-chip.active { background: #dfe7ff; color: #3452c1; box-shadow: inset 3px 3px 7px #c7d1ef,inset -3px -3px 7px white; }

.dp-search {
  width: 100%;
  max-width: 390px;
  padding: 13px 16px;
  border: 0;
  border-radius: 12px;
  background: var(--bg);
  box-shadow: inset 4px 4px 8px #d3d9e5,inset -4px -4px 8px white;
  outline: none;
  color: var(--ink);
}

.dp-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 20px; }

.dp-story {
  padding: 21px;
  border-radius: 20px;
  background: var(--bg);
  box-shadow: 8px 8px 20px #d0d6e2,-8px -8px 20px white;
  transition: transform .2s;
  animation: dp-rise .5s ease both;
}

.dp-story:hover { transform: translateY(-4px); }

.dp-story-art {
  height: 90px;
  border-radius: 14px;
  background: linear-gradient(140deg,#dce5f4,#dce9df);
  display: grid;
  place-items: center;
  color: #5570d7;
  font-size: 35px;
}

.dp-story h3 { font: 600 20px/1.35 'Playfair Display',serif; margin: 13px 0 8px; }

.dp-story p { font-size: 12px; line-height: 1.8; color: var(--muted); }

.dp-story-meta { font-size: 10px; color: #7d899d; display: flex; justify-content: space-between; gap: 8px; }

.dp-actions { display: flex; gap: 9px; margin-top: 15px; }

.dp-actions button { flex: 1; padding: 10px 8px; font-size: 11px; }

.dp-footer { margin-top: 55px; padding-top: 22px; border-top: 1px solid #d9dfeb; color: var(--muted); font-size: 11px; display: flex; justify-content: space-between; gap: 14px; flex-wrap: wrap; }

.dp-login-page {
  min-height: 100vh;
  padding: 35px 20px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  isolation: isolate;
  overflow: hidden;
}

.dp-glow {
  position: absolute;
  z-index: -1;
  width: 310px;
  height: 310px;
  border-radius: 50%;
  filter: blur(75px);
  opacity: .4;
  pointer-events: none;
  background: #c5d3ff;
  top: -100px;
  left: -110px;
}

.dp-login-brand { margin-bottom: 27px; }

.dp-login-card {
  width: min(100%,440px);
  padding: 35px;
  border-radius: 25px;
  background: var(--bg);
  box-shadow: 15px 15px 36px #d0d6e2,-15px -15px 36px white;
  animation: dp-rise .55s ease both;
}

.dp-login-heading { text-align: center; margin-bottom: 25px; }

.dp-login-symbol {
  width: 49px;
  height: 49px;
  margin: 0 auto 18px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  color: var(--blue);
  font-size: 25px;
  box-shadow: inset 4px 4px 9px #d5dae4,inset -4px -4px 9px white;
}

.dp-login-heading h1 {
  font: 600 37px 'Playfair Display',serif;
  letter-spacing: -1px;
  margin: 10px 0;
}

.dp-login-heading h1 span { color: var(--blue); }

.dp-login-subtitle { font-size: 12px; color: var(--muted); line-height: 1.8; }

.dp-login-form { display: flex; flex-direction: column; gap: 10px; }

.dp-login-form label { font-size: 12px; font-weight: 700; color: #3c4960; }

.dp-login-form input:not([type=checkbox]) {
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border: 1px solid transparent;
  border-radius: 11px;
  background: var(--bg);
  box-shadow: inset 4px 4px 8px #d8deea,inset -4px -4px 8px white;
  outline: none;
  color: var(--ink);
  font-size: 13px;
}

.dp-login-form input:focus { border-color: #a3b4ff; }

.dp-password-label { display: flex; justify-content: space-between; align-items: center; margin-top: 9px; }

.dp-text-link { background: none; border: 0; color: var(--blue); font-size: 11px; font-weight: 700; }

.dp-password-wrap { position: relative; }

.dp-password-wrap input { padding-right: 58px !important; }

.dp-show-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  color: var(--blue);
  font-size: 11px;
  font-weight: 700;
}

.dp-remember { display: flex; align-items: center; gap: 9px; margin: 9px 0 12px; font-size: 11px; color: #68748a; }

.dp-remember input { accent-color: var(--blue); }

.dp-divider { text-align: center; color: #929caf; font-size: 10px; margin: 20px 0; letter-spacing: 1px; }

.dp-message { background: #e1e9ff; color: #304ba7; padding: 11px; border-radius: 9px; font-size: 12px; line-height: 1.6; }

.dp-signup { text-align: center; margin: 24px 0 0; font-size: 12px; color: var(--muted); }

.dp-login-footer { display: flex; justify-content: space-between; gap: 12px; width: min(100%,440px); margin-top: 24px; color: var(--muted); font-size: 10px; }

@keyframes dp-rise { from { opacity: 0; transform: translateY(13px); } to { opacity: 1; transform: translateY(0); } }

@media(max-width:800px) {
  .dp-hero { grid-template-columns: 1fr; padding-top: 28px; }
  .dp-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
}

@media(max-width:540px) {
  .dp-header { padding: 17px; }
  .dp-main { padding: 10px 17px 40px; }
  .dp-grid { grid-template-columns: 1fr; }
  .dp-hero h1 { font-size: 43px; }
  .dp-login-card { padding: 26px 21px; }
  .dp-login-heading h1 { font-size: 32px; }
  .dp-nav { gap: 7px; }
  .dp-nav .dp-button { padding: 10px; }
}

@media(prefers-reduced-motion:reduce) {
  .dp *, .dp *::before, .dp *::after { animation: none !important; transition: none !important; }
}
`;

export default function App() {
  const [page, setPage] = useState<"home" | "login" | "signup">("home");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [activeTopic, setActiveTopic] = useState("All");
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [interests, setInterests] = useState<string[]>(["AI & Tech", "World"]);
  const [showPersonalize, setShowPersonalize] = useState(false);

  const filteredStories = stories.filter((story) => {
    const topicMatch = activeTopic === "All" || story.category === activeTopic;
    const searchMatch = `${story.title} ${story.summary} ${story.category}`
      .toLowerCase()
      .includes(search.toLowerCase());
    return topicMatch && searchMatch;
  });

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "Login UI ready. Secure authentication backend abhi connect karna baqi hai."
    );
  }

  function toggleSaved(id: number) {
    setSavedIds((previous) =>
      previous.includes(id)
        ? previous.filter((savedId) => savedId !== id)
        : [...previous, id]
    );
  }

  function toggleInterest(topic: string) {
    setInterests((previous) =>
      previous.includes(topic)
        ? previous.filter((item) => item !== topic)
        : [...previous, topic]
    );
  }

  function handleGoogle() {
    setMessage("Google sign-in ko Firebase ya kisi auth provider se connect karna baqi hai.");
  }

  function renderLogin() {
    return (
      <main className="dp dp-login-page">
        <style>{styles}</style>
        <div className="dp-glow" />
        <button
          type="button"
          className="dp-button dp-button-soft"
          style={{ position: "absolute", top: 20, left: 20 }}
          onClick={() => {
            setPage("home");
            setMessage("");
          }}
        >
          ← Back
        </button>

        <button
          className="dp-brand dp-login-brand"
          type="button"
          onClick={() => setPage("home")}
        >
          <span className="dp-brand-icon">D</span>
          <span>DailyPress<span className="dp-ai">AI</span></span>
        </button>

        <section className="dp-login-card">
          <div className="dp-login-heading">
            <div className="dp-login-symbol">✦</div>
            <div className="dp-kicker">
              {page === "signup" ? "START YOUR DAILY EDITION" : "YOUR PERSONAL MORNING PAPER"}
            </div>
            <h1>{page === "signup" ? <>Create your <span>account.</span></> : <>Welcome <span>back.</span></>}</h1>
            <p className="dp-login-subtitle">
              Your world, your interests, your daily briefing.
            </p>
          </div>

          <button
            className="dp-button dp-button-soft"
            type="button"
            style={{ width: "100%", minHeight: 46 }}
            onClick={handleGoogle}
          >
            <span style={{ marginRight: 9, fontWeight: 800, color: "#4285F4" }}>G</span>
            Continue with Google
          </button>

          <div className="dp-divider">OR CONTINUE WITH EMAIL</div>

          <form className="dp-login-form" onSubmit={handleLogin}>
            <label htmlFor="dp-email">Email address</label>
            <input
              id="dp-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <div className="dp-password-label">
              <label htmlFor="dp-password">Password</label>
              <button
                className="dp-text-link"
                type="button"
                onClick={() =>
                  setMessage("Password recovery ke liye authentication service connect karni hogi.")
                }
              >
                Forgot password?
              </button>
            </div>

            <div className="dp-password-wrap">
              <input
                id="dp-password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                autoComplete={page === "signup" ? "new-password" : "current-password"}
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                type="button"
                className="dp-show-password"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {page === "login" && (
              <label className="dp-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                Keep me signed in
              </label>
            )}

            <button className="dp-button dp-button-primary" type="submit" style={{ minHeight: 48 }}>
              {page === "signup" ? "Create account" : "Sign in"} <span style={{ marginLeft: 8 }}>→</span>
            </button>

            {message && <div className="dp-message" role="status">{message}</div>}
          </form>

          <p className="dp-signup">
            {page === "signup" ? "Already have an account? " : "New to DailyPressAI? "}
            <button
              className="dp-text-link"
              type="button"
              onClick={() => {
                setPage(page === "signup" ? "login" : "signup");
                setMessage("");
              }}
            >
              {page === "signup" ? "Sign in" : "Create an account"}
            </button>
          </p>
        </section>

        <footer className="dp-login-footer">
          <span>© {new Date().getFullYear()} DailyPressAI</span>
          <span>Stay informed. Stay ahead.</span>
        </footer>
      </main>
    );
  }

  if (page === "login" || page === "signup") {
    return renderLogin();
  }

  return (
    <div className="dp">
      <style>{styles}</style>

      <header className="dp-header">
        <button className="dp-brand" type="button" onClick={() => setPage("home")}>
          <span className="dp-brand-icon">D</span>
          <span>DailyPress<span className="dp-ai">AI</span></span>
        </button>

        <nav className="dp-nav" aria-label="Main navigation">
          <button className="dp-button dp-button-soft" onClick={() => setActiveTopic("All")}>
            Discover
          </button>
          <button className="dp-button dp-button-soft" onClick={() => setActiveTopic("AI & Tech")}>
            My paper
          </button>
          <button className="dp-button dp-button-primary" onClick={() => { setPage("login"); setMessage(""); }}>
            Sign in
          </button>
        </nav>
      </header>

      <main className="dp-main">
        <section className="dp-hero">
          <div>
            <div className="dp-kicker">A FRESH PERSPECTIVE, EVERY MORNING</div>
            <h1>Your world.<br />Your news.<br /><em>Your way.</em></h1>
            <p className="dp-muted">
              A calmer, smarter morning paper built around what matters to you.
              Get the context behind the headlines without the noise.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 22 }}>
              <button className="dp-button dp-button-primary" onClick={() => setPage("signup")}>
                Personalize my paper →
              </button>
              <button className="dp-button dp-button-soft" onClick={() => window.print()}>
                Print / Save PDF
              </button>
            </div>
          </div>

          <article className="dp-feature">
            <div className="dp-feature-art">✦</div>
            <div className="dp-kicker" style={{ marginTop: 20 }}>TODAY'S BIG IDEA</div>
            <h2>The best way to follow the news is to understand it.</h2>
            <p className="dp-muted">
              Less noise, more context. Build a daily reading habit that follows your curiosity.
            </p>
          </article>
        </section>

        <section>
          <div className="dp-section-title">
            <div>
              <div className="dp-kicker">CURATED FOR YOUR CURIOSITY</div>
              <h2>Your morning edition</h2>
            </div>
            <input
              className="dp-search"
              type="search"
              placeholder="Search stories..."
              aria-label="Search stories"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="dp-topics">
            {["All", ...topics].map((topic) => (
              <button
                key={topic}
                className={`dp-chip ${activeTopic === topic ? "active" : ""}`}
                onClick={() => setActiveTopic(topic)}
                aria-pressed={activeTopic === topic}
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="dp-grid">
            {filteredStories.map((story, index) => (
              <article className="dp-story" key={story.id} style={{ animationDelay: `${index * 70}ms` }}>
                <div className="dp-story-art">{["✦", "◉", "↗", "✺", "♧", "✧"][index % 6]}</div>
                <div className="dp-kicker" style={{ marginTop: 16 }}>{story.category}</div>
                <h3>{story.title}</h3>
                <p>{story.summary}</p>
                <div className="dp-story-meta">
                  <span>{story.source}</span>
                  <span>{story.readTime}</span>
                </div>
                <div className="dp-actions">
                  <button
                    className="dp-button dp-button-soft"
                    onClick={() => toggleSaved(story.id)}
                  >
                    {savedIds.includes(story.id) ? "★ Saved" : "☆ Save"}
                  </button>
                  <button
                    className="dp-button dp-button-primary"
                    onClick={() => setMessage(`Selected: ${story.title}`)}
                  >
                    Read story →
                  </button>
                </div>
                {message === `Selected: ${story.title}` && (
                  <p className="dp-message">Demo story preview. Real article feeds can be connected to the backend.</p>
                )}
              </article>
            ))}
          </div>

          {filteredStories.length === 0 && (
            <p className="dp-muted">No stories match your search. Try another keyword or topic.</p>
          )}
        </section>

        <section className="dp-section-title">
          <div>
            <div className="dp-kicker">MAKE IT YOURS</div>
            <h2>Your interests. Your paper.</h2>
            <p className="dp-muted">Choose topics that you'd like to see in your morning edition.</p>
          </div>
          <button className="dp-button dp-button-primary" onClick={() => setShowPersonalize((value) => !value)}>
            ✦ Personalize
          </button>
        </section>

        {showPersonalize && (
          <section className="dp-feature">
            <div className="dp-topics">
              {topics.map((topic) => (
                <button
                  key={topic}
                  className={`dp-chip ${interests.includes(topic) ? "active" : ""}`}
                  onClick={() => toggleInterest(topic)}
                  aria-pressed={interests.includes(topic)}
                >
                  {interests.includes(topic) ? "✓ " : "+ "}{topic}
                </button>
              ))}
            </div>
            <p className="dp-muted">Selected interests: {interests.join(", ") || "None selected"}</p>
            <button className="dp-button dp-button-primary" onClick={() => setShowPersonalize(false)}>
              Save my interests
            </button>
          </section>
        )}

        <section className="dp-section-title">
          <div>
            <div className="dp-kicker">KEEP THE CONTEXT</div>
            <h2>Past editions.</h2>
            <p className="dp-muted">Your saved stories: {savedIds.length}</p>
          </div>
          <button className="dp-button dp-button-soft" onClick={() => window.print()}>
            Print edition / PDF
          </button>
        </section>

        <footer className="dp-footer">
          <div><strong>DailyPressAI</strong><br />A quieter way to stay informed.</div>
          <div>Demo notice: sample stories are illustrative, not live news.</div>
        </footer>
      </main>
    </div>
  );
}
