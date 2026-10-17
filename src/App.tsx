
import React, { useMemo, useState } from "react";

type Article = {
  id: number;
  title: string;
  summary: string;
  category: string;
  source: string;
  time: string;
  image: string;
  readTime: string;
  trending?: boolean;
};

const ARTICLES: Article[] = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence in Everyday Life",
    summary:
      "Discover how new AI tools are changing the way people learn, work, and communicate.",
    category: "Technology",
    source: "DailyPressAI",
    time: "12 min ago",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
    readTime: "5 min read",
    trending: true,
  },
  {
    id: 2,
    title: "Global Markets Show New Signs of Growth",
    summary:
      "Explore business trends, emerging opportunities, and changes in the global economy.",
    category: "Business",
    source: "Market Desk",
    time: "35 min ago",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Science Discoveries That Could Shape Tomorrow",
    summary:
      "Researchers are exploring new ideas that may transform medicine, energy, and our planet.",
    category: "Science",
    source: "Science Daily",
    time: "1 hour ago",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Simple Habits for a More Productive Day",
    summary:
      "Practical ideas for organizing your routine, protecting your focus, and working smarter.",
    category: "Lifestyle",
    source: "Life Journal",
    time: "2 hours ago",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
    readTime: "3 min read",
  },
  {
    id: 5,
    title: "How Digital Innovation Is Changing Education",
    summary:
      "Online learning and smart tools are opening new opportunities for students worldwide.",
    category: "Education",
    source: "Learning Today",
    time: "3 hours ago",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=900&q=80",
    readTime: "5 min read",
    trending: true,
  },
  {
    id: 6,
    title: "Technology Startups to Watch This Year",
    summary:
      "Meet the ideas and teams working on fresh solutions to everyday challenges.",
    category: "Technology",
    source: "Startup Wire",
    time: "4 hours ago",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
    readTime: "7 min read",
  },
];

const CATEGORIES = [
  "All News",
  "Technology",
  "Business",
  "Science",
  "Lifestyle",
  "Education",
];

