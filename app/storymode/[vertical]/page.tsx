/**
 * AuthiChain Storymode — Cinematic Industry History
 * 
 * Route: /storymode/[vertical]
 * 
 * Immersive cinematic narration of industry history from ancient origins
 * through current news, with AuthiChain's role in the future.
 * Linked from QRON.space showcase and QR art scans.
 */

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

const VERTICAL_META: Record<string, {
  name: string; tagline: string; color: string; accent: string;
  image: string; link?: string;
}> = {
  "qron-space": { name: "QRON Space", tagline: "The Interface", color: "#00CCFF", accent: "#00FFE5", image: "/showcase/qron-space.png" },
  "strainchain": { name: "StrainChain", tagline: "Cannabis Authentication", color: "#00C853", accent: "#69F0AE", image: "/showcase/strainchain.png", link: "https://strainchain.io" },
  "authichain": { name: "AuthiChain", tagline: "The Trust Protocol", color: "#D4A017", accent: "#FFD700", image: "/showcase/authichain.png", link: "https://authichain.com" },
  "ev-industry": { name: "EV Authentication", tagline: "Electric Vehicles & Batteries", color: "#6366F1", accent: "#818CF8", image: "/showcase/ev-industry.png" },
  "medchain": { name: "MedChain", tagline: "Pharmaceutical Authentication", color: "#06B6D4", accent: "#22D3EE", image: "/showcase/medchain.png" },
  "haute-couture": { name: "Haute Couture", tagline: "Luxury Fashion Authentication", color: "#D4A017", accent: "#F59E0B", image: "/showcase/haute-couture.png" },
  "artisan-roasters": { name: "Artisan Roasters", tagline: "Food & Beverage Provenance", color: "#78350F", accent: "#A16207", image: "/showcase/artisan-roasters.png" },
  "propchain": { name: "PropChain", tagline: "Real Estate Authentication", color: "#0EA5E9", accent: "#38BDF8", image: "/showcase/propchain.png" },
  "streamvault": { name: "StreamVault", tagline: "Entertainment & Media", color: "#EC4899", accent: "#F472B6", image: "/showcase/streamvault.png" },
  "athletedao": { name: "AthleteDAO", tagline: "Sports Memorabilia", color: "#7C3AED", accent: "#A78BFA", image: "/showcase/athletedao.png" },
};

const ERA_ICONS: Record<string, string> = {
  ORIGINS: "🏛️",
  EVOLUTION: "⚙️",
  REVOLUTION: "💡",
  CRISIS: "⚠️",
  NOW: "🔗",
};

