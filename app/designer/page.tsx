'use client'

import { useReducer } from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import { FaRedo, FaUndo, FaArrowsAlt, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';

import { DesignerPreview, TemplateOption, Option, Total } from '@/components';

import { PAPER_SIZES, PAPER_COLOR, PRINT_COLOR, QUANTITY, TEMPLATES, colors, images } from '@/constants';

const DEFAULT_LOGO = images.defaultLogo;

interface DesignerState {
  selectedTemplate: number;
  selectedPaperSize: { x: number; y: number };
  selectedPrintColor: number;
  selectedPaperColor: string;
  selectedQuantity: number;
  selectedLogo: string | null;
  logoScale: number;
  logoRotation: number;
}

type DesignerAction =
  | { type: 'SET_TEMPLATE'; payload: number }
  | { type: 'SET_PAPER_SIZE'; payload: { x: number; y: number } }
  | { type: 'SET_PRINT_COLOR'; payload: number }
  | { type: 'SET_PAPER_COLOR'; payload: string }
  | { type: 'SET_QUANTITY'; payload: number }
  | { type: 'SET_LOGO'; payload: string | null }
  | { type: 'SHRINK_LOGO' }
  | { type: 'ENLARGE_LOGO' }
  | { type: 'ROTATE_CLOCKWISE' }
  | { type: 'ROTATE_ANTI_CLOCKWISE' }
  | { type: 'SET_DEFAULT_LOGO_FEATURES' };

function designerReducer(state: DesignerState, action: DesignerAction): DesignerState {
  switch (action.type) {
    case 'SET_TEMPLATE':
      return { ...state, selectedTemplate: action.payload };
    case 'SET_PAPER_SIZE':
      return { ...state, selectedPaperSize: action.payload };
    case 'SET_PRINT_COLOR':
      return { ...state, selectedPrintColor: action.payload };
    case 'SET_PAPER_COLOR':
      return { ...state, selectedPaperColor: action.payload };
    case 'SET_QUANTITY':
      return { ...state, selectedQuantity: Number(action.payload) };
    case 'SET_LOGO':
      return { ...state, selectedLogo: action.payload };
    case 'SHRINK_LOGO':
      return { ...state, logoScale: Math.max(0.5, state.logoScale - 0.1) };
    case 'ENLARGE_LOGO':
      return { ...state, logoScale: Math.min(1.5, state.logoScale + 0.1) };
    case 'ROTATE_CLOCKWISE':
      return { ...state, logoRotation: (state.logoRotation + 15) % 360 };
    case 'ROTATE_ANTI_CLOCKWISE':
      return { ...state, logoRotation: (state.logoRotation - 15 + 360) % 360 };
    case 'SET_DEFAULT_LOGO_FEATURES':
      return { ...state, logoScale: 1, logoRotation: 0 };
    default:
      return state;
  }
}

export default function Designer() {
  const [state, dispatch] = useReducer(designerReducer, {
    selectedTemplate: 1,
    selectedPaperSize: PAPER_SIZES[0],
    selectedPrintColor: PRINT_COLOR[0],
    selectedPaperColor: Object.values(colors)[0],
    selectedQuantity: QUANTITY[0],
    selectedLogo: null,
    logoScale: 1,
    logoRotation: 0,
  });

  const handleTemplateSelect = (id: number) => {
    dispatch({ type: 'SET_TEMPLATE', payload: id });
    dispatch({ type: 'SET_DEFAULT_LOGO_FEATURES' });
  };

  const handlePaperSizeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [x, y] = event.target.value.split('x').map(Number);
    dispatch({ type: 'SET_PAPER_SIZE', payload: { x, y } });
  };

  const handlePrintColorSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_PRINT_COLOR', payload: Number(event.target.value) });
  };

  const handlePaperColorSelect = (color: string) => {
    dispatch({ type: 'SET_PAPER_COLOR', payload: color });
  };

  const handleQuantitySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_QUANTITY', payload: Number(event.target.value) });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch({ type: 'SET_LOGO', payload: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShrink = () => dispatch({ type: 'SHRINK_LOGO' });
  const handleEnlarge = () => dispatch({ type: 'ENLARGE_LOGO' });
  const handleRotateClockwise = () => dispatch({ type: 'ROTATE_CLOCKWISE' });
  const handleRotateAntiClockwise = () => dispatch({ type: 'ROTATE_ANTI_CLOCKWISE' });

  const handleDefault = () => dispatch({ type: 'SET_DEFAULT_LOGO_FEATURES' });

  console.log(state);

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
            isSelected={state.selectedTemplate === template.id}
          />
        ))}
      </div>
      {/* Center Column - Designer */}
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', borderRight: '1px solid #ccc' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Designer</h2>
        <DesignerPreview 
          selectedTemplate={state.selectedTemplate} 
          selectedPaperSize={state.selectedPaperSize} 
          selectedPaperColor={state.selectedPaperColor} 
          selectedLogo={state.selectedLogo}
          logoScale={state.logoScale}
          logoRotation={state.logoRotation}
        />
        <div className="flex flex-wrap justify-center gap-8 mt-4">
          <div className="flex flex-col items-center">
            <Button
              color="default"
              variant="light"
              className="w-16 h-16 flex items-center justify-center rounded-full"
              onClick={handleRotateAntiClockwise}
            >
              <FaUndo className="text-2xl text-black" />
            </Button>
            <span className="text-xs text-black mt-2 text-center">Counter Clockwise</span>
          </div>
          <div className="flex flex-col items-center">
            <Button
              color="default"
              variant="light"
              className="w-16 h-16 flex items-center justify-center rounded-full"
              onClick={handleRotateClockwise}
            >
              <FaRedo className="text-2xl text-black" />
            </Button>
            <span className="text-xs text-black mt-2 text-center">Clockwise</span>
          </div>
          <div className="flex flex-col items-center">
            <Button
              color="default"
              variant="light"
              className="w-16 h-16 flex items-center justify-center rounded-full"
              onClick={handleEnlarge}
            >
              <FaSearchPlus className="text-2xl text-black" />
            </Button>
            <span className="text-xs text-black mt-2 text-center">Enlarge</span>
          </div>
          <div className="flex flex-col items-center">
            <Button
              color="default"
              variant="light"
              className="w-16 h-16 flex items-center justify-center rounded-full"
              onClick={handleShrink}
            >
              <FaSearchMinus className="text-2xl text-black" />
            </Button>
            <span className="text-xs text-black mt-2 text-center">Shrink</span>
          </div>
          <div className="flex flex-col items-center">
            <Button
              color="default"
              variant="light"
              className="w-16 h-16 flex items-center justify-center rounded-full"
              onClick={handleDefault}
            >
              <FaArrowsAlt className="text-2xl text-black" />
            </Button>
            <span className="text-xs text-black mt-2 text-center">Default</span>
          </div>
        </div>
      </div>
      {/* Right Column - Paper Options */}
      <div style={{ width: '25%', padding: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Designer Options</h2>
        {/* Logo Upload Section */}
        <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flex: 0.5, flexDirection: 'column', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold' }}>Your Logo</h3>
            {!state.selectedLogo ? <p>Please upload a logo to use on your cards.</p> : <p>You can upload a different logo if you like.</p>}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleLogoUpload} 
              style={{ marginTop: '0.5rem' }}
            />
          </div>
          <div style={{ display: 'flex', flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
            <Image 
              src={state.selectedLogo || DEFAULT_LOGO} 
              alt="Logo" 
              width={100} 
              height={100} 
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
        <Option
          title="Paper Size"
          options={PAPER_SIZES}
          value={state.selectedPaperSize}
          onChange={handlePaperSizeSelect}
          getOptionLabel={(size) => `${size.x}cm x ${size.y}cm`}
          getOptionValue={(size) => `${size.x}x${size.y}`}
        />
        <Option
          title="Print Color"
          options={PRINT_COLOR}
          value={state.selectedPrintColor}
          onChange={handlePrintColorSelect}
          getOptionLabel={(color) => color.toString()}
          getOptionValue={(color) => color.toString()}
        />
        {/* Paper Color Section */}
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
                  borderWidth: color === state.selectedPaperColor ? '1px' : '0px', 
                  borderStyle: 'solid', 
                  borderColor: color === state.selectedPaperColor ? 'gray' : '#ccc', 
                  boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer'
                }} 
                onClick={() => handlePaperColorSelect(color)}
              ></div>
            ))}
          </div>
        </div>
        <Option
          title="Quantity"
          options={QUANTITY}
          value={state.selectedQuantity}
          onChange={handleQuantitySelect}
          getOptionLabel={(quantity) => `${quantity.toLocaleString()}`}
          getOptionValue={(quantity) => quantity.toString()}
        />
        <Total paperSize={state.selectedPaperSize} printColor={state.selectedPrintColor} quantity={state.selectedQuantity} />
      </div>
    </div>
  );
}
