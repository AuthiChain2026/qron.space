import { useState } from "react";

const B = {
  ac: { name: "AuthiChain", domain: "authichain.com", role: "COMPLIANCE + BLOCKCHAIN", color: "#D4A017", icon: "🔗",
    desc: "Regulatory compliance engine, blockchain verification infrastructure, EU DPP passport generation, 5-agent AI consensus, NFT certificate minting, scan ledger, and enterprise audit trails.",
    sells: "Trust infrastructure. The legal and cryptographic backbone." },
  qr: { name: "QRON", domain: "qron.space", role: "AI + CREATIVE", color: "#00CCFF", icon: "📱",
    desc: "FLUX.1 AI-powered cryptographic QR art generation, one-of-a-kind visual designs, consumer scanner PWA, $QRON Scan-to-Earn rewards, and creative tools for brands.",
    sells: "The art. The scan. The reward. The consumer experience." },
  sc: { name: "StrainChain", domain: "strainchain.io", role: "INDUSTRY SaaS EXAMPLE", color: "#00C853", icon: "🌿",
    desc: "AuthiChain compliance + QRON creative applied to cannabis. Dispensary management, seed-to-sale tracking, lab result verification, METRC compliance, and consumer trust — demonstrating the full stack for one industry.",
    sells: "The proof that the two halves make a whole." },
};

// ═══════════════════════════════════════════════
// INDIVIDUAL SITE TIERS
// ═══════════════════════════════════════════════

const AC_TIERS = [
  { name: "Verify", price: 0, period: "free", badge: "FREE", features: [
    "10 product verifications/month",
    "Public verification page",
    "Basic scan history",
  ], cta: "Start Free", color: "#888" },
  { name: "Comply", price: 99, period: "/mo", badge: "STARTER", features: [
    "1,000 blockchain verifications/month",
    "NFT certificate minting (100/mo)",
    "Compliance dashboard",
    "Scan analytics",
    "Email support",
  ], cta: "Get Compliant", color: "#D4A017" },
  { name: "Protect", price: 499, period: "/mo", badge: "GROWTH", features: [
    "10,000 verifications/month",
    "Unlimited NFT certificates",
    "EU DPP passport generation",
    "5-agent AI consensus reports",
    "API access (REST + MCP)",
    "Priority support",
  ], cta: "Protect Your Brand", color: "#D4A017" },
  { name: "Fortify", price: 2499, period: "/mo", badge: "ENTERPRISE", features: [
    "Unlimited verifications",
    "Custom AI consensus models",
    "Full EU DPP compliance suite",
    "Dedicated account manager",
    "SLA guarantee (99.9%)",
    "Audit trail exports",
    "Government/regulatory API",
    "White-label verification pages",
  ], cta: "Contact Sales", color: "#FFD700" },
];

const QR_TIERS = [
  { name: "Scan", price: 0, period: "free", badge: "FREE", features: [
    "Unlimited QR scanning (consumer)",
    "Earn $QRON on every scan",
    "Basic verification results",
  ], cta: "Start Scanning", color: "#888" },
  { name: "Create", price: 49, period: "/mo", badge: "CREATOR", features: [
    "10 FLUX.1 cryptographic QR arts/month",
    "Brand color + logo integration",
    "HD download (PNG, SVG, PDF)",
    "Basic scan analytics",
  ], cta: "Create QR Art", color: "#00CCFF" },
  { name: "Studio", price: 299, period: "/mo", badge: "STUDIO", features: [
    "100 cryptographic QR arts/month",
    "Custom AI style training",
    "Batch generation (CSV upload)",
    "Embeddable scanner widget",
    "$QRON reward customization",
    "Priority GPU rendering",
  ], cta: "Open Studio", color: "#00CCFF" },
  { name: "Agency", price: 999, period: "/mo", badge: "AGENCY", features: [
    "Unlimited QR art generation",
    "White-label scanner",
    "Multi-client management",
    "API access (generation + scan)",
    "Custom ControlNet models",
    "Reseller licensing",
    "Storymode content creation",
    "Dedicated GPU allocation",
  ], cta: "Contact Sales", color: "#00FFE5" },
];

