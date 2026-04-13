import { useState } from "react";

const C = { gold: "#D4A017", cyan: "#00CCFF", green: "#00C853", ok: "#00ff88", warn: "#ffaa00", err: "#ff4444", violet: "#8B5CF6", rose: "#F43F5E" };

// ═══════════════════════════════════════════════════════════════
// GENESIS COLLECTION — Bag ie.z / Voyage Bloom × Myles High
// Listed as INSPIRATIONAL & PRICELESS — Not for sale
// ═══════════════════════════════════════════════════════════════

const GENESIS_NFTS = [
  {
    id: "MH-001", name: "Myles High #001", collection: "Bag ie.z",
    series: "Voyage Bloom × Myles High", status: "PRICELESS",
    desc: "The genesis piece. Where the Authentic Economy began — a vision of cannabis culture meeting blockchain truth. This is not for sale. This is a statement.",
    attributes: [
      { trait: "Rarity", value: "1 of 1 Genesis" },
      { trait: "Chain", value: "Polygon" },
      { trait: "Standard", value: "ERC-721" },
      { trait: "Significance", value: "Origin Story" },
      { trait: "Movement", value: "Authentic Economy" },
    ],
    colors: ["#1a0a2e", "#4a1942", "#c84b31", "#00ff88"],
    contract: "0x4da4D2675e52374639C9c954f4f653887A9972BE",
  },
  {
    id: "VB-001", name: "Voyage Bloom Genesis", collection: "Bag ie.z",
    series: "Voyage Bloom × Myles High", status: "PRICELESS",
    desc: "The bloom that launched a thousand chains. Cannabis authenticity isn't a feature — it's a movement. This piece represents the seed of StrainChain.",
    attributes: [
      { trait: "Rarity", value: "1 of 1 Genesis" },
      { trait: "Chain", value: "Polygon" },
      { trait: "Vision", value: "Seed to Sale Truth" },
      { trait: "Vertical", value: "StrainChain Origin" },
    ],
    colors: ["#0a1628", "#1b4332", "#40916c", "#00ff88"],
    contract: "0x4da4D2675e52374639C9c954f4f653887A9972BE",
  },
  {
    id: "AE-001", name: "Authentic Economy Manifesto", collection: "Bag ie.z",
    series: "Foundational", status: "PRICELESS",
    desc: "Objects have authenticity. People have authenticity reputation. AI agents enforce authenticity. This NFT encodes the founding thesis of the Authentic Economy.",
    attributes: [
      { trait: "Rarity", value: "1 of 1 Manifesto" },
      { trait: "Chain", value: "Polygon" },
      { trait: "Thesis", value: "Trust Protocol" },
      { trait: "Era", value: "Pre-Revenue Genesis" },
    ],
    colors: ["#0f0c29", "#302b63", "#24243e", "#D4A017"],
    contract: "0x4da4D2675e52374639C9c954f4f653887A9972BE",
  },
];

// ═══════════════════════════════════════════════════════════════
// MARKETPLACE CATEGORIES
// ═══════════════════════════════════════════════════════════════

const MARKETPLACE_CATS = [
  { name: "Genesis Collection", icon: "👑", count: GENESIS_NFTS.length, label: "PRICELESS", color: C.gold, desc: "Foundational NFTs — the origin story of the Authentic Economy" },
  { name: "Auth Certificates", icon: "🔗", count: "1,001+", label: "TRADEABLE", color: C.cyan, desc: "Blockchain authentication certificates for verified products" },
  { name: "QR Art Collection", icon: "🎨", count: "Generative", label: "MINTABLE", color: C.violet, desc: "AI-generated artistic QR codes — functional art that scans" },
  { name: "StrainChain Drops", icon: "🌿", count: "Seasonal", label: "LIMITED", color: C.green, desc: "Cannabis-culture NFTs tied to verified Michigan strains" },
  { name: "Brand Verified", icon: "✓", count: "Growing", label: "PARTNER", color: C.warn, desc: "Official brand authentication NFTs — minted by verified manufacturers" },
  { name: "Community Mints", icon: "🔥", count: "Open", label: "MINT NOW", color: C.rose, desc: "Community-driven mints with $QRON utility and scan rewards" },
];

