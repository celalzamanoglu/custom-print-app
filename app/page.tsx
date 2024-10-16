'use client';

import { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { Button, Card, Spinner } from '@nextui-org/react';

import { images, STEPS } from '@/constants';

export default function Home() {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = images.crumpledPaperboard;
    img.onload = () => setPageLoaded(true);
  }, []);

  if (!pageLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <Spinner size="lg" color="default" />
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-[500px]">
        <Image
          src={images.crumpledPaperboard}
          alt="Kraft paper with custom prints"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-4">Add Your Logo</h1>
          <p className="text-xl mb-8 max-w-2xl text-center">
            Create your own personalized greaseproof logo printed paper with our easy-to-use design
            tool.
          </p>
          <Button
            as={Link}
            href="/designer"
            className="bg-[#1c1c1e] text-white hover:bg-[#2c2c2e] transition-colors"
            size="lg"
          >
            DESIGN YOUR PAPER
          </Button>
        </div>
      </div>

      <div className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Design Your Paper in 3 Easy Steps</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {STEPS.map((step) => (
            <Card key={step.id} className="p-6 w-80 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col items-center">
                <div className="text-5xl mb-4 text-[#1c1c1e]">
                  <step.icon />
                </div>
                <h3 className="text-xl font-semibold mb-2">STEP {step.id}</h3>
                <h4 className="text-lg font-medium mb-2 text-center">{step.title}</h4>
                <p className="text-center">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