const styles = `
*{box-sizing:border-box}
body{margin:0}
button,input{font:inherit}
button{cursor:pointer}
.dp-app{
 --bg:#f5f7fb;--surface:#fff;--text:#182230;--muted:#788496;
 --line:#e8edf4;--accent:#5367f5;--accent-soft:#edf0ff;
 min-height:100vh;background:var(--bg);color:var(--text);
 font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
 transition:background .2s,color .2s
}
.dp-app.dark{
 --bg:#101521;--surface:#1a2231;--text:#edf2fa;--muted:#a1aec0;
 --line:#2a3548;--accent:#8794ff;--accent-soft:#29304f
}
.dp-layout{display:flex;min-height:100vh}
.dp-sidebar{
 width:248px;flex-shrink:0;padding:28px 18px;background:var(--surface);
 border-right:1px solid var(--line);display:flex;flex-direction:column;gap:30px
}
.dp-brand{display:flex;align-items:center;gap:11px;padding:0 10px}
.dp-logo{
 width:42px;height:42px;border-radius:14px;display:grid;place-items:center;
 color:white;font-size:21px;font-weight:800;background:linear-gradient(135deg,#6878ff,#4654d9);
 box-shadow:0 7px 18px #5367f533
}
.dp-brand-name{font-size:19px;font-weight:800;letter-spacing:-.7px}
.dp-brand-name span{color:var(--accent)}
.dp-subtitle{color:var(--muted);font-size:11px;margin-top:3px}
.dp-section-label{
 padding:0 12px;color:var(--muted);font-size:10px;font-weight:800;
 letter-spacing:1.5px;margin-bottom:10px
}
.dp-nav{display:grid;gap:6px}
.dp-nav-btn{
 width:100%;display:flex;align-items:center;gap:12px;padding:12px 13px;
 border:0;border-radius:12px;color:var(--muted);background:transparent;
 text-align:left;font-size:13px;font-weight:600;transition:.2s
}
.dp-nav-btn:hover{background:var(--bg);color:var(--text)}
.dp-nav-btn.active{color:var(--accent);background:var(--accent-soft)}
.dp-nav-icon{width:22px;text-align:center;font-size:17px}
.dp-nav-count{margin-left:auto;font-size:10px;border-radius:7px;padding:3px 7px;background:var(--bg)}
.dp-sidebar-bottom{margin-top:auto}
.dp-help{background:var(--bg);border:1px solid var(--line);border-radius:16px;padding:16px;margin-bottom:18px}
.dp-help-icon{font-size:23px;margin-bottom:9px}
.dp-help strong{display:block;font-size:12px}
.dp-help p{color:var(--muted);font-size:11px;line-height:1.6}
.dp-help button{
 width:100%;border:0;padding:10px;border-radius:9px;color:white;
 background:var(--accent);font-size:11px;font-weight:700
}
.dp-profile{border-top:1px solid var(--line);padding:17px 5px 0;display:flex;align-items:center;gap:10px}
.dp-avatar{
 width:38px;height:38px;display:grid;place-items:center;border-radius:50%;
 background:#dce2ff;color:#4a59d7;font-weight:800;flex-shrink:0
}
.dp-profile-name{font-size:12px;font-weight:750}
.dp-profile-role{font-size:10px;color:var(--muted);margin-top:3px}
.dp-main{flex:1;min-width:0}
.dp-topbar{
 min-height:82px;padding:14px 34px;background:var(--surface);
 border-bottom:1px solid var(--line);display:flex;align-items:center;
 justify-content:space-between;gap:18px
}
.dp-topbar-title{font-size:17px;font-weight:800}
.dp-topbar-sub{font-size:11px;color:var(--muted);margin-top:4px}
.dp-top-actions{display:flex;align-items:center;gap:11px}
.dp-search{
 display:flex;align-items:center;gap:9px;background:var(--bg);
 border:1px solid var(--line);padding:0 13px;height:42px;border-radius:12px;
 width:min(290px,30vw)
}
.dp-search input{min-width:0;width:100%;border:0;outline:0;background:transparent;color:var(--text);font-size:12px}
.dp-icon-btn{
 width:41px;height:41px;border-radius:12px;background:var(--surface);
 color:var(--text);border:1px solid var(--line);display:grid;place-items:center;font-size:17px
}
.dp-content{padding:29px 34px 40px;max-width:1550px;margin:auto}
.dp-welcome-row{display:flex;align-items:center;justify-content:space-between;gap:15px}
.dp-welcome{font-size:clamp(22px,2.5vw,29px);letter-spacing:-1px;font-weight:850}
.dp-welcome-sub{font-size:12px;color:var(--muted);margin-top:7px}
.dp-date{color:var(--muted);border:1px solid var(--line);background:var(--surface);padding:10px 13px;border-radius:11px;font-size:11px}
.dp-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-top:26px}
.dp-stat{border:1px solid var(--line);background:var(--surface);border-radius:17px;padding:19px;min-width:0;box-shadow:0 4px 18px #172a4605}
.dp-stat-top{display:flex;align-items:center;justify-content:space-between;gap:8px}
.dp-stat-label{color:var(--muted);font-size:11px;font-weight:650}
.dp-stat-icon{width:35px;height:35px;display:grid;place-items:center;border-radius:11px;background:var(--accent-soft);font-size:17px}
.dp-stat-value{font-size:28px;font-weight:850;letter-spacing:-1px;margin-top:14px}
.dp-stat-foot{color:var(--muted);font-size:10px;margin-top:8px}
.dp-stat-foot span{color:#20a579;font-weight:750}
.dp-hero{
 margin-top:25px;padding:27px 30px;border-radius:20px;color:white;overflow:hidden;
 position:relative;background:linear-gradient(110deg,#4a58dc,#6b7aff 65%,#8794ff);
 display:flex;justify-content:space-between;align-items:center;gap:20px
}
.dp-hero:after{
 content:"";position:absolute;width:210px;height:210px;border:1px solid #ffffff25;
 border-radius:50%;right:9%;top:-100px;box-shadow:0 0 0 25px #ffffff08,0 0 0 55px #ffffff06
}
.dp-hero-copy{position:relative;z-index:1;max-width:560px}
.dp-hero-label{display:inline-flex;background:#ffffff25;padding:6px 10px;border-radius:7px;font-size:10px;font-weight:800;letter-spacing:1px}
.dp-hero h2{font-size:clamp(21px,2.4vw,28px);line-height:1.25;margin:13px 0 9px;letter-spacing:-.6px}
.dp-hero p{font-size:12px;line-height:1.7;color:#f0f1ff;max-width:440px;margin:0 0 18px}
.dp-hero-btn{position:relative;z-index:1;background:white;color:#4b58db;border:0;border-radius:10px;padding:12px 16px;font-size:11px;font-weight:800;white-space:nowrap}
.dp-section-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:30px 0 16px}
.dp-section-head h2{margin:0;font-size:17px;letter-spacing:-.4px}
.dp-section-head p{margin:5px 0 0;font-size:11px;color:var(--muted)}
.dp-text-btn{color:var(--accent);background:transparent;border:0;font-size:11px;font-weight:800}
.dp-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px}
.dp-chip{padding:9px 14px;border-radius:10px;border:1px solid var(--line);background:var(--surface);color:var(--muted);font-size:11px;font-weight:650}
.dp-chip.active{background:var(--accent);border-color:var(--accent);color:white}
.dp-articles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:17px}
.dp-article{min-width:0;overflow:hidden;background:var(--surface);border:1px solid var(--line);border-radius:16px;transition:transform .2s,box-shadow .2s}
.dp-article:hover{transform:translateY(-3px);box-shadow:0 10px 26px #192d4b0c}
.dp-article-image{width:100%;height:155px;object-fit:cover;display:block;background:var(--bg)}
.dp-article-body{padding:16px}
.dp-article-meta{display:flex;align-items:center;justify-content:space-between;gap:7px}
.dp-tag{padding:5px 8px;background:var(--accent-soft);color:var(--accent);border-radius:6px;font-size:9px;font-weight:800}
.dp-time{font-size:9px;color:var(--muted)}
.dp-article h3{font-size:14px;line-height:1.5;margin:13px 0 8px;letter-spacing:-.2px}
.dp-article p{color:var(--muted);font-size:11px;line-height:1.75;margin:0}
.dp-article-footer{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:17px;padding-top:13px;border-top:1px solid var(--line)}
.dp-source{color:var(--muted);font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dp-article-actions{display:flex;gap:6px}
.dp-small-btn{border:1px solid var(--line);background:var(--surface);color:var(--muted);border-radius:8px;padding:7px 9px;font-size:10px;font-weight:700}
.dp-small-btn.saved{color:var(--accent);border-color:var(--accent);background:var(--accent-soft)}
.dp-empty{grid-column:1/-1;padding:45px 20px;text-align:center;background:var(--surface);border:1px dashed var(--line);border-radius:16px}
.dp-empty div{font-size:30px}
.dp-empty h3{font-size:16px;margin:12px 0 7px}
.dp-empty p{font-size:12px;color:var(--muted)}
.dp-notice{position:fixed;right:22px;bottom:22px;z-index:10;background:var(--text);color:var(--surface);padding:13px 17px;border-radius:12px;font-size:12px;box-shadow:0 10px 35px #0002;max-width:min(360px,calc(100vw - 44px))}
.dp-footer{color:var(--muted);font-size:10px;text-align:center;margin-top:34px}
.dp-auth-wrap{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;background:var(--surface)}
.dp-auth-brand{display:flex;flex-direction:column;justify-content:center;padding:8%;color:white;background:linear-gradient(140deg,#3e4dd0,#6575ff);position:relative;overflow:hidden}
.dp-auth-brand:after{content:"";position:absolute;width:350px;height:350px;border:1px solid #ffffff30;border-radius:50%;right:-100px;bottom:-100px;box-shadow:0 0 0 35px #ffffff0b,0 0 0 75px #ffffff08}
.dp-auth-brand .dp-logo{background:#ffffff25;box-shadow:none}
.dp-auth-brand h1{font-size:clamp(32px,4vw,52px);line-height:1.1;letter-spacing:-1.7px;margin:30px 0 15px;max-width:530px}
.dp-auth-brand p{font-size:14px;line-height:1.8;color:#e5e8ff;max-width:440px}
.dp-auth-points{display:grid;gap:13px;margin-top:25px;font-size:13px}
.dp-auth-form-wrap{display:grid;place-items:center;padding:35px 22px}
.dp-auth-form{width:100%;max-width:390px}
.dp-auth-form h2{font-size:28px;letter-spacing:-.8px;margin:0 0 9px}
.dp-auth-description{font-size:12px;color:var(--muted);line-height:1.7;margin-bottom:27px}
.dp-field{display:grid;gap:8px;margin-bottom:17px}
.dp-field label{font-size:11px;font-weight:750}
.dp-field input{width:100%;padding:13px 14px;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--text);outline:none;font-size:12px}
.dp-field input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}
.dp-auth-submit{width:100%;border:0;border-radius:10px;background:var(--accent);color:white;padding:14px;font-size:12px;font-weight:800;margin-top:5px}
.dp-auth-switch{text-align:center;color:var(--muted);font-size:12px;margin-top:21px}
.dp-auth-switch button{background:none;border:0;color:var(--accent);font-weight:800}
.dp-auth-error{color:#d94a4a;font-size:11px;margin:-5px 0 13px}
.dp-auth-back{border:0;background:transparent;color:var(--muted);font-size:11px;margin-bottom:25px;padding:0}
.dp-demo-note{color:var(--muted);font-size:10px;line-height:1.6;text-align:center;margin-top:17px}
@media(max-width:1100px){
 .dp-sidebar{width:215px}.dp-content{padding:25px 22px}.dp-topbar{padding:14px 22px}
 .dp-stats{grid-template-columns:repeat(2,minmax(0,1fr))}.dp-articles{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media(max-width:720px){
 .dp-layout{display:block}.dp-sidebar{width:100%;padding:14px 15px;border-right:0;border-bottom:1px solid var(--line);gap:15px}
 .dp-brand{padding:0 4px}.dp-sidebar>div:nth-child(2){overflow-x:auto}
 .dp-section-label{display:none}.dp-nav{display:flex;gap:6px;width:max-content}
 .dp-nav-btn{width:auto;white-space:nowrap;padding:10px}.dp-nav-count,.dp-sidebar-bottom{display:none}
 .dp-topbar{padding:13px 16px;min-height:74px}.dp-topbar-sub{display:none}
 .dp-top-actions{gap:7px}.dp-search{width:min(190px,42vw);height:39px}.dp-icon-btn{width:38px;height:38px}
 .dp-content{padding:22px 15px 30px}.dp-date{display:none}
 .dp-hero{padding:22px;align-items:flex-start;flex-direction:column}.dp-hero:after{right:-90px}
 .dp-hero-btn{align-self:flex-start}.dp-article-image{height:135px}
 .dp-auth-wrap{grid-template-columns:1fr}.dp-auth-brand{padding:35px 25px}
 .dp-auth-brand h1{font-size:34px;margin:20px 0 10px}.dp-auth-points{display:none}
 .dp-auth-form-wrap{padding:38px 24px}
}
@media(max-width:440px){
 .dp-stats{gap:9px}.dp-stat{padding:13px}.dp-stat-value{font-size:24px}
 .dp-stat-icon{width:30px;height:30px}.dp-articles{grid-template-columns:1fr}
 .dp-article-image{height:185px}.dp-topbar-title{font-size:14px}.dp-welcome{font-size:23px}
}
@media print{
 .dp-sidebar,.dp-topbar,.dp-hero,.dp-chips,.dp-article-actions,.dp-text-btn{display:none!important}
 .dp-content{padding:0}.dp-app{background:white;color:black}.dp-articles{grid-template-columns:repeat(2,1fr)}
}
`;