// ═══════════════════════════════════════════════════════════════
// SELF-SERVE MONETIZATION OPTIONS
// ═══════════════════════════════════════════════════════════════

const SELF_SERVE = [
  {
    name: "Instant API Key", icon: "🔑", price: "From $99/mo",
    desc: "Get an AuthiChain API key in 60 seconds. No sales call. Stripe checkout → key delivered instantly.",
    tiers: ["Starter: $99/mo (1K verifications)", "Growth: $499/mo (10K verifications)", "Scale: $2,499/mo (unlimited)"],
    cta: "Get API Key", revenue: "Recurring MRR", color: C.gold,
  },
  {
    name: "QR Art Generator", icon: "🎨", price: "$29-299/design",
    desc: "Generate AI-powered artistic QR codes instantly. Upload logo → select style → pay → download HD QR art.",
    tiers: ["Single QR: $29", "Business Pack (5): $99", "Enterprise Pack (25): $299", "Unlimited Monthly: $499/mo"],
    cta: "Create QR Art", revenue: "Per-transaction", color: C.violet,
  },
  {
    name: "Mint Auth Certificate", icon: "🔗", price: "$1-10/cert",
    desc: "Mint a blockchain authentication certificate for any product. Self-serve — fill form → pay → NFT minted on Polygon.",
    tiers: ["Single: $10", "10-pack: $50", "100-pack: $250", "1,000-pack: $1,500"],
    cta: "Mint Certificate", revenue: "Per-mint", color: C.cyan,
  },
  {
    name: "EU DPP Generator", icon: "🇪🇺", price: "$99-999/passport",
    desc: "Generate EU Digital Product Passport compliance documents. Self-serve wizard — enter product data → instant DPP.",
    tiers: ["Single DPP: $99", "SMB Plan (100 products): $999/mo", "Mid-Market (5K): $4,999/mo"],
    cta: "Generate DPP", revenue: "High-margin recurring", color: "#FF6B35",
  },
  {
    name: "Scanner Widget", icon: "📱", price: "$49-499/mo",
    desc: "Embed AuthiChain scanner on your website. Customers scan products directly on your site. White-label available.",
    tiers: ["Basic (1K scans/mo): $49/mo", "Pro (10K scans/mo): $149/mo", "Enterprise (unlimited): $499/mo"],
    cta: "Get Widget Code", revenue: "Recurring embed", color: C.ok,
  },
  {
    name: "Bulk Product Registration", icon: "📦", price: "$0.10-1.00/product",
    desc: "Upload CSV → all products registered + QR generated + certificates minted in one batch. No dev skills needed.",
    tiers: ["100 products: $50", "1,000 products: $250", "10,000 products: $1,000", "100K+: Custom pricing"],
    cta: "Upload CSV", revenue: "Volume one-time + recurring scans", color: C.warn,
  },
  {
    name: "Truth Network Report", icon: "🧠", price: "$25-500/report",
    desc: "Get a detailed AI consensus authentication report for any product. PDF report with 5-agent analysis.",
    tiers: ["Basic Report: $25", "Detailed Report: $100", "Expert Report (with recommendations): $500"],
    cta: "Order Report", revenue: "Premium per-report", color: C.gold,
  },
  {
    name: "$QRON Token Staking", icon: "💎", price: "Earn APY",
    desc: "Stake $QRON tokens to earn scan rewards and governance rights. Higher stakes = higher Scan-to-Earn multiplier.",
    tiers: ["Bronze (100 $QRON): 1.2x earn multiplier", "Silver (1K $QRON): 1.5x multiplier", "Gold (10K $QRON): 2x multiplier + governance"],
    cta: "Start Staking", revenue: "Token velocity + lock-up", color: C.violet,
  },
  {
    name: "Premium Analytics", icon: "📊", price: "$99-999/mo",
    desc: "Dashboard showing scan demographics, geographic heat maps, counterfeit attempt alerts, and brand health scores.",
    tiers: ["Starter: $99/mo (basic metrics)", "Pro: $299/mo (full analytics)", "Enterprise: $999/mo (API + exports)"],
    cta: "View Demo", revenue: "SaaS recurring", color: C.cyan,
  },
  {
    name: "White-Label Auth", icon: "🏷️", price: "$2,499-25K/mo",
    desc: "Full white-label AuthiChain. Your brand, your domain, your certificates. Powered by AuthiChain protocol underneath.",
    tiers: ["Startup: $2,499/mo", "Growth: $9,999/mo", "Enterprise: $25,000/mo"],
    cta: "Request Demo", revenue: "High-value SaaS", color: C.gold,
  },
  {
    name: "NFT Marketplace Listing", icon: "🖼️", price: "2.5% commission",
    desc: "List your authenticated products as NFTs on the AuthiChain marketplace. Built-in authenticity verification.",
    tiers: ["Listing fee: Free", "Sale commission: 2.5%", "Featured listing: $25/week", "Promoted: $99/week"],
    cta: "List NFT", revenue: "Transaction commission", color: C.rose,
  },
  {
    name: "Print-on-Demand + QR", icon: "👕", price: "$19.99-79.99/item",
    desc: "Merchandise with embedded AuthiChain QR codes. Each item is authenticated on-chain. Shirts, hats, stickers, posters.",
    tiers: ["T-Shirt: $29.99", "Hoodie: $59.99", "Poster: $19.99", "Sticker Pack: $9.99"],
    cta: "Design Merch", revenue: "Physical goods margin", color: C.green,
  },
];

