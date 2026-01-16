'use client';

import { GeneratedQRON, QRONMode } from '@/lib/types';
import { Download, Share2, Wallet, ExternalLink, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

interface QRDisplayProps {
  qron: GeneratedQRON | null;
  isGenerating: boolean;
  mode: QRONMode;
}

export function QRDisplay({ qron, isGenerating, mode }: QRDisplayProps) {
  const handleDownload = async () => {
    if (!qron?.imageUrl) return;
    
    try {
      const response = await fetch(qron.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qron-${qron.id}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('Downloaded!');
    } catch (error) {
      toast.error('Download failed');
    }
  };

  const handleShare = async () => {
    if (!qron?.imageUrl) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My QRON',
          text: 'Check out this AI-generated QR code!',
          url: qron.imageUrl,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(qron.imageUrl);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleMint = async () => {
    if (!qron) return;
    toast.info('NFT minting coming soon!');
    // TODO: Implement thirdweb minting flow
  };

  // Loading State
  if (isGenerating) {
    return (
      <div className="qron-card h-full min-h-[400px] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-48 h-48 border-4 border-slate-700 rounded-2xl flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-qron-primary animate-spin" />
          </div>
          <div className="absolute inset-0 bg-qron-gradient opacity-20 rounded-2xl animate-pulse" />
        </div>
        <p className="mt-4 text-slate-400">Generating your QRON...</p>
        <p className="text-sm text-slate-500 mt-1">This may take 10-30 seconds</p>
      </div>
    );
  }

  // Empty State
  if (!qron) {
    return (
      <div className="qron-card h-full min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="w-48 h-48 border-2 border-dashed border-slate-600 rounded-2xl flex items-center justify-center mb-4">
          <div className="text-slate-500">
            <svg className="w-16 h-16 mx-auto mb-2 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <path d="M14 14h3v3h-3z" />
              <path d="M18 18h3v3h-3z" />
              <path d="M14 18h3v3h-3z" />
              <path d="M18 14h3v3h-3z" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-medium text-slate-300">Your QRON Preview</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-xs">
          Enter a URL and click Generate to create your AI-powered QR code
        </p>
      </div>
    );
  }

  // Display Generated QRON
  return (
    <div className="qron-card">
      {/* QR Code Display */}
      <div className="relative aspect-square max-w-sm mx-auto mb-6 rounded-xl overflow-hidden qr-container">
        <Image
          src={qron.imageUrl}
          alt="Generated QRON"
          fill
          className="object-cover"
          priority
        />
        
        {/* Holographic Overlay for holographic mode */}
        {mode === 'holographic' && (
          <div className="absolute inset-0 holographic opacity-30 pointer-events-none" />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-4">
        <button onClick={handleDownload} className="qron-button-secondary flex-1 flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Download
        </button>
        <button onClick={handleShare} className="qron-button-secondary flex-1 flex items-center justify-center gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </button>
        {mode === 'memory' && (
          <button onClick={handleMint} className="qron-button flex-1 flex items-center justify-center gap-2">
            <Wallet className="w-4 h-4" />
            Mint NFT
          </button>
        )}
      </div>

      {/* Metadata */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-400">
          <span>Target URL</span>
          <a 
            href={qron.targetUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-qron-primary hover:underline flex items-center gap-1"
          >
            {new URL(qron.targetUrl).hostname}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Mode</span>
          <span className="text-slate-300 capitalize">{mode}</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Style</span>
          <span className="text-slate-300">{qron.metadata.style}</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Generated</span>
          <span className="text-slate-300">
            {qron.metadata.generationTime.toFixed(1)}s
          </span>
        </div>
      </div>
    </div>
  );
}
