import React, { useContext } from 'react';
import { SkyContext } from '../context/skyContext';

const WidthSlider: React.FC = () => {

  const { 
    widths, setWidths
  } = useContext(SkyContext);

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