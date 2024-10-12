import { useEffect, useRef, useCallback } from 'react';

import { images } from '@/constants';

interface TemplateOptionProps {
  id: number;
  name: string;
  description: string;
  onSelect: (id: number) => void;
  isSelected: boolean;
}

export const TemplateOption = ({ id, name, description, onSelect, isSelected }: TemplateOptionProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawTemplate = useCallback((ctx: CanvasRenderingContext2D, templateId: number) => {
    ctx.clearRect(0, 0, 200, 100);
    const img = new Image();
    img.onload = () => {
      switch (templateId) {
        case 1: // Simple Grid
          drawSimpleGrid(ctx, img);
          break;
        case 2: // Tight Grid
          drawTightGrid(ctx, img);
          break;
        case 3: // Staggered Grid
          drawStaggeredGrid(ctx, img);
          break;
        case 4: // Dense Staggered
          drawDenseStaggered(ctx, img);
          break;
        case 5: // Centered
          drawCentered(ctx, img);
          break;
      }
    };
    img.src = images.defaultLogo;
  }, []); // Add any dependencies if needed

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawTemplate(ctx, id);
      }
    }
  }, [id, drawTemplate]);

  // Implement drawing functions for each template
  const drawSimpleGrid = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    for (let y = 0; y < 100; y += 40) {
      for (let x = 0; x < 200; x += 40) {
        ctx.drawImage(img, x, y, 30, 30);
      }
    }
  };

  const drawTightGrid = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    for (let y = 0; y < 100; y += 30) {
      for (let x = 0; x < 200; x += 30) {
        ctx.drawImage(img, x, y, 25, 25);
      }
    }
  };

  const drawStaggeredGrid = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    for (let y = 0; y < 100; y += 40) {
      for (let x = 0; x < 200; x += 40) {
        ctx.drawImage(img, x + (y % 80 ? 20 : 0), y, 30, 30);
      }
    }
  };

  const drawDenseStaggered = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    for (let y = 0; y < 100; y += 30) {
      for (let x = 0; x < 200; x += 30) {
        ctx.drawImage(img, x + (y % 60 ? 15 : 0), y, 25, 25);
      }
    }
  };

  const drawCentered = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    ctx.drawImage(img, 50, 25, 100, 50);
  }

  return (
    <div 
      onClick={() => onSelect(id)} 
      style={{ 
        marginBottom: '1rem', 
        padding: '1rem', 
        border: `2px solid ${isSelected ? 'var(--primary-color)' : '#ccc'}`,
        borderRadius: '0.5rem', 
        cursor: 'pointer',
        backgroundColor: isSelected ? 'rgba(52, 152, 219, 0.1)' : 'transparent'
      }}
    >
      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{name}</h3>
      <p style={{ fontSize: '0.9rem', color: '#666' }}>{description}</p>
      <canvas ref={canvasRef} width={200} height={100} style={{ marginTop: '0.5rem', border: '1px solid #eee' }} />
    </div>
  );
}
