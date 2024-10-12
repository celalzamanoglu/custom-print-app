import { useEffect, useRef, useCallback } from 'react';

import { images } from '@/constants';

interface DesignerPreviewProps {
  selectedTemplate: number;
  selectedPaperSize: {x: number, y: number};
  selectedPaperColor: string;
  selectedLogo: string | null;
}

export const DesignerPreview = ({ 
  selectedTemplate, 
  selectedPaperSize, 
  selectedPaperColor, 
  selectedLogo 
}: DesignerPreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvasWidth = 20 * selectedPaperSize.x;
  const canvasHeight = 20 * selectedPaperSize.y;

  const scaleFactor = Math.min(canvasWidth / 400, canvasHeight / 400);

  const drawPattern = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement, sizeMultiplier: number, spacingMultiplier: number, staggered: boolean = false, centered: boolean = false) => {
    const baseSize = 60 * scaleFactor;
    const imgSize = baseSize * sizeMultiplier;
    const spacing = baseSize * spacingMultiplier;
    const rows = Math.ceil(canvasHeight / spacing) + 1;
    const cols = Math.ceil(canvasWidth / spacing) + 1;
    const offsetX = (canvasWidth - (cols - 1) * spacing) / 2;
    const offsetY = (canvasHeight - (rows - 1) * spacing) / 2;

    if (centered) {
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      const logoSize = 200 * scaleFactor;
      ctx.drawImage(img, centerX - logoSize / 2, centerY - logoSize / 2, logoSize, logoSize);
      return;
    }

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const drawX = offsetX + x * spacing + (staggered && y % 2 ? spacing / 2 : 0) - imgSize / 2;
        const drawY = offsetY + y * spacing - imgSize / 2;
        ctx.drawImage(img, drawX, drawY, imgSize, imgSize);
      }
    }
  }, [scaleFactor, canvasWidth, canvasHeight]);

  const drawTemplate = useCallback((ctx: CanvasRenderingContext2D, templateId: number) => {
    // Set the background color
    ctx.fillStyle = selectedPaperColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const img = new Image();
    img.onload = () => {
      switch (templateId) {
        case 1: drawPattern(ctx, img, 1.0, 1.33); break;
        case 2: drawPattern(ctx, img, 0.83, 1.0); break;
        case 3: drawPattern(ctx, img, 1.0, 1.33, true); break;
        case 4: drawPattern(ctx, img, 0.83, 1.0, true); break;
        case 5: drawPattern(ctx, img, 1.0, 1.33, false, true); break;
      }
    };
    img.src = selectedLogo || images.defaultLogo;
  }, [canvasWidth, canvasHeight, drawPattern, selectedPaperColor, selectedLogo]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawTemplate(ctx, selectedTemplate);
      }
    }
  }, [selectedTemplate, canvasWidth, canvasHeight, selectedPaperSize, selectedPaperColor, selectedLogo, drawTemplate]);

  return (
    <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} style={{ border: '1px solid #ccc', maxWidth: '100%', maxHeight: '100%' }} />
  );
}
