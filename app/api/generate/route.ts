import { NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function POST(request: Request) {
  try {
    const { url, prompt, mode } = await request.json();

    // Validate inputs
    if (!url || !prompt) {
      return NextResponse.json(
        { success: false, error: 'URL and prompt are required' },
        { status: 400 }
      );
    }

    // Generate base QR code as data URL with HIGH error correction
    const qrDataUrl = await QRCode.toDataURL(url, {
      errorCorrectionLevel: 'H', // Highest error correction
      type: 'image/png',
      width: 1024,
      margin: 2, // Increased margin for better scanning
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    // Enhance prompt based on mode
    const enhancedPrompt = enhancePromptForMode(prompt, mode);

    // Call Fal.ai API with SCANNABLE settings
    const falApiKey = process.env.FAL_KEY;
    
    if (!falApiKey) {
      return NextResponse.json(
        { success: false, error: 'FAL_KEY not configured' },
        { status: 500 }
      );
    }

    const falResponse = await fetch('https://fal.run/fal-ai/illusion-diffusion', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${falApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: enhancedPrompt,
        image_url: qrDataUrl,
        qr_code_content: url,
        guidance_scale: 8.5, // Higher = more structure preservation
        num_inference_steps: 50, // More steps = better quality
        strength: 0.75, // REDUCED from 0.9 - keeps more QR structure
        controlnet_conditioning_scale: 1.5, // Stronger QR code control
      }),
    });

    if (!falResponse.ok) {
      const errorText = await falResponse.text();
      console.error('Fal.ai error:', errorText);
      return NextResponse.json(
        { success: false, error: 'AI generation failed' },
        { status: 500 }
      );
    }

    const falData = await falResponse.json();
    const imageUrl = falData.image?.url || falData.images?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'No image generated' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl,
      mode,
      qrCode: url,
    });

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function enhancePromptForMode(basePrompt: string, mode: string): string {
  // Add "QR code" and "scannable" to all prompts for better results
  const scannablePrefix = "highly detailed QR code art, scannable,";
  
  const enhancements = {
    classic: `${scannablePrefix} ${basePrompt}, clean design, high contrast`,
    stereographic: `${scannablePrefix} ${basePrompt}, 3D depth, clear patterns`,
    kinetic: `${scannablePrefix} ${basePrompt}, motion blur, dynamic, high contrast`,
    holographic: `${scannablePrefix} ${basePrompt}, holographic shimmer, iridescent, clear structure`,
    phantom: `${scannablePrefix} ${basePrompt}, ghost effect, transparent, visible patterns`,
    cascade: `${scannablePrefix} ${basePrompt}, waterfall, flowing, distinct shapes`,
    prism: `${scannablePrefix} ${basePrompt}, prismatic, refracted light, clear edges`,
    nebula: `${scannablePrefix} ${basePrompt}, cosmic nebula, space clouds, bright spots`,
    video: `${scannablePrefix} ${basePrompt}, animated style, clear frames, high contrast`,
  };

  return enhancements[mode as keyof typeof enhancements] || `${scannablePrefix} ${basePrompt}`;
}

