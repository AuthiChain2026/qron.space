import { useState } from "react";

// ═══════════════════════════════════════════════════════
// AUTHENTIC ECONOMY — UNIFIED SYSTEM REDESIGN BLUEPRINT
// ═══════════════════════════════════════════════════════

const BRAND = {
  authichain: { name: "AuthiChain", domain: "authichain.com", role: "THE PROTOCOL", color: "#D4A017", accent: "#FFD700", tagline: "Trust Infrastructure for Global Commerce", icon: "🔗" },
  qron: { name: "QRON", domain: "qron.space", role: "THE INTERFACE", color: "#00CCFF", accent: "#00FFE5", tagline: "Scan. Verify. Earn.", icon: "📱" },
  strainchain: { name: "StrainChain", domain: "strainchain.io", role: "THE VERTICAL", color: "#00C853", accent: "#69F0AE", tagline: "Cannabis Authenticity, Verified on Chain", icon: "🌿" },
};

const PLATFORM_ROLES = [
  {
    key: "authichain", ...BRAND.authichain,
    purpose: "The enterprise backbone. AuthiChain IS the authentication protocol — the API, the blockchain layer, the AI consensus engine, the EU DPP compliance machine. Every authentication event across the entire ecosystem flows through AuthiChain.",
    serves: ["Brands & Manufacturers", "Enterprise clients", "EU DPP compliance seekers", "Government agencies", "Insurance companies"],
    pages: [
      { name: "Homepage", desc: "Enterprise-grade pitch: 'The trust layer for global commerce.' Stats, social proof, CTA to API docs." },
      { name: "/api", desc: "Developer portal. REST API docs, SDKs, authentication, rate limits, pricing tiers." },
      { name: "/dpp", desc: "EU Digital Product Passport compliance engine. Self-serve DPP generation for manufacturers." },
      { name: "/dashboard", desc: "Brand portal. Register products, mint certificates, view scan analytics, manage API keys." },
      { name: "/verify", desc: "Public verification page. Anyone can enter a product ID and see its full authentication history." },
      { name: "/pricing", desc: "Tiered pricing: Starter ($99/mo), Growth ($499/mo), Enterprise ($2,499/mo), Custom." },
      { name: "/truth-network", desc: "The 5-agent AI consensus system explained. Guardian, Archivist, Sentinel, Scout, Arbiter." },
      { name: "/verticals", desc: "Industry solutions: Cannabis, Luxury, Pharma, Electronics, Fashion. Links to StrainChain for cannabis." },
    ],
    revenue: ["Per-certificate fees ($0.10-1.00)", "Per-scan API calls ($0.01-0.05)", "Monthly API subscriptions ($99-10K)", "EU DPP compliance packages ($2K-50K setup)", "Enterprise contracts", "Data intelligence subscriptions"],
    techStack: ["Polygon Smart Contracts", "Cloudflare Workers (API Gateway)", "Supabase (Data Layer)", "Groq AI (Consensus Engine)", "Stripe (Billing)", "Vercel (Frontend)"],
  },
  {
    key: "qron", ...BRAND.qron,
    purpose: "The consumer-facing interface. QRON is how the world INTERACTS with AuthiChain. The scanner app, the QR art generator, the $QRON token, the Scan-to-Earn rewards. QRON makes authentication fun, accessible, and rewarding.",
    serves: ["Consumers & shoppers", "Content creators", "Small businesses (QR art)", "Token holders", "Scanner users"],
    pages: [
      { name: "Homepage", desc: "Consumer-facing: 'Every product has a story. Scan to discover it.' Download scanner CTA." },
      { name: "/scan", desc: "PWA scanner. Camera opens, scan any AuthiChain QR → instant verification + $QRON reward." },
      { name: "/create", desc: "QR Art Studio. AI-generated artistic QR codes for businesses. Powered by FLUX.1 pipeline." },
      { name: "/token", desc: "$QRON token page. Scan-to-Earn mechanics, staking, token utility, Polygon contract info." },
      { name: "/earn", desc: "Scan-to-Earn dashboard. Track scans, accumulated $QRON, leaderboards, referral bonuses." },
      { name: "/storefront", desc: "QR Art marketplace. Buy pre-made or custom QR art. Priced at $29-299." },
      { name: "/business", desc: "B2B QR solutions. Custom branded QR codes with built-in AuthiChain verification." },
    ],
    revenue: ["QR Art sales ($29-299)", "$QRON token appreciation", "Premium scanner features", "B2B QR packages ($49-999)", "Advertising/sponsored scans", "Data from consumer scan behavior"],
    techStack: ["FLUX.1 + ControlNet (QR Art)", "Cloudflare Worker (qron-image-gen)", "fal.ai (GPU inference)", "$QRON on Polygon", "HuggingFace (FLUX.1-schnell)", "PWA Scanner"],
  },
  {
    key: "strainchain", ...BRAND.strainchain,
    purpose: "The first industry vertical. StrainChain proves the AuthiChain protocol works in a real, high-stakes market. Cannabis is perfect: heavy regulation, rampant counterfeiting, consumer safety concerns, and a market desperate for trust.",
    serves: ["Dispensaries & retailers", "Cannabis cultivators", "Testing labs", "State regulators", "Cannabis consumers"],
    pages: [
      { name: "Homepage", desc: "Cannabis-specific: 'From seed to sale, verified on chain.' Dispensary onboarding CTA." },
      { name: "/dispensary", desc: "Dispensary portal. Register products, print QR labels, view consumer scan data." },
      { name: "/verify", desc: "Consumer scan page. Scan product QR → see strain info, lab results, supply chain history." },
      { name: "/compliance", desc: "State compliance dashboard. METRC integration, reporting, audit trails." },
      { name: "/marketplace", desc: "Authenticated cannabis NFT marketplace (Bag ie.z collection, Myles High)." },
      { name: "/labs", desc: "Testing lab portal. Upload COAs, link to product certificates, tamper-proof results." },
    ],
    revenue: ["Per-product certification ($0.50-2.00)", "Monthly dispensary subscriptions ($99-499)", "Lab integration fees", "NFT marketplace commissions", "Compliance reporting packages", "State/regulatory contracts"],
    techStack: ["AuthiChain API (backend)", "QRON Scanner (consumer interface)", "Polygon NFT Contract", "Supabase (product DB: 1,001 products seeded)", "METRC API integration", "Vercel (frontend)"],
  },
];

