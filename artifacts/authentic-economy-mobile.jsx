import { useState } from "react";

const P = { ac: "#D4A017", qr: "#00CCFF", sc: "#00C853", ok: "#00ff88", warn: "#ffaa00", err: "#ff4444", bg: "#050508" };

const SYSTEMS = [
  { name: "AuthiChain API", status: "live", uptime: "99.7%", color: P.ac, calls: "12,847" },
  { name: "QRON Scanner", status: "live", uptime: "99.9%", color: P.qr, calls: "3,201" },
  { name: "StrainChain", status: "live", uptime: "99.5%", color: P.sc, calls: "1,001" },
  { name: "Polygon RPC", status: "live", uptime: "99.8%", color: P.ok, calls: "8,442" },
  { name: "MCP Server", status: "ready", uptime: "—", color: P.warn, calls: "0" },
  { name: "EU DPP Engine", status: "ready", uptime: "—", color: P.warn, calls: "0" },
];

const ACTIONS = [
  { label: "Verify Product", icon: "🔍", desc: "Run 5-agent AI check", platform: "AuthiChain", color: P.ac },
  { label: "Mint Certificate", icon: "🔗", desc: "NFT on Polygon", platform: "AuthiChain", color: P.ac },
  { label: "Generate QR", icon: "📱", desc: "AI art QR code", platform: "QRON", color: P.qr },
  { label: "DPP Check", icon: "🇪🇺", desc: "EU compliance scan", platform: "AuthiChain", color: "#ff6b35" },
  { label: "Register Product", icon: "📦", desc: "Add to registry", platform: "AuthiChain", color: P.ac },
  { label: "Cannabis Verify", icon: "🌿", desc: "StrainChain check", platform: "StrainChain", color: P.sc },
  { label: "Truth Network", icon: "🧠", desc: "AI consensus query", platform: "AuthiChain", color: P.ac },
  { label: "Scan Analytics", icon: "📊", desc: "View scan data", platform: "QRON", color: P.qr },
];

const METRICS = [
  { label: "Products On-Chain", value: "1,001", delta: "+23 this week", color: P.ok },
  { label: "HubSpot Deals", value: "172", delta: "6 qualified", color: P.ac },
  { label: "CF Workers", value: "56", delta: "All healthy", color: P.qr },
  { label: "Supabase Functions", value: "78", delta: "Active", color: P.sc },
  { label: "MCP Tools", value: "8", delta: "7 revenue", color: P.warn },
  { label: "EU DPP Deadline", value: "97d", delta: "Jul 19, 2026", color: P.err },
];

const REVENUE_TARGETS = [
  { source: "MCP API Calls", current: 0, target: 500, unit: "$/mo" },
  { source: "EU DPP Compliance", current: 0, target: 10000, unit: "$/mo" },
  { source: "QR Art Sales", current: 127, target: 2000, unit: "$/mo" },
  { source: "Cannabis Certs", current: 0, target: 1000, unit: "$/mo" },
  { source: "Enterprise API", current: 0, target: 5000, unit: "$/mo" },
];

const TIMELINE = [
  { date: "NOW", task: "Deploy MCP Server to CF Workers", status: "ready", color: P.ok },
  { date: "Apr", task: "AuthiChain.com redesign live", status: "building", color: P.warn },
  { date: "May", task: "QRON Scanner PWA launch", status: "planned", color: P.qr },
  { date: "Jun", task: "Self-serve DPP tool live", status: "planned", color: "#ff6b35" },
  { date: "Jul 19", task: "EU DPP Registry Opens", status: "deadline", color: P.err },
  { date: "Aug", task: "1,000 brand accounts target", status: "goal", color: P.ac },
  { date: "Feb 27", task: "EU DPP MANDATORY", status: "critical", color: P.err },
];

