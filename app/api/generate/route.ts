import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { GeneratedQRON, GenerateRequest, QRONMode, STYLE_PRESETS } from '@/lib/types';
import { generateId } from '@/lib/utils';

const MODE_PROMPTS: Record<QRONMode, string> = {
  static: 'high quality, detailed, artistic QR code design',
  stereographic: '3D depth effect, stereoscopic, parallax layers',
  kinetic: 'motion blur, dynamic energy, flowing elements',
  holographic: 'holographic foil, iridescent, rainbow shift, prismatic',
  memory: 'ethereal, blockchain aesthetic, digital artifact, crystalline',
  echo: 'sound waves, audio visualization, sonic ripples',
  temporal: 'time-lapse, clock elements, flowing sand, temporal shift',
  reactive: 'responsive, adaptive, environment-aware, dynamic',
  layered: 'multi-layer, composite, depth, overlapping elements',
  dimensional: 'AR markers, spatial, 3D space, dimensional portal',
  living: 'organic, evolving, alive, breathing, cellular',
};

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body: GenerateRequest = await request.json();
    const { targetUrl, mode, style, prompt } = body;

    if (!targetUrl) {
      return NextResponse.json(
        { success: false, error: 'Target URL is required' },
        { status: 400 }
      );
    }

    const replicateKey = process.env.REPLICATE_API_TOKEN;
    if (!replicateKey) {
      return NextResponse.json(
        { success: false, error: 'Replicate API key not configured' },
        { status: 500 }
      );
    }

    const qrDataUrl = await QRCode.toDataURL(targetUrl, {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 512,
      color: { dark: '#000000', light: '#ffffff' },
    });

    const stylePreset = STYLE_PRESETS.find(p => p.id === style);
    const stylePrompt = stylePreset?.prompt || 'modern, sleek design';
    const modePrompt = MODE_PROMPTS[mode] || MODE_PROMPTS.static;
    
    const fullPrompt = prompt 
      ? `${prompt}, ${modePrompt}, ${stylePrompt}, QR code art, scannable`
      : `${modePrompt}, ${stylePrompt}, QR code art, beautiful, scannable, high contrast`;

    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${replicateKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        input: {
          prompt: fullPrompt,
          negative_prompt: "blurry, low quality, distorted, unreadable, text, watermark, ugly",
          width: 768,
          height: 768,
          num_outputs: 1,
          num_inference_steps: 30,
          guidance_scale: 7.5,
          scheduler: "K_EULER",
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Replicate API error:', errorData);
      throw new Error(errorData.detail || 'Replicate API error');
    }

    const prediction = await response.json();
    let result = prediction;
    let attempts = 0;

    while (result.status !== 'succeeded' && result.status !== 'failed' && attempts < 60) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
        headers: { 'Authorization': `Token ${replicateKey}` },
      });
      result = await pollResponse.json();
      attempts++;
    }

    if (result.status === 'failed') throw new Error(result.error || 'Generation failed');
    if (result.status !== 'succeeded') throw new Error('Generation timed out');

    const generationTime = (Date.now() - startTime) / 1000;
    const imageUrl = Array.isArray(result.output) ? result.output[0] : result.output;

    const qron: GeneratedQRON = {
      id: generateId(),
      mode,
      targetUrl,
      imageUrl: imageUrl || qrDataUrl,
      metadata: {
        prompt: fullPrompt,
        style: stylePreset?.name || 'Custom',
        seed: result.metrics?.predict_time,
        dimensions: { width: 768, height: 768 },
        aiModel: 'replicate/stable-diffusion',
        generationTime,
      },
      createdAt: new Date(),
    };

    return NextResponse.json({ success: true, qron });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'QRON Generation API',
    version: '2.0.0',
    provider: 'Replicate',
    modes: Object.keys(MODE_PROMPTS),
  });
}