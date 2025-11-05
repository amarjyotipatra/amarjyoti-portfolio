import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useFingerprint } from './useFingerprint';
import type { PortraitResponse } from '@/types/portrait';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch personalized portrait');
  }
  return (await res.json()) as PortraitResponse;
};

export function usePersonalizedPortrait() {
  const fingerprint = useFingerprint();
  const [seed, setSeed] = useState<string | undefined>();

  useEffect(() => {
    if (fingerprint) {
      setSeed(fingerprint);
    }
  }, [fingerprint]);

  const { data, error, isLoading, mutate } = useSWR(seed ? `/api/ai-portrait?seed=${encodeURIComponent(seed)}` : null, fetcher);

  return {
    portraitUrl: data?.imageUrl,
    seed: data?.seed,
    isLoading,
    isError: Boolean(error),
    regenerate: async () => {
      if (!seed) return;
      await mutate();
    }
  };
}
