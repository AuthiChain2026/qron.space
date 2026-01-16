import { NextRequest, NextResponse } from 'next/server';

// Runway ML video generation for Kinetic QRONs
// Note: Requires Runway API key and credits

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, duration = 4 } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Image URL required' },
        { status: 400 }
      );
    }

    const runwayKey = process.env.RUNWAY_API_KEY;
    if (!runwayKey) {
      return NextResponse.json(
        { success: false, error: 'Runway API not configured' },
        { status: 500 }
      );
    }

    // Runway Gen-3 Alpha API call
    const response = await fetch('https://api.runwayml.com/v1/image_to_video', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${runwayKey}`,
        'Content-Type': 'application/json',
        'X-Runway-Version': '2024-09-13',
      },
      body: JSON.stringify({
        promptImage: imageUrl,
        promptText: 'subtle motion, gentle animation, seamless loop, qr code maintaining readability',
        duration,
        ratio: '1:1',
        watermark: false,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Runway API error');
    }

    const data = await response.json();

    // Poll for completion (Runway is async)
    // In production, use webhooks instead
    let videoUrl = null;
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes max

    while (!videoUrl && attempts < maxAttempts) {
      await new Promise(r => setTimeout(r, 5000)); // Wait 5 seconds
      
      const statusResponse = await fetch(`https://api.runwayml.com/v1/tasks/${data.id}`, {
        headers: { 'Authorization': `Bearer ${runwayKey}` },
      });
      
      const status = await statusResponse.json();
      
      if (status.status === 'SUCCEEDED') {
        videoUrl = status.output?.[0];
        break;
      } else if (status.status === 'FAILED') {
        throw new Error('Video generation failed');
      }
      
      attempts++;
    }

    if (!videoUrl) {
      throw new Error('Video generation timed out');
    }

    return NextResponse.json({ success: true, videoUrl });
  } catch (error) {
    console.error('Video generation error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Video generation failed' },
      { status: 500 }
    );
  }
}