type AuthMode = "login" | "signup";

export default function App() {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeCategory, setActiveCategory] = useState("All News");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState<number[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [notice, setNotice] = useState("");

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory =
        activeCategory === "All News" ||
        article.category === activeCategory;

      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query);

      const matchesPage =
        activePage !== "Saved Articles" || saved.includes(article.id);

      const matchesTrending =
        activePage !== "Trending" || Boolean(article.trending);

      return (
        matchesCategory &&
        matchesSearch &&
        matchesPage &&
        matchesTrending
      );
    });
  }, [activeCategory, search, activePage, saved]);

  const showNotice = (message: string) => setNotice(message);

  const toggleSaved = (id: number) => {
    setSaved((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const choosePage = (page: string) => {
    setActivePage(page);
    setActiveCategory("All News");
    setNotice("");
  };

  const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError("");

    if (!email.trim() || !password.trim()) {
      setAuthError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAuthError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setAuthError("Password must contain at least 6 characters.");
      return;
    }

    if (authMode === "signup" && !name.trim()) {
      setAuthError("Please enter your name.");
      return;
    }

    // Demo-only authentication. Connect a secure backend for real accounts.
    setUserEmail(email);
    setIsAuthenticated(true);
    setPassword("");
    setNotice(
      authMode === "signup"
        ? "Demo account created for this session."
        : "You are signed in to the demo."
    );
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthMode("login");
    setPassword("");
    setActivePage("Dashboard");
    setNotice("");
  };

  const navItems = [
    { label: "Dashboard", icon: "⌂" },
    { label: "All News", icon: "▤" },
    { label: "Saved Articles", icon: "♡", count: saved.length },
    { label: "Trending", icon: "↗" },
  ];

  return (
    <div className={`dp-app ${darkMode ? "dark" : ""}`}>
      <style>{styles}</style>

      {!isAuthenticated ? (
        <div className="dp-auth-wrap">
          <section className="dp-auth-brand">
            <div className="dp-brand">
              <div className="dp-logo">D</div>
              <div>
                <div className="dp-brand-name">
                  DailyPress<span style={{ color: "#dce0ff" }}>AI</span>
                </div>
                <div className="dp-subtitle" style={{ color: "#e0e4ff" }}>
                  Your world, intelligently.
                </div>
              </div>
            </div>

            <h1>Stay informed. Think smarter.</h1>
            <p>
              Discover stories that matter, explore new perspectives, and
              organize your daily reading in one simple place.
            </p>

            <div className="dp-auth-points">
              <div>✓ Explore news across multiple categories</div>
              <div>✓ Save interesting stories for later</div>
              <div>✓ Enjoy a clean, personalized reading space</div>
            </div>
          </section>

          <section className="dp-auth-form-wrap">
            <form className="dp-auth-form" onSubmit={handleAuth}>
              <button
                className="dp-auth-back"
                type="button"
                onClick={() => {
                  setAuthMode(authMode === "login" ? "signup" : "login");
                  setAuthError("");
                }}
              >
                ← {authMode === "login" ? "Create an account" : "Back to login"}
              </button>

              <h2>
                {authMode === "login" ? "Welcome back" : "Create your account"}
              </h2>
              <p className="dp-auth-description">
                {authMode === "login"
                  ? "Sign in to continue to your DailyPressAI dashboard."
                  : "Join DailyPressAI and build your personal reading space."}
              </p>

              {authMode === "signup" && (
                <div className="dp-field">
                  <label htmlFor="dp-name">Full name</label>
                  <input
                    id="dp-name"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
              )}

              <div className="dp-field">
                <label htmlFor="dp-email">Email address</label>
                <input
                  id="dp-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="dp-field">
                <label htmlFor="dp-password">Password</label>
                <input
                  id="dp-password"
                  type="password"
                  autoComplete={
                    authMode === "login" ? "current-password" : "new-password"
                  }
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 6 characters"
                  minLength={6}
                  required
                />
              </div>

              {authError && (
                <div className="dp-auth-error" role="alert">
                  {authError}
                </div>
              )}

              <button className="dp-auth-submit" type="submit">
                {authMode === "login" ? "Sign in →" : "Create account →"}
              </button>

              <div className="dp-auth-switch">
                {authMode === "login"
                  ? "New to DailyPressAI? "
                  : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode(authMode === "login" ? "signup" : "login");
                    setAuthError("");
                  }}
                >
                  {authMode === "login" ? "Sign up" : "Sign in"}
                </button>
              </div>

              <p className="dp-demo-note">
                Demo mode only: this form does not create or verify real
                accounts. Connect a secure authentication backend before
                publishing.
              </p>
            </form>
          </section>
        </div>
      ) : (
        <div className="dp-layout">
          <aside className="dp-sidebar">
            <div className="dp-brand">
              <div className="dp-logo">D</div>
              <div>
                <div className="dp-brand-name">
                  DailyPress<span>AI</span>
                </div>
                <div className="dp-subtitle">Your world, intelligently.</div>
              </div>
            </div>

            <div>
              <div className="dp-section-label">WORKSPACE</div>
              <nav className="dp-nav">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className={`dp-nav-btn ${
                      activePage === item.label ? "active" : ""
                    }`}
                    onClick={() => choosePage(item.label)}
                  >
                    <span className="dp-nav-icon">{item.icon}</span>
                    {item.label}
                    {item.count !== undefined && (
                      <span className="dp-nav-count">{item.count}</span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <div className="dp-section-label">PREFERENCES</div>
              <nav className="dp-nav">
                <button
                  className="dp-nav-btn"
                  onClick={() =>
                    showNotice(
                      "Personalized interests can be connected to your account later."
                    )
                  }
                >
                  <span className="dp-nav-icon">◎</span>
                  My Interests
                </button>
                <button
                  className="dp-nav-btn"
                  onClick={() => setDarkMode((value) => !value)}
                >
                  <span className="dp-nav-icon">{darkMode ? "☀" : "☾"}</span>
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
              </nav>
            </div>

            <div className="dp-sidebar-bottom">
              <div className="dp-help">
                <div className="dp-help-icon">✦</div>
                <strong>Read smarter with AI</strong>
                <p>Explore a smarter way to discover and understand the news.</p>
                <button
                  onClick={() =>
                    showNotice(
                      "AI summaries require a connected backend API."
                    )
                  }
                >
                  Explore AI Features
                </button>
              </div>

              <div className="dp-profile">
                <div className="dp-avatar">
                  {(name || userEmail || "R").charAt(0).toUpperCase()}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="dp-profile-name">
                    {name.trim() || userEmail || "Reader"}
                  </div>
                  <div className="dp-profile-role">DailyPressAI Member</div>
                </div>
                <button
                  className="dp-small-btn"
                  onClick={logout}
                  title="Sign out"
                >
                  Exit
                </button>
              </div>
            </div>
          </aside>

          <main className="dp-main">
            <header className="dp-topbar">
              <div>
                <div className="dp-topbar-title">{activePage}</div>
                <div className="dp-topbar-sub">
                  Your personalized news workspace
                </div>
              </div>

              <div className="dp-top-actions">
                <label className="dp-search">
                  <span>⌕</span>
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search news..."
                    aria-label="Search news"
                  />
                  {search && (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={() => setSearch("")}
                      style={{
                        background: "transparent",
                        border: 0,
                        color: "var(--muted)",
                      }}
                    >
                      ×
                    </button>
                  )}
                </label>

                <button
                  className="dp-icon-btn"
                  aria-label="Notifications"
                  onClick={() =>
                    showNotice("You're all caught up on notifications.")
                  }
                >
                  ♧
                </button>
                <button
                  className="dp-icon-btn"
                  aria-label="Toggle theme"
                  onClick={() => setDarkMode((value) => !value)}
                >
                  {darkMode ? "☀" : "☾"}
                </button>
              </div>
            </header>

            <div className="dp-content">
              <div className="dp-welcome-row">
                <div>
                  <div className="dp-welcome">
                    Good to see you again 👋
                  </div>
                  <div className="dp-welcome-sub">
                    Catch up on the stories shaping your world today.
                  </div>
                </div>
                <div className="dp-date">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>

              <section className="dp-stats">
                <div className="dp-stat">
                  <div className="dp-stat-top">
                    <span className="dp-stat-label">Available Articles</span>
                    <span className="dp-stat-icon">▤</span>
                  </div>
                  <div className="dp-stat-value">{ARTICLES.length}</div>
                  <div className="dp-stat-foot">
                    <span>Ready to explore</span>
                  </div>
                </div>

                <div className="dp-stat">
                  <div className="dp-stat-top">
                    <span className="dp-stat-label">Saved Articles</span>
                    <span className="dp-stat-icon">♡</span>
                  </div>
                  <div className="dp-stat-value">{saved.length}</div>
                  <div className="dp-stat-foot">Your reading list</div>
                </div>

                <div className="dp-stat">
                  <div className="dp-stat-top">
                    <span className="dp-stat-label">News Categories</span>
                    <span className="dp-stat-icon">◈</span>
                  </div>
                  <div className="dp-stat-value">{CATEGORIES.length - 1}</div>
                  <div className="dp-stat-foot">Topics to discover</div>
                </div>

                <div className="dp-stat">
                  <div className="dp-stat-top">
                    <span className="dp-stat-label">Trending Stories</span>
                    <span className="dp-stat-icon">↗</span>
                  </div>
                  <div className="dp-stat-value">
                    {ARTICLES.filter((article) => article.trending).length}
                  </div>
                  <div className="dp-stat-foot">Popular demo stories</div>
                </div>
              </section>

              {activePage === "Dashboard" && (
                <section className="dp-hero">
                  <div className="dp-hero-copy">
                    <span className="dp-hero-label">
                      ✦ THE SMARTER WAY TO READ
                    </span>
                    <h2>Your daily news, made more meaningful.</h2>
                    <p>
                      Explore important stories, discover new perspectives,
                      and build a reading list that works for you.
                    </p>
                    <button
                      className="dp-hero-btn"
                      onClick={() => choosePage("All News")}
                    >
                      Explore Latest Stories →
                    </button>
                  </div>
                  <button
                    className="dp-hero-btn"
                    onClick={() =>
                      showNotice(
                        "AI summaries are not connected yet. Connect your backend API to enable them."
                      )
                    }
                  >
                    ✨ Try AI Summary
                  </button>
                </section>
              )}

              <div className="dp-section-head">
                <div>
                  <h2>
                    {activePage === "Saved Articles"
                      ? "Your Reading List"
                      : activePage === "Trending"
                      ? "Trending Stories"
                      : "Discover Stories"}
                  </h2>
                  <p>
                    {activePage === "Saved Articles"
                      ? "Stories you have bookmarked for later."
                      : "Explore topics and find something worth reading."}
                  </p>
                </div>
                {activePage !== "Saved Articles" && (
                  <button
                    className="dp-text-btn"
                    onClick={() => choosePage("All News")}
                  >
                    View all news →
                  </button>
                )}
              </div>

              {activePage !== "Saved Articles" &&
                activePage !== "Trending" && (
                  <div className="dp-chips">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category}
                        className={`dp-chip ${
                          activeCategory === category ? "active" : ""
                        }`}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}

              <section className="dp-articles">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                    <article className="dp-article" key={article.id}>
                      <img
                        className="dp-article-image"
                        src={article.image}
                        alt=""
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.visibility = "hidden";
                        }}
                      />

                      <div className="dp-article-body">
                        <div className="dp-article-meta">
                          <span className="dp-tag">{article.category}</span>
                          <span className="dp-time">{article.time}</span>
                        </div>

                        <h3>{article.title}</h3>
                        <p>{article.summary}</p>

                        <div className="dp-article-footer">
                          <span className="dp-source">
                            {article.source} · {article.readTime}
                          </span>
                          <div className="dp-article-actions">
                            <button
                              className={`dp-small-btn ${
                                saved.includes(article.id) ? "saved" : ""
                              }`}
                              onClick={() => toggleSaved(article.id)}
                            >
                              {saved.includes(article.id) ? "♥ Saved" : "♡ Save"}
                            </button>
                            <button
                              className="dp-small-btn"
                              onClick={() =>
                                showNotice(
                                  "Full article reading needs a real news source integration."
                                )
                              }
                            >
                              Read →
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="dp-empty">
                    <div>⌕</div>
                    <h3>No stories found</h3>
                    <p>
                      {activePage === "Saved Articles"
                        ? "You have not saved any stories yet. Use Save on an article."
                        : "Try another search or select a different category."}
                    </p>
                    <button
                      className="dp-chip active"
                      onClick={() => {
                        setSearch("");
                        setActiveCategory("All News");
                        choosePage("All News");
                      }}
                    >
                      Show all news
                    </button>
                  </div>
                )}
              </section>

              <div className="dp-footer">
                © {new Date().getFullYear()} DailyPressAI · Your world,
                intelligently.
                <button
                  className="dp-text-btn"
                  style={{ marginLeft: 12 }}
                  onClick={() => window.print()}
                >
                  Print / Save PDF
                </button>
              </div>
            </div>
          </main>
        </div>
      )}

      {notice && isAuthenticated && (
        <div className="dp-notice" role="status">
          {notice}
          <button
            onClick={() => setNotice("")}
            aria-label="Dismiss message"
            style={{
              background: "transparent",
              border: 0,
              color: "inherit",
              marginLeft: 12,
              fontWeight: 800,
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
