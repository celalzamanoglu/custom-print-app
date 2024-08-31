'use client'

import { useState } from 'react';
import Link from 'next/link';
import TemplateOption from '../components/TemplateOption';
import DesignerPreview from '../components/DesignerPreview';

const templates = [
  { id: 1, name: 'Simple Grid', description: 'A classic repeating pattern with equal spacing.' },
  { id: 2, name: 'Tight Grid', description: 'Similar to Simple Grid but with reduced spacing.' },
  { id: 3, name: 'Staggered Grid', description: 'Offset logos in alternating rows for a dynamic layout.' },
  { id: 4, name: 'Dense Staggered', description: 'Tighter offset pattern for a compact design.' },
  { id: 5, name: 'Diagonal Rows', description: 'Logos arranged in diagonal rows for a sense of movement.' },
];

export default function Designer() {
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  const handleTemplateSelect = (id: number) => {
    setSelectedTemplate(id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', width: '100vw' }}>
      {/* Left Column - Template Selection */}
      <div style={{ width: '25%', overflowY: 'auto', padding: '1rem', borderRight: '1px solid #ccc' }}>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', cursor: 'default' }}>Choose a Template</h2>

        {templates.map((template) => (
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
        <DesignerPreview selectedTemplate={selectedTemplate} />
        <button style={{ marginTop: '1rem', backgroundColor: 'var(--primary-color)', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem' }}>Upload Logo</button>
      </div>

      {/* Right Column - Paper Options */}
      <div style={{ width: '25%', padding: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Paper Options</h2>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold' }}>Paper Size</h3>
          <select style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem', marginTop: '0.5rem' }}>
            <option>8.5&quot; x 11&quot;</option>
            <option>11&quot; x 17&quot;</option>
            <option>Custom</option>
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold' }}>Paper Color</h3>
          <select style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem', marginTop: '0.5rem' }}>
            <option>White</option>
            <option>Kraft</option>
          </select>
        </div>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold' }}>Print Color</h3>
          <select style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem', marginTop: '0.5rem' }}>
            <option>1 Color</option>
            <option>2 Colors</option>
            <option>4 Colors</option>
          </select>
        </div>
      </div>
    </div>
  );
}