"use client";

import { getProviders, signIn, type ClientSafeProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';

type ProviderMap = Record<string, ClientSafeProvider> | null;

export default function LoginPage() {
  const [providers, setProviders] = useState<ProviderMap>(null);

  useEffect(() => {
    const load = async () => {
      const list = await getProviders();
      setProviders(list);
    };
    load();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-100">
  <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/70 p-10 shadow-xl">
        <h1 className="text-2xl font-semibold">Mission Control Access</h1>
        <p className="mt-3 text-sm text-slate-400">Sign in to view engagement intelligence.</p>
        <div className="mt-8 space-y-4">
          {providers
            ? Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className="w-full rounded-full border border-slate-700/70 bg-slate-800/60 px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-slate-200 transition hover:border-emerald-500/60 hover:text-emerald-200"
                >
                  Access via {provider.name}
                </button>
              ))
            : (
                <div className="text-sm text-slate-400">Loading providers…</div>
              )}
        </div>
      </div>
    </div>
  );
}
