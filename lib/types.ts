// QRON Mode Types
export type QRONMode =
  | 'static'        // Basic AI-styled QR
  | 'stereographic' // 3D depth effect
  | 'kinetic'       // Animated/motion QR
  | 'holographic'   // Holographic shimmer effect
  | 'memory'        // NFT-mintable QR
  | 'echo'          // Ultrasonic-enabled QR
  | 'temporal'      // Time-based evolving QR
  | 'reactive'      // Environment-reactive QR
  | 'layered'       // Multi-layer composition
  | 'dimensional'   // AR-ready spatial QR
  | 'living';       // Self-evolving AI QR

export interface QRONModeConfig {
  id: QRONMode;
  name: string;
  description: string;
  icon: string;
  tier: 'free' | 'pro' | 'enterprise';
  aiModel?: string;
  features: string[];
}

// Generated QRON Data
export interface GeneratedQRON {
  id: string;
  mode: QRONMode;
  targetUrl: string;
  imageUrl: string;
  videoUrl?: string;
  audioUrl?: string;
  metadata: QRONMetadata;
  createdAt: Date;
  nftTokenId?: string;
}

export interface QRONMetadata {
  prompt: string;
  style: string;
  seed?: number;
  dimensions: {
    width: number;
    height: number;
  };
  aiModel: string;
  generationTime: number;
}

// Generation Request
export interface GenerateRequest {
  targetUrl: string;
  mode: QRONMode;
  prompt?: string;
  style?: string;
  options?: GenerationOptions;
}

export interface GenerationOptions {
  width?: number;
  height?: number;
  seed?: number;
  enhancePrompt?: boolean;
  highQuality?: boolean;
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// User & Auth Types
export interface User {
  id: string;
  email: string;
  tier: 'free' | 'pro' | 'enterprise';
  generationsRemaining: number;
  createdAt: Date;
}

// NFT Types
export interface MintRequest {
  qronId: string;
  walletAddress: string;
}

export interface MintedNFT {
  tokenId: string;
  contractAddress: string;
  transactionHash: string;
  openSeaUrl: string;
}

// Analytics Event Types
export interface AnalyticsEvent {
  event: 'qr_generated' | 'qr_scanned' | 'nft_minted' | 'mode_selected';
  properties?: Record<string, unknown>;
}

// Style Presets
export const STYLE_PRESETS = [
  { id: 'cyberpunk', name: 'Cyberpunk', prompt: 'neon lights, futuristic, digital rain' },
  { id: 'nature', name: 'Nature', prompt: 'organic, flowing, botanical elements' },
  { id: 'minimal', name: 'Minimal', prompt: 'clean, geometric, modern design' },
  { id: 'cosmic', name: 'Cosmic', prompt: 'space, galaxies, nebula, stars' },
  { id: 'abstract', name: 'Abstract', prompt: 'artistic, fluid, vibrant colors' },
  { id: 'retro', name: 'Retro', prompt: '80s aesthetic, synthwave, vintage' },
] as const;

export type StylePreset = typeof STYLE_PRESETS[number]['id'];
