/**
 * AuthiChain Storymode API
 * 
 * Route: /api/storymode/[vertical]
 * 
 * Generates cinematic industry narration using Claude API:
 * - Origin story (ancient/historical roots)
 * - Evolution through industrial eras
 * - Modern transformation
 * - Current news & developments (via web search)
 * - AuthiChain's role in the industry's future
 * 
 * Each vertical gets a unique narrative voice and color palette.
 */

import { NextRequest, NextResponse } from "next/server";

const VERTICALS: Record<string, {
  name: string;
  industry: string;
  color: string;
  accent: string;
  era_prompts: string;
  authichain_angle: string;
  news_query: string;
}> = {
  "qron-space": {
    name: "QRON Space",
    industry: "QR Code Technology & Digital Identity",
    color: "#00CCFF",
    accent: "#00FFE5",
    era_prompts: "from the invention of barcodes in 1948, through the creation of QR codes by Denso Wave in 1994 Japan, to the mobile scanning revolution, COVID-era QR adoption explosion, and today's AI-generated artistic QR codes",
    authichain_angle: "QRON transforms QR from static data carriers into living authentication portals — AI-generated art that scans, verifies, and rewards with $QRON tokens",
    news_query: "QR code technology AI 2026 innovation",
  },
  "strainchain": {
    name: "StrainChain",
    industry: "Cannabis Industry & Supply Chain",
    color: "#00C853",
    accent: "#69F0AE",
    era_prompts: "from ancient cannabis cultivation 5000 years ago in Central Asia, through prohibition era, the counterculture movement, medical legalization wave, recreational legalization, and today's multi-billion dollar regulated industry with persistent counterfeiting problems",
    authichain_angle: "StrainChain brings blockchain authentication to cannabis — seed-to-sale verification, lab result integrity, and consumer trust in a market plagued by counterfeits and compliance complexity",
    news_query: "cannabis industry regulation blockchain authentication 2026",
  },
  "authichain": {
    name: "AuthiChain",
    industry: "Product Authentication & Anti-Counterfeiting",
    color: "#D4A017",
    accent: "#FFD700",
    era_prompts: "from ancient Roman hallmarks and medieval guild stamps, through industrial-era trademarks, hologram security features, RFID tracking, and today's blockchain-powered authentication revolution coinciding with the EU Digital Product Passport mandate",
    authichain_angle: "AuthiChain is the trust protocol for global commerce — 5-agent AI consensus, Polygon blockchain certificates, and the world's most affordable EU DPP compliance engine",
    news_query: "product authentication blockchain EU Digital Product Passport 2026",
  },
  "ev-industry": {
    name: "EV Authentication",
    industry: "Electric Vehicle & Battery Technology",
    color: "#6366F1",
    accent: "#818CF8",
    era_prompts: "from the first electric carriages in the 1830s, through the gasoline era dominance, Tesla's 2008 Roadster revolution, the global EV adoption wave, battery supply chain wars, and the EU Battery Passport mandate requiring digital authentication by February 2027",
    authichain_angle: "AuthiChain authenticates EV batteries and components — critical as counterfeit parts flood the market and the EU mandates Digital Product Passports for every battery sold in Europe",
    news_query: "electric vehicle battery authentication EU battery passport 2026 2027",
  },
  "medchain": {
    name: "MedChain",
    industry: "Pharmaceutical Authentication",
    color: "#06B6D4",
    accent: "#22D3EE",
    era_prompts: "from ancient herbal medicine and apothecaries, through the pharmaceutical revolution, the thalidomide disaster that created drug regulation, the rise of counterfeit drugs killing over a million people annually, FDA serialization mandates (DSCSA), and today's AI-powered drug verification",
    authichain_angle: "MedChain verifies pharmaceuticals from manufacturer to patient — because counterfeit drugs don't just steal money, they steal lives. Blockchain-backed COAs, batch verification, and DSCSA compliance",
    news_query: "pharmaceutical counterfeiting drug authentication DSCSA 2026",
  },
  "haute-couture": {
    name: "Haute Couture",
    industry: "Luxury Fashion & Textiles",
    color: "#D4A017",
    accent: "#F59E0B",
    era_prompts: "from the silk roads and royal textile guilds, through the birth of haute couture in 1850s Paris, the democratization of fashion, the explosion of fast fashion counterfeits ($50B+ annual losses), and the EU's 2027 mandate requiring Digital Product Passports for all textiles sold in Europe",
    authichain_angle: "Every garment deserves an unforgeable identity. AuthiChain gives fashion brands blockchain certificates that prove authenticity — from thread to runway to consumer closet",
    news_query: "fashion counterfeiting luxury authentication EU textile DPP 2026 2027",
  },
  "artisan-roasters": {
    name: "Artisan Roasters",
    industry: "Food & Beverage Provenance",
    color: "#78350F",
    accent: "#A16207",
    era_prompts: "from the discovery of coffee in 9th-century Ethiopia, through the spice trade routes, the industrial food revolution, food fraud scandals (horsemeat, olive oil, honey), the farm-to-table movement, and today's demand for verified provenance and supply chain transparency",
    authichain_angle: "From bean to cup, verified on chain. AuthiChain authenticates origin, process, and quality for specialty food and beverage — because trust should be as rich as the flavor",
    news_query: "food fraud supply chain transparency blockchain provenance 2026",
  },
  "propchain": {
    name: "PropChain",
    industry: "Real Estate & Property Authentication",
    color: "#0EA5E9",
    accent: "#38BDF8",
    era_prompts: "from ancient land deeds carved in stone, through feudal property rights, the creation of title insurance, the 2008 housing crisis caused partly by document fraud, and today's push for blockchain-based property records and smart contracts in real estate",
    authichain_angle: "PropChain authenticates property titles, inspection reports, and building material certificates on-chain — transparent real estate from foundation to rooftop",
    news_query: "real estate blockchain property authentication tokenization 2026",
  },
  "streamvault": {
    name: "StreamVault",
    industry: "Entertainment & Digital Media",
    color: "#EC4899",
    accent: "#F472B6",
    era_prompts: "from the invention of recorded sound and cinema, through the piracy wars of Napster and BitTorrent, the streaming revolution, the AI-generated content explosion, and today's crisis of digital content provenance — who made it, who owns it, is it even real?",
    authichain_angle: "StreamVault authenticates digital content provenance — proving ownership, creation date, and originality in an era where AI can generate anything and deepfakes threaten trust",
    news_query: "digital content authentication AI deepfake provenance media 2026",
  },
  "athletedao": {
    name: "AthleteDAO",
    industry: "Sports Memorabilia & Collectibles",
    color: "#7C3AED",
    accent: "#A78BFA",
    era_prompts: "from ancient Olympic laurel wreaths, through the birth of baseball card collecting, the sports memorabilia boom, massive forgery scandals (FBI Operation Bullpen), the rise of grading companies (PSA, BGS), and today's convergence of physical collectibles with NFTs and blockchain verification",
    authichain_angle: "AthleteDAO proves it's real — from the field to your shelf. Blockchain-authenticated jerseys, signed equipment, and sports collectibles with immutable provenance",
    news_query: "sports memorabilia authentication blockchain collectibles NFT 2026",
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { vertical: string } }
) {
  const vertical = params.vertical;
  const config = VERTICALS[vertical];

  if (!config) {
    return NextResponse.json(
      { error: "Unknown vertical", available: Object.keys(VERTICALS) },
      { status: 404 }
    );
  }

  try {
    // Call Claude API for cinematic narration + web search for current news
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        tools: [{ type: "web_search_20250305", name: "web_search" }],
        messages: [
          {
            role: "user",
            content: `You are a cinematic narrator for AuthiChain's Storymode — an immersive industry history experience.

Generate a JSON response (no markdown, no backticks, pure JSON only) with this exact structure:

{
  "vertical": "${vertical}",
  "industry": "${config.industry}",
  "title": "A dramatic cinematic title for this industry's story",
  "chapters": [
    {
      "era": "ORIGINS",
      "period": "time period string",
      "title": "chapter title",
      "narration": "2-3 sentences of vivid, cinematic narration — like a documentary voiceover. Rich imagery, dramatic language.",
      "key_moment": "The single most pivotal moment in this era"
    },
    {
      "era": "EVOLUTION", 
      "period": "...",
      "title": "...",
      "narration": "...",
      "key_moment": "..."
    },
    {
      "era": "REVOLUTION",
      "period": "...",
      "title": "...",
      "narration": "...",
      "key_moment": "..."
    },
    {
      "era": "CRISIS",
      "period": "...",
      "title": "...",
      "narration": "...",
      "key_moment": "..."
    },
    {
      "era": "NOW",
      "period": "2024-2026",
      "title": "...",
      "narration": "...",
      "key_moment": "..."
    }
  ],
  "current_news": [
    {
      "headline": "actual recent headline from search",
      "summary": "1-2 sentence summary in your own words",
      "relevance": "Why this matters for authentication"
    }
  ],
  "authichain_future": "2-3 sentences on how AuthiChain transforms this industry's future. ${config.authichain_angle}",
  "closing_line": "A single powerful closing line — the kind that ends a documentary and gives you chills"
}

The industry arc: ${config.era_prompts}

Search for current news about: ${config.news_query}

Make it CINEMATIC. This is a Netflix documentary, not a Wikipedia article. Use vivid sensory language, dramatic tension, and emotional resonance. The viewer should feel the weight of history and the urgency of the present.`
          },
        ],
      }),
    });

    const data = await response.json();

    // Extract text content from Claude's response
    const textBlocks = data.content?.filter((b: any) => b.type === "text") || [];
    const rawText = textBlocks.map((b: any) => b.text).join("");

    // Parse JSON from response
    let storyData;
    try {
      const cleaned = rawText.replace(/```json|```/g, "").trim();
      storyData = JSON.parse(cleaned);
    } catch {
      // If parsing fails, return raw text in a structured wrapper
      storyData = {
        vertical,
        industry: config.industry,
        title: `The ${config.name} Story`,
        raw_narration: rawText,
        parse_error: true,
      };
    }

    // Enrich with metadata
    const enriched = {
      ...storyData,
      meta: {
        vertical,
        platform: config.name,
        color: config.color,
        accent: config.accent,
        generated_at: new Date().toISOString(),
        powered_by: "AuthiChain Truth Network × Claude",
      },
    };

    return NextResponse.json(enriched, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        "X-AuthiChain-Vertical": vertical,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Storymode generation failed", detail: String(error) },
      { status: 500 }
    );
  }
}