const SC_TIERS = [
  { name: "Leaf", price: 0, period: "free", badge: "FREE", features: [
    "Verify any StrainChain product",
    "View lab results + provenance",
    "Earn $QRON on cannabis scans",
  ], cta: "Verify Free", color: "#888" },
  { name: "Dispensary", price: 99, period: "/mo", badge: "DISPENSARY", features: [
    "100 product certifications/month",
    "QR label generation for products",
    "Consumer scan dashboard",
    "Lab result integration",
    "Basic compliance reports",
  ], cta: "Onboard Dispensary", color: "#00C853" },
  { name: "Cultivator", price: 499, period: "/mo", badge: "CULTIVATOR", features: [
    "1,000 certifications/month",
    "Seed-to-sale chain of custody",
    "METRC integration",
    "Custom strain QR art (FLUX.1)",
    "Multi-location support",
    "Compliance export (state reports)",
    "Consumer engagement analytics",
  ], cta: "Scale Operations", color: "#00C853" },
  { name: "Enterprise", price: 1999, period: "/mo", badge: "MSO", features: [
    "Unlimited certifications",
    "Multi-state compliance engine",
    "Full METRC/BioTrack integration",
    "White-label consumer app",
    "Custom AI consensus for cannabis",
    "Regulatory audit packages",
    "NFT marketplace for strains",
    "Dedicated compliance officer",
  ], cta: "Contact Sales", color: "#69F0AE" },
];

// ═══════════════════════════════════════════════
// CROSS-SITE BUNDLES
// ═══════════════════════════════════════════════

const BUNDLES = [
  {
    name: "Verified Creator",
    sites: ["AuthiChain", "QRON"],
    icon: "🔗📱",
    color: "#E8B500",
    price: 399,
    period: "/mo",
    savings: "$149/mo",
    desc: "Compliance backbone + creative AI. Generate cryptographic QR art with built-in blockchain verification. For brands that want beautiful, legally defensible authentication.",
    includes: [
      "AuthiChain Protect tier (10K verifications)",
      "QRON Studio tier (100 QR arts/mo)",
      "Unified dashboard",
      "Cross-platform analytics",
      "Combined API access",
    ],
    best_for: "Brands launching product authentication with stunning visuals",
  },
  {
    name: "Chain Compliant",
    sites: ["AuthiChain", "StrainChain"],
    icon: "🔗🌿",
    color: "#5CAD3C",
    price: 449,
    period: "/mo",
    savings: "$149/mo",
    desc: "Full compliance + cannabis vertical. Blockchain verification infrastructure with cannabis-specific SaaS — METRC integration, lab results, dispensary management.",
    includes: [
      "AuthiChain Protect tier (10K verifications)",
      "StrainChain Cultivator tier (1K certs/mo)",
      "Cannabis compliance automation",
      "Unified audit trail",
      "Cross-platform reporting",
    ],
    best_for: "Cannabis operators who need both compliance and industry tools",
  },
  {
    name: "Creative Cannabis",
    sites: ["QRON", "StrainChain"],
    icon: "📱🌿",
    color: "#00A86B",
    price: 349,
    period: "/mo",
    savings: "$149/mo",
    desc: "AI art + cannabis SaaS. Custom FLUX.1 strain art for every product, consumer scanner with $QRON rewards, plus full dispensary management.",
    includes: [
      "QRON Studio tier (100 QR arts/mo)",
      "StrainChain Cultivator tier (1K certs/mo)",
      "Strain-specific QR art generation",
      "Consumer engagement + rewards",
      "Combined scan analytics",
    ],
    best_for: "Cannabis brands investing in premium consumer experience",
  },
];

// ═══════════════════════════════════════════════
// THE ULTIMATE TIER
// ═══════════════════════════════════════════════

