/**
 * QRON.space Industry Showcase
 * 10 FLUX.1 AI-generated QR Art pieces — one per industry vertical
 * Each demonstrates AuthiChain authentication for a different sector
 * 
 * Route: qron.space/showcase or app/showcase/page.tsx
 */

import Image from "next/image";
import Link from "next/link";

const SHOWCASE = [
  {
    id: "qron-space",
    name: "QRON Space",
    tagline: "The Interface",
    desc: "The consumer scanner layer of the Authentic Economy. Every scan verifies, every verification earns $QRON.",
    src: "/showcase/qron-space.png",
    color: "#00CCFF",
    accent: "#00FFE5",
    platform: "qron.space",
    link: "/",
    status: "LIVE",
  },
  {
    id: "strainchain",
    name: "StrainChain",
    tagline: "Cannabis Authentication",
    desc: "Seed-to-sale verification for cannabis. 1,001 Michigan products authenticated on Polygon. Lab results, compliance, trust — on chain.",
    src: "/showcase/strainchain.png",
    color: "#00C853",
    accent: "#69F0AE",
    platform: "strainchain.io",
    link: "https://strainchain.io",
    status: "LIVE — 1,001 PRODUCTS",
  },
  {
    id: "authichain",
    name: "AuthiChain",
    tagline: "The Trust Protocol",
    desc: "5-agent AI consensus authentication. The backbone that powers every scan across every vertical. Marble-solid, gold-standard trust.",
    src: "/showcase/authichain.png",
    color: "#D4A017",
    accent: "#FFD700",
    platform: "authichain.com",
    link: "https://authichain.com",
    status: "LIVE — PROTOCOL",
  },
  {
    id: "ev-industry",
    name: "EV Authentication",
    tagline: "Electric Vehicle Parts & Batteries",
    desc: "EU DPP mandatory for EV batteries from Feb 2027. AuthiChain authenticates parts, batteries, and components across the EV supply chain.",
    src: "/showcase/ev-industry.png",
    color: "#6366F1",
    accent: "#818CF8",
    platform: "authichain.com/verticals/ev",
    link: "https://authichain.com",
    status: "EU DPP READY",
  },
  {
    id: "medchain",
    name: "MedChain",
    tagline: "Pharmaceutical Authentication",
    desc: "Counterfeit drugs kill 1M+ people annually. MedChain verifies pharmaceuticals from manufacturer to patient. DSCSA compliance built in.",
    src: "/showcase/medchain.png",
    color: "#06B6D4",
    accent: "#22D3EE",
    platform: "authichain.com/verticals/pharma",
    link: "https://authichain.com",
    status: "COMING SOON",
  },
  {
    id: "haute-couture",
    name: "Haute Couture",
    tagline: "Luxury Fashion Authentication",
    desc: "Fashion counterfeiting costs $50B+ yearly. Haute Couture by AuthiChain gives every garment an unforgeable digital identity.",
    src: "/showcase/haute-couture.png",
    color: "#D4A017",
    accent: "#F59E0B",
    platform: "authichain.com/verticals/fashion",
    link: "https://authichain.com",
    status: "EU DPP 2027",
  },
  {
    id: "artisan-roasters",
    name: "Artisan Roasters",
    tagline: "Food & Beverage Authentication",
    desc: "From bean to cup, verified on chain. Artisan Roasters authenticates origin, roast date, and supply chain for specialty coffee and F&B.",
    src: "/showcase/artisan-roasters.png",
    color: "#78350F",
    accent: "#A16207",
    platform: "authichain.com/verticals/food",
    link: "https://authichain.com",
    status: "COMING SOON",
  },
  {
    id: "propchain",
    name: "PropChain",
    tagline: "Real Estate Authentication",
    desc: "Property titles, inspections, and material certificates — all authenticated on chain. Transparent real estate, floor to roof.",
    src: "/showcase/propchain.png",
    color: "#0EA5E9",
    accent: "#38BDF8",
    platform: "authichain.com/verticals/realestate",
    link: "https://authichain.com",
    status: "CONCEPT",
  },
  {
    id: "streamvault",
    name: "StreamVault",
    tagline: "Entertainment & Media Authentication",
    desc: "Digital content provenance. StreamVault authenticates music, film, and media assets — proving ownership in the age of AI-generated content.",
    src: "/showcase/streamvault.png",
    color: "#EC4899",
    accent: "#F472B6",
    platform: "authichain.com/verticals/media",
    link: "https://authichain.com",
    status: "CONCEPT",
  },
  {
    id: "athletedao",
    name: "AthleteDAO",
    tagline: "Sports Memorabilia Authentication",
    desc: "Authenticated jerseys, signed equipment, and sports collectibles. AthleteDAO proves it's real — from the field to your shelf.",
    src: "/showcase/athletedao.png",
    color: "#7C3AED",
    accent: "#A78BFA",
    platform: "authichain.com/verticals/sports",
    link: "https://authichain.com",
    status: "CONCEPT",
  },
];

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-[#050508]">
      {/* Hero */}
      <section className="text-center py-16 px-4">
        <p className="text-[#00CCFF] text-xs tracking-[0.3em] uppercase font-semibold mb-3">QRON.space × AuthiChain</p>
        <h1 className="font-bold text-3xl md:text-5xl text-white/90 max-w-2xl mx-auto leading-tight">
          AI-Generated QR Art<br/>
          <span className="bg-gradient-to-r from-[#00CCFF] via-[#D4A017] to-[#00C853] bg-clip-text text-transparent">
            For Every Industry
          </span>
        </h1>
        <p className="text-[#555] text-sm mt-4 max-w-xl mx-auto leading-relaxed">
          Each piece is a functional QR code generated by FLUX.1 + ControlNet Union — 
          art that scans, powered by AuthiChain authentication.
        </p>
        <p className="text-[#333] text-xs mt-3">
          10 verticals · 10 industries · One protocol
        </p>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SHOWCASE.map((item) => (
            <a
              key={item.id}
              href={"/storymode/" + item.id}
              className="group relative bg-white/[0.015] border border-white/[0.04] rounded-2xl overflow-hidden hover:border-white/[0.08] transition-all duration-300 block"
            >
              {/* Image */}
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={item.src}
                  alt={`${item.name} — AI QR Art by QRON`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-80" />
                
                {/* Status badge */}
                <div
                  className="absolute top-4 right-4 text-[9px] font-extrabold tracking-[1px] px-3 py-1.5 rounded backdrop-blur-sm"
                  style={{
                    background: `${item.color}20`,
                    color: item.color,
                    border: `1px solid ${item.color}40`,
                  }}
                >
                  {item.status}
                </div>
                
                {/* Storymode entry */}
                <div className="absolute top-4 left-4 text-[9px] font-bold tracking-[1px] px-3 py-1.5 rounded backdrop-blur-sm bg-white/10 text-white/70 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                  ▶ STORYMODE
                </div>

                {/* Bottom info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
                    />
                    <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: item.color }}>
                      {item.tagline}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white">{item.name}</h2>
                  <p className="text-xs text-white/50 mt-2 leading-relaxed">{item.desc}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[10px] text-white/30 font-mono">{item.platform}</span>
                    {item.id === "strainchain" ? (
                      <span className="flex gap-2">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[10px] font-semibold px-3 py-1 rounded-full transition-all"
                          style={{
                            background: `${item.color}15`,
                            color: item.color,
                            border: `1px solid ${item.color}30`,
                          }}
                        >
                          StrainChain.io
                        </a>
                        <span
                          className="text-[10px] font-semibold px-3 py-1 rounded-full"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            color: "rgba(255,255,255,0.5)",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          ▶ Story
                        </span>
                      </span>
                    ) : (
                      <span
                        className="text-[10px] font-semibold px-3 py-1 rounded-full"
                        style={{
                          background: `${item.color}10`,
                          color: `${item.color}88`,
                          border: `1px solid ${item.color}15`,
                        }}
                      >
                        Powered by AuthiChain
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 border-t border-white/[0.03]">
        <h2 className="text-xl font-bold text-white/80 mb-3">Your brand needs a QR like this.</h2>
        <p className="text-xs text-[#555] mb-6 max-w-md mx-auto">
          Custom FLUX.1 AI-generated QR art with built-in AuthiChain authentication.
          Functional, beautiful, and verified on Polygon.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/create" className="bg-[#00CCFF] text-black text-sm font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
            Create Your QR Art
          </a>
          <a href="https://authichain.com/api" className="bg-white/5 text-white/70 text-sm font-semibold px-6 py-3 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
            API Docs
          </a>
        </div>
        <div className="flex justify-center gap-8 mt-8 text-[10px] text-[#333]">
          <span>FLUX.1 + ControlNet Union</span>
          <span>Polygon Verified</span>
          <span>$QRON Rewards</span>
        </div>
      </section>
    </main>
  );
}
