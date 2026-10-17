
import { useMemo, useState } from "react";

type Story = {
  id: number;
  category: string;
  eyebrow: string;
  title: string;
  summary: string;
  source: string;
  readTime: string;
  accent: string;
  symbol: string;
  url: string;
};

const topics = [
  "AI & Tech",
  "World",
  "Business",
  "Science",
  "Climate",
  "Culture",
];

const stories: Story[] = [
  {
    id: 1,
    category: "AI & Tech",
    eyebrow: "THE BIG STORY",
    title: "The next chapter of AI is about the people who use it",
    summary:
      "A new wave of AI tools is changing how people work, learn and discover information. The important question is how these tools make everyday knowledge more accessible.",
    source: "TechCrunch",
    readTime: "6 min read",
    accent: "#d8e5dc",
    symbol: "✳",
    url: "https://techcrunch.com/",
  },
  {
    id: 2,
    category: "World",
    eyebrow: "WORLD BRIEFING",
    title: "Understanding the forces shaping our changing world",
    summary:
      "Explore the diplomatic, economic and social developments behind the headlines, with context designed to make complicated events easier to understand.",
    source: "Reuters",
    readTime: "4 min read",
    accent: "#e8d9ca",
    symbol: "◎",
    url: "https://www.reuters.com/world/",
  },
  {
    id: 3,
    category: "Business",
    eyebrow: "THE BIG PICTURE",
    title: "What today's economic signals mean for tomorrow",
    summary:
      "Markets tell only part of the story. Understanding employment, consumer confidence and business investment helps reveal the wider economic picture.",
    source: "Bloomberg",
    readTime: "5 min read",
    accent: "#e8dfb9",
    symbol: "↗",
    url: "https://www.bloomberg.com/",
  },
  {
    id: 4,
    category: "Science",
    eyebrow: "CURIOUS MINDS",
    title: "Small scientific discoveries can lead to big ideas",
    summary:
      "Research often advances through incremental discoveries. Learn how asking better questions can change what we know about the world around us.",
    source: "Nature",
    readTime: "3 min read",
    accent: "#dce2f0",
    symbol: "✺",
    url: "https://www.nature.com/",
  },
  {
    id: 5,
    category: "Climate",
    eyebrow: "PLANET WATCH",
    title: "Making sense of the global energy transition",
    summary:
      "Technology, investment and public policy all shape the transition to cleaner energy. Here are the key themes worth following.",
    source: "Carbon Brief",
    readTime: "5 min read",
    accent: "#d8e6d1",
    symbol: "❋",
    url: "https://www.carbonbrief.org/",
  },
  {
    id: 6,
    category: "Culture",
    eyebrow: "CULTURE NOTES",
    title: "Why the stories we share shape the way we see things",
    summary:
      "Books, films and digital communities influence how ideas travel. A closer look at the cultural conversations connecting people.",
    source: "The Guardian",
    readTime: "4 min read",
    accent: "#f0d9d0",
    symbol: "✳",
    url: "https://www.theguardian.com/culture",
  },
];

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700;800&display=swap');

:root {
  font-family: 'DM Sans', sans-serif;
  color: #252920;
  background: #f4f3ed;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-optical-sizing: auto;
}

* { box-sizing: border-box; }

body { margin: 0; min-width: 320px; }

button, input { font: inherit; }
button { -webkit-tap-highlight-color: transparent; }

button:focus-visible, a:focus-visible, input:focus-visible {
  outline: 3px solid #d7774b;
  outline-offset: 3px;
}

.paper-app {
  min-height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 8% 0%, rgba(223,226,210,.48), transparent 34%),
    #f4f3ed;
}

.shell { max-width: 1200px; margin: auto; padding: 0 36px; }

.topbar {
  min-height: 86px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  border-bottom: 1px solid #e4e3da;
}