export default function SelfServeMarketplace() {
  const [tab, setTab] = useState("genesis");
  const [expandedNFT, setExpandedNFT] = useState(0);
  const [expandedServe, setExpandedServe] = useState(null);

  const tabs = [
    { id: "genesis", label: "👑 Genesis" },
    { id: "marketplace", label: "🖼️ Marketplace" },
    { id: "selfserve", label: "⚡ Self-Serve" },
    { id: "revenue", label: "💰 Revenue Map" },
  ];

  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace",
      background: "#030306", color: "#c0c4cc", minHeight: "100vh",
      maxWidth: 480, margin: "0 auto",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes breathe { 0%,100% { box-shadow: 0 0 20px rgba(212,160,23,0.1); } 50% { box-shadow: 0 0 40px rgba(212,160,23,0.2); } }
        .cx { background: rgba(255,255,255,0.015); border: 1px solid rgba(255,255,255,0.04); border-radius: 14px; padding: 16px; margin-bottom: 8px; overflow: hidden; position: relative; }
        .cx:active { transform: scale(0.985); }
        .btn { padding: 10px 20px; border-radius: 8px; border: none; font-family: inherit; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.15s; letter-spacing: 0.5px; -webkit-tap-highlight-color: transparent; }
        .btn:active { transform: scale(0.95); }
        .chip { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 20px; font-size: 7.5px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
        .nft-frame { border-radius: 12px; overflow: hidden; position: relative; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; }
        .tab-bar { display: flex; gap: 4px; padding: 0 16px; overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none; }
        .tab-bar::-webkit-scrollbar { display: none; }
        .tab-btn { padding: 6px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.04); font-size: 10px; font-family: inherit; color: #444; background: transparent; cursor: pointer; white-space: nowrap; transition: all 0.15s; }
        .tab-btn.on { color: ${C.gold}; border-color: rgba(212,160,23,0.3); background: rgba(212,160,23,0.04); }
        .bottom-nav { display: flex; justify-content: space-around; padding: 8px 0 env(safe-area-inset-bottom, 10px); border-top: 1px solid rgba(255,255,255,0.03); background: rgba(3,3,6,0.95); backdrop-filter: blur(20px); position: sticky; bottom: 0; }
        .nav-btn { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 6px 14px; border: none; background: none; font-family: inherit; cursor: pointer; border-radius: 8px; }
        .nav-btn.on { background: rgba(212,160,23,0.06); }
      `}</style>

      {/* HEADER */}
      <div style={{ padding: "env(safe-area-inset-top, 12px) 16px 10px" }}>
        <div style={{
          fontFamily: "'Playfair Display'", fontSize: 18, fontWeight: 800, letterSpacing: "-0.3px",
          background: `linear-gradient(90deg, ${C.gold}, #FFD700, ${C.gold})`, backgroundSize: "200%",
          animation: "shimmer 4s linear infinite",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>AUTHENTIC ECONOMY</div>
        <div style={{ fontSize: 8, color: "#333", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 1 }}>Marketplace · Self-Serve · NFT Gallery</div>
      </div>

      {/* TABS */}
      <div className="tab-bar" style={{ marginBottom: 10 }}>
        {tabs.map(t => (
          <button key={t.id} className={`tab-btn ${tab === t.id ? "on" : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ padding: "0 12px 90px", animation: "fadeUp 0.2s ease" }} key={tab}>

        {/* ═══ GENESIS COLLECTION ═══ */}
        {tab === "genesis" && (
          <div>
            {/* Museum Label */}
            <div style={{ textAlign: "center", padding: "12px 0 16px" }}>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 800, color: C.gold }}>The Genesis Collection</div>
              <div style={{ fontSize: 9, color: "#555", marginTop: 4, lineHeight: 1.6 }}>
                Bag ie.z · Voyage Bloom × Myles High<br/>
                <span style={{ color: C.gold }}>Inspirational & Priceless — Not for Sale</span>
              </div>
              <div style={{ fontSize: 8, color: "#333", marginTop: 6, fontStyle: "italic" }}>
                "These pieces represent the origin of the Authentic Economy.<br/>They are not commodities. They are statements of vision."
              </div>
            </div>

            {GENESIS_NFTS.map((nft, i) => (
              <div key={i} className="cx" style={{
                cursor: "pointer",
                borderColor: expandedNFT === i ? `${C.gold}25` : undefined,
                animation: expandedNFT === i ? "breathe 3s ease-in-out infinite" : "none",
              }} onClick={() => setExpandedNFT(i)}>
                {/* Art Frame */}
                <div className="nft-frame" style={{
                  background: `linear-gradient(135deg, ${nft.colors[0]}, ${nft.colors[1]}, ${nft.colors[2]})`,
                  marginBottom: 12, height: expandedNFT === i ? 200 : 120,
                  transition: "height 0.3s ease",
                }}>
                  {/* Abstract generative art representation */}
                  <div style={{ position: "absolute", inset: 0, opacity: 0.3 }}>
                    {[...Array(12)].map((_, j) => (
                      <div key={j} style={{
                        position: "absolute",
                        width: 40 + j * 15, height: 40 + j * 15,
                        borderRadius: "50%",
                        border: `1px solid ${nft.colors[3]}${20 + j * 5}`,
                        left: `${15 + j * 5}%`, top: `${10 + j * 6}%`,
                        transform: `rotate(${j * 30}deg)`,
                      }} />
                    ))}
                  </div>
                  <div style={{ position: "relative", textAlign: "center", zIndex: 1 }}>
                    <div style={{ fontFamily: "'Playfair Display'", fontSize: 28, fontWeight: 900, color: "white", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>{nft.id}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", letterSpacing: "2px", textTransform: "uppercase" }}>{nft.collection}</div>
                  </div>
                  {/* Priceless badge */}
                  <div style={{
                    position: "absolute", top: 10, right: 10,
                    background: "rgba(212,160,23,0.9)", color: "#000",
                    padding: "3px 10px", borderRadius: 4,
                    fontSize: 8, fontWeight: 800, letterSpacing: "1.5px",
                  }}>PRICELESS</div>
                </div>

                <div style={{ fontFamily: "'Playfair Display'", fontSize: 16, fontWeight: 700, color: "#e0e0e0" }}>{nft.name}</div>
                <div style={{ fontSize: 9, color: C.gold, marginTop: 2 }}>{nft.series}</div>

                {expandedNFT === i && (
                  <div style={{ marginTop: 12, animation: "fadeUp 0.2s ease" }}>
                    <div style={{ fontSize: 10, color: "#888", lineHeight: 1.7, marginBottom: 12, fontStyle: "italic" }}>"{nft.desc}"</div>

                    <div style={{ fontSize: 8, color: "#444", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Attributes</div>
                    {nft.attributes.map((a, j) => (
                      <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.02)", fontSize: 10 }}>
                        <span style={{ color: "#555" }}>{a.trait}</span>
                        <span style={{ color: C.gold }}>{a.value}</span>
                      </div>
                    ))}

                    <div style={{ marginTop: 10, fontSize: 8, color: "#333" }}>
                      Contract: <span style={{ color: "#555", fontFamily: "'JetBrains Mono'" }}>{nft.contract.slice(0, 10)}...{nft.contract.slice(-6)}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div style={{ textAlign: "center", padding: "16px 0", fontSize: 9, color: "#333", fontStyle: "italic" }}>
              "The value of these pieces is not measured in currency.<br/>They represent the founding moment of a protocol that will authenticate<br/>billions of products across the global supply chain."
            </div>
          </div>
        )}

        {/* ═══ MARKETPLACE ═══ */}
        {tab === "marketplace" && (
          <div>
            <div style={{ fontFamily: "'Playfair Display'", fontSize: 18, fontWeight: 700, color: "#e0e0e0", marginBottom: 12 }}>NFT Marketplace</div>

            {MARKETPLACE_CATS.map((cat, i) => (
              <div key={i} className="cx" style={{ display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${cat.color}10`, border: `1px solid ${cat.color}20`, fontSize: 24, flexShrink: 0,
                }}>{cat.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#e0e0e0" }}>{cat.name}</span>
                    <span className="chip" style={{
                      background: `${cat.color}12`, color: cat.color, border: `1px solid ${cat.color}20`,
                    }}>{cat.label}</span>
                  </div>
                  <div style={{ fontSize: 9, color: "#555", marginTop: 3 }}>{cat.desc}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: cat.color }}>{cat.count}</div>
                  <div style={{ fontSize: 7, color: "#444" }}>items</div>
                </div>
              </div>
            ))}

            {/* Mint Section */}
            <div className="cx" style={{ borderColor: `${C.rose}15`, marginTop: 8, textAlign: "center" }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>🔥</div>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: 16, fontWeight: 700, color: C.rose }}>Mint Your Own</div>
              <div style={{ fontSize: 9, color: "#666", margin: "6px 0 12px", lineHeight: 1.6 }}>
                Create AuthiChain-verified NFTs for your products.<br/>
                Each NFT includes blockchain authentication + QR code.
              </div>
              <button className="btn" style={{ background: C.rose, color: "#fff", width: "100%" }}>Start Minting →</button>
            </div>

            {/* Revenue Info */}
            <div className="cx" style={{ marginTop: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: C.gold, marginBottom: 6 }}>Marketplace Economics</div>
              <div style={{ fontSize: 9, color: "#666", lineHeight: 1.7 }}>
                Listing: Free · Sale Commission: 2.5% · Featured: $25/week<br/>
                All NFTs include AuthiChain verification certificate<br/>
                Royalties: 5% to original creator on secondary sales<br/>
                Gas: Polygon ({"<"}$0.001 per transaction)
              </div>
            </div>
          </div>
        )}

        {/* ═══ SELF-SERVE OPTIONS ═══ */}
        {tab === "selfserve" && (
          <div>
            <div style={{ fontFamily: "'Playfair Display'", fontSize: 18, fontWeight: 700, color: "#e0e0e0", marginBottom: 4 }}>Self-Serve Products</div>
            <div style={{ fontSize: 9, color: "#555", marginBottom: 12 }}>No sales calls. No demos. Instant activation via Stripe checkout.</div>

            {SELF_SERVE.map((s, i) => (
              <div key={i} className="cx" style={{
                cursor: "pointer",
                borderColor: expandedServe === i ? `${s.color}20` : undefined,
              }} onClick={() => setExpandedServe(expandedServe === i ? null : i)}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${s.color}10`, border: `1px solid ${s.color}15`, fontSize: 20, flexShrink: 0,
                  }}>{s.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#e0e0e0" }}>{s.name}</div>
                    <div style={{ fontSize: 9, color: "#555", marginTop: 2 }}>{s.desc}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: s.color }}>{s.price}</div>
                    <div style={{ fontSize: 7, color: "#444" }}>{s.revenue}</div>
                  </div>
                </div>

                {expandedServe === i && (
                  <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${s.color}10`, animation: "fadeUp 0.15s ease" }}>
                    <div style={{ fontSize: 8, color: "#444", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Pricing Tiers</div>
                    {s.tiers.map((t, j) => (
                      <div key={j} style={{
                        fontSize: 9, color: "#777", padding: "4px 8px", marginBottom: 3,
                        background: "rgba(255,255,255,0.015)", borderRadius: 4,
                        borderLeft: `2px solid ${s.color}30`,
                      }}>{t}</div>
                    ))}
                    <button className="btn" style={{
                      background: s.color, color: "#000", width: "100%", marginTop: 10,
                      fontWeight: 700, fontSize: 12,
                    }}>{s.cta}</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ═══ REVENUE MAP ═══ */}
        {tab === "revenue" && (
          <div>
            <div style={{ fontFamily: "'Playfair Display'", fontSize: 18, fontWeight: 700, color: "#e0e0e0", marginBottom: 12 }}>Revenue Architecture</div>

            {/* Total Addressable */}
            <div className="cx" style={{ textAlign: "center", borderColor: `${C.gold}15` }}>
              <div style={{ fontSize: 8, color: "#444", textTransform: "uppercase", letterSpacing: 1.5 }}>Self-Serve Revenue Potential</div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 36, fontWeight: 900, color: C.gold, margin: "4px 0" }}>$48K+</div>
              <div style={{ fontSize: 9, color: "#555" }}>monthly target across 12 self-serve products</div>
            </div>

            {/* Revenue by category */}
            {[
              { cat: "Recurring SaaS", color: C.cyan, items: [
                { name: "API Subscriptions", range: "$99-2,499/mo", potential: "$15K/mo" },
                { name: "Scanner Widgets", range: "$49-499/mo", potential: "$3K/mo" },
                { name: "Premium Analytics", range: "$99-999/mo", potential: "$5K/mo" },
                { name: "White-Label", range: "$2,499-25K/mo", potential: "$10K/mo" },
              ]},
              { cat: "Transaction Revenue", color: C.ok, items: [
                { name: "Auth Certificates", range: "$1-10/cert", potential: "$5K/mo" },
                { name: "EU DPP Passports", range: "$99-999/passport", potential: "$8K/mo" },
                { name: "QR Art Sales", range: "$29-299/design", potential: "$3K/mo" },
                { name: "Truth Network Reports", range: "$25-500/report", potential: "$2K/mo" },
              ]},
              { cat: "Marketplace", color: C.rose, items: [
                { name: "NFT Commissions", range: "2.5% per sale", potential: "$1K/mo" },
                { name: "Featured Listings", range: "$25-99/week", potential: "$500/mo" },
                { name: "Print-on-Demand", range: "$9.99-59.99/item", potential: "$1K/mo" },
                { name: "Bulk Registration", range: "$0.10-1.00/product", potential: "$2K/mo" },
              ]},
              { cat: "Token Economics", color: C.violet, items: [
                { name: "$QRON Staking Fees", range: "Protocol fee", potential: "$500/mo" },
                { name: "Scan-to-Earn Gas", range: "Covered by brands", potential: "Revenue neutral" },
                { name: "Token Appreciation", range: "Market-driven", potential: "Long-term" },
              ]},
            ].map((group, i) => (
              <div key={i} className="cx" style={{ marginTop: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: group.color, marginBottom: 8 }}>{group.cat}</div>
                {group.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.02)", fontSize: 9 }}>
                    <span style={{ color: "#888" }}>{item.name}</span>
                    <span style={{ color: "#555" }}>{item.range}</span>
                    <span style={{ color: group.color, fontWeight: 600 }}>{item.potential}</span>
                  </div>
                ))}
              </div>
            ))}

            <div className="cx" style={{ marginTop: 10, borderColor: `${C.ok}15`, textAlign: "center" }}>
              <div style={{ fontSize: 9, color: "#555", marginBottom: 4 }}>KEY PRINCIPLE</div>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: 14, fontWeight: 700, color: C.ok, lineHeight: 1.6 }}>
                "Every product on Earth needs authentication.<br/>
                We charge $0.01-$25,000 depending on the ask.<br/>
                The siphon catches every drop."
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        {tabs.map(t => (
          <button key={t.id} className={`nav-btn ${tab === t.id ? "on" : ""}`} onClick={() => setTab(t.id)}>
            <span style={{ fontSize: 17 }}>{t.label.split(" ")[0]}</span>
            <span style={{ fontSize: 7.5, color: tab === t.id ? C.gold : "#444", fontWeight: 600, fontFamily: "inherit" }}>{t.label.split(" ").slice(1).join(" ")}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
