import React from 'react';

interface FontSizeSliderProps {
  fontSize: number;
  setFontSize: (value: number) => void;
}

const FontSizeSlider: React.FC<FontSizeSliderProps> = ({ fontSize, setFontSize }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(Number(event.target.value));
  };

  return (
    <div>
      <input
        type="range"
        min="10"
        max="100"
        value={fontSize}
        onChange={handleChange}
      />
      <span>{fontSize}px</span>
    </div>
  );
};

export default FontSizeSlider;