import React, { Dispatch, SetStateAction } from 'react';
import { Widths } from '../App';

interface WidthSliderProps {
  widths: Widths;
  setWidths: Dispatch<SetStateAction<Widths>>;
}

const WidthSlider: React.FC<WidthSliderProps> = ({ widths, setWidths }) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMudScreenWidth = 12 - Number(event.target.value);
    setWidths({
        sideBar: Number(event.target.value),
        mudScreen: Number(newMudScreenWidth)
    });
  };

  return (
    <div>
      <input
        type="number"
        min="1"
        max="11"
        value={widths.sideBar}
        onChange={handleChange}
      />
      <span>1-11</span>
    </div>
  );
};

export default WidthSlider;