export default function MobileCommandCenter() {
  const [view, setView] = useState("home");

  const views = [
    { id: "home", icon: "⚡", label: "Home" },
    { id: "status", icon: "🟢", label: "Status" },
    { id: "actions", icon: "🎯", label: "Actions" },
    { id: "revenue", icon: "💰", label: "Revenue" },
    { id: "timeline", icon: "📅", label: "Timeline" },
  ];

  return (
    <div style={{
      fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
      background: P.bg, color: "#c0c4cc",
      minHeight: "100vh", maxWidth: 430, margin: "0 auto",
      display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes grd { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        .card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 14px; margin-bottom: 8px; -webkit-tap-highlight-color: transparent; }
        .card:active { background: rgba(255,255,255,0.04); transform: scale(0.98); }
        .pill { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 20px; font-size: 8px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
        .bottom-nav { display: flex; justify-content: space-around; padding: 8px 0 env(safe-area-inset-bottom, 8px); border-top: 1px solid rgba(255,255,255,0.04); background: rgba(5,5,8,0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); position: sticky; bottom: 0; }
        .nav-item { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 6px 12px; border-radius: 8px; cursor: pointer; -webkit-tap-highlight-color: transparent; border: none; background: none; font-family: inherit; transition: all 0.15s; }
        .nav-item.on { background: rgba(212,160,23,0.08); }
        .progress-bar { height: 4px; border-radius: 2px; background: rgba(255,255,255,0.06); overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 2px; transition: width 0.5s ease; }
      `}</style>

      {/* STATUS BAR */}
      <div style={{ padding: "env(safe-area-inset-top, 12px) 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{
          fontFamily: "'Outfit'", fontSize: 15, fontWeight: 900,
          background: `linear-gradient(90deg, ${P.ac}, ${P.qr}, ${P.sc}, ${P.ac})`,
          backgroundSize: "200%", animation: "grd 6s linear infinite",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>AUTHENTIC ECONOMY</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: P.ok, animation: "pulse 2s infinite", boxShadow: `0 0 6px ${P.ok}` }} />
          <span style={{ fontSize: 8, color: "#444" }}>LIVE</span>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, padding: "4px 12px 80px", overflowY: "auto", WebkitOverflowScrolling: "touch" }}>

        {/* HOME */}
        {view === "home" && (
          <div style={{ animation: "fadeUp 0.2s ease" }}>
            {/* Metrics Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 }}>
              {METRICS.map((m, i) => (
                <div key={i} className="card" style={{ padding: 12 }}>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 22, fontWeight: 800, color: m.color }}>{m.value}</div>
                  <div style={{ fontSize: 8, color: "#555", textTransform: "uppercase", letterSpacing: 0.8, marginTop: 2 }}>{m.label}</div>
                  <div style={{ fontSize: 8, color: m.color + "88", marginTop: 4 }}>{m.delta}</div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div style={{ fontSize: 9, fontWeight: 600, color: "#444", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, paddingLeft: 4 }}>Quick Actions</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {ACTIONS.slice(0, 4).map((a, i) => (
                <div key={i} className="card" style={{ textAlign: "center", padding: 14, cursor: "pointer" }}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{a.icon}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: "#e0e0e0" }}>{a.label}</div>
                  <div style={{ fontSize: 8, color: "#555", marginTop: 2 }}>{a.desc}</div>
                </div>
              ))}
            </div>

            {/* Platform Status */}
            <div style={{ fontSize: 9, fontWeight: 600, color: "#444", textTransform: "uppercase", letterSpacing: 1, marginTop: 12, marginBottom: 6, paddingLeft: 4 }}>Platform Status</div>
            {Object.entries({ "authichain.com": P.ac, "qron.space": P.qr, "strainchain.io": P.sc }).map(([domain, color]) => (
              <div key={domain} className="card" style={{ display: "flex", alignItems: "center", gap: 10, padding: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }} />
                <span style={{ fontSize: 11, fontWeight: 500, color: "#ccc", flex: 1 }}>{domain}</span>
                <span className="pill" style={{ background: `${P.ok}15`, color: P.ok, border: `1px solid ${P.ok}20` }}>Live</span>
              </div>
            ))}

            {/* MCP Server Card */}
            <div className="card" style={{ marginTop: 8, borderColor: `${P.ac}15` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>🔌</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: P.ac }}>MCP Server</div>
                  <div style={{ fontSize: 8, color: "#555" }}>8 tools · 7 revenue endpoints</div>
                </div>
                <span className="pill" style={{ background: `${P.warn}15`, color: P.warn, border: `1px solid ${P.warn}20` }}>Ready to Deploy</span>
              </div>
            </div>
          </div>
        )}

        {/* STATUS */}
        {view === "status" && (
          <div style={{ animation: "fadeUp 0.2s ease" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: P.ok, marginBottom: 10 }}>System Health</div>
            {SYSTEMS.map((s, i) => (
              <div key={i} className="card" style={{ display: "flex", alignItems: "center", gap: 10, padding: 12 }}>
                <span style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: s.status === "live" ? P.ok : P.warn,
                  boxShadow: `0 0 8px ${s.status === "live" ? P.ok : P.warn}`,
                  animation: s.status === "live" ? "pulse 3s infinite" : "none",
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#e0e0e0" }}>{s.name}</div>
                  <div style={{ fontSize: 8, color: "#555" }}>Uptime: {s.uptime} · Calls: {s.calls}</div>
                </div>
                <span className="pill" style={{
                  background: s.status === "live" ? `${P.ok}12` : `${P.warn}12`,
                  color: s.status === "live" ? P.ok : P.warn,
                  border: `1px solid ${s.status === "live" ? P.ok : P.warn}20`,
                }}>{s.status}</span>
              </div>
            ))}

            <div className="card" style={{ marginTop: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#888", marginBottom: 8 }}>Infrastructure IDs</div>
              {[
                { l: "Cloudflare", v: "4c1869b...bf420" },
                { l: "Supabase", v: "nhdnkz...ulhs" },
                { l: "Polygon $QRON", v: "0xAebf...E437" },
                { l: "AuthiChain NFT", v: "0x4da4...72BE" },
                { l: "Stripe", v: "acct_1SXI...qV8T" },
              ].map((id, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: 9 }}>
                  <span style={{ color: "#555" }}>{id.l}</span>
                  <span style={{ color: "#888", fontFamily: "'JetBrains Mono'" }}>{id.v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTIONS */}
        {view === "actions" && (
          <div style={{ animation: "fadeUp 0.2s ease" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: P.ac, marginBottom: 10 }}>All Actions</div>
            {ACTIONS.map((a, i) => (
              <div key={i} className="card" style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, cursor: "pointer" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${a.color}10`, border: `1px solid ${a.color}20`, fontSize: 20,
                }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#e0e0e0" }}>{a.label}</div>
                  <div style={{ fontSize: 9, color: "#555", marginTop: 2 }}>{a.desc}</div>
                </div>
                <div style={{ fontSize: 8, color: a.color }}>{a.platform}</div>
              </div>
            ))}
          </div>
        )}

        {/* REVENUE */}
        {view === "revenue" && (
          <div style={{ animation: "fadeUp 0.2s ease" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: P.ok, marginBottom: 10 }}>Revenue Targets</div>
            <div className="card" style={{ textAlign: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 8, color: "#555", textTransform: "uppercase", letterSpacing: 1 }}>Total Monthly Target</div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 32, fontWeight: 900, color: P.ok }}>
                ${REVENUE_TARGETS.reduce((a, r) => a + r.target, 0).toLocaleString()}
              </div>
              <div style={{ fontSize: 9, color: "#555" }}>
                Current: <span style={{ color: P.warn }}>${REVENUE_TARGETS.reduce((a, r) => a + r.current, 0).toLocaleString()}</span>
              </div>
            </div>

            {REVENUE_TARGETS.map((r, i) => {
              const pct = Math.min((r.current / r.target) * 100, 100);
              return (
                <div key={i} className="card" style={{ padding: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: "#ccc" }}>{r.source}</span>
                    <span style={{ fontSize: 10, color: r.current > 0 ? P.ok : "#555" }}>${r.current} / ${r.target.toLocaleString()}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{
                      width: `${pct}%`,
                      background: pct > 50 ? P.ok : pct > 0 ? P.warn : "rgba(255,255,255,0.03)",
                    }} />
                  </div>
                </div>
              );
            })}

            <div className="card" style={{ marginTop: 8, borderColor: `${P.ac}15` }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: P.ac, marginBottom: 6 }}>MCP Revenue Math</div>
              <div style={{ fontSize: 9, color: "#777", lineHeight: 1.8 }}>
                10K MCP calls/mo × $0.05 avg = $500/mo<br/>
                100 DPP checks/mo × $2.00 = $200/mo<br/>
                50 cert mints/mo × $1.00 = $50/mo<br/>
                <strong style={{ color: P.ok }}>= $750/mo from MCP alone</strong>
              </div>
            </div>
          </div>
        )}

        {/* TIMELINE */}
        {view === "timeline" && (
          <div style={{ animation: "fadeUp 0.2s ease" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: P.ac, marginBottom: 10 }}>Activation Roadmap</div>
            {TIMELINE.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 2 }}>
                <div style={{ width: 50, textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: t.color }}>{t.date}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 16, flexShrink: 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.color, boxShadow: `0 0 6px ${t.color}` }} />
                  {i < TIMELINE.length - 1 && <div style={{ width: 1, flex: 1, background: `${t.color}30`, minHeight: 30 }} />}
                </div>
                <div className="card" style={{ flex: 1, padding: 10, marginBottom: 4 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: "#e0e0e0" }}>{t.task}</div>
                  <span className="pill" style={{
                    marginTop: 4,
                    background: t.status === "ready" ? `${P.ok}12` : t.status === "deadline" || t.status === "critical" ? `${P.err}12` : `${P.warn}12`,
                    color: t.status === "ready" ? P.ok : t.status === "deadline" || t.status === "critical" ? P.err : P.warn,
                    border: `1px solid ${t.status === "ready" ? P.ok : t.status === "deadline" || t.status === "critical" ? P.err : P.warn}20`,
                  }}>{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        {views.map(v => (
          <button key={v.id} className={`nav-item ${view === v.id ? "on" : ""}`} onClick={() => setView(v.id)}>
            <span style={{ fontSize: 18 }}>{v.icon}</span>
            <span style={{ fontSize: 8, color: view === v.id ? P.ac : "#444", fontWeight: 600, fontFamily: "inherit" }}>{v.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
