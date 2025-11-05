# Amarjyoti Patra - Personal Portfolio 🚀

A highly animated, game-inspired personal portfolio built with Next.js, Three.js, and modern web technologies. Features AI-generated personalized portraits, real-time analytics, browser fingerprinting, and an immersive user experience.

## ✨ Key Features

### 🎮 Game-Inspired UI
- **Immersive 3D Background**: Interactive Three.js star field with dynamic camera movements
- **Multiple UI Skins**: Cyberwave, Solarflare, and Stealth themes with unique color palettes
- **Heavy Animations**: Framer Motion powered animations throughout the site
- **Welcome Animation**: Balloon dropping animation on initial load (2 seconds)
- **Smooth Transitions**: Buttery smooth page transitions and hover effects

### 🎨 Theme System
- **Dark Mode (Default)**: Professional dark theme optimized for developers
- **Light Mode**: Clean, accessible light theme
- **Persistent Storage**: Theme preference saved in localStorage
- **Smooth Transitions**: CSS variable-based color transitions

### 🤖 AI-Powered Features
- **Personalized Portraits**: Unique AI-generated professional images for each visitor
- **Replicate API Integration**: Dynamic image generation based on user fingerprint
- **Fallback System**: Elegant SVG fallback if API is unavailable
- **Re-roll Capability**: Users can regenerate their personalized portrait

### 📊 Analytics & Tracking
- **Browser Fingerprinting**: Unique visitor identification using crypto-based hashing
- **Session Tracking**: Real-time telemetry for user interactions
- **Admin Dashboard**: Secret dashboard visible only to your browser fingerprint
- **Visit Statistics**: Track total visits, unique visitors, and user interactions
- **Analytics API**: Custom Next.js API routes for data storage

### 🎵 Audio Experience
- **Welcome Sound**: Background music matching your Full Stack Software Engineer profile
- **User Controls**: Toggle audio on/off
- **Optimized Loading**: Lazy-loaded for performance

### 📱 Fully Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Responsive hamburger menu for mobile devices
- **Adaptive Layouts**: Grid systems that adjust to viewport
- **Smooth Navigation**: Anchor-based smooth scrolling to sections

### 🚀 Performance Optimized
- **Next.js 14**: Latest app router with server components
- **Image Optimization**: Next.js Image component with remote patterns
- **Code Splitting**: Automatic route-based code splitting
- **SSR Safe**: Client-only components properly isolated
- **TypeScript**: Fully typed for better DX and reliability

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14.2.33 (React 18)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **State Management**: Zustand
- **Data Fetching**: SWR

### Backend & APIs
- **API Routes**: Next.js API routes
- **Authentication**: Browser fingerprinting (crypto-based hashing)
- **Analytics Storage**: File-based JSON storage
- **AI Images**: Replicate API integration
- **GitHub API**: Fetch pinned repositories

### Development
- **Package Manager**: npm
- **Linting**: ESLint with Next.js config
- **PostCSS**: For Tailwind processing

## 📂 Project Structure

```
portfolio/
├── app/
│   ├── admin/              # Protected admin dashboard
│   ├── api/
│   │   ├── analytics/      # Telemetry endpoints
│   │   ├── github/         # GitHub pinned repos
│   │   └── portrait/       # AI portrait generation
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles with CSS variables
├── components/
│   ├── AboutSection.tsx    # About me with skills grid
│   ├── BalloonIntro.tsx    # Welcome balloon animation
│   ├── ClientStats.tsx     # Impact statistics
│   ├── ContactStrip.tsx    # Contact information links
│   ├── ExperienceTimeline.tsx # Work/education timeline
│   ├── Hero.tsx            # Hero section with portrait
│   ├── HomeClient.tsx      # Main client wrapper
│   ├── Navigation.tsx      # Responsive navbar
│   ├── PinnedProjects.tsx  # GitHub projects showcase
│   ├── SkinSwitcher.tsx    # UI theme selector
│   ├── ThemeProvider.tsx   # Dark/light theme context
│   ├── ThemeToggle.tsx     # Theme switch button
│   ├── ThreeBackground.tsx # 3D star field
│   └── WelcomeAudio.tsx    # Background music player
├── hooks/
│   ├── useFingerprint.ts   # Browser fingerprinting
│   ├── usePersonalizedPortrait.ts # AI portrait fetching
│   └── useTelemetry.ts     # Analytics tracking
├── lib/
│   ├── analytics.ts        # Analytics utilities
│   ├── auth.ts             # Fingerprint verification
│   ├── github.ts           # GitHub API utilities
│   └── personal.ts         # Personal info (email, phone, etc.)
├── store/
│   └── uiSkin.ts           # Zustand store for UI themes
├── types/
│   └── browser-fingerprint.d.ts # Type definitions
├── public/
│   ├── resume/             # Resume PDF
│   ├── media/              # Audio files
│   └── content/            # Static assets manifest
└── data/
    └── analytics.json      # Analytics data storage
```

