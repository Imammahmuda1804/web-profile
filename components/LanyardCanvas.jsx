'use client'; 

import dynamic from 'next/dynamic';

const Lanyard = dynamic(() => import('@/components/Lanyard'), {
  ssr: false,
});

export default function LanyardCanvas() {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <Lanyard />
    </div>
  );
}