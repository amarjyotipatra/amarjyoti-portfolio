import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const seed = searchParams.get('seed');

  if (!seed) {
    return NextResponse.json({ error: 'seed is required' }, { status: 400 });
  }

  const replicateToken = process.env.REPLICATE_API_TOKEN;

  if (!replicateToken) {
    const roboUrl = `https://robohash.org/${encodeURIComponent(seed)}.png?set=set5&bgset=bg2`;
    return NextResponse.json({ imageUrl: roboUrl, seed });
  }

  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${replicateToken}`
      },
      body: JSON.stringify({
        version: '4c2e3479bc778a787cdc6e15c24a18123b7123327762dd44f4bea7f2a7bc01cf',
        input: {
          prompt: `Professional cyberpunk portrait of Amarjyoti Patra, cinematic lighting, ${seed.slice(0, 12)}`,
          negative_prompt: 'blurry, distorted, low quality, deformed',
          num_inference_steps: 30,
          scheduler: 'K_EULER'
        }
      })
    });

    if (!response.ok) {
      console.error('Replicate error', await response.text());
      throw new Error('Replicate request failed');
    }

    const prediction = (await response.json()) as {
      output?: string[];
      status?: string;
    };

    if (prediction.output?.[0]) {
      return NextResponse.json({ imageUrl: prediction.output[0], seed });
    }

    const fallback = `https://robohash.org/${encodeURIComponent(seed)}.png?set=set4&bgset=bg1`;
    return NextResponse.json({ imageUrl: fallback, seed, degraded: true, status: prediction.status });
  } catch (error) {
    console.error('Portrait generation failed', error);
    const fallback = `https://robohash.org/${encodeURIComponent(seed)}.png?set=set4&bgset=bg1`;
    return NextResponse.json({ imageUrl: fallback, seed, degraded: true });
  }
}