const REVENUE_FLOW = [
  { from: "Consumer", action: "Scans product QR with QRON app", to: "QRON.space", flow: "scan event" },
  { from: "QRON.space", action: "Sends verification request to AuthiChain API", to: "AuthiChain.com", flow: "API call" },
  { from: "AuthiChain.com", action: "5-agent AI consensus authenticates product", to: "Polygon", flow: "blockchain verify" },
  { from: "Polygon", action: "Returns verification + mints $QRON reward", to: "Consumer", flow: "$QRON reward" },
  { from: "Brand/Manufacturer", action: "Pays per-scan fee + API subscription", to: "AuthiChain.com", flow: "💰 REVENUE" },
  { from: "AuthiChain.com", action: "Aggregates scan data → intelligence reports", to: "Data Buyers", flow: "💰 REVENUE" },
];

const UNIFIED_DESIGN = {
  typography: { display: "Clash Display / Satoshi", body: "General Sans / DM Sans", mono: "JetBrains Mono" },
  darkBg: "#050508",
  surfaces: ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.04)", "rgba(255,255,255,0.06)"],
  borders: "rgba(255,255,255,0.06)",
  principles: [
    "Dark-first: All platforms use #050508 base with platform-specific accent glows",
    "Minimal chrome: Content speaks, UI disappears. No decorative elements without function",
    "Monospace data + sans-serif narrative: JetBrains Mono for metrics, Clash Display for headlines",
    "Platform color DNA: AuthiChain=Gold, QRON=Cyan, StrainChain=Green — used as accents, never backgrounds",
    "Unified iconography: Simple geometric shapes, no emoji in production (used here for prototyping only)",
    "Motion: Subtle entrance animations, glow pulses on live data, no bouncing or excessive movement",
    "The 'authenticity gradient': All three platform colors blend in shared elements to signal ecosystem unity",
  ],
};

