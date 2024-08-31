import { useEffect, useRef } from 'react';

interface DesignerPreviewProps {
  selectedTemplate: number;
}

export default function DesignerPreview({ selectedTemplate }: DesignerPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawTemplate(ctx, selectedTemplate);
      }
    }
  }, [selectedTemplate]);

  const drawTemplate = (ctx: CanvasRenderingContext2D, templateId: number) => {
    ctx.clearRect(0, 0, 600, 400);
    const img = new Image();
    img.onload = () => {
      switch (templateId) {
        case 1: drawSimpleGrid(ctx, img); break;
        case 2: drawTightGrid(ctx, img); break;
        case 3: drawStaggeredGrid(ctx, img); break;
        case 4: drawDenseStaggered(ctx, img); break;
        case 5: drawDiagonalRows(ctx, img); break;
      }
    };
    img.src = '/your-logo-here.webp';
  };

  // Implement drawing functions for each template (similar to TemplateOption, but scaled up)
  const drawSimpleGrid = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    for (let y = 0; y < 400; y += 80) {
      for (let x = 0; x < 600; x += 80) {
        ctx.drawImage(img, x, y, 60, 60);
      }
    }
  };

  const drawTightGrid = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    for (let y = 0; y < 400; y += 60) {
      for (let x = 0; x < 600; x += 60) {
        ctx.drawImage(img, x, y, 50, 50);
      }
    }
  };

  const drawStaggeredGrid = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    for (let y = 0; y < 400; y += 80) {
      for (let x = 0; x < 600; x += 80) {
        ctx.drawImage(img, x + (y % 160 ? 40 : 0), y, 60, 60);
      }
    }
  };

  const drawDenseStaggered = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    for (let y = 0; y < 400; y += 60) {
      for (let x = 0; x < 600; x += 60) {
        ctx.drawImage(img, x + (y % 120 ? 30 : 0), y, 50, 50);
      }
    }
  };

  const drawDiagonalRows = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 10; j++) {
        ctx.drawImage(img, i * 80 - j * 40, j * 80, 60, 60);
      }
    }
  };

  return (
    <canvas ref={canvasRef} width={600} height={400} style={{ border: '1px solid #ccc' }} />
  );
}