# Amarjyoti Patra | Creative Developer Portfolio

A high-performance, immersive portfolio website built with Next.js 14, Three.js, and Tailwind CSS. Features a "Cyberwave" aesthetic with interactive 3D elements, smooth animations, and a responsive design.

## 🚀 Features

- **Immersive 3D Background**: Interactive starfield using Three.js.
- **Solar System Project View**: GitHub projects visualized as orbiting planets.
- **Cyberwave Aesthetic**: Modern dark theme with neon accents and glassmorphism.
- **Smooth Animations**: Powered by Framer Motion for seamless transitions.
- **Responsive Design**: Mobile-first approach ensuring great experience on all devices.
- **Telemetry**: Basic visitor tracking and resume download analytics.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) / [Three.js](https://threejs.org/)
- **Language**: TypeScript

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/amarjyotipatra/amarjyoti-portfolio.git
   cd amarjyoti-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your GitHub token (for fetching pinned repositories):
   ```env
   GITHUB_ACCESS_TOKEN=your_github_token_here
   NEXT_PUBLIC_GITHUB_USERNAME=amarjyotipatra
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
├── app/                # Next.js App Router pages and API routes
├── components/         # React components (UI, 3D scenes, Sections)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions (GitHub API, Analytics)
├── public/             # Static assets (Images, Resume, Icons)
└── store/              # State management (Zustand)
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Designed & Built by **Amarjyoti Patra**.
