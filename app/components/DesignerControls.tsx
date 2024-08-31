'use client'

interface DesignerControlsProps {
  paperSize: string;
  setPaperSize: (size: string) => void;
  paperColor: string;
  setPaperColor: (color: string) => void;
  printColor: string;
  setPrintColor: (color: string) => void;
  handleLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DesignerControls({
  paperSize,
  setPaperSize,
  paperColor,
  setPaperColor,
  printColor,
  setPrintColor,
  handleLogoUpload
}: DesignerControlsProps) {
  return (
    <div className="controls">
      <div>
        <label htmlFor="logo-upload">Upload Logo:</label>
        <input type="file" id="logo-upload" onChange={handleLogoUpload} accept=".pdf,.png,.jpg,.eps" />
      </div>
      
      <div>
        <label htmlFor="paper-size">Paper Size:</label>
        <select id="paper-size" value={paperSize} onChange={(e) => setPaperSize(e.target.value)}>
          <option value="8.5x11">8.5&quot; x 11&quot;</option>
          <option value="12x12">12&quot; x 12&quot;</option>
          {/* Add more size options */}
        </select>
      </div>
      
      <div>
        <label htmlFor="paper-color">Paper Color:</label>
        <select id="paper-color" value={paperColor} onChange={(e) => setPaperColor(e.target.value)}>
          <option value="white">White</option>
          <option value="kraft">Kraft</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="print-color">Print Colors:</label>
        <select id="print-color" value={printColor} onChange={(e) => setPrintColor(e.target.value)}>
          <option value="1">1 Color</option>
          <option value="2">2 Colors</option>
          <option value="4">4 Colors</option>
        </select>
      </div>
    </div>
  );
}