const GO_TO_MARKET = [
  { phase: "NOW → June 2026", label: "UNIFY", color: "#D4A017", tasks: [
    "Redesign all three sites with unified dark theme + platform accent colors",
    "AuthiChain.com: Enterprise pitch + API docs + DPP compliance page + pricing",
    "QRON.space: Consumer scanner PWA + QR art studio + $QRON token page",
    "StrainChain.io: Dispensary portal + consumer verification + 1,001 product showcase",
    "Cross-link all platforms: AuthiChain footer shows ecosystem, QRON scanner links to AuthiChain verify",
    "Unified 'Authentic Economy' brand page explaining the three-platform architecture",
    "SEO: 'EU Digital Product Passport compliance' + 'product authentication API' + 'cannabis supply chain verification'",
  ]},
  { phase: "July 2026", label: "EU DPP REGISTRY", color: "#FF6B35", tasks: [
    "EU DPP central registry opens July 19 — AuthiChain DPP engine must be live",
    "Launch self-serve DPP generation tool on authichain.com/dpp",
    "Press release: 'AuthiChain offers 10x cheaper EU DPP compliance for SMBs'",
    "Outreach to EU trade compliance consultancies + manufacturing associations",
    "HubSpot campaign: EU DPP segment targeting exporters to EU markets",
    "Partner with GS1 for Digital Link compatibility certification",
  ]},
  { phase: "Aug-Dec 2026", label: "SCALE", color: "#00CCFF", tasks: [
    "Target 1,000 brand accounts on AuthiChain API",
    "Target 100K monthly scans through QRON scanner",
    "Expand StrainChain to 50 Michigan dispensaries (from current 20 pilots)",
    "Launch Whatnot/TikTok live selling for liquidation arbitrage (cash flow engine)",
    "Apply for SBIR Phase I grant (DHS cybersecurity/supply chain track)",
    "Pitch deck update for Series A / YC Demo Day",
    "APEX Accelerator partnership for government procurement channel",
  ]},
  { phase: "Q1 2027", label: "EU MANDATE", color: "#FF4444", tasks: [
    "EU DPP MANDATORY for batteries Feb 18 → massive demand spike",
    "Textiles + steel DPPs follow mid-2027",
    "Revenue inflection point — enterprise pipeline converts",
    "$QRON token utility surge as scan volume explodes",
    "Second vertical launch (Luxury Goods via AuthiChain)",
    "Series A fundraise on traction metrics",
  ]},
];

const INTEGRATION_MAP = [
  { system: "Polygon Blockchain", connects: ["AuthiChain (NFT minting, verification)", "QRON ($QRON token, Scan-to-Earn)", "StrainChain (product certificates)"], shared: true },
  { system: "Cloudflare Workers", connects: ["AuthiChain API gateway (34+ workers)", "QRON image-gen worker", "StrainChain security layer"], shared: true },
  { system: "Supabase", connects: ["AuthiChain (product registry, scan logs)", "QRON (user accounts, scan history)", "StrainChain (dispensary data, 1,001 products)"], shared: true },
  { system: "Stripe", connects: ["AuthiChain (API billing, enterprise invoicing)", "QRON (QR art purchases, subscriptions)", "StrainChain (dispensary subscriptions)"], shared: true },
  { system: "Vercel", connects: ["AuthiChain frontend (Next.js)", "QRON frontend", "StrainChain frontend"], shared: true },
  { system: "5-Agent AI Consensus", connects: ["AuthiChain (core engine)", "QRON (verification results)", "StrainChain (cannabis-specific model)"], shared: false, owner: "AuthiChain" },
  { system: "FLUX.1 QR Pipeline", connects: ["QRON (art generation)", "AuthiChain (branded QR for enterprise)", "StrainChain (dispensary QR labels)"], shared: false, owner: "QRON" },
  { system: "HubSpot CRM", connects: ["AuthiChain (172 enterprise deals)", "StrainChain (6 MI cannabis pilots)"], shared: true },
  { system: "Telegram Bot", connects: ["AuthiChain (@Authichainbot alerts)", "QRON (scan notifications)"], shared: true },
];

