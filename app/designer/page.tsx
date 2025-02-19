'use client';
import { useReducer } from 'react';

import Image from 'next/image';
import { FaRedo, FaUndo, FaArrowsAlt, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';

import {
  DesignerPreview,
  TemplateOption,
  Option,
  Total,
  DesignerButton,
  ColorSwatch,
} from '@/components';

import { PAPER_SIZES, PAPER_COLOR, PRINT_COLOR, QUANTITY, TEMPLATES, images } from '@/constants';

interface DesignerState {
  selectedTemplate: number;
  selectedPaperSize: { x: number; y: number };
  selectedPrintColor: number;
  selectedPaperColor: { name: string; value: string };
  selectedQuantity: number;
  selectedLogo: string | null;
  logoScale: number;
  logoRotation: number;
}

type DesignerAction =
  | { type: 'SET_TEMPLATE'; payload: number }
  | { type: 'SET_PAPER_SIZE'; payload: { x: number; y: number } }
  | { type: 'SET_PRINT_COLOR'; payload: number }
  | { type: 'SET_PAPER_COLOR'; payload: { name: string; value: string } }
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
    selectedPaperColor: PAPER_COLOR[0],
    selectedQuantity: QUANTITY[0],
    selectedLogo: null,
    logoScale: 1,
    logoRotation: 0,
  });

  const handleTemplateSelect = (id: number) => {
    dispatch({ type: 'SET_TEMPLATE', payload: id });
    dispatch({ type: 'SET_DEFAULT_LOGO_FEATURES' });
  };

  const handlePaperSizeSelect = (selectedSize: { x: number; y: number }) => {
    dispatch({ type: 'SET_PAPER_SIZE', payload: selectedSize });
  };

  const handlePrintColorSelect = (selectedColor: number) => {
    dispatch({ type: 'SET_PRINT_COLOR', payload: selectedColor });
  };

  const handlePaperColorSelect = (selectedColor: { name: string; value: string }) => {
    dispatch({ type: 'SET_PAPER_COLOR', payload: selectedColor });
  };

  const handleQuantitySelect = (selectedQuantity: number) => {
    dispatch({ type: 'SET_QUANTITY', payload: selectedQuantity });
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
    <div className="flex flex-col lg:flex-row min-h-screen p-4 max-w-7xl mx-auto">
      {/* Left Column - Template Selection */}
      <div className="w-full lg:w-1/4 mb-4 lg:mb-0 lg:pr-4">
        <h2 className="text-2xl font-bold mb-4">Choose a Template</h2>
        <div className="space-y-4">
          {TEMPLATES.map((template) => (
            <TemplateOption
              key={template.id}
              {...template}
              onSelect={handleTemplateSelect}
              isSelected={state.selectedTemplate === template.id}
            />
          ))}
        </div>
      </div>

      {/* Center Column - Designer */}
      <div className="w-full lg:w-1/2 mb-4 lg:mb-0 lg:px-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-center">Designer</h2>
        <div className="w-full flex justify-center">
          <DesignerPreview
            selectedTemplate={state.selectedTemplate}
            selectedPaperSize={state.selectedPaperSize}
            selectedPaperColor={state.selectedPaperColor.value}
            selectedLogo={state.selectedLogo}
            logoScale={state.logoScale}
            logoRotation={state.logoRotation}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <DesignerButton icon={FaUndo} label="Left" onClick={handleRotateAntiClockwise} />
          <DesignerButton icon={FaSearchPlus} label="Enlarge" onClick={handleEnlarge} />
          <DesignerButton icon={FaArrowsAlt} label="Default" onClick={handleDefault} />
          <DesignerButton icon={FaSearchMinus} label="Shrink" onClick={handleShrink} />
          <DesignerButton icon={FaRedo} label="Right" onClick={handleRotateClockwise} />
        </div>
      </div>

      {/* Right Column - Paper Options */}
      <div className="w-full lg:w-1/4 lg:pl-4">
        <h2 className="text-2xl font-bold mb-4">Designer Options</h2>
        {/* Logo Upload Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Your Logo</h3>
          <div className="flex flex-col items-center">
            <div className="w-full max-w-[150px] h-[150px] relative mb-4">
              <Image
                src={state.selectedLogo || images.defaultLogo}
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            {!state.selectedLogo && <p className="text-center mb-2">Please upload a logo.</p>}
            <input type="file" accept="image/*" onChange={handleLogoUpload} className="w-full" />
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
        <Option
          title="Paper Color"
          options={PAPER_COLOR}
          value={state.selectedPaperColor}
          onChange={handlePaperColorSelect}
          renderStartContent={(color) => <ColorSwatch color={color.value} />}
          getOptionLabel={(color) => color.name}
          getOptionValue={(color) => color.value}
          classNames={{
            // to prevent the colorswatch to overlap with the title text
            trigger: ' h-16', // Adds padding to the top of the trigger (selected value area)
            value: ' mt-2', // Adds padding to the top of the value text
          }}
          renderValue={(color) => (
            <div className="flex items-center my-2">
              <ColorSwatch color={color.value} />
              <span className="ml-2">{color.name}</span>
            </div>
          )}
        />
        <Option
          title="Quantity"
          options={QUANTITY}
          value={state.selectedQuantity}
          onChange={handleQuantitySelect}
          getOptionLabel={(quantity) => `${quantity.toLocaleString()}`}
          getOptionValue={(quantity) => quantity.toString()}
        />
        <Total
          paperSize={state.selectedPaperSize}
          printColor={state.selectedPrintColor}
          quantity={state.selectedQuantity}
        />
      </div>
    </div>
  );
}
