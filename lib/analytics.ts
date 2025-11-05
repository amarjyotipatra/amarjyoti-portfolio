import { promises as fs } from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'analytics.json');

export type VisitLog = {
  fingerprintHash: string;
  timestamp: number;
  duration?: number;
};

export type InteractionEvent = {
  fingerprintHash: string;
  timestamp: number;
  type: string;
  metadata?: Record<string, unknown>;
};

export type AnalyticsSnapshot = {
  visits: VisitLog[];
  resumeDownloads: VisitLog[];
  interactions: InteractionEvent[];
};

async function readStore(): Promise<AnalyticsSnapshot> {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(raw) as AnalyticsSnapshot;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      const empty: AnalyticsSnapshot = { visits: [], resumeDownloads: [], interactions: [] };
      await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
      await fs.writeFile(DATA_PATH, JSON.stringify(empty, null, 2));
      return empty;
    }
    throw error;
  }
}

async function persist(store: AnalyticsSnapshot) {
  await fs.writeFile(DATA_PATH, JSON.stringify(store, null, 2));
}

function uniqueVisits(visits: VisitLog[]): number {
  const unique = new Set(visits.map((visit) => visit.fingerprintHash));
  return unique.size;
}

export async function recordVisit(entry: VisitLog) {
  const store = await readStore();
  store.visits.push(entry);
  await persist(store);
  return {
    totalVisits: store.visits.length,
    uniqueVisitors: uniqueVisits(store.visits)
  };
}

export async function recordResumeDownload(entry: VisitLog) {
  const store = await readStore();
  store.resumeDownloads.push(entry);
  await persist(store);
  return {
    totalDownloads: store.resumeDownloads.length
  };
}

export async function recordInteraction(event: InteractionEvent) {
  const store = await readStore();
  store.interactions.push({
    fingerprintHash: event.fingerprintHash,
    timestamp: event.timestamp,
    type: (event.metadata?.interactionType as string) ?? event.type,
    metadata: event.metadata
  });
  await persist(store);
  return { totalInteractions: store.interactions.length };
}

export async function getAnalyticsSummary() {
  const store = await readStore();
  return {
    totals: {
      visits: store.visits.length,
      uniqueVisitors: uniqueVisits(store.visits),
      resumeDownloads: store.resumeDownloads.length,
      interactions: store.interactions.length
    },
    recentVisits: store.visits.slice(-25).reverse(),
    recentInteractions: store.interactions.slice(-25).reverse()
  };
}
