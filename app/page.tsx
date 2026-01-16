'use client';

import { useState } from 'react';
import { ModeSelector } from '@/components/ModeSelector';
import { QRGenerator } from '@/components/QRGenerator';
import { QRDisplay } from '@/components/QRDisplay';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QRONMode, GeneratedQRON } from '@/lib/types';

export default function Home() {
  const [selectedMode, setSelectedMode] = useState<QRONMode>('static');
  const [generatedQRON, setGeneratedQRON] = useState<GeneratedQRON | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-qron-gradient">
            Living QR Codes
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Create AI-generated QR codes that captivate. Art meets utility.
            Scannable portals that evolve.
          </p>
        </section>

        {/* Main App Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Mode Selection & Generator */}
          <div className="space-y-6">
            <ModeSelector 
              selectedMode={selectedMode} 
              onModeChange={setSelectedMode} 
            />
            <QRGenerator
              mode={selectedMode}
              onGenerate={setGeneratedQRON}
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
            />
          </div>

          {/* Right Column: QR Display */}
          <div>
            <QRDisplay 
              qron={generatedQRON} 
              isGenerating={isGenerating}
              mode={selectedMode}
            />
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-16 grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon="🎨"
            title="AI-Powered Art"
            description="Every QR code is a unique piece of generative art, powered by cutting-edge AI models."
          />
          <FeatureCard
            icon="📱"
            title="100% Scannable"
            description="Beauty without compromise. Every QRON is fully functional and scannable by any device."
          />
          <FeatureCard
            icon="🔗"
            title="Own Forever"
            description="Mint your QRON as an NFT. Your portal, your property, forever on-chain."
          />
        </section>
      </div>

      <Footer />
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="qron-card text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}
