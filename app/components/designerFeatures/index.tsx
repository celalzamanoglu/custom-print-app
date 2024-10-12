import React from 'react';

interface DesignerFeaturesProps {
  onShrink: () => void;
  onEnlarge: () => void;
  onRotateClockwise: () => void;
  onRotateAntiClockwise: () => void;
  onDefault: () => void;
}

export const DesignerFeatures: React.FC<DesignerFeaturesProps> = ({
  onShrink,
  onEnlarge,
  onRotateClockwise,
  onRotateAntiClockwise,
  onDefault,
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
      <button onClick={onShrink} style={buttonStyle}>Shrink</button>
      <button onClick={onEnlarge} style={buttonStyle}>Enlarge</button>
      <button onClick={onRotateClockwise} style={buttonStyle}>Rotate Clockwise</button>
      <button onClick={onRotateAntiClockwise} style={buttonStyle}>Rotate Anti-Clockwise</button>
      <button onClick={onDefault} style={buttonStyle}>Default</button>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  backgroundColor: 'var(--primary-color)',
  color: 'white',
  border: 'none',
  borderRadius: '0.25rem',
  cursor: 'pointer',
  fontSize: '0.9rem',
};
