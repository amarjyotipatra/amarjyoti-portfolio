import { NextResponse } from 'next/server';
import { getAnalyticsSummary } from '@/lib/analytics';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const analytics = await getAnalyticsSummary();
    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Analytics fetch error:', error);
    
    // Return fallback data if file read fails
    return NextResponse.json({
      totals: {
        visits: 0,
        uniqueVisitors: 0,
        resumeDownloads: 0
      },
      recentVisits: [],
      recentInteractions: []
    });
  }
}
