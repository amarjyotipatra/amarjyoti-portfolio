export type PinnedRepository = {
  id: string;
  name: string;
  description: string | null;
  url: string;
  primaryLanguage?: {
    name: string;
    color: string;
  } | null;
  stargazerCount: number;
  forkCount: number;
  openGraphImageUrl: string;
  updatedAt: string;
};

const PINNED_QUERY = `
  query PinnedRepos($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            primaryLanguage { name color }
            stargazerCount
            forkCount
            openGraphImageUrl
            updatedAt
          }
        }
      }
    }
  }
`;

export async function fetchPinnedRepos(login: string, token: string): Promise<PinnedRepository[]> {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`
    },
    body: JSON.stringify({ query: PINNED_QUERY, variables: { login } })
  });

  if (!response.ok) {
    console.error('GitHub API error', await response.text());
    throw new Error('Failed to fetch pinned repositories');
  }

  const payload = (await response.json()) as {
    data?: { user?: { pinnedItems: { nodes: PinnedRepository[] } } };
    errors?: unknown;
  };

  return payload.data?.user?.pinnedItems.nodes?.filter(Boolean) ?? [];
}
