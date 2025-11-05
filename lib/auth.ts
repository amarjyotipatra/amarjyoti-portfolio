import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const allowedEmails = (process.env.ADMIN_EMAILS ?? '')
  .split(',')
  .map((value: string) => value.trim())
  .filter(Boolean);

export const { handlers: authHandlers, auth } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_OAUTH_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET ?? ''
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET ?? ''
    })
  ],
  callbacks: {
  async signIn({ user }: { user: { email?: string | null } }): Promise<boolean> {
      if (!allowedEmails.length) return true;
      if (user.email && allowedEmails.includes(user.email)) {
        return true;
      }
      return false;
    }
  },
  pages: {
    signIn: '/login'
  }
});
