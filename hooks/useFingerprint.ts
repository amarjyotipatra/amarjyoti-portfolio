import { useEffect, useState } from 'react';

async function hashFingerprint(raw: string) {
  if (typeof window === 'undefined' || !window.crypto?.subtle) return raw;

  const encoder = new TextEncoder();
  const data = encoder.encode(raw);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(digest));
  return hashArray.map((value) => value.toString(16).padStart(2, '0')).join('');
}

type FingerprintGenerator = (options?: Record<string, unknown>) => string;

export function useFingerprint() {
  const [fingerprint, setFingerprint] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let cancelled = false;

    const generate = async () => {
      try {
        const module = await import('browser-fingerprint');
        const generator: FingerprintGenerator = (module.default ?? module) as FingerprintGenerator;
        const fp = generator({ cookies: true, order: ['canvas', 'audio', 'webgl', 'userAgent'] });
        const hashed = await hashFingerprint(fp);
        if (!cancelled) {
          setFingerprint(hashed);
        }
      } catch (error) {
        console.error('Unable to generate fingerprint', error);
      }
    };

    generate();

    return () => {
      cancelled = true;
    };
  }, []);

  return fingerprint;
}