export default function StorymodePlayer() {
  const params = useParams();
  const vertical = params?.vertical as string;
  const meta = VERTICAL_META[vertical];
  
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);
  const [showNews, setShowNews] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vertical) return;
    setLoading(true);
    fetch(`/api/storymode/${vertical}`)
      .then(r => r.json())
      .then(data => {
        setStory(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [vertical]);

  if (!meta) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center text-white/50 text-sm">
        Unknown vertical. Available: {Object.keys(VERTICAL_META).join(", ")}
      </div>
    );
  }

  const color = meta.color;
  const chapters = story?.chapters || [];

  return (
    <main className="min-h-screen bg-[#050508] text-white overflow-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes typewriter { from { width: 0; } to { width: 100%; } }
        @keyframes breathe { 0%,100% { box-shadow: 0 0 30px ${color}20; } 50% { box-shadow: 0 0 60px ${color}30; } }
        .story-enter { animation: fadeUp 0.6s ease forwards; }
        .chapter-card { 
          background: rgba(255,255,255,0.02); 
          border: 1px solid rgba(255,255,255,0.04); 
          border-radius: 16px; 
          padding: 24px; 
          cursor: pointer; 
          transition: all 0.3s; 
          position: relative;
          overflow: hidden;
        }
        .chapter-card:hover { background: rgba(255,255,255,0.04); transform: translateY(-2px); }
        .chapter-card.active { border-color: ${color}40; animation: breathe 3s ease infinite; }
        .chapter-card.active::before { 
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; 
          background: linear-gradient(90deg, transparent, ${color}, transparent); 
        }
        .news-card {
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 12px;
          padding: 16px;
          transition: all 0.2s;
        }
        .news-card:hover { border-color: ${color}30; }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src={meta.image}
            alt={meta.name}
            fill
            className="object-cover"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/30 via-[#050508]/60 to-[#050508]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/50 to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative h-full flex flex-col justify-end p-6 md:p-12 max-w-4xl">
          <div className="story-enter">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
              <span className="text-xs tracking-[0.2em] uppercase font-semibold" style={{ color }}>{meta.tagline}</span>
            </div>
            <h1 className="font-['Outfit'] text-3xl md:text-5xl font-black leading-tight mb-3">
              {loading ? (
                <span className="text-white/20">Loading story...</span>
              ) : (
                story?.title || `The ${meta.name} Story`
              )}
            </h1>
            <p className="text-white/40 text-sm max-w-lg">
              {story?.industry || "A cinematic journey through industry history — from ancient origins to blockchain-powered future."}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-[10px] font-mono text-white/20">AUTHICHAIN STORYMODE</span>
              <span className="text-white/10">·</span>
              <span className="text-[10px] font-mono text-white/20">{chapters.length} CHAPTERS</span>
              {meta.link && (
                <>
                  <span className="text-white/10">·</span>
                  <a href={meta.link} target="_blank" rel="noopener noreferrer"
                    className="text-[10px] font-semibold px-2 py-0.5 rounded" 
                    style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                    Visit {meta.name} →
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LOADING STATE ═══ */}
      {loading && (
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="w-8 h-8 rounded-full mx-auto mb-4" style={{ 
            border: `2px solid ${color}20`,
            borderTopColor: color,
            animation: "spin 1s linear infinite",
          }} />
          <p className="text-white/30 text-sm">Generating cinematic narration...</p>
          <p className="text-white/15 text-xs mt-2 font-mono">AuthiChain Truth Network × Claude</p>
          <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </section>
      )}

      {/* ═══ CHAPTERS ═══ */}
      {!loading && chapters.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 py-12">
          {/* Chapter navigation */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {chapters.map((ch: any, i: number) => (
              <button
                key={i}
                onClick={() => { setActiveChapter(i); setShowNews(false); }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
                style={{
                  background: activeChapter === i ? `${color}15` : "rgba(255,255,255,0.03)",
                  color: activeChapter === i ? color : "rgba(255,255,255,0.3)",
                  border: `1px solid ${activeChapter === i ? `${color}40` : "rgba(255,255,255,0.05)"}`,
                }}
              >
                <span>{ERA_ICONS[ch.era] || "📖"}</span>
                {ch.era}
              </button>
            ))}
            <button
              onClick={() => setShowNews(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
              style={{
                background: showNews ? `${color}15` : "rgba(255,255,255,0.03)",
                color: showNews ? color : "rgba(255,255,255,0.3)",
                border: `1px solid ${showNews ? `${color}40` : "rgba(255,255,255,0.05)"}`,
              }}
            >
              📰 CURRENT NEWS
            </button>
          </div>

          {/* Active chapter content */}
          {!showNews && chapters[activeChapter] && (
            <div className="chapter-card active story-enter" key={activeChapter}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{ERA_ICONS[chapters[activeChapter].era] || "📖"}</span>
                <div>
                  <div className="text-xs font-mono tracking-widest" style={{ color }}>{chapters[activeChapter].era}</div>
                  <div className="text-white/30 text-[10px]">{chapters[activeChapter].period}</div>
                </div>
              </div>
              
              <h2 className="font-['Outfit'] text-xl md:text-2xl font-bold text-white/90 mb-4">
                {chapters[activeChapter].title}
              </h2>
              
              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {chapters[activeChapter].narration}
              </p>

              <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: `${color}08`, border: `1px solid ${color}15` }}>
                <span className="text-sm mt-0.5">⚡</span>
                <div>
                  <div className="text-[9px] font-mono tracking-widest mb-1" style={{ color }}>KEY MOMENT</div>
                  <p className="text-white/50 text-xs leading-relaxed">{chapters[activeChapter].key_moment}</p>
                </div>
              </div>

              {/* Chapter navigation arrows */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setActiveChapter(Math.max(0, activeChapter - 1))}
                  disabled={activeChapter === 0}
                  className="text-xs text-white/20 hover:text-white/50 disabled:opacity-20 transition-colors"
                >
                  ← Previous era
                </button>
                <button
                  onClick={() => {
                    if (activeChapter < chapters.length - 1) setActiveChapter(activeChapter + 1);
                    else setShowNews(true);
                  }}
                  className="text-xs font-semibold transition-colors"
                  style={{ color: `${color}88` }}
                >
                  {activeChapter < chapters.length - 1 ? "Next era →" : "Current News →"}
                </button>
              </div>
            </div>
          )}

          {/* Current News */}
          {showNews && (
            <div className="story-enter">
              <h2 className="font-['Outfit'] text-xl font-bold text-white/80 mb-6 flex items-center gap-3">
                <span>📰</span> Current Industry News
              </h2>
              <div className="space-y-4">
                {(story?.current_news || []).map((news: any, i: number) => (
                  <div key={i} className="news-card">
                    <h3 className="text-sm font-semibold text-white/80 mb-2">{news.headline}</h3>
                    <p className="text-xs text-white/40 leading-relaxed mb-3">{news.summary}</p>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                      <span className="text-[10px]" style={{ color: `${color}88` }}>{news.relevance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ═══ AUTHICHAIN FUTURE ═══ */}
      {!loading && story?.authichain_future && (
        <section className="max-w-3xl mx-auto px-6 pb-12">
          <div className="p-6 rounded-2xl" style={{ 
            background: `linear-gradient(135deg, ${color}08, ${color}04)`,
            border: `1px solid ${color}15`,
          }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="text-[10px] font-mono tracking-widest" style={{ color }}>THE FUTURE — POWERED BY AUTHICHAIN</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {story.authichain_future}
            </p>
          </div>
        </section>
      )}

      {/* ═══ CLOSING LINE ═══ */}
      {!loading && story?.closing_line && (
        <section className="max-w-2xl mx-auto px-6 py-16 text-center border-t border-white/[0.03]">
          <p className="font-['Outfit'] text-lg md:text-xl font-light italic text-white/40 leading-relaxed">
            "{story.closing_line}"
          </p>
          <div className="mt-8 flex justify-center gap-6 text-[10px] text-white/15 font-mono">
            <span>AuthiChain Storymode</span>
            <span>·</span>
            <span>{meta.name}</span>
            <span>·</span>
            <span>Polygon Verified</span>
          </div>
        </section>
      )}

      {/* ═══ EXPLORE MORE ═══ */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h3 className="text-xs font-mono tracking-widest text-white/20 mb-4">EXPLORE MORE VERTICALS</h3>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {Object.entries(VERTICAL_META)
            .filter(([k]) => k !== vertical)
            .slice(0, 5)
            .map(([key, v]) => (
              <a
                key={key}
                href={`/storymode/${key}`}
                className="p-3 rounded-xl text-center transition-all hover:bg-white/[0.03] border border-white/[0.03] hover:border-white/[0.08]"
              >
                <div className="w-10 h-10 rounded-lg mx-auto mb-2 overflow-hidden relative">
                  <Image src={v.image} alt={v.name} fill className="object-cover" unoptimized />
                </div>
                <div className="text-[10px] font-semibold text-white/40">{v.name}</div>
              </a>
            ))}
        </div>
      </section>
    </main>
  );
}
