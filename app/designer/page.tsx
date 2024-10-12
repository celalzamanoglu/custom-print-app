'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { DesignerPreview, TemplateOption } from '@/components';

import { PAPER_SIZES, PAPER_COLOR, PRINT_COLOR, QUANTITY, TEMPLATES, colors, images } from '@/constants';

const DEFAULT_LOGO = images.defaultLogo;

export default function Designer() {
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [selectedPaperSize, setSelectedPaperSize] = useState(PAPER_SIZES[0]);
  const [selectedPrintColor, setSelectedPrintColor] = useState(PRINT_COLOR[0]);
  const [selectedPaperColor, setSelectedPaperColor] = useState(Object.values(colors)[0]);
  const [selectedQuantity, setSelectedQuantity] = useState(QUANTITY[0]);
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);

  useEffect(() => {
    console.log(selectedTemplate, selectedPaperSize, selectedPrintColor,selectedPaperColor, selectedQuantity, selectedLogo)
  }, [selectedTemplate, selectedPaperSize, selectedPrintColor, selectedPaperColor, selectedQuantity, selectedLogo])

  const handleTemplateSelect = (id: number) => {
    setSelectedTemplate(id);
  };

  const handlePaperSizeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [x, y] = event.target.value.split('x').map(Number);
    setSelectedPaperSize({ x, y });
  };

  const handlePrintColorSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPrintColor(Number(event.target.value));
  };

  const handlePaperColorSelect = (color:string) => {
    setSelectedPaperColor(color);
  };

  const handleQuantitySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedQuantity(event.target.value);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', width: '100vw' }}>
      {/* Left Column - Template Selection */}
      <div style={{ width: '25%', overflowY: 'auto', padding: '1rem', borderRight: '1px solid #ccc' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', cursor: 'default' }}>Choose a Template</h2>
        {TEMPLATES.map((template) => (
          <TemplateOption
            key={template.id}
            {...template}
            onSelect={handleTemplateSelect}
            isSelected={selectedTemplate === template.id}
          />
        ))}
      </div>

      {/* Center Column - Designer */}
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', borderRight: '1px solid #ccc' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Designer</h2>
        <DesignerPreview 
          selectedTemplate={selectedTemplate} 
          selectedPaperSize={selectedPaperSize} 
          selectedPaperColor={selectedPaperColor} 
          selectedLogo={selectedLogo}
        />
      </div>

      {/* Right Column - Paper Options */}
      <div style={{ width: '25%', padding: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Designer Options</h2>
        
        {/* Logo Upload Section */}
        <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flex: 0.5, flexDirection: 'column', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold' }}>Your Logo</h3>
            {!selectedLogo ? <p>Please upload a logo to use on your cards.</p> : <p>You can upload a different logo if you like.</p>}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleLogoUpload} 
              style={{ marginTop: '0.5rem' }}
          />
          </div>
          <div style={{ display: 'flex', flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
            <Image 
              src={selectedLogo || DEFAULT_LOGO} 
              alt="Logo" 
              width={100} 
              height={100} 
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Right Column - Paper Size */}
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold' }}>Paper Size</h3>
          <select 
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem', marginTop: '0.5rem' }}
            value={`${selectedPaperSize.x}x${selectedPaperSize.y}`}
            onChange={handlePaperSizeSelect}
          >
            {PAPER_SIZES.map((size) => (
              <option key={`${size.x}x${size.y}`} value={`${size.x}x${size.y}`}>{`${size.x}cm x ${size.y}cm`}</option>
            ))}
          </select>
        </div>

        {/* Right Column - Print Color */}
        <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold' }}>Print Color</h3>
          
          <select 
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem', marginTop: '0.5rem' }}
            value={selectedPrintColor}
            onChange={handlePrintColorSelect}
          >
            {PRINT_COLOR.map((color) => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>

        {/* Right Column - Paper Color */}
        <div style={{ marginBottom: '1rem' }}>  
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold' }}>Paper Color</h3>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', marginTop: '0.5rem' }}>
            {Object.values(PAPER_COLOR).map((color) => (
              <div 
                key={color} 
                style={{ 
                  width: '3rem', 
                  height: '3rem', 
                  backgroundColor: color, 
                  borderWidth: color === selectedPaperColor ? '1px' : '0px', 
                  borderStyle: 'solid', 
                  borderColor: color === selectedPaperColor ? 'gray' : '#ccc', 
                  boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer'
                }} 
                onClick={() => handlePaperColorSelect(color)}
              ></div>
            ))}
          </div>
        </div>

        {/* Right Column - Quantity */}
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold' }}>Quantity</h3>
          <select 
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem', marginTop: '0.5rem' }}
            value={selectedQuantity}
            onChange={handleQuantitySelect}
          >
            {QUANTITY.map((quantity) => (
              <option key={quantity} value={quantity}>{quantity}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
