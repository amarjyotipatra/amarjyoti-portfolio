import { useEffect } from 'react';
import { useFingerprint } from './useFingerprint';

export function useTelemetry() {
  const fingerprint = useFingerprint();

  useEffect(() => {
    if (!fingerprint) return;

    fetch('/api/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'visit', fingerprintHash: fingerprint })
    }).catch((error) => console.error('Telemetry visit failed', error));
  }, [fingerprint]);

  const track = (type: 'interaction' | 'resume', metadata?: Record<string, unknown>) => {
    if (!fingerprint) return;

    fetch('/api/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, fingerprintHash: fingerprint, metadata })
    }).catch((error) => console.error('Telemetry emit failed', error));
  };

  return { fingerprint, track };
}
