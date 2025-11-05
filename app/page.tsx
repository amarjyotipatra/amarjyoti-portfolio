import dynamic from 'next/dynamic';

const HomeClient = dynamic(() => import('@/components/HomeClient').then((mod) => mod.HomeClient), { ssr: false });

export default function Page() {
  return <HomeClient />;
}
