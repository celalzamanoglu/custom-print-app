'use client'

import { Button, Card } from '@nextui-org/react';
import Link from 'next/link';
import Image from 'next/image';
import { FaUpload, FaPaintBrush, FaClipboardList } from 'react-icons/fa';

const steps = [
  { id: 1, title: 'UPLOAD YOUR LOGO', description: 'Upload vector image file – .pdf, .png, .jpg, or .eps vector graphic.', icon: FaUpload },
  { id: 2, title: 'DESIGN YOUR PAPER', description: 'Adjust your logo or image in the design tool on the paper and design it.', icon: FaPaintBrush },
  { id: 3, title: 'SELECT PAPER CHOICES', description: 'Select paper size, print color(s), white or Kraft paper, and sheet quantity.', icon: FaClipboardList },
];

export default function Home() {
  return (
    <div>
      <div className="relative h-[500px]">
        <Image
          src="/crumpled-paperboard.jpg"
          alt="Kraft paper with custom prints"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-4">Add Your Logo</h1>
          <p className="text-xl mb-8 max-w-2xl text-center">
            Create your own personalized greaseproof logo printed paper with our easy-to-use design tool.
          </p>
          <Button
            as={Link}
            href="/designer"
            color="primary"
            size="lg"
          >
            DESIGN YOUR PAPER
          </Button>
        </div>
      </div>

      <div className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Design Your Paper in 3 Easy Steps</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {steps.map((step) => (
            <Card key={step.id} className="p-6 w-80 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col items-center">
                <div className="text-5xl mb-4 text-primary">
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
