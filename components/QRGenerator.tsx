'use client';

import { useState } from 'react';
import { QRONMode, GeneratedQRON, STYLE_PRESETS, StylePreset } from '@/lib/types';
import { toast } from 'sonner';
import { Loader2, Wand2 } from 'lucide-react';

interface QRGeneratorProps {
  mode: QRONMode;
  onGenerate: (qron: GeneratedQRON) => void;
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
}

export function QRGenerator({ mode, onGenerate, isGenerating, setIsGenerating }: QRGeneratorProps) {
  const [targetUrl, setTargetUrl] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<StylePreset>('cyberpunk');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleGenerate = async () => {
    if (!targetUrl) {
      toast.error('Please enter a URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`);
    } catch {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUrl: targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`,
          mode,
          style: selectedStyle,
          prompt: customPrompt || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Generation failed');
      }

      const data = await response.json();
      onGenerate(data.qron);
      toast.success('QRON generated successfully!');
      
      // Track analytics event
      if (typeof window !== 'undefined' && (window as any).plausible) {
        (window as any).plausible('qr_generated', { props: { mode } });
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate QRON');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="qron-card space-y-4">
      <h2 className="text-lg font-semibold">Create Your QRON</h2>

      {/* URL Input */}
      <div>
        <label className="block text-sm text-slate-400 mb-1.5">
          Destination URL
        </label>
        <input
          type="text"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          placeholder="https://your-website.com"
          className="qron-input w-full"
          disabled={isGenerating}
        />
      </div>

      {/* Style Presets */}
      <div>
        <label className="block text-sm text-slate-400 mb-1.5">
          Style Preset
        </label>
        <div className="flex flex-wrap gap-2">
          {STYLE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setSelectedStyle(preset.id)}
              disabled={isGenerating}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                selectedStyle === preset.id
                  ? 'bg-qron-primary text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Options Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-sm text-qron-primary hover:text-qron-secondary transition-colors"
      >
        {showAdvanced ? '− Hide' : '+ Show'} Advanced Options
      </button>

      {/* Advanced Options */}
      {showAdvanced && (
        <div className="space-y-3 pt-2 border-t border-slate-700">
          <div>
            <label className="block text-sm text-slate-400 mb-1.5">
              Custom Prompt (optional)
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Describe the style you want... e.g., 'underwater coral reef with bioluminescent elements'"
              className="qron-input w-full h-20 resize-none"
              disabled={isGenerating}
            />
          </div>
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating || !targetUrl}
        className="qron-button w-full flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Wand2 className="w-5 h-5" />
            Generate QRON
          </>
        )}
      </button>

      {/* Generation Info */}
      <p className="text-xs text-slate-500 text-center">
        Generation typically takes 10-30 seconds depending on mode
      </p>
    </div>
  );
}