const ULTIMATE = {
  name: "The Authentic Economy",
  tagline: "Every aspect. All three platforms. One subscription.",
  price: 4999,
  period: "/mo",
  savings: "Save $2,497/mo vs separate enterprise tiers",
  color: "#FFD700",
  features: [
    // AuthiChain Enterprise
    { cat: "AuthiChain — Compliance + Blockchain", items: [
      "Unlimited blockchain verifications",
      "Custom 5-agent AI consensus models",
      "Full EU DPP compliance suite",
      "Government/regulatory API access",
      "White-label verification pages",
      "SLA guarantee (99.9%)",
      "Audit trail exports + legal packages",
    ]},
    // QRON Agency
    { cat: "QRON — AI + Creative", items: [
      "Unlimited FLUX.1 cryptographic QR art",
      "Custom ControlNet model training",
      "White-label scanner PWA",
      "Multi-client/brand management",
      "Dedicated GPU allocation",
      "$QRON reward engine (brand-funded)",
      "Storymode content for all products",
    ]},
    // StrainChain MSO (or any vertical)
    { cat: "StrainChain — Industry SaaS (or custom vertical)", items: [
      "Unlimited product certifications",
      "Multi-state/region compliance engine",
      "Full regulatory system integration",
      "White-label consumer application",
      "NFT marketplace for products",
      "Industry-specific AI models",
      "Dedicated compliance + account team",
    ]},
    // Exclusive
    { cat: "Ultimate Exclusive", items: [
      "Cross-platform unified dashboard",
      "Combined analytics + intelligence",
      "Priority feature development",
      "Quarterly business review",
      "Custom vertical development (build YOUR 'StrainChain')",
      "MCP server for AI agent integration",
      "Data intelligence exports",
    ]},
  ],
};

