import { NextResponse } from 'next/server';
import { fetchPinnedRepos } from '@/lib/github';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'username is required' }, { status: 400 });
  }

  const token = process.env.GITHUB_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'GitHub token not configured' }, { status: 500 });
  }

  try {
    const repos = await fetchPinnedRepos(username, token);
    return NextResponse.json({ repos });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