.brand { display: flex; align-items: center; gap: 11px; }
.brand-mark {
  width: 40px; height: 40px; border-radius: 14px;
  display: grid; place-items: center; color: #f8f5eb;
  background: #28382e; font-size: 23px;
  box-shadow: 4px 4px 10px #d7d8cf, -3px -3px 9px #fff;
}
.brand-name { font-weight: 700; font-size: 19px; letter-spacing: -.7px; }
.brand-sub { font-size: 10px; color: #7c8175; letter-spacing: 1.8px; margin-top: 3px; }

.top-actions { display: flex; align-items: center; gap: 12px; }
.icon-button, .profile-button {
  border: 0; cursor: pointer; color: #394238;
  background: #f4f3ed; box-shadow: 4px 4px 9px #dcdcd3, -4px -4px 9px #fff;
  transition: transform .22s ease, box-shadow .22s ease;
}
.icon-button { width: 43px; height: 43px; border-radius: 15px; font-size: 18px; }
.profile-button {
  width: 42px; height: 42px; border-radius: 50%;
  font-weight: 700; background: #dce6d9;
}
.icon-button:hover, .profile-button:hover {
  transform: translateY(-2px); box-shadow: 6px 6px 12px #d4d5cb, -5px -5px 11px #fff;
}

.text-button, .primary-button, .secondary-button {
  display: inline-flex; align-items: center; justify-content: center; gap: 9px;
  cursor: pointer; border: 0; text-decoration: none;
  transition: transform .22s ease, background .22s ease, box-shadow .22s ease;
}
.text-button {
  background: transparent; color: #586052; font-weight: 600;
  padding: 11px 5px;
}
.primary-button {
  color: white; background: #2e4134; padding: 13px 19px;
  border-radius: 14px; font-size: 13px; font-weight: 600;
  box-shadow: 4px 5px 11px #d4d7cc, -3px -3px 9px #fff;
}
.primary-button:hover { background: #3e5946; transform: translateY(-2px); }
.secondary-button {
  color: #374337; background: #f4f3ed; padding: 12px 17px;
  border-radius: 13px; border: 1px solid #e6e5dc; font-size: 12px;
}
.secondary-button:hover { transform: translateY(-2px); background: #fff; }
button:disabled { opacity: .45; cursor: not-allowed; transform: none; }

.date-row {
  padding: 29px 0 20px; display: flex; align-items: center;
  justify-content: space-between; gap: 20px;
}
.kicker { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #818577; font-weight: 700; }
.date-label { margin-top: 7px; font-size: 12px; color: #74786e; }
.edition-badge {
  border-radius: 99px; padding: 9px 12px; background: #e8ebdf;
  color: #58684e; font-size: 10px; letter-spacing: .5px; font-weight: 700;
}

.masthead { text-align: center; padding: 14px 0 26px; animation: riseIn .7s both; }
.masthead h1 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(42px, 7vw, 76px); line-height: 1.04;
  font-weight: 600; letter-spacing: -3px; margin: 0;
}
.masthead h1 em { color: #71816a; font-weight: 500; }
.masthead p { color: #73786d; font-size: 13px; line-height: 1.8; margin: 15px auto 0; max-width: 440px; }
.rule { border: 0; border-top: 1px solid #dcdcd1; margin: 0; }
.rule-double { border-top: 3px double #d3d3c8; margin-top: 5px; }

.section-heading {
  display: flex; justify-content: space-between; align-items: end;
  gap: 16px; margin: 30px 0 17px;
}
.section-heading h2 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 26px; font-weight: 600; letter-spacing: -.6px; margin: 5px 0 0;
}
.muted { color: #838679; font-size: 12px; }

.topic-bar { display: flex; gap: 9px; overflow-x: auto; padding: 3px 3px 13px; scrollbar-width: none; }
.topic-bar::-webkit-scrollbar { display: none; }
.topic-chip {
  flex-shrink: 0; cursor: pointer; border: 1px solid #e4e3d9;
  border-radius: 99px; padding: 10px 15px; font-size: 12px; font-weight: 600;
  color: #687064; background: #f4f3ed;
  box-shadow: 3px 3px 7px #e0e0d7, -3px -3px 7px #fff;
  transition: all .22s ease;
}
.topic-chip:hover { transform: translateY(-2px); }
.topic-chip.active {
  background: #2e4134; color: white; border-color: #2e4134;
  box-shadow: 2px 3px 7px #c9cdc1;
}

.featured {
  display: grid; grid-template-columns: 1.12fr .88fr; gap: 0;
  background: #e5eadf; border: 1px solid #e0e5d9;
  border-radius: 26px; overflow: hidden;
  box-shadow: 8px 9px 22px #dcdcd2, -6px -6px 18px #fff;
  animation: riseIn .75s .08s both;
}
.feature-copy { padding: clamp(25px, 4vw, 46px); display: flex; flex-direction: column; align-items: flex-start; }
.feature-copy h2 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(28px, 4vw, 43px); line-height: 1.13;
  letter-spacing: -1.2px; font-weight: 600; margin: 17px 0 13px;
}
.feature-copy p { color: #667063; line-height: 1.8; font-size: 13px; max-width: 450px; }
.story-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; color: #777e70; font-size: 11px; }
.dot { width: 3px; height: 3px; background: #a2a899; border-radius: 50%; }
.feature-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: auto; padding-top: 24px; }

.feature-art {
  min-height: 330px; position: relative; overflow: hidden;
  display: grid; place-items: center;
  background: linear-gradient(150deg, #d3dfd1, #e9e8d7 58%, #d3cbb4);
}
.art-orbit {
  width: min(68%, 280px); aspect-ratio: 1; border-radius: 50%;
  border: 1px solid rgba(48,67,51,.25); position: absolute;
  animation: orbit 28s linear infinite;
}
.art-orbit:before, .art-orbit:after {
  content: ''; position: absolute; border-radius: 50%; border: 1px solid rgba(48,67,51,.2);
}
.art-orbit:before { inset: 14%; }
.art-orbit:after { inset: 29%; }
.art-sun {
  width: 105px; height: 105px; border-radius: 50%; position: relative;
  background: linear-gradient(140deg, #f1d8a1, #c3a978);
  box-shadow: 12px 15px 32px rgba(91,93,62,.16), inset -6px -6px 15px rgba(122,101,60,.14), inset 4px 4px 12px rgba(255,255,255,.7);
  animation: float 5s ease-in-out infinite;
}
.art-sun:after {
  content: ''; position: absolute; width: 25px; height: 25px; border-radius: 50%;
  top: 20px; right: 16px; background: rgba(255,255,255,.38);
}
.art-label {
  position: absolute; bottom: 25px; left: 25px; right: 25px;
  display: flex; justify-content: space-between; align-items: center;
  color: #637060; font-size: 10px; letter-spacing: 1.4px; text-transform: uppercase;
}
.art-number { font-family: 'Playfair Display', Georgia, serif; font-size: 20px; letter-spacing: 0; }

.story-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 17px; }
.story-card {
  min-width: 0; background: #f5f4ee; border: 1px solid #e6e5dc;
  border-radius: 21px; overflow: hidden; display: flex; flex-direction: column;
  box-shadow: 5px 6px 14px #dfdfd5, -4px -4px 12px #fff;
  transition: transform .28s ease, box-shadow .28s ease;
  animation: riseIn .65s both;
}
.story-card:hover { transform: translateY(-5px); box-shadow: 9px 12px 22px #d9d9cf, -5px -5px 13px #fff; }
.story-art { height: 125px; display: grid; place-items: center; position: relative; overflow: hidden; }
.story-symbol { font-family: 'Playfair Display', Georgia, serif; font-size: 64px; opacity: .68; animation: float 6s ease-in-out infinite; }
.story-art small { position: absolute; bottom: 12px; left: 15px; font-size: 9px; letter-spacing: 1.5px; font-weight: 700; color: #4b584a; }
.story-content { padding: 20px; display: flex; flex-direction: column; flex: 1; }
.story-category { color: #7d806f; text-transform: uppercase; letter-spacing: 1.5px; font-size: 9px; font-weight: 700; }
.story-content h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 21px; line-height: 1.32; font-weight: 600;
  letter-spacing: -.3px; margin: 12px 0 9px;
}
.story-content p { color: #73776b; font-size: 12px; line-height: 1.8; margin: 0 0 18px; }
.card-bottom { margin-top: auto; padding-top: 13px; border-top: 1px solid #e7e6dc; display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.card-source { font-size: 10px; font-weight: 700; color: #596252; }
.card-actions { display: flex; gap: 6px; }
.small-action {
  border: 1px solid #e3e3d9; background: #f4f3ed; color: #667061;
  width: 31px; height: 31px; border-radius: 10px; cursor: pointer;
  transition: all .2s ease;
}
.small-action:hover { background: #e6eadf; transform: translateY(-2px); }
.small-action.active { color: white; background: #465d48; border-color: #465d48; }

.learning-panel {
  display: grid; grid-template-columns: 1fr auto; align-items: center;
  gap: 24px; margin: 33px 0 24px; padding: 25px 28px;
  border-radius: 22px; background: #eae8df;
  box-shadow: inset 4px 4px 10px #dbdad0, inset -4px -4px 10px #f8f7f0;
}
.learning-title { font-family: 'Playfair Display', Georgia, serif; font-size: 22px; margin: 8px 0; }
.learning-panel p { color: #76796d; font-size: 12px; line-height: 1.7; margin: 0; }
.progress-track { height: 6px; border-radius: 99px; background: #d5d6ca; margin-top: 14px; overflow: hidden; }
.progress-fill { height: 100%; width: 35%; border-radius: 99px; background: #73866b; }
.learning-stat { text-align: center; min-width: 86px; }
.learning-stat strong { display: block; font-family: 'Playfair Display', Georgia, serif; font-size: 33px; font-weight: 500; }
.learning-stat span { font-size: 10px; color: #7a7d71; }

.footer {
  margin-top: 34px; padding: 25px 0 32px; border-top: 1px solid #e0dfd5;
  display: flex; justify-content: space-between; align-items: center; gap: 15px;
  color: #838679; font-size: 11px;
}
.footer strong { color: #394739; }
.demo-note { font-size: 10px; color: #8b8b7e; line-height: 1.6; margin-top: 8px; }

.empty-state {
  text-align: center; padding: 58px 20px; border: 1px dashed #d9d9ce;
  border-radius: 20px; color: #74796c;
}
.empty-state .empty-symbol { font-size: 36px; }
.empty-state h3 { font-family: 'Playfair Display', Georgia, serif; color: #343c31; font-size: 24px; }

.modal-backdrop {
  position: fixed; inset: 0; z-index: 10; background: rgba(28,37,29,.42);
  backdrop-filter: blur(8px); display: grid; place-items: center;
  padding: 20px; animation: fadeIn .2s ease both;
}
.modal {
  width: min(100%, 510px); max-height: 90vh; overflow-y: auto;
  border-radius: 26px; padding: 30px; background: #f4f3ed;
  box-shadow: 12px 14px 40px rgba(25,33,26,.2);
  animation: riseIn .35s both;
}
.modal h2 { font-family: 'Playfair Display', Georgia, serif; font-size: 32px; margin: 12px 0; letter-spacing: -.7px; }
.modal p { color: #73776b; font-size: 13px; line-height: 1.8; }
.interest-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; margin: 20px 0 25px; }
.interest-option {
  border: 1px solid #e0e0d6; border-radius: 14px; padding: 14px;
  background: #f4f3ed; color: #586052; text-align: left; cursor: pointer;
  box-shadow: 3px 3px 7px #dfdfd5, -3px -3px 7px #fff;
}
.interest-option.selected { background: #e0e8dc; border-color: #8da087; color: #2d4633; }
.modal-actions { display: flex; justify-content: space-between; gap: 12px; align-items: center; }

.search-input {
  width: 100%; min-width: 0; border: 1px solid #e1e1d7; border-radius: 13px;
  padding: 12px 15px; color: #343c31; background: #f8f7f1;
  outline: none; font-size: 12px; margin-bottom: 17px;
}
.search-input:focus { border-color: #8da087; }

@keyframes riseIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes orbit { to { transform: rotate(360deg); } }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
}

@media (max-width: 800px) {
  .shell { padding: 0 22px; }
  .featured { grid-template-columns: 1fr; }
  .feature-art { min-height: 225px; grid-row: 1; }
  .story-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
  .story-card:last-child:nth-child(odd) { grid-column: auto; }
  .masthead h1 { letter-spacing: -2px; }
}

@media (max-width: 520px) {
  .shell { padding: 0 16px; }
  .topbar { min-height: 73px; }
  .brand-name { font-size: 17px; }
  .brand-mark { width: 36px; height: 36px; }
  .top-actions { gap: 8px; }
  .top-actions .text-button { display: none; }
  .date-row { padding-top: 23px; }
  .masthead { padding: 17px 0 24px; }
  .masthead h1 { font-size: 46px; }
  .section-heading h2 { font-size: 23px; }
  .story-grid { grid-template-columns: 1fr; }
  .story-art { height: 140px; }
  .feature-copy { padding: 25px 22px; }
  .feature-copy h2 { font-size: 32px; }
  .learning-panel { grid-template-columns: 1fr; padding: 23px; }
  .learning-stat { text-align: left; }
  .learning-stat strong { display: inline; margin-right: 8px; }
  .footer { flex-direction: column; align-items: flex-start; }
  .modal { padding: 23px; }
}

@media print {
  @page { size: A4; margin: 14mm; }
  :root, body, .paper-app { background: white !important; }
  .shell { max-width: none; padding: 0; }
  .topbar, .top-actions, .topic-bar, .feature-actions, .card-actions,
  .learning-panel, .footer, .modal-backdrop, .date-row .edition-badge,
  .demo-note, .secondary-button { display: none !important; }
  .date-row { padding-top: 0; }
  .masthead { padding-top: 8px; }
  .masthead h1 { font-size: 44px; }
  .featured { box-shadow: none; break-inside: avoid; grid-template-columns: 1.1fr .9fr; }
  .feature-art { min-height: 210px; }
  .story-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .story-card { box-shadow: none; break-inside: avoid; }
  .story-art { height: 80px; }
  .story-content { padding: 12px; }
  .story-content h3 { font-size: 17px; }
  .story-content p { font-size: 10px; }
  .section-heading { margin-top: 20px; }
  .paper-app { overflow: visible; }
}
`;

export default function App() {
  const [tab, setTab] = useState<"today" | "saved" | "archive">("today");
  const [selectedTopic, setSelectedTopic] = useState("For you");
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [skippedIds, setSkippedIds] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [interests, setInterests] = useState<string[]>([
    "AI & Tech",
    "World",
    "Business",
  ]);
  const [preferencesSaved, setPreferencesSaved] = useState(false);

  const today = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const visibleStories = useMemo(() => {
    return stories.filter((story) => {
      if (skippedIds.includes(story.id)) return false;
      if (tab === "saved" && !savedIds.includes(story.id)) return false;
      if (tab === "archive") return false;

      const topicMatch =
        selectedTopic === "For you" || story.category === selectedTopic;
      const searchMatch =
        story.title.toLowerCase().includes(search.toLowerCase()) ||
        story.summary.toLowerCase().includes(search.toLowerCase()) ||
        story.category.toLowerCase().includes(search.toLowerCase());

      return topicMatch && searchMatch;
    });
  }, [tab, selectedTopic, savedIds, skippedIds, search]);

  const featured = visibleStories[0];
  const remainingStories = visibleStories.slice(1);

  function toggleSaved(id: number) {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id],
    );
  }

  function skipStory(id: number) {
    setSkippedIds((current) => [...current, id]);
  }

  function toggleInterest(topic: string) {
    setInterests((current) =>
      current.includes(topic)
        ? current.filter((item) => item !== topic)
        : [...current, topic],
    );
  }

  function savePreferences() {
    setPreferencesSaved(true);
    setSelectedTopic("For you");
    setTab("today");
    setShowOnboarding(false);
  }

  return (
    <div className="paper-app">
      <style>{styles}</style>

      <div className="shell">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">d.</div>
            <div>
              <div className="brand-name">DailyPress<span style={{ color: "#84947a" }}>AI</span></div>
              <div className="brand-sub">YOUR WORLD, WELL READ</div>
            </div>
          </div>

          <nav className="top-actions" aria-label="Main navigation">
            <button
              className="text-button"
              onClick={() => {
                setTab("today");
                setSelectedTopic("For you");
              }}
            >
              My paper
            </button>
            <button className="text-button" onClick={() => setTab("saved")}>
              Saved ({savedIds.length})
            </button>
            <button
              className="icon-button"
              onClick={() => window.print()}
              aria-label="Download paper as PDF"
              title="Print or save as PDF"
            >
              ↓
            </button>
            <button
              className="profile-button"
              onClick={() => setShowOnboarding(true)}
              aria-label="Personalize your paper"
              title="Personalize your paper"
            >
              Y
            </button>
          </nav>
        </header>

        <main>
          <div className="date-row">
            <div>
              <div className="kicker">Your personal edition</div>
              <div className="date-label">{today} · Morning edition</div>
            </div>
            <span className="edition-badge">
              <span aria-hidden="true">✳ </span>
              {preferencesSaved ? "PREFERENCES SAVED" : "MADE FOR YOU"}
            </span>
          </div>

          <section className="masthead">
            <div className="kicker">A little more informed. Every day.</div>
            <h1>Your world.<br /><em>In perspective.</em></h1>
            <p>
              The stories that matter to you, gathered in one thoughtful
              morning read. Less noise, more understanding.
            </p>
          </section>

          <hr className="rule" />
          <hr className="rule-double" />

          <section aria-label="Your news edition">
            <div className="section-heading">
              <div>
                <div className="kicker">
                  {tab === "saved"
                    ? "YOUR READING LIST"
                    : tab === "archive"
                      ? "FROM THE ARCHIVE"
                      : "CURATED FOR YOUR CURIOSITY"}
                </div>
                <h2>
                  {tab === "saved"
                    ? "Stories worth keeping."
                    : tab === "archive"
                      ? "Yesterday, revisited."
                      : "The morning briefing."}
                </h2>
              </div>
              <button
                className="secondary-button"
                onClick={() => window.print()}
                title="Open the print dialog to save this edition as a PDF"
              >
                ↗ Export paper
              </button>
            </div>

            {tab !== "archive" && (
              <>
                <input
                  className="search-input"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search your paper..."
                  aria-label="Search stories"
                />

                <div className="topic-bar" aria-label="Filter by topic">
                  {["For you", ...topics].map((topic) => (
                    <button
                      key={topic}
                      className={`topic-chip ${selectedTopic === topic ? "active" : ""}`}
                      onClick={() => {
                        setSelectedTopic(topic);
                        setTab("today");
                      }}
                      aria-pressed={selectedTopic === topic}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </>
            )}

            {tab === "archive" ? (
              <div className="empty-state">
                <div className="empty-symbol">▤</div>
                <h3>Your archive starts here.</h3>
                <p>
                  Previous editions will appear here once daily edition
                  history is connected to your backend.
                </p>
                <button className="primary-button" onClick={() => setTab("today")}>
                  Back to today's paper →
                </button>
              </div>
            ) : visibleStories.length === 0 ? (
              <div className="empty-state">
                <div className="empty-symbol">✳</div>
                <h3>Nothing on the page just yet.</h3>
                <p>
                  Try another topic, clear your search, or explore a different
                  part of your reading list.
                </p>
                <button
                  className="primary-button"
                  onClick={() => {
                    setTab("today");
                    setSelectedTopic("For you");
                    setSearch("");
                  }}
                >
                  Explore all stories →
                </button>
              </div>
            ) : (
              <>
                {featured && (
                  <article className="featured">
                    <div className="feature-copy">
                      <div className="kicker">{featured.eyebrow}</div>
                      <h2>{featured.title}</h2>
                      <p>{featured.summary}</p>
                      <div className="story-meta">
                        <span>{featured.source}</span>
                        <span className="dot" />
                        <span>{featured.readTime}</span>
                        <span className="dot" />
                        <span>{featured.category}</span>
                      </div>
                      <div className="feature-actions">
                        <a
                          className="primary-button"
                          href={featured.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Explore source ↗
                        </a>
                        <button
                          className="secondary-button"
                          onClick={() => toggleSaved(featured.id)}
                        >
                          {savedIds.includes(featured.id) ? "✓ Saved" : "♡ Save story"}
                        </button>
                        <button
                          className="secondary-button"
                          onClick={() => skipStory(featured.id)}
                        >
                          Skip →
                        </button>
                      </div>
                    </div>

                    <div className="feature-art" aria-label="Decorative sunrise illustration">
                      <div className="art-orbit" />
                      <div className="art-sun" />
                      <div className="art-label">
                        <span>Knowledge, every morning</span>
                        <span className="art-number">No. 001</span>
                      </div>
                    </div>
                  </article>
                )}

                {remainingStories.length > 0 && (
                  <div className="section-heading">
                    <div>
                      <div className="kicker">THE REST OF YOUR EDITION</div>
                      <h2>More to know.</h2>
                    </div>
                    <span className="muted">{remainingStories.length} stories</span>
                  </div>
                )}

                <div className="story-grid">
                  {remainingStories.map((story, index) => (
                    <article
                      className="story-card"
                      key={story.id}
                      style={{ animationDelay: `${index * 70}ms` }}
                    >
                      <div className="story-art" style={{ background: story.accent }}>
                        <span className="story-symbol">{story.symbol}</span>
                        <small>{story.category.toUpperCase()}</small>
                      </div>

                      <div className="story-content">
                        <div className="story-category">{story.eyebrow}</div>
                        <h3>{story.title}</h3>
                        <p>{story.summary}</p>

                        <div className="story-meta">
                          <span>{story.readTime}</span>
                          <span className="dot" />
                          <span>{story.category}</span>
                        </div>

                        <div className="card-bottom">
                          <a
                            className="card-source"
                            href={story.url}
                            target="_blank"
                            rel="noreferrer"
                            style={{ textDecoration: "none" }}
                          >
                            {story.source} ↗
                          </a>
                          <div className="card-actions">
                            <button
                              className={`small-action ${savedIds.includes(story.id) ? "active" : ""}`}
                              onClick={() => toggleSaved(story.id)}
                              aria-label={savedIds.includes(story.id) ? "Unsave story" : "Save story"}
                              title="Save story"
                            >
                              {savedIds.includes(story.id) ? "✓" : "♡"}
                            </button>
                            <button
                              className="small-action"
                              onClick={() => skipStory(story.id)}
                              aria-label="Skip story"
                              title="Skip story"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </section>

          <section className="learning-panel">
            <div>
              <div className="kicker">YOUR READING JOURNEY</div>
              <h3 className="learning-title">A little knowledge adds up.</h3>
              <p>
                Your reading choices can help shape a more relevant paper.
                Save the stories you like and skip the ones you don't.
              </p>
              <div className="progress-track" aria-label="Illustrative reading progress">
                <div className="progress-fill" />
              </div>
              <p style={{ marginTop: 8, fontSize: 10 }}>
                Personalization preview · Progress shown is illustrative
              </p>
            </div>
            <div className="learning-stat">
              <strong>{savedIds.length}</strong>
              <span>stories saved</span>
            </div>
          </section>

          <section className="section-heading" style={{ marginTop: 35 }}>
            <div>
              <div className="kicker">MAKE IT YOURS</div>
              <h2>Your interests. Your paper.</h2>
            </div>
            <button className="secondary-button" onClick={() => setShowOnboarding(true)}>
              ✳ Personalize
            </button>
          </section>
          <p className="muted" style={{ lineHeight: 1.8, maxWidth: 560 }}>
            Tell DailyPressAI what you care about. Your future edition can be
            organized around the topics you want to understand, not just the
            stories everyone else is reading.
          </p>

          <div className="section-heading">
            <div>
              <div className="kicker">KEEP THE CONTEXT</div>
              <h2>Past editions.</h2>
            </div>
            <button className="secondary-button" onClick={() => setTab("archive")}>
              Browse archive →
            </button>
          </div>

          <div className="footer">
            <div>
              <strong>DailyPressAI</strong>
              <div style={{ marginTop: 5 }}>A quieter way to stay informed.</div>
            </div>
            <div>Thoughtfully curated · Made for curious minds</div>
          </div>

          <p className="demo-note">
            Demo notice: these are illustrative sample stories, not live news.
            Publisher links open source homepages. Connect a news feed and your
            backend to populate real, personalized articles.
          </p>
        </main>
      </div>

      {showOnboarding && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowOnboarding(false);
          }}
        >
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="onboarding-title"
          >
            <div className="kicker">STEP 01 · YOUR INTERESTS</div>
            <h2 id="onboarding-title">What makes you curious?</h2>
            <p>
              Choose the subjects you want in your morning paper. You can
              change these preferences whenever you like.
            </p>

            <div className="interest-grid">
              {topics.map((topic) => (
                <button
                  key={topic}
                  className={`interest-option ${interests.includes(topic) ? "selected" : ""}`}
                  onClick={() => toggleInterest(topic)}
                  aria-pressed={interests.includes(topic)}
                >
                  <span>{interests.includes(topic) ? "✓  " : "+  "}</span>
                  {topic}
                </button>
              ))}
            </div>

            <div className="modal-actions">
              <button className="text-button" onClick={() => setShowOnboarding(false)}>
                Maybe later
              </button>
              <button
                className="primary-button"
                onClick={savePreferences}
                disabled={interests.length === 0}
              >
                Save my interests →
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