## 🔒 Security & Privacy

### Browser Fingerprinting
- Uses `browser-fingerprint` library with SHA-256 hashing
- Combines canvas, audio, WebGL, and user agent data
- Client-side only execution (SSR safe)
- Stored hash: `82830c1c077eae7f15a114d73540ee9af943c52dc4f6e6b852fd4c61a05db042`

### Admin Access
- Dashboard only visible to matching browser fingerprint
- Lazy-loaded after 400ms to prevent flash
- No authentication required for public portfolio
- Analytics data stored locally (not sent to third parties)

## 📧 Contact Information

Integrated throughout the site:
- **Email**: amarjyotipatra511@gmail.com
- **GitHub**: github.com/amarjyotipatra
- **LinkedIn**: linkedin.com/in/amar-jyoti-patra
- **WhatsApp**: +91 8093725545

All contact links include:
- Direct mailto/WhatsApp links
- New tab for external links
- Hover animations with color transitions
- Responsive dot indicators

## 🎯 Sections

1. **Hero Section**
   - AI-personalized portrait
   - Dynamic taglines based on UI skin
   - Resume download CTA
   - Contact strip with all social links
   - UI skin switcher

2. **About Section**
   - Professional bio
   - Skills grid with 12+ technologies
   - Hover tooltips with proficiency levels
   - Animated skill cards

3. **Featured Projects**
   - GitHub pinned repositories
   - Real-time data via GitHub API
   - Star count, forks, last update
   - Technology tags
   - Error handling with fallback UI

4. **Experience Timeline**
   - Work experience
   - Education (B.Sc. Electronics & Telecom)
   - Masai School training (1200+ hours)
   - Technology stack per role
   - Animated on scroll

5. **Impact Statistics**
   - Team projects delivered: 6
   - Solo prototypes: 12
   - Hackathons participated: 5
   - Animated counters

6. **Footer**
   - Copyright notice
   - Admin console link (fingerprint-gated)
   - Contact button
   - Responsive layout

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/amarjyotipatra/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
GITHUB_ACCESS_TOKEN=your_github_token
REPLICATE_API_TOKEN=your_replicate_token
OPENAI_API_KEY=your_openai_key (optional)

NEXT_PUBLIC_BROWSER_FINGERPRINT=your_fingerprint_hash
NEXT_PUBLIC_CONTACT_EMAIL=your@email.com
NEXT_PUBLIC_CONTACT_GITHUB=https://github.com/yourusername
NEXT_PUBLIC_CONTACT_LINKEDIN=https://linkedin.com/in/yourprofile
NEXT_PUBLIC_CONTACT_PHONE=+1234567890
NEXT_PUBLIC_GITHUB_USERNAME=yourusername
```

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Generate Your Browser Fingerprint

1. Visit the site in your preferred browser
2. Open browser console
3. Run:
```javascript
async function getFingerprint() {
  const module = await import('https://esm.sh/browser-fingerprint');
  const fp = module.default({ cookies: true });
  const encoder = new TextEncoder();
  const data = encoder.encode(fp);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const hash = Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  console.log('Your fingerprint:', hash);
}
getFingerprint();
```
4. Copy the hash to `.env.local`

## 📦 Build for Production

```bash
npm run build
npm run start
```

## 🎨 Customization

### Change UI Skins
Edit `store/uiSkin.ts` to add new themes:
```typescript
export type ThemeSkin = 'cyberwave' | 'solarflare' | 'stealth' | 'yourtheme';
```

### Update Content
- **Personal Info**: `lib/personal.ts`
- **Experience**: `components/ExperienceTimeline.tsx`
- **Skills**: `components/AboutSection.tsx`
- **Stats**: `components/ClientStats.tsx`

### Add New Sections
1. Create component in `components/`
2. Import in `components/HomeClient.tsx`
3. Add navigation link in `components/Navigation.tsx`
4. Add section ID for smooth scrolling

## 🐛 Troubleshooting

### Port Already in Use
The app will automatically try port 3001 if 3000 is busy.

### Fingerprint Not Working
- Ensure `browser-fingerprint` is installed
- Check browser console for errors
- Verify `.env.local` has correct hash

### GitHub API Rate Limit
- Add `GITHUB_ACCESS_TOKEN` to `.env.local`
- Use personal access token with repo scope

### AI Portrait Not Loading
- Check Replicate API token
- Fallback SVG will display automatically
- User can click "Re-roll" to retry

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🙏 Acknowledgments

- Inspired by [amarjyotipatra-portfolio.netlify.app](https://amarjyotipatra-portfolio.netlify.app/)
- Built during Masai School training
- Three.js community for amazing 3D libraries
- Vercel for Next.js framework

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Email: amarjyotipatra511@gmail.com
- LinkedIn: [Amar Jyoti Patra](https://linkedin.com/in/amar-jyoti-patra)

---

**Built with ❤️ by Amarjyoti Patra** | Full Stack Software Engineer