export default function AuthenticEconomyBlueprint() {
  const [tab, setTab] = useState("architecture");
  const [expandedPlatform, setExpandedPlatform] = useState(null);
  const [expandedSection, setExpandedSection] = useState({});

  const toggleSection = (platformKey, section) => {
    const key = `${platformKey}-${section}`;
    setExpandedSection(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { id: "architecture", label: "🏗️ Architecture" },
    { id: "platforms", label: "📐 Platform Specs" },
    { id: "flow", label: "💰 Revenue Flow" },
    { id: "design", label: "🎨 Design System" },
    { id: "integration", label: "⚙️ Integration Map" },
    { id: "gtm", label: "🚀 Go-to-Market" },
  ];

  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace", background: "#050508",
      color: "#c0c4cc", minHeight: "100vh",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes tri { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .bx { background: rgba(255,255,255,0.015); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 14px; position: relative; }
        .bx:hover { border-color: rgba(255,255,255,0.08); }
        .nav { cursor: pointer; padding: 6px 11px; border-radius: 5px; border: 1px solid rgba(255,255,255,0.04); font-size: 9.5px; font-family: inherit; color: #444; background: transparent; transition: all 0.15s; white-space: nowrap; }
        .nav:hover { color: #888; }
        .nav.on { color: #D4A017; border-color: rgba(212,160,23,0.3); background: rgba(212,160,23,0.04); }
        .chip { display: inline-block; padding: 1px 6px; border-radius: 3px; font-size: 7.5px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase; }
        .expand { cursor: pointer; transition: all 0.15s; }
        .expand:hover { background: rgba(255,255,255,0.02); }
        .platform-header { display: flex; align-items: center; gap: 10px; padding: 12px; border-radius: 8px; cursor: pointer; transition: all 0.2s; border: 1px solid rgba(255,255,255,0.04); }
        .platform-header:hover { background: rgba(255,255,255,0.02); }
        .section-toggle { cursor: pointer; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.03); display: flex; justify-content: space-between; align-items: center; }
        .section-toggle:hover { color: #e0e0e0; }
        .flow-step { display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.03); margin-bottom: 6px; }
      `}</style>

      {/* MASTHEAD */}
      <div style={{ padding: "16px 20px 10px", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{
              fontFamily: "'Outfit'", fontSize: 16, fontWeight: 900, letterSpacing: "-0.3px",
              background: `linear-gradient(90deg, ${BRAND.authichain.color}, ${BRAND.qron.color}, ${BRAND.strainchain.color}, ${BRAND.authichain.color})`,
              backgroundSize: "200% 100%", animation: "tri 8s linear infinite",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>THE AUTHENTIC ECONOMY</div>
            <div style={{ fontSize: 8.5, color: "#333", letterSpacing: "0.5px", marginTop: 1 }}>
              COMPLETE SYSTEM REDESIGN — AUTHICHAIN × QRON × STRAINCHAIN
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {Object.values(BRAND).map(b => (
              <div key={b.domain} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: b.color, boxShadow: `0 0 6px ${b.color}` }} />
                <span style={{ fontSize: 8, color: "#444" }}>{b.domain}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 10, flexWrap: "wrap" }}>
          {tabs.map(t => (
            <button key={t.id} className={`nav ${tab === t.id ? "on" : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "14px 20px", animation: "fadeIn 0.2s ease" }} key={tab}>

        {/* ═══ ARCHITECTURE ═══ */}
        {tab === "architecture" && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#D4A017", marginBottom: 12 }}>UNIFIED ARCHITECTURE — THREE PLATFORMS, ONE PROTOCOL</div>

            <div className="bx" style={{ marginBottom: 14, borderColor: "rgba(212,160,23,0.1)" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#D4A017", marginBottom: 8 }}>CORE THESIS</div>
              <div style={{ fontSize: 10, color: "#888", lineHeight: 1.8 }}>
                <strong style={{ color: "#e0e0e0" }}>Objects have authenticity.</strong> AuthiChain verifies it via 5-agent AI consensus + Polygon blockchain.<br/>
                <strong style={{ color: "#e0e0e0" }}>People have authenticity reputation.</strong> QRON tracks it via Scan-to-Earn + $QRON token.<br/>
                <strong style={{ color: "#e0e0e0" }}>AI agents enforce authenticity.</strong> The Truth Network operates autonomously across all verticals.<br/><br/>
                <strong style={{ color: "#D4A017" }}>The Authentic Economy is not three separate products.</strong> It's one protocol (AuthiChain) with one interface (QRON) deployed across industry verticals (starting with StrainChain). Every scan feeds every layer. Every certificate strengthens the network. Every data point makes the AI smarter.
              </div>
            </div>

            {/* Three platform cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 14 }}>
              {Object.values(BRAND).map(b => (
                <div key={b.domain} className="bx" style={{ borderColor: `${b.color}15`, textAlign: "center" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${b.color}, transparent)` }} />
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{b.icon}</div>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 14, fontWeight: 800, color: b.color }}>{b.name}</div>
                  <div style={{ fontSize: 8, color: "#555", letterSpacing: "1px", fontWeight: 600, marginTop: 2 }}>{b.role}</div>
                  <div style={{ fontSize: 9, color: "#666", marginTop: 6 }}>{b.tagline}</div>
                  <div style={{ fontSize: 8, color: "#444", marginTop: 6, padding: "3px 8px", background: `${b.color}08`, borderRadius: 4, border: `1px solid ${b.color}15` }}>{b.domain}</div>
                </div>
              ))}
            </div>

            {/* Relationship diagram */}
            <div className="bx">
              <div style={{ fontSize: 10, fontWeight: 600, color: "#00CCFF", marginBottom: 10 }}>PLATFORM RELATIONSHIPS</div>
              <div style={{ fontSize: 9, color: "#666", lineHeight: 2 }}>
                <span style={{ color: "#D4A017" }}>AuthiChain</span> is the <strong style={{ color: "#e0e0e0" }}>backend protocol</strong> — it processes every authentication, stores every certificate, runs the AI consensus, handles enterprise billing, and generates EU DPP passports. It is the single source of truth.<br/>
                <span style={{ color: "#00CCFF" }}>QRON</span> is the <strong style={{ color: "#e0e0e0" }}>consumer interface</strong> — it's how humans interact with AuthiChain. The scanner, the rewards, the QR art. QRON calls the AuthiChain API on every scan. QRON never stores authentication data — AuthiChain does.<br/>
                <span style={{ color: "#00C853" }}>StrainChain</span> is the <strong style={{ color: "#e0e0e0" }}>first industry vertical</strong> — cannabis-specific UX on top of AuthiChain's protocol. Dispensary portal, compliance tools, strain-specific metadata. Proves the model works before expanding to luxury, pharma, electronics.<br/><br/>
                <strong style={{ color: "#D4A017" }}>Future verticals</strong> (LuxChain, PharmaChain, ElecChain) follow the StrainChain template: vertical-specific UX + AuthiChain backend + QRON scanner.
              </div>
            </div>
          </div>
        )}

        {/* ═══ PLATFORM SPECS ═══ */}
        {tab === "platforms" && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#D4A017", marginBottom: 12 }}>📐 DETAILED PLATFORM SPECIFICATIONS</div>
            {PLATFORM_ROLES.map((p, pi) => (
              <div key={p.key} style={{ marginBottom: 12 }}>
                <div className="platform-header" style={{ borderColor: `${p.color}20` }}
                  onClick={() => setExpandedPlatform(expandedPlatform === p.key ? null : p.key)}>
                  <div style={{ width: 3, height: 32, borderRadius: 2, background: p.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 16 }}>{p.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontFamily: "'Outfit'", fontSize: 14, fontWeight: 700, color: p.color }}>{p.name}</span>
                      <span style={{ fontSize: 8, color: "#555", fontWeight: 600, letterSpacing: "1px" }}>{p.role}</span>
                      <span className="chip" style={{ background: `${p.color}10`, color: `${p.color}cc`, border: `1px solid ${p.color}20` }}>{p.domain}</span>
                    </div>
                    <div style={{ fontSize: 9, color: "#666", marginTop: 2 }}>{p.tagline}</div>
                  </div>
                  <span style={{ fontSize: 14, color: "#444" }}>{expandedPlatform === p.key ? "−" : "+"}</span>
                </div>

                {expandedPlatform === p.key && (
                  <div style={{ padding: "0 12px", animation: "fadeIn 0.2s ease" }}>
                    <div className="bx" style={{ marginTop: 8, borderColor: `${p.color}10` }}>
                      <div style={{ fontSize: 10, color: "#888", lineHeight: 1.7, marginBottom: 12 }}>{p.purpose}</div>

                      {/* Serves */}
                      <div className="section-toggle" onClick={() => toggleSection(p.key, "serves")}>
                        <span style={{ fontSize: 9, fontWeight: 600, color: p.color }}>WHO IT SERVES</span>
                        <span style={{ fontSize: 10, color: "#444" }}>{expandedSection[`${p.key}-serves`] ? "−" : "+"}</span>
                      </div>
                      {expandedSection[`${p.key}-serves`] && (
                        <div style={{ padding: "8px 0" }}>
                          {p.serves.map((s, i) => (
                            <div key={i} style={{ fontSize: 10, color: "#777", padding: "2px 0", display: "flex", alignItems: "center", gap: 6 }}>
                              <span style={{ width: 3, height: 3, borderRadius: "50%", background: p.color }} />{s}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Pages */}
                      <div className="section-toggle" onClick={() => toggleSection(p.key, "pages")}>
                        <span style={{ fontSize: 9, fontWeight: 600, color: p.color }}>SITE PAGES ({p.pages.length})</span>
                        <span style={{ fontSize: 10, color: "#444" }}>{expandedSection[`${p.key}-pages`] ? "−" : "+"}</span>
                      </div>
                      {expandedSection[`${p.key}-pages`] && (
                        <div style={{ padding: "8px 0" }}>
                          {p.pages.map((pg, i) => (
                            <div key={i} style={{ padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                              <div style={{ fontSize: 10, fontWeight: 600, color: "#ccc" }}>{p.domain}{pg.name === "Homepage" ? "" : pg.name}</div>
                              <div style={{ fontSize: 9, color: "#555", marginTop: 2 }}>{pg.desc}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Revenue */}
                      <div className="section-toggle" onClick={() => toggleSection(p.key, "revenue")}>
                        <span style={{ fontSize: 9, fontWeight: 600, color: p.color }}>REVENUE STREAMS ({p.revenue.length})</span>
                        <span style={{ fontSize: 10, color: "#444" }}>{expandedSection[`${p.key}-revenue`] ? "−" : "+"}</span>
                      </div>
                      {expandedSection[`${p.key}-revenue`] && (
                        <div style={{ padding: "8px 0" }}>
                          {p.revenue.map((r, i) => (
                            <div key={i} style={{ fontSize: 10, color: "#888", padding: "3px 0", display: "flex", alignItems: "center", gap: 6 }}>
                              <span style={{ color: "#00ff88" }}>$</span>{r}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech */}
                      <div className="section-toggle" onClick={() => toggleSection(p.key, "tech")}>
                        <span style={{ fontSize: 9, fontWeight: 600, color: p.color }}>TECH STACK</span>
                        <span style={{ fontSize: 10, color: "#444" }}>{expandedSection[`${p.key}-tech`] ? "−" : "+"}</span>
                      </div>
                      {expandedSection[`${p.key}-tech`] && (
                        <div style={{ padding: "8px 0", display: "flex", flexWrap: "wrap", gap: 4 }}>
                          {p.techStack.map((t, i) => (
                            <span key={i} className="chip" style={{ background: `${p.color}08`, color: `${p.color}bb`, border: `1px solid ${p.color}15` }}>{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ═══ REVENUE FLOW ═══ */}
        {tab === "flow" && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#00ff88", marginBottom: 12 }}>💰 HOW MONEY FLOWS THROUGH THE AUTHENTIC ECONOMY</div>
            <div className="bx" style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#D4A017", marginBottom: 10 }}>THE SCAN REVENUE CYCLE</div>
              {REVENUE_FLOW.map((step, i) => (
                <div key={i} className="flow-step">
                  <div style={{ width: 20, fontSize: 10, color: "#444", textAlign: "center", fontWeight: 700 }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: "#ccc" }}>
                      <span style={{ color: step.flow.includes("💰") ? "#00ff88" : "#888" }}>{step.from}</span>
                      <span style={{ color: "#444" }}> → </span>
                      <span style={{ color: "#aaa" }}>{step.action}</span>
                      <span style={{ color: "#444" }}> → </span>
                      <span style={{ color: step.flow.includes("💰") ? "#00ff88" : "#888" }}>{step.to}</span>
                    </div>
                  </div>
                  <span className="chip" style={{
                    background: step.flow.includes("💰") ? "rgba(0,255,136,0.1)" : "rgba(255,255,255,0.03)",
                    color: step.flow.includes("💰") ? "#00ff88" : "#555",
                    border: `1px solid ${step.flow.includes("💰") ? "rgba(0,255,136,0.2)" : "rgba(255,255,255,0.06)"}`,
                  }}>{step.flow}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {PLATFORM_ROLES.map(p => (
                <div key={p.key} className="bx" style={{ borderColor: `${p.color}15` }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: p.color, marginBottom: 8 }}>{p.name} REVENUE</div>
                  {p.revenue.map((r, i) => (
                    <div key={i} style={{ fontSize: 9, color: "#666", padding: "2px 0", display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ width: 3, height: 3, borderRadius: "50%", background: p.color, flexShrink: 0 }} />{r}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="bx" style={{ marginTop: 12, borderColor: "rgba(0,255,136,0.1)" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#00ff88", marginBottom: 6 }}>FLYWHEEL LOGIC</div>
              <div style={{ fontSize: 9, color: "#888", lineHeight: 1.8 }}>
                More scans (QRON) → more data → smarter AI (AuthiChain) → better verification → more brands trust it → more products registered → more QR codes (QRON generates) → more consumers scan → more $QRON earned → more scan incentive → <strong style={{ color: "#D4A017" }}>cycle compounds forever</strong>. Each platform feeds the others. Revenue enters through AuthiChain (enterprise), QRON (consumer), and StrainChain (vertical). The Polygon blockchain is the shared trust anchor.
              </div>
            </div>
          </div>
        )}

        {/* ═══ DESIGN SYSTEM ═══ */}
        {tab === "design" && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#D4A017", marginBottom: 12 }}>🎨 UNIFIED DESIGN SYSTEM — THE AUTHENTIC ECONOMY LOOK</div>

            {/* Color palette */}
            <div className="bx" style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#ccc", marginBottom: 10 }}>COLOR PALETTE</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                {[
                  { label: "Base", color: "#050508", border: true },
                  { label: "Surface 1", color: "rgba(255,255,255,0.02)", border: true },
                  { label: "Surface 2", color: "rgba(255,255,255,0.04)", border: true },
                  { label: "AuthiChain", color: BRAND.authichain.color },
                  { label: "AuthiChain Accent", color: BRAND.authichain.accent },
                  { label: "QRON", color: BRAND.qron.color },
                  { label: "QRON Accent", color: BRAND.qron.accent },
                  { label: "StrainChain", color: BRAND.strainchain.color },
                  { label: "StrainChain Accent", color: BRAND.strainchain.accent },
                  { label: "Success", color: "#00ff88" },
                  { label: "Warning", color: "#ffaa00" },
                  { label: "Error", color: "#ff4444" },
                ].map((c, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 6, background: c.color,
                      border: c.border ? "1px solid rgba(255,255,255,0.1)" : "none",
                      boxShadow: !c.border ? `0 0 8px ${c.color}44` : "none",
                    }} />
                    <div style={{ fontSize: 7, color: "#444", marginTop: 3 }}>{c.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="bx" style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#ccc", marginBottom: 10 }}>TYPOGRAPHY</div>
              <div style={{ fontSize: 9, color: "#888", lineHeight: 1.8 }}>
                <strong style={{ color: "#ccc" }}>Display:</strong> Outfit (800/900 weight) — Headlines, hero text, metric values. Bold, geometric, modern.<br/>
                <strong style={{ color: "#ccc" }}>Body:</strong> General Sans or DM Sans — Descriptions, UI labels, navigation. Clean, neutral, readable.<br/>
                <strong style={{ color: "#ccc" }}>Mono:</strong> JetBrains Mono — Data, code, addresses, technical values. Authenticates the tech credibility.<br/>
                <strong style={{ color: "#ccc" }}>Scale:</strong> 8px (chips/labels) → 10px (body) → 12px (section heads) → 14-16px (card titles) → 18-22px (hero metrics)
              </div>
            </div>

            {/* Design principles */}
            <div className="bx">
              <div style={{ fontSize: 10, fontWeight: 600, color: "#ccc", marginBottom: 10 }}>DESIGN PRINCIPLES</div>
              {UNIFIED_DESIGN.principles.map((p, i) => (
                <div key={i} style={{ fontSize: 9, color: "#777", padding: "4px 0", display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ color: "#D4A017", fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ INTEGRATION MAP ═══ */}
        {tab === "integration" && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#00CCFF", marginBottom: 12 }}>⚙️ SHARED INFRASTRUCTURE — WHAT CONNECTS EVERYTHING</div>
            {INTEGRATION_MAP.map((sys, i) => (
              <div key={i} className="bx" style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#e0e0e0" }}>{sys.system}</span>
                  <span className="chip" style={{
                    background: sys.shared ? "rgba(0,204,255,0.08)" : `${BRAND[sys.owner?.toLowerCase()]?.color || "#888"}10`,
                    color: sys.shared ? "#00ccff" : BRAND[sys.owner?.toLowerCase()]?.color || "#888",
                    border: `1px solid ${sys.shared ? "rgba(0,204,255,0.15)" : (BRAND[sys.owner?.toLowerCase()]?.color || "#888") + "20"}`,
                  }}>{sys.shared ? "SHARED" : `OWNED: ${sys.owner}`}</span>
                </div>
                {sys.connects.map((c, j) => (
                  <div key={j} style={{ fontSize: 9, color: "#666", padding: "2px 0", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{
                      width: 4, height: 4, borderRadius: "50%", flexShrink: 0,
                      background: c.includes("AuthiChain") ? BRAND.authichain.color : c.includes("QRON") ? BRAND.qron.color : BRAND.strainchain.color,
                    }} />
                    {c}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ═══ GO-TO-MARKET ═══ */}
        {tab === "gtm" && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#D4A017", marginBottom: 12 }}>🚀 GO-TO-MARKET — PHASED ACTIVATION</div>
            {GO_TO_MARKET.map((phase, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{
                    padding: "3px 10px", borderRadius: 4, fontSize: 9, fontWeight: 700,
                    background: `${phase.color}10`, color: phase.color, border: `1px solid ${phase.color}25`,
                    letterSpacing: "0.5px",
                  }}>{phase.phase}</div>
                  <span style={{ fontFamily: "'Outfit'", fontSize: 13, fontWeight: 700, color: phase.color }}>{phase.label}</span>
                </div>
                {phase.tasks.map((task, j) => (
                  <div key={j} style={{
                    display: "flex", alignItems: "flex-start", gap: 8, padding: "5px 10px",
                    borderLeft: `2px solid ${phase.color}30`, marginLeft: 4, marginBottom: 3,
                  }}>
                    <span style={{ width: 14, height: 14, borderRadius: 3, border: `1.5px solid ${phase.color}40`, flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 10, color: "#888", lineHeight: 1.5 }}>{task}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ padding: "10px 20px", borderTop: "1px solid rgba(255,255,255,0.03)", display: "flex", justifyContent: "space-between", fontSize: 8, color: "#222" }}>
        <span>The Authentic Economy — System Blueprint v1.0</span>
        <div style={{ display: "flex", gap: 12 }}>
          <span style={{ color: BRAND.authichain.color }}>authichain.com</span>
          <span style={{ color: BRAND.qron.color }}>qron.space</span>
          <span style={{ color: BRAND.strainchain.color }}>strainchain.io</span>
        </div>
      </div>
    </div>
  );
}
