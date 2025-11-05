import { NextResponse } from 'next/server';
import { recordInteraction, recordResumeDownload, recordVisit } from '@/lib/analytics';

type TelemetryPayload = {
  type: 'visit' | 'resume' | 'interaction';
  fingerprintHash: string;
  metadata?: Record<string, unknown>;
};

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const payload = (await request.json()) as TelemetryPayload;

  if (!payload?.fingerprintHash || !payload.type) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  switch (payload.type) {
    case 'visit': {
      const data = await recordVisit({ fingerprintHash: payload.fingerprintHash, timestamp: Date.now() });
      return NextResponse.json(data);
    }
    case 'resume': {
      const data = await recordResumeDownload({ fingerprintHash: payload.fingerprintHash, timestamp: Date.now() });
      return NextResponse.json(data);
    }
    case 'interaction': {
      const data = await recordInteraction({
        fingerprintHash: payload.fingerprintHash,
        timestamp: Date.now(),
        type: payload.metadata?.interactionType as string,
        metadata: payload.metadata
      });
      return NextResponse.json(data);
    }
    default:
      return NextResponse.json({ error: 'Unknown telemetry type' }, { status: 400 });
  }
}
