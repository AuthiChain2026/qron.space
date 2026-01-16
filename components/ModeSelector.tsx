'use client';

import { QRONMode, QRONModeConfig } from '@/lib/types';
import { cn } from '@/lib/utils';
import { 
  Sparkles, 
  Layers3, 
  Play, 
  Star, 
  Wallet, 
  Radio,
  Clock,
  Zap,
  Layers,
  Box,
  Heart
} from 'lucide-react';

const MODES: QRONModeConfig[] = [
  {
    id: 'static',
    name: 'Static',
    description: 'AI-styled QR code',
    icon: 'sparkles',
    tier: 'free',
    features: ['AI styling', 'High resolution', 'Instant generation'],
  },
  {
    id: 'stereographic',
    name: 'Stereographic',
    description: '3D depth effect',
    icon: 'layers3',
    tier: 'free',
    features: ['3D depth', 'Parallax effect', 'Cross-eye viewable'],
  },
  {
    id: 'kinetic',
    name: 'Kinetic',
    description: 'Animated motion QR',
    icon: 'play',
    tier: 'pro',
    features: ['Video output', 'Smooth animation', 'Loop-ready'],
  },
  {
    id: 'holographic',
    name: 'Holographic',
    description: 'Shimmer & shift',
    icon: 'star',
    tier: 'pro',
    features: ['Color shift', 'Holographic foil', 'Premium look'],
  },
  {
    id: 'memory',
    name: 'Memory',
    description: 'Mint as NFT',
    icon: 'wallet',
    tier: 'pro',
    features: ['On-chain', 'Own forever', 'Tradeable'],
  },
  {
    id: 'echo',
    name: 'Echo',
    description: 'Ultrasonic enabled',
    icon: 'radio',
    tier: 'pro',
    features: ['Sound trigger', 'Proximity detect', 'Chirp.io'],
  },
  {
    id: 'temporal',
    name: 'Temporal',
    description: 'Time-based evolution',
    icon: 'clock',
    tier: 'enterprise',
    features: ['Scheduled changes', 'Day/night modes', 'Event triggers'],
  },
  {
    id: 'reactive',
    name: 'Reactive',
    description: 'Environment-aware',
    icon: 'zap',
    tier: 'enterprise',
    features: ['Weather sync', 'Location aware', 'Context adaptive'],
  },
  {
    id: 'layered',
    name: 'Layered',
    description: 'Multi-composition',
    icon: 'layers',
    tier: 'enterprise',
    features: ['Multiple layers', 'Blend modes', 'Complex designs'],
  },
  {
    id: 'dimensional',
    name: 'Dimensional',
    description: 'AR-ready spatial',
    icon: 'box',
    tier: 'enterprise',
    features: ['AR compatible', 'Spatial anchor', '3D placement'],
  },
  {
    id: 'living',
    name: 'Living',
    description: 'Self-evolving AI',
    icon: 'heart',
    tier: 'enterprise',
    features: ['AI evolution', 'Learns & adapts', 'Truly alive'],
  },
];

const IconMap = {
  sparkles: Sparkles,
  layers3: Layers3,
  play: Play,
  star: Star,
  wallet: Wallet,
  radio: Radio,
  clock: Clock,
  zap: Zap,
  layers: Layers,
  box: Box,
  heart: Heart,
};

interface ModeSelectorProps {
  selectedMode: QRONMode;
  onModeChange: (mode: QRONMode) => void;
}

export function ModeSelector({ selectedMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="qron-card">
      <h2 className="text-lg font-semibold mb-4">Select QRON Mode</h2>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {MODES.map((mode) => {
          const Icon = IconMap[mode.icon as keyof typeof IconMap];
          const isSelected = selectedMode === mode.id;
          const isLocked = mode.tier !== 'free'; // Unlock in production
          
          return (
            <button
              key={mode.id}
              onClick={() => !isLocked && onModeChange(mode.id)}
              disabled={isLocked}
              className={cn(
                'relative flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200',
                'border hover:border-qron-primary/50',
                isSelected
                  ? 'bg-qron-gradient border-transparent text-white shadow-lg shadow-qron-primary/25'
                  : 'bg-slate-800/50 border-slate-700 text-slate-300',
                isLocked && 'opacity-50 cursor-not-allowed'
              )}
            >
              {/* Tier Badge */}
              {mode.tier !== 'free' && (
                <span className={cn(
                  'absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-full font-medium',
                  mode.tier === 'pro' ? 'bg-amber-500 text-black' : 'bg-purple-500 text-white'
                )}>
                  {mode.tier === 'pro' ? 'PRO' : 'ENT'}
                </span>
              )}
              
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{mode.name}</span>
            </button>
          );
        })}
      </div>
      
      {/* Selected Mode Description */}
      <div className="mt-4 p-3 bg-slate-900/50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          {(() => {
            const mode = MODES.find(m => m.id === selectedMode);
            const Icon = mode ? IconMap[mode.icon as keyof typeof IconMap] : Sparkles;
            return <Icon className="w-4 h-4 text-qron-primary" />;
          })()}
          <span className="font-medium">
            {MODES.find(m => m.id === selectedMode)?.name}
          </span>
        </div>
        <p className="text-sm text-slate-400">
          {MODES.find(m => m.id === selectedMode)?.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          {MODES.find(m => m.id === selectedMode)?.features.map((feature) => (
            <span key={feature} className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