export default function MonetizationArchitecture() {
  const [tab, setTab] = useState("overview");
  const [expandedTier, setExpandedTier] = useState(null);

  const tabs = [
    { id: "overview", label: "🏗️ Architecture" },
    { id: "authichain", label: `🔗 AuthiChain` },
    { id: "qron", label: `📱 QRON` },
    { id: "strainchain", label: `🌿 StrainChain` },
    { id: "bundles", label: `⚡ Bundles` },
    { id: "ultimate", label: `👑 Ultimate` },
  ];

  const renderTiers = (tiers, brand) => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
      {tiers.map((t, i) => (
        <div key={i} style={{
          background: "rgba(255,255,255,0.015)", border: `1px solid ${i === tiers.length - 1 ? brand.color + "30" : "rgba(255,255,255,0.04)"}`,
          borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden",
        }}>
          {i === tiers.length - 1 && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${brand.color}, transparent)` }} />}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: "1px", padding: "2px 6px", borderRadius: 3,
              background: `${t.color}12`, color: t.color, border: `1px solid ${t.color}20`,
            }}>{t.badge}</span>
          </div>
          <div style={{ fontFamily: "'Outfit'", fontSize: 13, fontWeight: 700, color: "#e0e0e0", marginBottom: 2 }}>{t.name}</div>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontFamily: "'Outfit'", fontSize: 26, fontWeight: 900, color: t.price === 0 ? "#888" : brand.color }}>{t.price === 0 ? "Free" : `$${t.price}`}</span>
            {t.price > 0 && <span style={{ fontSize: 11, color: "#555" }}>{t.period}</span>}
          </div>
          <div style={{ flex: 1 }}>
            {t.features.map((f, j) => (
              <div key={j} style={{ fontSize: 9, color: "#777", padding: "3px 0", display: "flex", gap: 6, alignItems: "flex-start" }}>
                <span style={{ color: brand.color, flexShrink: 0, fontSize: 8, marginTop: 1 }}>✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
          <button style={{
            marginTop: 12, padding: "8px 0", borderRadius: 6, border: `1px solid ${t.price === 0 ? "rgba(255,255,255,0.08)" : brand.color + "40"}`,
            background: i === tiers.length - 1 ? brand.color : "transparent",
            color: i === tiers.length - 1 ? "#000" : t.price === 0 ? "#666" : brand.color,
            fontSize: 10, fontWeight: 700, fontFamily: "inherit", cursor: "pointer",
          }}>{t.cta}</button>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", background: "#030306", color: "#c0c4cc", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .tab { padding: 7px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.04); font-size: 9.5px; font-family: inherit; color: #444; background: transparent; cursor: pointer; white-space: nowrap; transition: all 0.15s; }
        .tab:hover { color: #888; }
        .tab.on { color: #D4A017; border-color: rgba(212,160,23,0.3); background: rgba(212,160,23,0.04); }
        .bx { background: rgba(255,255,255,0.015); border: 1px solid rgba(255,255,255,0.04); border-radius: 12px; padding: 16px; margin-bottom: 10px; position: relative; overflow: hidden; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "16px 20px 10px", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
        <div style={{ fontFamily: "'Outfit'", fontSize: 16, fontWeight: 900,
          background: "linear-gradient(90deg, #D4A017, #00CCFF, #00C853, #D4A017)", backgroundSize: "200%",
          animation: "shimmer 6s linear infinite", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>AUTHENTIC ECONOMY — MONETIZATION</div>
        <div style={{ fontSize: 8, color: "#333", marginTop: 1, letterSpacing: "0.5px" }}>
          Three sites. Individual tiers. Cross-site bundles. One ultimate tier.
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 10, flexWrap: "wrap" }}>
          {tabs.map(t => (
            <button key={t.id} className={`tab ${tab === t.id ? "on" : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "14px 20px", animation: "fadeIn 0.2s ease" }} key={tab}>

        {/* ═══ OVERVIEW ═══ */}
        {tab === "overview" && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#D4A017", marginBottom: 12 }}>THE THREE DOMAINS</div>
            {Object.values(B).map((b, i) => (
              <div key={i} className="bx" style={{ borderLeftColor: b.color, borderLeftWidth: 3 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 18 }}>{b.icon}</span>
                  <span style={{ fontFamily: "'Outfit'", fontSize: 14, fontWeight: 700, color: b.color }}>{b.name}</span>
                  <span style={{ fontSize: 8, color: "#555", fontWeight: 600, letterSpacing: "1px" }}>{b.role}</span>
                </div>
                <div style={{ fontSize: 10, color: "#888", lineHeight: 1.7, marginBottom: 6 }}>{b.desc}</div>
                <div style={{ fontSize: 9, color: b.color, fontStyle: "italic" }}>{b.sells}</div>
                <div style={{ fontSize: 8, color: "#444", marginTop: 6 }}>{b.domain}</div>
              </div>
            ))}

            <div className="bx" style={{ borderColor: "rgba(212,160,23,0.15)", marginTop: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#D4A017", marginBottom: 8 }}>HOW THEY FIT</div>
              <div style={{ fontSize: 10, color: "#888", lineHeight: 1.8 }}>
                <strong style={{ color: "#D4A017" }}>AuthiChain</strong> handles everything <em>legal and cryptographic</em> — blockchain verification, EU DPP compliance, regulatory audit trails, NFT certificates, and the 5-agent AI consensus that decides if a product is authentic.<br/><br/>
                <strong style={{ color: "#00CCFF" }}>QRON</strong> handles everything <em>creative and consumer-facing</em> — the AI-generated cryptographic QR art (FLUX.1), the scanner that reads them, the $QRON rewards that incentivize scanning, and the Storymode narration that deepens trust.<br/><br/>
                <strong style={{ color: "#00C853" }}>StrainChain</strong> is <em>what it looks like when both work together</em> for one industry. Cannabis gets AuthiChain's compliance backbone + QRON's creative tools = a complete counterfeit-killing, regulation-meeting, consumer-delighting SaaS. Every future vertical follows this template.
              </div>
            </div>

            <div className="bx" style={{ marginTop: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#00ff88", marginBottom: 8 }}>MONETIZATION LADDER</div>
              <div style={{ fontSize: 10, color: "#888", lineHeight: 1.8 }}>
                <strong style={{ color: "#ccc" }}>Level 1:</strong> Each site sells independently. A brand might only need compliance (AuthiChain) or only need QR art (QRON).<br/>
                <strong style={{ color: "#ccc" }}>Level 2:</strong> Cross-site bundles upsell combinations. "You're buying compliance — add the creative layer for 40% off."<br/>
                <strong style={{ color: "#FFD700" }}>Level 3:</strong> The Ultimate tier unlocks everything across all three platforms — the full Authentic Economy stack. One subscription, every capability, every vertical.
              </div>
            </div>

            {/* Revenue summary */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 12 }}>
              {[
                { label: "AuthiChain Range", range: "Free – $2,499/mo", color: B.ac.color },
                { label: "QRON Range", range: "Free – $999/mo", color: B.qr.color },
                { label: "StrainChain Range", range: "Free – $1,999/mo", color: B.sc.color },
                { label: "Ultimate Tier", range: "$4,999/mo", color: "#FFD700" },
              ].map((r, i) => (
                <div key={i} className="bx" style={{ textAlign: "center", padding: 12 }}>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 14, fontWeight: 800, color: r.color }}>{r.range}</div>
                  <div style={{ fontSize: 8, color: "#555", textTransform: "uppercase", letterSpacing: 0.8, marginTop: 4 }}>{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ AUTHICHAIN TIERS ═══ */}
        {tab === "authichain" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 18 }}>🔗</span>
              <span style={{ fontFamily: "'Outfit'", fontSize: 16, fontWeight: 800, color: B.ac.color }}>AuthiChain</span>
              <span style={{ fontSize: 8, color: "#555", fontWeight: 600, letterSpacing: "1px" }}>COMPLIANCE + BLOCKCHAIN</span>
            </div>
            <div style={{ fontSize: 9, color: "#666", marginBottom: 14 }}>{B.ac.desc}</div>
            {renderTiers(AC_TIERS, B.ac)}
          </div>
        )}

        {/* ═══ QRON TIERS ═══ */}
        {tab === "qron" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 18 }}>📱</span>
              <span style={{ fontFamily: "'Outfit'", fontSize: 16, fontWeight: 800, color: B.qr.color }}>QRON</span>
              <span style={{ fontSize: 8, color: "#555", fontWeight: 600, letterSpacing: "1px" }}>AI + CREATIVE</span>
            </div>
            <div style={{ fontSize: 9, color: "#666", marginBottom: 14 }}>{B.qr.desc}</div>
            {renderTiers(QR_TIERS, B.qr)}
          </div>
        )}

        {/* ═══ STRAINCHAIN TIERS ═══ */}
        {tab === "strainchain" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 18 }}>🌿</span>
              <span style={{ fontFamily: "'Outfit'", fontSize: 16, fontWeight: 800, color: B.sc.color }}>StrainChain</span>
              <span style={{ fontSize: 8, color: "#555", fontWeight: 600, letterSpacing: "1px" }}>INDUSTRY SaaS (CANNABIS)</span>
            </div>
            <div style={{ fontSize: 9, color: "#666", marginBottom: 4 }}>{B.sc.desc}</div>
            <div style={{ fontSize: 9, color: "#00C853", marginBottom: 14, fontStyle: "italic" }}>This is the template. Future verticals (LuxChain, MedChain, PropChain) follow this same tier structure for their industry.</div>
            {renderTiers(SC_TIERS, B.sc)}
          </div>
        )}

        {/* ═══ BUNDLES ═══ */}
        {tab === "bundles" && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#E8B500", marginBottom: 4 }}>CROSS-SITE BUNDLES</div>
            <div style={{ fontSize: 9, color: "#666", marginBottom: 14 }}>Combine platforms at a discount. Each bundle includes growth-tier access to both platforms with unified dashboards.</div>
            {BUNDLES.map((b, i) => (
              <div key={i} className="bx" style={{ borderColor: `${b.color}15` }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${b.color}, transparent)` }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 16 }}>{b.icon}</span>
                      <span style={{ fontFamily: "'Outfit'", fontSize: 15, fontWeight: 700, color: "#e0e0e0" }}>{b.name}</span>
                      <span style={{ fontSize: 8, color: "#555" }}>{b.sites.join(" + ")}</span>
                    </div>
                    <div style={{ fontSize: 10, color: "#888", lineHeight: 1.6, maxWidth: 500 }}>{b.desc}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 24, fontWeight: 900, color: b.color }}>${b.price}</div>
                    <div style={{ fontSize: 10, color: "#555" }}>{b.period}</div>
                    <div style={{ fontSize: 9, color: "#00ff88", marginTop: 2 }}>Save {b.savings}</div>
                  </div>
                </div>
                <div style={{ marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {b.includes.map((inc, j) => (
                    <span key={j} style={{
                      fontSize: 8, padding: "3px 8px", borderRadius: 4,
                      background: `${b.color}08`, border: `1px solid ${b.color}15`, color: `${b.color}cc`,
                    }}>{inc}</span>
                  ))}
                </div>
                <div style={{ fontSize: 9, color: "#555", marginTop: 8, fontStyle: "italic" }}>Best for: {b.best_for}</div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ ULTIMATE ═══ */}
        {tab === "ultimate" && (
          <div>
            {/* Ultimate Hero */}
            <div className="bx" style={{
              borderColor: "rgba(255,215,0,0.2)", textAlign: "center", padding: 24,
              background: "linear-gradient(135deg, rgba(212,160,23,0.04), rgba(0,204,255,0.02), rgba(0,200,83,0.02))",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, #D4A017, #00CCFF, #00C853)",
              }} />
              <div style={{ fontSize: 24, marginBottom: 6 }}>👑</div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 22, fontWeight: 900,
                background: "linear-gradient(90deg, #D4A017, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>{ULTIMATE.name}</div>
              <div style={{ fontSize: 10, color: "#888", marginTop: 4 }}>{ULTIMATE.tagline}</div>
              <div style={{ marginTop: 12 }}>
                <span style={{ fontFamily: "'Outfit'", fontSize: 40, fontWeight: 900, color: "#FFD700" }}>${ULTIMATE.price.toLocaleString()}</span>
                <span style={{ fontSize: 14, color: "#888" }}>{ULTIMATE.period}</span>
              </div>
              <div style={{ fontSize: 10, color: "#00ff88", marginTop: 4 }}>{ULTIMATE.savings}</div>
            </div>

            {/* Feature Categories */}
            {ULTIMATE.features.map((cat, i) => {
              const catColor = i === 0 ? B.ac.color : i === 1 ? B.qr.color : i === 2 ? B.sc.color : "#FFD700";
              return (
                <div key={i} className="bx" style={{ borderLeftColor: catColor, borderLeftWidth: 3 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: catColor, marginBottom: 8 }}>{cat.cat}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                    {cat.items.map((item, j) => (
                      <div key={j} style={{ fontSize: 9, color: "#888", display: "flex", gap: 6, alignItems: "flex-start", padding: "2px 0" }}>
                        <span style={{ color: catColor, flexShrink: 0, fontSize: 8 }}>✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            <div className="bx" style={{ textAlign: "center", borderColor: "rgba(255,215,0,0.1)", marginTop: 10 }}>
              <div style={{ fontSize: 10, color: "#888", marginBottom: 8 }}>THE MATH</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 20, fontSize: 10 }}>
                <div>
                  <div style={{ color: B.ac.color }}>AuthiChain Enterprise</div>
                  <div style={{ color: "#555" }}>$2,499/mo</div>
                </div>
                <div style={{ color: "#444" }}>+</div>
                <div>
                  <div style={{ color: B.qr.color }}>QRON Agency</div>
                  <div style={{ color: "#555" }}>$999/mo</div>
                </div>
                <div style={{ color: "#444" }}>+</div>
                <div>
                  <div style={{ color: B.sc.color }}>StrainChain MSO</div>
                  <div style={{ color: "#555" }}>$1,999/mo</div>
                </div>
                <div style={{ color: "#444" }}>=</div>
                <div>
                  <div style={{ color: "#ff6b6b" }}>$5,497/mo separate</div>
                  <div style={{ fontFamily: "'Outfit'", fontWeight: 800, color: "#FFD700" }}>$4,999/mo bundled</div>
                </div>
              </div>
            </div>

            <button style={{
              width: "100%", padding: 14, borderRadius: 8, marginTop: 12,
              background: "linear-gradient(90deg, #D4A017, #FFD700)", color: "#000",
              fontSize: 13, fontWeight: 800, fontFamily: "'Outfit'", border: "none", cursor: "pointer",
              letterSpacing: "0.5px",
            }}>Activate The Authentic Economy →</button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "10px 20px", borderTop: "1px solid rgba(255,255,255,0.03)", fontSize: 7, color: "#222", display: "flex", justifyContent: "space-between" }}>
        <span>Authentic Economy Monetization Architecture v3.0</span>
        <div style={{ display: "flex", gap: 10 }}>
          <span style={{ color: B.ac.color }}>authichain.com</span>
          <span style={{ color: B.qr.color }}>qron.space</span>
          <span style={{ color: B.sc.color }}>strainchain.io</span>
        </div>
      </div>
    </div>
  );
}
